import { NgModule } from '@angular/core';
import {NbSelectComponent, NbSelectLabelComponent} from "./select.component";
import {NbOptionComponent} from "./option.component";
import {NbOptionGroupComponent} from "./option-group.component";
import {NbSharedModule} from "@nebular/theme/components/shared/shared.module";
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbOverlayModule} from "@nebular/theme";




const NB_SELECT_COMPONENTS = [
  NbSelectComponent,
  NbOptionComponent,
  NbOptionGroupComponent,
  NbSelectLabelComponent,
];

@NgModule({
  imports: [NbSharedModule, NbOverlayModule, NbButtonModule, NbInputModule, NbCardModule, NbCheckboxModule],
  exports: [...NB_SELECT_COMPONENTS],
  declarations: [...NB_SELECT_COMPONENTS],
})
export class NbSelectModule {
}
