import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonItemSliding, IonList } from "@ionic/angular";
import { List } from "src/app/models/list.model";
import { WishService } from "src/app/services/wish.service";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.scss"],
})
export class ListsComponent {
  @Input() terminated = true;

  constructor(
    public wishService: WishService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  selectedList(list: List) {
    if(this.terminated){
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  async sureDelete( list:List, slidingItem: IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Borrado de ítem',
      message: `¿Está seguro de borrar la lista <strong>${ list.title }</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            slidingItem.close();
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.deleteList(list);
          }
        }
      ]
    });
    alert.present();
  }

  async deleteList( list: List){
    const title = list.title;
    await this.wishService.deleteList(list);
    this.successDelete(title);
  }

  async editList(list:List, slidingItem:IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: list.title
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if(data.titulo.length === 0){
              return;
            }

            list.title = data.titulo;
            this.wishService.saveStorage();
            this.successEdit();
            slidingItem.close();
          }
        }
      ]
    });

    alert.present();
  }

  async successEdit() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Edición Exitosa!',
      message: `La lista ha sido editada exitosamente`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }

  async successDelete(title:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Eliminación Exitosa!',
      message: `La lista <strong>${title}</strong> ha sido eliminada exitosamente`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }
}
