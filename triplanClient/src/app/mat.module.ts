import {
  NgModule
} from '@angular/core';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatList,
  MatListItem,
  MatToolbar,
  MatToolbarBase,
  MatToolbarRow,
  MatSnackBarModule
} from '@angular/material';

const mats = [
    MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatDividerModule,
  MatSnackBarModule
]

@NgModule({
  declarations: [],
  imports: mats,
  exports: mats
})
export class MatModule {}
