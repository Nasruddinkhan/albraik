import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { defineLocale } from 'ngx-bootstrap/chronos';
import {  arLocale } from 'ngx-bootstrap/locale';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteConfirmationDialogComponent } from './views/delete-confirmation-dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

 defineLocale('ar', arLocale);

@NgModule({

    imports:      [ CommonModule , 
        ModalModule.forRoot(),
        NgxLoadingModule.forRoot({}),
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        PerfectScrollbarModule,
        CollapseModule.forRoot(),
        FormsModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        TooltipModule.forRoot(),
        ChartsModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            autoDismiss: true
          }),
          PaginationModule.forRoot(),
          BsDropdownModule.forRoot(),
          TabsModule.forRoot(),
          MatDialogModule,
          MatButtonModule
        ],
    entryComponents: [
        DeleteConfirmationDialogComponent
    ],
    exports:[  
        CommonModule, 
        TranslateModule,
        PerfectScrollbarModule,
        CollapseModule,
        ModalModule,
        NgxLoadingModule,
        BsDatepickerModule,
        DatepickerModule ,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        PaginationModule,
        TabsModule,
        TooltipModule
        ],
        providers: [ DatePipe ],
        declarations: [DeleteConfirmationDialogComponent]

   })

   export class SharedModule { }