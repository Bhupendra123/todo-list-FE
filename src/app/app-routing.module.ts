import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { EntityComponent } from './components/entity/entity.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'entity/:id', component: EntityComponent },
  { path: 'entity', component: EntityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
