
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyMaster } from '../../modal/company-master';
import { CompanyRegistrationService } from '../../service/company-registration.service';
@Component({
  selector: 'app-company-forms',
  templateUrl: './company-forms.component.html'
})
export class CompanyFormsComponent implements OnInit {
  companyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private compService: CompanyRegistrationService) { }
  companyMst: CompanyMaster;
  submitted = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      faxNumber: [''],
      logo: [],
      address: ['', [Validators.required]],
      isError: [false]
    });
  }
  get f() { return this.companyForm.controls; }

  onSubmit() {
    console.log('onSubmitCompanyData');
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    this.companyForm.controls.isError.setValue(true);
    this.companyMst = new CompanyMaster(this.companyForm.value['companyName'],
      this.companyForm.value['phoneNumber'],
      this.companyForm.value['faxNumber'],
      this.companyForm.value['address']);
    console.log(JSON.stringify(this.companyMst));
    console.log(this.fileData);
    const formData = new FormData();
    formData.append('file', this.fileData);
    console.log(formData);
    this.compService.createCompany(formData);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }
}

