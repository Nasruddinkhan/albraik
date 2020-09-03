import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    exports:[
        CommonModule,
        FormsModule,
        ToastrModule,
        ReactiveFormsModule
    ]
})
export class ShareCommonModule{

}