import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  exports: [
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule
  ]
})
export class ApplicationsModule {}