import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyMaster } from '../../../modal/company-master';
import { CompanyRegistrationService } from '../../../service/company-registration.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-add-company-dialog',
  templateUrl: './add-company-dialog.component.html',
  styleUrls: ['./add-company-dialog.component.css']
})
export class AddCompanyDialogComponent implements OnInit {
  userId: string;
  companyId: string;
  companyForm: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  
  constructor(private fb: FormBuilder,
              private compService: CompanyRegistrationService,
              private snackbarService: SnackbarService,
              private dialogSubmissionService: DialogSubmissionService) { }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.userId  = sessionStorage.getItem("userId");
    this.companyId =  sessionStorage.getItem("companyId");
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      faxNumber: [''],
      logo: [],
      address: ['', [Validators.required]]
    });
  }

  get companyName() {
    return this.companyForm.get('companyName');
  }

  get phoneNumber() {
    return this.companyForm.get('phoneNumber');
  }

  get faxNumber() {
    return this.companyForm.get('faxNumber');
  }

  get address() {
    return this.companyForm.get('address');
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

  onSubmit() {
    if (this.companyForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileData);
    formData.append('phoneNumber',  this.phoneNumber.value);
    formData.append('faxNumber',  this.faxNumber.value);
    formData.append('address', this.address.value);
    formData.append('name', this.companyName.value);

    // console.log(formData);
    this.compService.createCompany(formData, this.userId).subscribe((res:CompanyMaster)=>{
      this.dialogSubmissionService.setDialogSubmitted(true);
      this.previewUrl = null;
      this.snackbarService.success('.company created successfully');
    }, err=>{
      this.snackbarService.failure(err.error.message);
    });
  }

}
