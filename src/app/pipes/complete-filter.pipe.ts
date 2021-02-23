import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list.model';

@Pipe({
  name: 'completeFilter',
  pure: false
})
export class CompleteFilterPipe implements PipeTransform {

  transform(lists: List[], completed: boolean = true): List[] {
    return lists.filter(listData => listData.complete === completed)
  }

}
