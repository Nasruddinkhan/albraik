
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyRegistrationService } from '../../service/company-registration.service';
import { CompanyMaster } from '../../modal/company-master';
import { ToasterMsgService } from '../../service/toaster-msg.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-company-forms',
  templateUrl: './company-forms.component.html'
})
export class CompanyFormsComponent implements OnInit {
  

  loading = false;
  comapnyObj :CompanyMaster;
  companyForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
               private toastService: ToasterMsgService,
              private compService: CompanyRegistrationService) { }
  submitted = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  companyId:string;
  userID : string;
  ngOnInit() {
    this.userID  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");

   this.onloadData();

    this.companyForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      faxNumber: [''],
      logo: [],
      address: ['', [Validators.required]]
    });
  }
  get f() { return this.companyForm.controls; }

  onSubmit() {
   
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('phoneNumber',  this.companyForm.value['phoneNumber']);
    formData.append('faxNumber',  this.companyForm.value['faxNumber']);
    formData.append('address', this.companyForm.value['address']);
    formData.append('name', this.companyForm.value['companyName']);

    console.log(formData);
    this.loading= true;
    this.compService.createCompany(formData,   this.userID).subscribe((res:CompanyMaster)=>{
      this.comapnyObj = res;
      sessionStorage.setItem('companyId', String(this.comapnyObj.id));
      this.loading= false;
      this.toastService.susessMessage('company created successfully')
      this.companyForm.reset();
      this.previewUrl = null;
    }, err=>{
      this.loading= false;
      this.toastService.errorMessage(err.error.message);

    });
    
  }
  onloadData() {
    this.loading = true;
    this.compService.getCompany(this.companyId).subscribe((res:CompanyMaster)=>{
    this.loading = false;
    this.comapnyObj = res;
    }, err=>{
      this.loading = false;
      console.log(err.error.message);
    });

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

