import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from '../contact-routing.module';
import { ContactComponent } from '../contact/contact.component';
import { SharedModule } from '../../../share.module';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../service/snackbar.service';
import { EditContactDialogComponent } from './edit-contact-dialog/edit-contact-dialog.component';



@NgModule({
  declarations: [ ContactComponent, AddContactDialogComponent, EditContactDialogComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  entryComponents: [
    AddContactDialogComponent,
    EditContactDialogComponent
  ],
  providers: [
    SnackbarService
  ]
})
export class ContactModule { }
