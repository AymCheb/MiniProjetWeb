import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { updateLanguageServiceSourceFile } from 'typescript';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent implements OnInit {

  constructor(public dialog:MatDialog) {}
  menu:any;
  item:any;


  async ngOnInit() {
    const rep = await fetch("http://localhost:8000/produits")
    if (rep.ok){
      rep.json().then(data =>{
        this.menu = data;
      })
    }
  }
  async Modifier(id){
    const rep = await fetch(`http://localhost:8000/produits/${parseInt(id.innerHTML)}`)
    if (rep.ok){
      rep.json().then(item => {
        let dialogRef = this.dialog.open(ModifierComponent , {
          width: '350px',
          data: {nom:item["nom"], prix:item["prix"], descrip:item["descrip"], img:item["img"]}
        })
        dialogRef.afterClosed()
        .subscribe(result => {
          if (result)
          {
            let data = {id:parseInt(id.innerHTML), nom:result["nom"], prix:result["prix"], descrip:result["descrip"], img:result["img"]}
            this.updateElement(data)
          }
        });  
      
      })
    }
  }
  async updateElement(data){
    var body = `{"id":"${data.id}", "nom":"${data.nom}", "prix":"${data.prix}", "descrip":"${data.descrip}", "img":"${data.img}" }`
    const rep = await fetch(`http://localhost:8000/modifier`, {
      method:"PUT",
      body: body
    })
    if (rep.ok){
      rep.json().then((data)=>{
          this.getProducts()
      })
    }


    
  }
  async Supprimer(id){
    const rep = await fetch(`http://localhost:8000/supprimer/${parseInt(id.innerHTML)}`, {
      method:"DELETE"
    })
    if (rep.ok){
      rep.json().then((data)=>{
          this.getProducts()
      })
    }
  }
  async getProducts(){
    const rep = await fetch("http://localhost:8000/produits")
    if (rep.ok){
      rep.json().then(data => {
        this.menu = data})
    }
  } 
}
