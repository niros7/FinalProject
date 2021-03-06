import { AutoCompleteComponent } from './Components/auto-complete/auto-complete.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { ArticleListComponent, ArticleMetaComponent, ArticlePreviewComponent } from './article-helpers';
import { FavoriteButtonComponent, FollowButtonComponent } from './buttons';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { Tab1CompComponent } from '../tab1-comp/tab1-comp.component';
import { Tab2CompComponent } from '../tab2-comp/tab2-comp.component';
import { Tab3CompComponent } from '../tab3-comp/tab3-comp.component';
import { WizardComponent } from '../wizard/wizard.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: WizardComponent
  },
  {
    path: 'tab2',
    component: Tab2CompComponent
  },
  {
    path: 'tab3',
    component: Tab3CompComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    FollowButtonComponent,
    ListErrorsComponent,
    ShowAuthedDirective,
    Tab1CompComponent,
    Tab2CompComponent,
    Tab3CompComponent,
    AutoCompleteComponent
  ],
  exports: [
    ArticleListComponent,
    ArticleMetaComponent,
    ArticlePreviewComponent,
    CommonModule,
    FavoriteButtonComponent,
    FollowButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective,
    AutoCompleteComponent
  ]
})
export class SharedModule {}
