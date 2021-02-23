import { NgModule } from '@angular/core';
import { CompleteFilterPipe } from './complete-filter.pipe';


@NgModule({
  declarations: [CompleteFilterPipe],
  exports: [CompleteFilterPipe]
})
export class PipesModule { }
