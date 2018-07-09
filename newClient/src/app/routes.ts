import { CanActivate, Routes, RouterModule } from '@angular/router';
import { Tab1CompComponent } from './tab1-comp/tab1-comp.component';
import { Tab2CompComponent } from './tab2-comp/tab2-comp.component';
import { Tab3CompComponent } from './tab3-comp/tab3-comp.component';
import { WizardComponent } from './wizard/wizard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/AuthGuard';
import { AnonymousGuard } from './auth/AnonymousGuard';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: WizardComponent,
        canActivate: [AuthGuard]
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
        component: AuthComponent,
        canActivate: [AnonymousGuard]
      },
      {
          path:'', redirectTo:'/auth', pathMatch:'full'
      }
    ]