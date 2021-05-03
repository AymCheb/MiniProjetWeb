import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './ajouter/ajouter.component';
import { AffichageComponent } from './affichage/affichage.component';
import { ModifierComponent } from './modifier/modifier.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  { path: 'ajouter', component: AjouterComponent },
  { path: 'modifier', component: ModifierComponent },
  { path: 'menu', component: AffichageComponent },
  { path: '', component: AccueilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }