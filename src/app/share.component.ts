import { P500Component } from './views/error/500.component';
import { P404Component } from './views/error/404.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


@NgModule({
    declarations:[
        P500Component,P404Component
    ],
    imports:[CommonModule]
})
export class ShareComponentModule{

}