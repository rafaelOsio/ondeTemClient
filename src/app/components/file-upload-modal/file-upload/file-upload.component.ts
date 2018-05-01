import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ng2-materialize';

import { FileUploader } from 'ng2-file-upload'; //uninstall
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild("modalFileUpload") modalUpload: MzModalComponent;

  data: any;
  cropperSettings: CropperSettings;

  constructor() { 
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 300;
    this.cropperSettings.height = 300;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 300;
    this.cropperSettings.canvasHeight = 200;

    this.data = {};
  }

  ngOnInit() {
  }

  open() {
    this.modalUpload.open();
  }

  teste() {
    console.log(this.data.image)
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        this.data.image = image.src;
        console.log(this.data.image);
    }.bind(this);

    myReader.readAsDataURL(file);
}

}
