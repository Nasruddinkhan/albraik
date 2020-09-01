import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyMaster } from '../../modal/company-master';


@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent implements OnInit {
  companyForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }
  //@Output() company: EventEmitter<String> = new EventEmitter ();
  companyMst:CompanyMaster
  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      faxNumber: [''],
      logo: [''],
      address: ['',  [Validators.required]],
      isError:[false]
    });
  }
  get f() { return this.companyForm.controls; }
 /*  onSubmitCompanyData(){
    this.company.emit(this.companyForm.value);
  }
 */
  onSubmit(){
    console.log('onSubmitCompanyData');
    if (this.companyForm.invalid) {
      return;
     }
     this.companyForm.controls.isError.setValue(true);
     this.companyMst = new CompanyMaster( this.companyForm.value['companyName'], 
                            this.companyForm.value['phoneNumber'],
                            this.companyForm.value['faxNumber'],
                            this.companyForm.value['logo'],
                            this.companyForm.value['address'])
  }
}
