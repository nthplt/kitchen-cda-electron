import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/classes/Ingredient';
import { Recipe } from '../../models/classes/Recipe';
declare const electronAPI: any;

type Entity = 'ingredients' | 'recipes';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getAllEntity(entity: Entity): Promise<any[]> {
    return electronAPI
      .readFile(entity)
      .then((listEntity: Record<string, any>) =>
        Object.entries(listEntity).map((i: [string, any]) => ({
          id: i[0],
          ...i[1],
        }))
      );
  }

  getEntityById(entity: Entity, id: string): Promise<any> {
    return electronAPI.readFileEntityById(entity, id);
  }

  addEntity(type: Entity, data: Ingredient | Recipe): Promise<string> {
    if ((data as any).id) {
      delete (data as any).id;
    }
    return electronAPI.addEntity(type, data);
  }
}
