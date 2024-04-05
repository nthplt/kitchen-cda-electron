import { Component, HostListener, Input } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  // Type de fichiers attendu
  @Input() inputTypeExpected: string[] = ['application/x-msdownload'];
  @Input() title: string = 'Dépôt de documents';
  //Boolean pour afficher les erreurs Firebase dans le template
  @Input() displayErrors: boolean = false;
  // Chemin vers lequel sera envoyé les fichiers
  @Input() storagePath: string = 'exe_vitisoft';

  protected isDropAllowed: boolean = false;
  protected dragEntered: boolean = false;
  protected fileSelectError: boolean = false;
  protected files: File[] = [];
  protected filesExcludedNames: string[] = [];
  protected percentsProgress: number[] = [];
  protected errorsFiles: string[] = [];
  protected isUploading: boolean = false;

  constructor(private fileService: FileService) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDropAllowedArea(event)) {
      this.isDropAllowed = true;
      this.dragEntered = true;
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDropAllowed = false;
    this.dragEntered = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    // Méthode appelé lors du drop de fichiers dans l'input File
    event.preventDefault();
    event.stopPropagation();
    this.resetError();
    if (this.isDropAllowedArea(event) && event.dataTransfer?.files) {
      for (let index = 0; index < event.dataTransfer.files.length; index++) {
        const file: File | null = event.dataTransfer.files.item(index);
        if (file && this.inputTypeExpected.includes(file.type)) {
          this.files.push(file);
        } else if (file) {
          this.filesExcludedNames.push(file.name);
        }
      }
      if (!this.files.length) this.fileSelectError = true;
    }
    this.isDropAllowed = false;
    this.dragEntered = false;
  }

  isDropAllowedArea(event: DragEvent): boolean {
    // Vérifie la classe de l'élément pour savoir si on peut drop le fichier dessus
    return (event.target as HTMLElement).classList.contains(
      'allowed-drop-area'
    );
  }

  selectFile(event: any): void {
    // Méthode appelé lors de la selection de fichiers apres click sur l'input File
    this.resetError();
    const filesTargets = event.target?.files as FileList;
    for (let index = 0; index < filesTargets.length; index++) {
      const file: File | null = filesTargets.item(index);
      if (file && this.inputTypeExpected.includes(file.type)) {
        this.files.push(file);
      } else if (file) {
        this.filesExcludedNames.push(file.name);
      }
    }
    if (!this.files.length) this.fileSelectError = true;
  }

  resetError(): void {
    this.fileSelectError = false;
    this.errorsFiles = [];
    this.filesExcludedNames = [];
  }

  removeFile(fileToRemove: File): void {
    this.files = this.files.filter((file: File) => file !== fileToRemove);
  }

  resetFiles(): void {
    this.resetError();
    this.isUploading = false;
    this.files = [];
    this.percentsProgress = [];
  }

  getAveragePercent(percentsProgress: Array<number>): number {
    return parseInt(
      (
        percentsProgress.reduce((acc, curr) => acc + curr, 0) /
        percentsProgress.length
      ).toString()
    );
  }

  uploadFiles() {
    this.resetError();
    // Méthode qui va pour chaque fichier lancer l'upload et tenir un pourcentage hydraté dans le template
    if (this.files.length) {
      let filesInUpload: number = this.files.length;
      this.isUploading = true;
      for (let index = 0; index < this.files.length; index++) {
        const fileToUpload: File = this.files[index];
        let uploadSubscription!: Subscription;

        const uploadFileTask: AngularFireUploadTask =
          this.fileService.uploadFile(
            this.storagePath + '/' + fileToUpload.name,
            fileToUpload
          );

        uploadFileTask.catch((err: Error) => {
          // Gestion d'erreur si le transfert a retourné une erreur
          this.errorsFiles[index] = err.message;
          this.percentsProgress[index] = 0;
          filesInUpload = filesInUpload - 1;
          uploadSubscription?.unsubscribe();
          if (!filesInUpload) {
            // Si tous les fichiers ont fini d'être upload
            this.isUploading = false;
          }
        });

        uploadSubscription = uploadFileTask
          .percentageChanges()
          .subscribe(async (percent: number | undefined) => {
            // mise a jour du pourcentage d'upload du fichier
            this.percentsProgress[index] = percent as number;
            if (percent === 100) {
              uploadSubscription.unsubscribe();
              filesInUpload = filesInUpload - 1;
            }
            if (!filesInUpload) {
              // Si tous les fichiers ont fini d'être upload
              this.isUploading = false;
            }
          });
      }
    }
  }
}
