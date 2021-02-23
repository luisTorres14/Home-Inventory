import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { List } from 'src/app/models/list.model';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public wishService:WishService,
              private router:Router,
              private alertCtrl: AlertController) {
  }

  async addList(){
    

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }

            const listId = this.wishService.createList(data.titulo)

            this.router.navigateByUrl(`/tabs/tab1/add/${ listId }`);

          }
        }
      ]
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      // buttons: ['OK']
    });

    alert.present();
  }
}
