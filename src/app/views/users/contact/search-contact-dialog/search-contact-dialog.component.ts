import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactType } from '../../../modal/contact-type';
import { ContactSearchService } from '../../../service/contact.service';
import { DialogSubmissionService } from '../../../service/dialog-submission.service';

@Component({
  selector: 'app-search-contact-dialog',
  templateUrl: './search-contact-dialog.component.html',
  styleUrls: ['./search-contact-dialog.component.css']
})
export class SearchContactDialogComponent implements OnInit {
  contactSearchForm: FormGroup;
  contactTypeList: ContactType[];
  closeDisabled = true;

  constructor(private fb: FormBuilder,
              private contactService: ContactSearchService,
              private dialogSubmissionService: DialogSubmissionService) { }

  ngOnInit(): void {
    this.dialogSubmissionService.setDialogSubmitted(false);
    this.contactService.getContactTypeList().subscribe((res: ContactType[]) => {
      this.contactTypeList = res;
    });
    this.contactSearchForm = this.fb.group({
      searchName: [''],
      contactTypeId: ['']
    });
  }

  get searchName() {
    return this.contactSearchForm.get('searchName');
  }

  get contactTypeId() {
    return this.contactSearchForm.get('contactTypeId');
  }

  handleSearchButton() {
    if (this.searchName.value || this.contactTypeId.value) {
      this.closeDisabled = false;
    } else {
      this.closeDisabled = true;
    }
  }

  search() {
    this.dialogSubmissionService.setData(this.contactSearchForm.value);
    this.dialogSubmissionService.setDialogSubmitted(true);
  }

}
