import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-imgupload',
  templateUrl: './imgupload.component.html',
  styleUrls: ['./imgupload.component.scss']
})
export class ImguploadComponent implements OnInit {

  selectedFile: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const filedata = new FormData();
    filedata.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('', filedata)
    .subscribe(res=>{
      console.log(res);
    })
  }
}
