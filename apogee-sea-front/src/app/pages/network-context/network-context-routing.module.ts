import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NetworkContextComponent} from "./network-context.component";
import {ListNetworkContextComponent} from "./list/list-network-context.component";
import {ContingenciesComponent} from "./contingencies/contingencies.component";
import {NetworkBaseVoltagesComponent} from "./base-voltages/network-base-voltages.component";

const routes: Routes = [{
  path: '',
  component: NetworkContextComponent,
  children: [{
    path: 'list',
    component: ListNetworkContextComponent,
  }, {
    path: 'contingencies',
    component: ContingenciesComponent,
  }, {
    path: 'base-voltages',
    component: NetworkBaseVoltagesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkContextRoutingModule {
}

export const routedComponents = [
  NetworkContextComponent,
  ListNetworkContextComponent,
  ContingenciesComponent,
  NetworkBaseVoltagesComponent,
];
