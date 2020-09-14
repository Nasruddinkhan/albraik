import { CommonModule } from '@angular/common';
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
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({

    imports:      [ CommonModule , 
        ModalModule.forRoot(),
        NgxLoadingModule.forRoot({}),
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        PerfectScrollbarModule,
        CollapseModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ChartsModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            autoDismiss: true
          }),
          PaginationModule.forRoot(),
          BsDropdownModule.forRoot(),
          TabsModule.forRoot()],

    exports:[  
        CommonModule, 
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
        TabsModule
    ]

   })

   export class SharedModule { }