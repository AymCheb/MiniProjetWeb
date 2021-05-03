import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  constructor() { }
  url:string;

  ngOnInit(): void {
  }
  async Ajouter(){
    var nom = (<HTMLInputElement>document.getElementById("nom")).value
    var prix = (<HTMLInputElement>document.getElementById("prix")).value
    var descrip = (<HTMLInputElement>document.getElementById("descrip")).value
    var body = `{"nom":"${nom}", "prix":"${prix}", "descrip":"${descrip}", "img":"${this.url}" }`
    const rep = await fetch("http://localhost:8000/ajouter", {
      method:"POST",
      body: body
    })
    if (rep.ok){
      rep.json().then((data)=>{
        alert("Plat ajouté!")
      })
    }
  }
  onSelectfile(event:any){
    if (event.target.files && event.target.files[0]){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = async data => {
        this.url = data.target.result as string;
      }
    }
  }
}
