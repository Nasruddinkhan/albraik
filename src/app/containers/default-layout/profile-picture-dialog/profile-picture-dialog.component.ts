import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { DefaultLayoutComponent } from '..';
import { ProfilePictureService } from '../../../views/service/attachment/profile-picture.service';
import { SnackbarService } from '../../../views/service/snackbar.service';
import { UserService } from '../../../views/service/user.service';

@Component({
  selector: 'app-profile-picture-dialog',
  templateUrl: './profile-picture-dialog.component.html',
  styleUrls: ['./profile-picture-dialog.component.css']
})
export class ProfilePictureDialogComponent implements OnInit {
  profilePictureUrl;
  imageFile: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  profilePictureEnabled = true;
  imageCropperEnabled = false;
  submitAllowed = false;

  constructor(public dialog: MatDialogRef<DefaultLayoutComponent>,
              private profilePictureService: ProfilePictureService,
              private userService: UserService,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.profilePictureUrl = sessionStorage.getItem('profilePicture');
    if (this.profilePictureUrl === 'null') {
      this.profilePictureUrl = '..\\..\\..\\assets\\img\\brand\\Logo.png';
    }
  }

  fileChangeEvent(event: any) {
    this.submitAllowed = false;
    this.imageCropperEnabled = true;
    this.profilePictureEnabled = false;
    this.imageChangedEvent = event;
    // this.imageFile = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.profilePictureUrl = event.base64;
    // console.log(event);
    // console.log(window.atob(this.profilePictureUrl));
    // let croppedImage = event.base64;
    // let blob = base64ToFile(croppedImage);
    // this.profilePictureUrl = blob;
    // this.profilePictureUrl.lastModifiedDate = new Date();
    // this.profilePictureUrl.name = "profile-image-temp.png";
    // this.profilePictureUrl = new File([blob], "profile-picture-temp.png", { type: blob.type });
    // console.log(this.profilePictureUrl);
  }

  dataURItoBlob(dataURI, fileType) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: fileType });    
    return blob;
  }

  cropImage() {
    this.submitAllowed = true;
    this.profilePictureEnabled = true;
    this.imageCropperEnabled = false;
    let block = this.profilePictureUrl.split(",");
    let imageType = block[0].split(";")[0].split(":")[1];
    let realData = block[1];
    let imageBlob = this.dataURItoBlob(realData, imageType);
    this.imageFile = new File([imageBlob], 'profile-picture', { type: imageType });
  }

  loadImageFailed() {
    this.snackbarService.failure(".Image loading failed, please try again");
  }

  onSubmit() {
    this.dialog.close(this.imageFile);
  }

}
