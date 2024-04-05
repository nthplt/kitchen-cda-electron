import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CouteauSuisseService } from '../../../services/couteauSuisse/couteau-suisse.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  searchRecipeValue: string = '';

  constructor(
    protected router: Router,
    private csService: CouteauSuisseService
  ) {}

  sendSearchValue() {
    console.log(this.searchRecipeValue.trim());
    this.csService.emitSearchRecipeValue(this.searchRecipeValue.trim());
  }
}
