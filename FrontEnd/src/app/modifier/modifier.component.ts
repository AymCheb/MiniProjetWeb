import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface popup{
  nom:string;
  prix:number;
  descrip:string;
  img:Blob;
}

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: popup) {}
  url:string;

  ngOnInit(): void {
  }
  onSelectfile(event:any){
    console.log("here");
    if (event.target.files && event.target.files[0]){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = async data => {
        this.url = data.target.result as string;
      }
    }
  }
}
