import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  lists: List[] = [];

  constructor() {
    this.loadStorage();
   }

   createList(title: string ){
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();

    return newList.id;
   }

   deleteList( list:List){
    this.lists = this.lists.filter(listData => listData.id !== list.id);
    this.saveStorage();
   }

   getList( id: string | number ){
    id = +id;
    return this.lists.find( listData => listData.id === id );
   }

  //  Cuando hago un refresh
   saveStorage(){
     localStorage.setItem('data', JSON.stringify(this.lists));
   }

  //  Cuando aplicación carga por primera vez
   loadStorage(){
     if( localStorage.getItem('data')){
       this.lists = JSON.parse(localStorage.getItem('data'));
     }else {
       this.lists = [];
     }
   }
}
