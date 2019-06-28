import {Component, ElementRef, Inject, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {Observable, Subscription, timer} from "rxjs";
import {NetworkService} from "../../../services/network.service";
import {TranslateService} from "@ngx-translate/core";
import {NbAuthOAuth2JWTToken, NbAuthService} from "@nebular/auth";
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";
import {initTranslateService} from "../../../shared.module";
import {Col} from "../../../Models/Col";
import {Tree} from "../../../Models/Tree";
import {DataContingency} from "../../../Models/DataContingency";
import {DatePipe} from '@angular/common'
import {Paginator, TreeTable} from "primeng/primeng";
import {NbSelectComponent} from "../../../@theme/components/select/select.component";
import {MenuItem} from 'primeng/api';
import {Parade} from "../../../Models/Parade";
import {PrioritizeRemedial} from "../../../Models/PrioritizeRemedial";
import {NetworkContingency} from "../../../Models/NetworkContingency";
import {NbDialogService} from "@nebular/theme";
import * as deepEqual from "deep-equal";
import {ConvergenceData} from "../../../Models/ConvergenceData";
import {Action} from "../../../Models/Action";

declare var require: any;

@Component({
  selector: 'app-contingencies',
  templateUrl: './contingencies.component.html',
  styleUrls: ['./contingencies.component.css'],
})
export class ContingenciesComponent implements OnInit, OnDestroy {
  @ViewChild('tp') treeTable: TreeTable;
  @ViewChild('pg') paginator: Paginator;
  @ViewChild('h') header: ElementRef;
  @ViewChild('dialog') private dialog: Type<string>;
  @ViewChild("f1") nbSelect: NbSelectComponent<string>;
  @ViewChild("f2") nbSelectDropDown: NbSelectComponent<string>;

  user: any;
  lastupdate: Date;
  ticks = 0;
  timer_: Observable<number>;
  isChanged: boolean = false;
  buttonEnabled: boolean = false;

  //for exclude contingencies/contraints
  _ExcludeChecked: boolean = true;
  lastExcludeChecked: boolean = true;
  nbExcludeChecked: boolean = true;

  //dropDown for timerange
  _selectedDropDown: string = "";
  lastSelectedDropDown: string = "";
  timeranges: any[] = [];
  contextList: any[] = [];

  zones: any[] = [];
  _selectedItem: string[] = [];
  lastSelectedItem: string[] = [];
  applyClicked: boolean = false;
  pageClicked: boolean = false;
  playTimerEnabled: boolean = false;
  pauseTimerEnabled: boolean = true;
  refreshClicked: boolean = false;
  bypassEventOnPagechange: boolean = false;
  frozenCols: Col[] = [];
  scrollableCols: any[] = [];
  load: boolean;
  files: Tree[] = [];
  contextsData: any[];
  preContingenciesData: any[];
  idSnapshot: string;
  page: string;
  size: string;
  rows: number;
  totalPagesNumber: number;
  limitsSubscription: Subscription;
  contingenciesData: any[];
  contingencySubscription: Subscription;
  tokenChangeSubscription: Subscription;
  zonesSubscription: Subscription;
  timerangeSubscription: Subscription;
  timerSubscription: Subscription;
  listTreePreContingency: Tree[] = [];
  display: boolean = false;
  list: any[] = [];
  totalContingencies: number;
  waiting: boolean = false;
  @Input() treeTableHeight: string = '100%';
  heightChangeValue: number = null;
  availableRemedials: any[] = [];
  iDContingency: string;
  startDate: any;
  items: MenuItem[];
  selectedNode: Tree;
  allRemedialsArray: any = [];
  priorizedRemedialsArray: any[] = [];
  contingenciesCount: number;
  showPaginator: boolean;
  voltageLevelsSet: Set<string>;
  url: string;
  dataConvergence: ConvergenceData;

  constructor(private networkService: NetworkService, public datepipe: DatePipe,
              private translate: TranslateService,
              private authService: NbAuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService,
              private dialogService: NbDialogService) {
    initTranslateService(this.translate, this.authService, this.storage);
  }


  ngOnInit() {
    this.page = "1";
    this.size = "50"
    this.tokenChangeSubscription = this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {

        if (token.isValid()) {
          this.user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigne it to our `user` variable

          /** get zones */
          this.zonesSubscription = this.networkService.getZones(this.user.user_name).subscribe(
            value => {
              this.zones = value;
              this.zones.sort((n1, n2) => {
                return this.naturalCompare(n1.name, n2.name)
              });
            }
          );

          /** get timerangeTypes */
          this.timerangeSubscription = this.networkService.getTimerangeTypes().subscribe(
            value => {
              this.timeranges = value;
              // this.timeranges.sort((n1, n2) => {
              //   return this.naturalCompare(n1.name, n2.name)
              // });
            }
          );
          if (this.storage.get(this.user.user_name + "_timerangeTypes") != null) {
            setTimeout(() => {
              this.nbSelectDropDown.setSelected = this.storage.get(this.user.user_name + "_timerangeTypes");
            }, 150);
            this.lastSelectedDropDown = this.storage.get(this.user.user_name + "_timerangeTypes");
            this._selectedDropDown = this.lastSelectedDropDown;
          }

          if (this.storage.get(this.user.user_name + "_zones") != null) {
            setTimeout(() => {
              this.nbSelect.setSelected = this.storage.get(this.user.user_name + "_zones");
              this.lastSelectedItem = this.storage.get(this.user.user_name + "_zones");
              this._selectedItem = this.lastSelectedItem;
            });
          }

          if (this.storage.get(this.user.user_name + "_exclude") != null) {
            setTimeout(() => {
              this.nbExcludeChecked = this.storage.get(this.user.user_name + "_exclude");
              this.lastExcludeChecked = this.storage.get(this.user.user_name + "_exclude");
              this._ExcludeChecked = this.lastExcludeChecked;
            });
          }

        }
      });

    /** init timer */
    this.timer_ = timer(0, 1000);
    this.timerSubscription = this.timer_.subscribe(() => {
      if (this.ticks != 0 && !this.playTimerEnabled) {
        this.ticks--;
      }
      if (!this.waiting && (this.ticks == 0 || this.applyClicked || this.refreshClicked || this.pageClicked)) {
        this.waiting = true;
        this.load = true;

        if (this.contingencySubscription) {
          this.contingencySubscription.unsubscribe();
        }

        //force refresh
        if (this.ticks == 0 && !this.refreshClicked) {
          this.refresh();
        }

        if (this.pageClicked) {
          let baseCases, contingencies: any[];
          this.contingencySubscription = this.networkService.getContingencies(this.idSnapshot, this.page, this.size, this._selectedItem, this._selectedDropDown, this._ExcludeChecked).subscribe(
            (val) => {
              contingencies = val.contingencies;
              this.contingenciesCount = val.contingencies.length;
              baseCases = val.preContingencyLimitViolations != null ? val.preContingencyLimitViolations : [];
              this.idSnapshot = val.uiSnapshot.id;
              setTimeout(() => {
                if (this.page == "1") {
                  this.createPreContingeciesNodes(baseCases, contingencies);
                }
                else {
                  this.createContingenciesNodes(contingencies);
                }
              }, 250)

              //set pageClicked false
              this.pageClicked = false;
            },
            (error) => {
              this.handleError(error);
              console.log('an error occurred! : ' + error);

            },
            () => {
              setTimeout(() => {
                this.load = false;
                this.waiting = false;
                this.nbSelect.setSelected = this._selectedItem;
                this.nbSelectDropDown.setSelected = this._selectedDropDown;
                this.nbExcludeChecked = this._ExcludeChecked
                if (this.heightChangeValue) this.forceResize(0);
              });
            }
          );
        } else {

          this.contingencySubscription = this.networkService.getContingencies(null, this.page, this.size, this._selectedItem, this._selectedDropDown, this._ExcludeChecked).subscribe(
            (data) => {
              this.totalPagesNumber = data.totalPages;
              this.totalContingencies = this.totalPagesNumber * Number(this.size);
              this.contextsData = data.networkContexts;
              this.preContingenciesData = data.preContingencyLimitViolations;
              this.rows = this.preContingenciesData.length;
              this.contingenciesData = data.contingencies;
              this.contingenciesCount = data.contingencies.length;
              this.showPaginator = this.contingenciesCount < Number(this.size) ? false : true
              this.idSnapshot = data.uiSnapshot.id;
              this.listTreePreContingency = [];
              this.frozenCols = [];
              this.scrollableCols = [];
              this.createcolumns();
              this.createPreContingeciesNodes(this.preContingenciesData, this.contingenciesData);
              this.getVoltageLevels(this.preContingenciesData);
              this.createContextList(this.contextsData);
              /** reset timer */
              this.isChanged = true;
              this.ticks = 300;
              this.lastupdate = new Date();

              //set applyClicked false
              this.applyClicked = false;

              //set refreshClicked false
              this.refreshClicked = false;

              setTimeout(() => {
                this.isChanged = false
              }, 1000);
            },
            (error) => {
              this.handleError(error);
              console.log('an error occurred! : ' + error);
            },
            () => {
              setTimeout(() => {
                this.load = false;
                this.waiting = false;
                this.nbSelect.setSelected = this._selectedItem;
                this.nbSelectDropDown.setSelected = this._selectedDropDown;
                this.nbExcludeChecked = this._ExcludeChecked
                if (this.heightChangeValue) this.forceResize(0);
              });
            }
          );
        }
      }
    });


  }

  /**
   * drag to convergence for N state
   * @param event
   * @param col
   */
  dragN(event, col: Col) {
    let args: string[];
    let actions: Action[] = [];
    let dragImage = document.createElement('img');
    dragImage.setAttribute('src', 'assets/images/convergence.png');
    event.dataTransfer.setDragImage(dragImage, 25, 25);
    args = this.splitUrl(col.header.networkDate, col.header.urlConvergence);
    let actionCreerEtude: Action = new Action('creerEtude', args);
    let actionCalculerEtatN: Action = new Action('calculerEtat', ["N"]);
    actions.push(actionCreerEtude);
    actions.push(actionCalculerEtatN);
    let arrayZommAction: string[] = [];
    for (let item of this.voltageLevelsSet) {
      let array: string[] = [];
      array.push(item);
      let actionAfficherPoste: Action = new Action('afficherPoste', array);
      actions.push(actionAfficherPoste);
      arrayZommAction.push(item);
    }
    let actionzoomerEtCentrerSurPostes: Action = new Action('zoomerEtCentrerSurPostes', arrayZommAction);
    actions.push(actionzoomerEtCentrerSurPostes);
    this.dataConvergence = new ConvergenceData(actions);
    event.dataTransfer.setData('text/plain', JSON.stringify(this.dataConvergence));

  }

  /**
   * drag to convergence for N_K state
   * @param event
   * @param col
   * @param type
   * @param contingency
   * @param contextId
   */
  dragNK(event, col: Col, contingency: any) {
    let dragImage = document.createElement('img');
    dragImage.setAttribute('src', 'assets/images/convergence.png');
    event.dataTransfer.setDragImage(dragImage, 25, 25);
    let args: string[];
    let actions: Action[] = [];

    args = this.splitUrl(col.header.networkDate, col.header.urlConvergence);
    let actionCreerEtude: Action = new Action('creerEtude', args);
    let actionCalculerEtatN: Action = new Action('calculerEtat', ["N"]);
    let actionCalculerEtatNK: Action = new Action('calculerEtat', ["N_K"]);
    actions.push(actionCreerEtude);
    actions.push(actionCalculerEtatN);

    let arrayZommAction: string[] = [];
    for (let m = 0; m < contingency.networkVoltageLevels.length; m++) {
      arrayZommAction.push(contingency.networkVoltageLevels[m].objectid);
    }
    for (let n = 0; n < contingency.networkContingencyElementList.length; n++) {
      let arr: string[] = [];
      arr.push(contingency.networkContingencyElementList[n].equipmentName.replace(/_([^_]*)$/, '/' + '$1'));
      arr.push("N_K");
      let declencherOuvrage: Action = new Action('declencherOuvrage', arr);
      actions.push(declencherOuvrage);
    }

    actions.push(actionCalculerEtatNK);
    let actionzoomerEtCentrerSurPostes: Action = new Action('zoomerEtCentrerSurPostes', arrayZommAction);
    actions.push(actionzoomerEtCentrerSurPostes);
    this.dataConvergence = new ConvergenceData(actions);
    event.dataTransfer.setData('text/plain', JSON.stringify(this.dataConvergence));

  }

  /**
   * add newtwork date dynamically to url
   * @param networkDate
   * @param url
   */
  splitUrl(networkDate: string, url: string): string[] {
    let list: string[] = [];
    let str1: string = url.split('/')[url.split('/').length - 1];
    let str3: string = url.substring(1, url.indexOf(str1) - 1);
    let str4: string = "'" + str1;

    const dateformat = require('dateformat');
    let date = this.datepipe.transform(networkDate, 'yyyy/MM/dd HH:mm');
    let myDate = new Date(date);
    dateformat.masks.hammerTime = str4;
    list.push("ETUDE_SECURITE");
    list.push(dateformat(myDate, "hammerTime"));
    list.push(str3);
    return list;
  }

  /**
   * get voltage levels for N state
   * @param data
   */
  getVoltageLevels(data: any) {
    this.voltageLevelsSet = new Set();
    const set = new Set();
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].limitViolations.length; j++) {
        if (data[i].limitViolations[j].limitViolation) {
          for (let k = 0; k < data[i].limitViolations[j].limitViolation.networkVoltageLevels.length; k++) {
            this.voltageLevelsSet.add(data[i].limitViolations[j].limitViolation.networkVoltageLevels[k].objectid);
          }
        }
      }
    }
  }

  /**
   * called in the end of the dragging
   * @param event
   */
  dragEnd(event) {
    this.url = null;
    this.dataConvergence = null;
  }

  //display popup to refresh data if the error status is 404 and the error code is 1
  private handleError(error: any) {
    if ('status' in error && error.status == 404) {
      if ('error' in error && 'code' in error.error && error.error.code == 1) {
        this.dialogService.open(this.dialog);
      }
    }
  }

  heightChange(event) {
    setTimeout(() => {
      if (this.heightChangeValue == null || parseInt(event) != this.heightChangeValue) {
        this.treeTableHeight = parseInt(event) - (this.header.nativeElement.offsetHeight * 1.68) + 'px';
        this.heightChangeValue = parseInt(event);
      }

      let scrolallableBodyElement = <HTMLElement> document.getElementsByClassName("ui-treetable-scrollable-body")[0]
      let element = <HTMLElement> document.getElementsByClassName("ui-treetable-scrollable-body")[1];
      if ((element.clientWidth == element.scrollWidth)) {
        scrolallableBodyElement.style.minHeight = this.treeTableHeight;
      }
      else {
        scrolallableBodyElement.style.minHeight = null;
      }
    });
  }

  forceResize(timeout) {
    setTimeout(() => {
      window.dispatchEvent(new Event('force_resize'));
    }, timeout);
  }

  naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      ax.push([$1 || Infinity, $2 || ""])
    });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
      bx.push([$1 || Infinity, $2 || ""])
    });

    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }

    return ax.length - bx.length;
  }

  createcolumns() {
    let col: Col;
    let firstCol = new Col("contingencies", null, "name");
    this.frozenCols.push(firstCol);
    let networkDate: Date;
    let computationDate: Date;
    for (let k = 0; k < this.contextsData.length; k++) {
      networkDate = this.contextsData[k].networkDate;
      computationDate = this.contextsData[k].computationDate;

      col = new Col({
          afsRunnerId: this.contextsData[k].computationResultList[0].idAfsRunner,
          isComputationWithRemedials: this.contextsData[k].computationResultList.length > 0 ? this.contextsData[k].computationResultList[0].computationWithRemedials : true,
          idContext: this.contextsData[k].id,
          urlConvergence: this.contextsData[k].caseType.pathInConvergence,
          text: this.contextsData[k].networkDate,
          networkDate: networkDate,
          computationDate: this.datepipe.transform(computationDate, 'dd-MMM-yyyy HH:mm'),
        }, this.contextsData[k].caseType.name, "limitValues",
      );
      this.scrollableCols.push(col)
    }
  }

  createPreContingeciesNodes(dataBaseCases: any[], dataContengencies: any[]) {
    let dataPreContingency: DataContingency, dataPostContingency: DataContingency;
    let treePreContingency: Tree, treePostContingency: Tree;
    let listTreePostContingency: Tree[] = [];
    for (let k = 0; k < dataBaseCases.length; k++) {
      dataPreContingency = new
      DataContingency(dataBaseCases[k].identifier.subjectId, dataBaseCases[k].identifier, dataBaseCases[k].limitViolations, 0, null, null, null, null);
      treePreContingency = new Tree(dataPreContingency, true, null);
      listTreePostContingency.push(treePreContingency);
    }
    for (let j = 0; j < dataContengencies.length; j++) {
      dataPostContingency = new
      DataContingency(dataContengencies[j].contingency, null, dataContengencies[j].violationStatus, 1, dataContengencies[j].contingency.id, dataContengencies[j].candidateRemedialsCount, dataContengencies[j].computedRemedialsCount, dataContengencies[j].efficientRemedialsCount);
      treePostContingency = new Tree(dataPostContingency, false, null);
      listTreePostContingency.push(treePostContingency)
    }

    this.files = listTreePostContingency

  }

  createContingenciesNodes(data: any[]) {
    let dataPostContingency: DataContingency;
    let treePostContingency: Tree;
    let listTreePostContingency: Tree[] = [];
    let dataLastContingency: DataContingency;
    let treeLastContingency: Tree;
    let listLastRow: any[] = []
    for (let j = 0; j < data.length; j++) {
      dataPostContingency = new
      DataContingency(data[j].contingency, null, data[j].violationStatus, 1, data[j].contingency.id, data[j].candidateRemedialsCount, data[j].computedRemedialsCount, data[j].efficientRemedialsCount);
      treePostContingency = new Tree(dataPostContingency, false, null);
      listTreePostContingency.push(treePostContingency)
    }
    this.files = listTreePostContingency;
  }

  paginate(event) {
    if (this.bypassEventOnPagechange) {
      this.bypassEventOnPagechange = false;
      return;
    }

    this.load = true;

    if (this.size != event.rows) {
      this.page = "1";
      this.size = event.rows;
    } else {
      this.page = event.page + 1;
    }

    this.pageClicked = true;
  }


  onNodeExpand(event) {
    if (event.node.children && event.node.parent) {
      setTimeout(() => {
        this.setFiles([...this.files]);
      }, 250)
      return;
    }
    let result: any;
    let listTreeValue: Tree[] = [];
    let dataChildrenValue: DataContingency;
    let dataValue: DataContingency;
    let treeChildrenValue: Tree;
    let treeValue: Tree;
    let remedialsResults: Map<string, any>;
    let extarctRemedialChar: string;
    if (this.limitsSubscription) {
      this.limitsSubscription.unsubscribe();
    }

    this.limitsSubscription = this.networkService.getLimitViolations(this.idSnapshot, event.node.data.name.id, this.contextList, this._ExcludeChecked).subscribe(
      (value) => {
        result = value;
        for (let i = 0; i < result.violations.length; i++) {
          dataValue = new
          DataContingency(result.violations[i].identifier.subjectId, result.violations[i].identifier, result.violations[i].limitViolations, 0, event.node.data.name.id, null, null, null);
          treeValue = new Tree(dataValue, null, null);
          listTreeValue.push(treeValue);
        }

        remedialsResults = new Map(Object.entries(result.remedialsResults));

        remedialsResults.forEach((remedialResult, remedial) => {

          let limitViolationIdentifiers = remedialResult.violations;
          let statusValues = remedialResult.status;

          if (remedial.length > 50) {
            extarctRemedialChar = remedial.slice(0, 23) + " ... " + remedial.slice(remedial.length - 23, remedial.length);
          }
          else {
            extarctRemedialChar = remedial;
          }
          dataValue = new DataContingency(extarctRemedialChar, null, statusValues, 2, remedial, 0, 0, 0);
          treeValue = new Tree(dataValue, limitViolationIdentifiers.length == 0, []);

          for (let i = 0; i < limitViolationIdentifiers.length; i++) {
            dataChildrenValue = new DataContingency(limitViolationIdentifiers[i].identifier.subjectId, limitViolationIdentifiers[i].identifier, limitViolationIdentifiers[i].limitViolations, 0, remedial, 0, 0, 0);
            treeChildrenValue = new Tree(dataChildrenValue, true, null);
            treeValue.children.push(treeChildrenValue);
          }

          listTreeValue.push(treeValue)
        })

        setTimeout(() => {
          const node = event.node;
          node.children = listTreeValue;
          this.setFiles([...this.files]);
        }, 250)
      },

      (error) => {
        this.handleError(error);
        console.log('an error occurred! : ' + error);
      },
    );

  }

  setFiles(files: Tree[]) {
    this.files = files;
  }

  savePriorizedRemedial() {
    let listRemedialPriorized: any[] = [];
    let prioritizeRemedial: PrioritizeRemedial;
    for (let s = 0; s < this.priorizedRemedialsArray.length; s++) {
      prioritizeRemedial = new PrioritizeRemedial(this.priorizedRemedialsArray[s])
      listRemedialPriorized.push(prioritizeRemedial)
    }
    let prioritizes: Parade [] = [];
    let prioritize: Parade;
    prioritize = new Parade(new NetworkContingency(this.iDContingency), this.startDate, null, listRemedialPriorized);
    prioritizes.push(prioritize);
    this.networkService.saveParade(prioritizes).subscribe(
      value => {
      },
      (error) => {
        console.log('an error occurred! : ' + error);
      },
      () => {
        this.display = false;
      }
    );
  }

  cancel() {
    this.display = false;
  }

  onRightClickN(idAfsRunner: string) {
    let refresh: string;
    this.translate.get('refresh_remedials').subscribe(
      value => {
        refresh = value;
      });

    this.items = [
      {label: refresh, icon: 'pi pi-search', command: (event) => this.refreshRemedials(idAfsRunner)}
    ];

  }

  refreshRemedials(idAfsRunner: string) {
    this.networkService.refreshRemedials(idAfsRunner).subscribe(
      value => {
      },
      (error) => {
        console.log('an error occurred! : ' + error);
      },
      () => {
        this.load = true;
        this.refresh();
      }
    );
  }

  onRightClick(IdContext: string, contingency: string, networkDate: string, rownode) {
    this.startDate = networkDate;
    this.iDContingency = contingency;
    this.priorizedRemedialsArray = [];
    this.items = [
      {label: 'Prioriser', icon: 'pi pi-search', command: (event) => this.openDialog()},
      {label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggleFile(this.selectedNode)}

    ];

    this.networkService.getRemedials(IdContext, contingency, networkDate).subscribe(
      (dataRemedials) => {
        this.allRemedialsArray = dataRemedials.allRemedials;
        for (let m = 0; m < dataRemedials.prioritizedRemedials.length; m++) {
          for (let n = 0; n < dataRemedials.prioritizedRemedials[m].prioritizeRemedialList.length; n++) {
            this.priorizedRemedialsArray.push(dataRemedials.prioritizedRemedials[m].prioritizeRemedialList[n].remedial)
          }
        }
        let onlyInA = this.allRemedialsArray.filter(this.comparer(this.priorizedRemedialsArray));
        let onlyInB = this.priorizedRemedialsArray.filter(this.comparer(this.allRemedialsArray));
        this.availableRemedials = onlyInA.concat(onlyInB);
      },
      (error) => {
        console.log('an error occurred! : ' + error);
      },
    );
  }

  comparer(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other.idRemedialRepository == current.idRemedialRepository && other.shortDescription == current.shortDescription
      }).length == 0;
    }
  }

  openDialog() {
    this.display = true;
  }

  toggleFile(node) {
    node.expanded = !node.expanded;
  }

  reset() {
    this.treeTable.reset();
  }

  ngOnDestroy() {
    if (this.limitsSubscription) {
      this.limitsSubscription.unsubscribe();
    }

    if (this.contingencySubscription) {
      this.contingencySubscription.unsubscribe();
    }

    if (this.tokenChangeSubscription) {
      this.tokenChangeSubscription.unsubscribe();
    }

    if (this.zonesSubscription) {
      this.zonesSubscription.unsubscribe();
    }

    if (this.timerangeSubscription) {
      this.timerangeSubscription.unsubscribe();
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

  }

  @Input()
  set selectedItem(selectedItem: string[]) {
    selectedItem.sort();
    this.buttonEnabled = !deepEqual(this._ExcludeChecked, this.lastExcludeChecked) || !deepEqual(this._selectedDropDown, this.lastSelectedDropDown) || !deepEqual(selectedItem, this.lastSelectedItem);
    this.setstatus(selectedItem, this._selectedDropDown, this._ExcludeChecked)
  }

  @Input()
  set selectedDropDown(selectedItem: string) {
    this.buttonEnabled = !deepEqual(this._ExcludeChecked, this.lastExcludeChecked) || !deepEqual(selectedItem, this.lastSelectedDropDown) || !deepEqual(this._selectedItem, this.lastSelectedItem);
    this.setstatus(this._selectedItem, selectedItem, this._ExcludeChecked)
  }

  toggle() {
    this.buttonEnabled = !deepEqual(!this._ExcludeChecked, this.lastExcludeChecked) || !deepEqual(this._selectedDropDown, this.lastSelectedDropDown) || !deepEqual(this._selectedItem, this.lastSelectedItem);
    this.setstatus(this._selectedItem, this._selectedDropDown, !this._ExcludeChecked)
  }

  setstatus(selectedItem: string[], selectedItemDown: string, excludeChecked: boolean) {
    this._selectedItem = selectedItem;
    this.nbSelect.setSelected = this._selectedItem;
    this._selectedDropDown = selectedItemDown;
    this.nbSelectDropDown.setSelected = this._selectedDropDown;
    this._ExcludeChecked = excludeChecked
    this.nbExcludeChecked = this._ExcludeChecked
  }

  createContextList(contexts: any[]) {
    this.contextList.length = 0;
    contexts.forEach(value => {
      this.contextList.push(value.id)
    })
  }

  onClickApply() {
    this.lastSelectedDropDown = this._selectedDropDown;
    this.lastSelectedItem = this._selectedItem;
    this.lastExcludeChecked = this._ExcludeChecked;
    this.applyClicked = true;
    this.buttonEnabled = false;
    this.page = "1";

    //paginator change to first page
    this.bypassEventOnPagechange = true;
    this.paginator.changePage(0);

    //storage zones
    this.storage.set(this.user.user_name + "_zones", this._selectedItem);

    //storage timerangeTypes
    this.storage.set(this.user.user_name + "_timerangeTypes", this._selectedDropDown);

    this.storage.set(this.user.user_name + "_exclude", this._ExcludeChecked);
  }

  pauseTimer() {
    if (this.pauseTimerEnabled) {
      this.pauseTimerEnabled = false;
      this.playTimerEnabled = true;
    }
  }

  playTimer() {
    if (this.playTimerEnabled) {
      this.playTimerEnabled = false;
      this.pauseTimerEnabled = true;
    }
  }

  refresh() {
    if (!this.refreshClicked) {
      this.idSnapshot = null;
      this.page = "1";

      //paginator change to first page
      this.bypassEventOnPagechange = true;
      this.paginator.changePage(0);

      this.refreshClicked = true;
    }
  }

  closeDialogAndRefresh(ref) {
    ref.close();
    this.refresh();
  }
}

