import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { ListItem } from 'src/app/models/list-item.model';
import { List } from 'src/app/models/list.model';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  itemName = '';

  constructor( private wishService: WishService, private activatedRoute: ActivatedRoute, private alertCtrl: AlertController) { 
    // const listId = this.activatedRoute.params.subscribe( param => param['listId'])
    // Otra manera
    const listId = this.activatedRoute.snapshot.paramMap.get('listId');
    
    this.list = this.wishService.getList(listId);
  }

  ngOnInit() {
  }

  addItem() {
    if(!this.itemName){
      return;
    }
    const newItem = new ListItem( this.itemName );
    this.list.items.push( newItem );

    this.itemName = '';
    this.wishService.saveStorage();
  }

  changeCheckbox(item: ListItem ){
    
    const pending = this.list.items.filter( itemData => !itemData.complete ).length;

    if ( pending === 0 ) {
      this.list.finishedAt = new Date();
      this.list.complete = true;
    }else{
      this.list.finishedAt = null;
      this.list.complete = false;
    }

    this.wishService.saveStorage();

  }

  async delete( i:number, desc:string ){
    await this.list.items.splice( i, 1 );
    await this.wishService.saveStorage();

    this.deletedItem(desc);

  }

  async sureDelete( i:number, desc:string, slidingItem:IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Borrado de ítem',
      message: `¿Está seguro de borrar el ítem <strong>${ desc }</strong> de la lista?`,
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
            this.delete(i, desc);
          }
        }
      ]
    });

    await alert.present();
  }

  async deletedItem(desc: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Borrado exitoso!',
      message: `El ítem <strong>${ desc }</strong> fue borrado con éxito`,
      buttons: [
        {
          text: 'De acuerdo'
        }
      ]
    });

    await alert.present();
  }

  async editItem(item:ListItem, slidingItem:IonItemSliding){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar Ítem',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre del ítem',
          value: item.desc
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

            item.desc = data.titulo;
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
      message: `El ítem ha sido editado exitosamente`,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });

    await alert.present();
  }

}
