import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {NetworkService} from '../../../services/network.service';
import {TranslateService} from "@ngx-translate/core";
import {NbAuthService} from "@nebular/auth";
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";
import {initTranslateService} from "../../../shared.module";
import {DatePipe} from '@angular/common'
import {Context} from "../../../Models/Context";

@Component({
  selector: 'apogee-list-network-context',
  templateUrl: './list-network-context.component.html',
  styleUrls: ['./list-network-context.component.css']
})
export class ListNetworkContextComponent implements OnInit {
  constructor(private networkService: NetworkService, public datepipe: DatePipe,
              private translate: TranslateService,
              private authService: NbAuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
    initTranslateService(this.translate, this.authService, this.storage);
  }

  loading = false;
  cols: any[];
  contexts = [];
  sortOrder = -1;
  cpt = 0;
  @Input() tableHeight: string = '100%';

  ngOnInit() {
    initTranslateService(this.translate, this.authService, this.storage);
    this.getNetworkContext();
    /**
     * Array of table columns
     */
    this.cols = [
      {field: 'caseType', header: 'CaseType'},
      {field: 'caseCategory', header: 'CaseCategory'},
      {field: 'computationDate', header: 'ComputationDate'},
      {field: 'networkDate', header: 'NetworkDate'},
      {field: 'insertionDate', header: 'InsertionDate'},
      {field: 'execStatus', header: 'Status'},
      {field: 'computationResultList', header: 'ComputationResultList'}
    ];
  }

  toggleLoading() {
    if (!this.loading) {
      this.loading = true;
      this.getNetworkContext();
    }
  }

  heightChange(event) {
    setTimeout(() => {
      this.tableHeight = parseInt(event) + 'px';
    });
  }


  /**
   * Get network contexts array from service and create data Source for table
   */
  getNetworkContext() {
    let col: Context;
    let list: Context[] = [];
    this.networkService.getAllNetworkContexts().subscribe(
      (dataNetworkContextList) => {
        for (let k = 0; k < dataNetworkContextList.length; k++) {
          let dateComputation: string = this.datepipe.transform(dataNetworkContextList[k].computationDate, 'yyyy-MM-dd HH:mm');
          let dateNetwork: string = this.datepipe.transform(dataNetworkContextList[k].networkDate, 'yyyy-MM-dd HH:mm');
          let dateInsertion: string = this.datepipe.transform(dataNetworkContextList[k].insertionDate, 'yyyy-MM-dd HH:mm');

          if (dataNetworkContextList[k].computationResultList.length > 0) {
            col = new Context(dataNetworkContextList[k].caseType.name, dataNetworkContextList[k].caseType.caseCategory.name, dateComputation, dateNetwork, dateInsertion, dataNetworkContextList[k].computationResultList[0].execStatus, dataNetworkContextList[k].computationResultList);
            list.push(col);
          }

          else {
            col = new Context(dataNetworkContextList[k].caseType.name, dataNetworkContextList[k].caseType.caseCategory.name, dateComputation, dateNetwork, dateInsertion, "", []);
            list.push(col);

          }
        }
        this.contexts = list;

        setTimeout(() => {
          window.dispatchEvent(new Event('force_resize'));
        }, 500);

        this.loading = false
      },
      (error) => {
        this.loading = false;
        console.log('an error occurred! : ' + error);
      }
    );
  }

  updateSortOrder() {
    this.sortOrder = 0;
    this.cpt = 0;
  }

  setSortOrder() {
    this.cpt = this.cpt + 1;
    if (this.cpt % 2 == 1) {
      this.sortOrder = 1
    }
    else {
      this.sortOrder = -1
    }

  }
}
