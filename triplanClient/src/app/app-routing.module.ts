import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { AnonymousGuard } from './anonymous-guard.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoresultComponent } from './noresult/noresult.component';
import { WizardComponent } from './wizard/wizard.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { Tab1CompComponent } from './tab1-comp/tab1-comp.component';
import { AddStoryComponent } from './add-story/add-story.component';

const appRoutes: Routes = [
    {
        path: 'welcome',
        component: LoginComponent,
        canActivate: [AnonymousGuard]
    },
    {
        path: 'about',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    }, 
    {
        path: 'noresult',
        component: NoresultComponent,
        canActivate: [AuthGuard]
    }, 
    {
        path: 'wizard',
        component: WizardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'search',
        component: SearchResultsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cmp',
        component: Tab1CompComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'addStory',
        component: AddStoryComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'welcome' , pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AnonymousGuard
    ]
})
export class AppRoutingModule { }