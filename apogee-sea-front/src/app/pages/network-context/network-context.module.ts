import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {NetworkContextRoutingModule, routedComponents} from './network-context-routing.module';
import {NetworkService} from "../../services/network.service";
import {ContingenciesPipe} from "./contingencies/contingencies.pipe";
import {NbAccordionModule, NbButtonModule, NbCheckboxModule, NbSpinnerModule} from "@nebular/theme";

import {AccordionModule, TreeTableModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {TreeModule} from 'primeng/tree';
import {NbSelectModule} from "../../@theme/components/select/select.module";
import {SharedModule} from "../../shared.module";
import {SidebarModule} from 'primeng/sidebar';
import {PaginatorModule} from 'primeng/paginator';
import { DatePipe } from '@angular/common'
import {DialogModule} from 'primeng/dialog';
import {PickListModule} from 'primeng/picklist';
import {FillHeightModule} from "../directives/fill-height.module";
import {ContextMenuModule} from 'primeng/contextmenu';
@NgModule({
  imports: [
    ThemeModule,
    NetworkContextRoutingModule,
    NbSpinnerModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    TreeModule,
    NbSelectModule,
    NbAccordionModule,
    SharedModule,
    TreeTableModule,
    SidebarModule,
    PaginatorModule,
    DialogModule,
    PickListModule,
    FillHeightModule,
    ContextMenuModule,
    NbButtonModule,
    NbCheckboxModule

  ],
  declarations: [
    ...routedComponents,
    ContingenciesPipe,
  ],
  providers: [
    NetworkService, DatePipe,
  ],
})
export class NetworkContextModule {
}
