import { Routes } from '@angular/router';
import { HomeComponent } from './components/page/home/home.component';
import { WildcardComponent } from './components/page/wildcard/wildcard.component';
import { RecipeComponent } from './components/page/recipe/recipe.component';
import { LayoutComponent } from './components/utils/layout/layout.component';
import { RecipeIdComponent } from './components/page/recipe-id/recipe-id.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
  {
    path: 'recipe/:id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RecipeIdComponent,
      },
    ],
  },
  {
    path: 'create-recipe',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RecipeComponent,
      },
    ],
  },
  { path: '**', component: WildcardComponent },
];
