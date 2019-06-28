import {Component, Inject, OnInit} from '@angular/core';
import {NetworkService} from '../../../services/network.service';
import {NewtworkbaseVoltage} from '../../../Models/newtworkbase-voltage';
import {NgForm} from "@angular/forms";
import {Subscription} from 'rxjs';
import {TranslateService} from "@ngx-translate/core";
import {NbAuthService} from "@nebular/auth";
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";
import {initTranslateService} from "../../../shared.module";


declare var jQuery: any;

@Component({
  selector: 'app-network-base-voltages',
  templateUrl: './network-base-voltages.component.html',
  styleUrls: ['./network-base-voltages.component.css']
})
export class NetworkBaseVoltagesComponent implements OnInit {


  listBasVoltages: any[] = [];
  newtworkbaseVoltage: NewtworkbaseVoltage;
  messageSave: string;
  listBaseVoltageSubscription: Subscription;
  display = 'none';

  constructor(private networkService: NetworkService,
              private translate: TranslateService,
              private authService: NbAuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
    initTranslateService(this.translate, this.authService, this.storage);
  }

  ngOnInit() {
    this.getAllBaseVoltage();
  }

  getAllBaseVoltage() {
    this.listBaseVoltageSubscription = this.networkService.getAllNewtworkbaseVoltage().subscribe(
      (dataVoltages) => {
        this.listBasVoltages = dataVoltages;

        console.log('Recherche terminé !');

        console.log('Recherche des bases Voltages terminé !');

      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }


  onSubmit(form: NgForm) {

    console.log("onSubmit is called");


    const nom = form.value['name'];
    const objectid = form.value['objectid'];
    const nominalVoltage = form.value['nominalVoltage'];
    this.newtworkbaseVoltage = new NewtworkbaseVoltage(null, objectid, nom, nominalVoltage);
    this.networkService.saveNewtworkbaseVoltage(this.newtworkbaseVoltage)
      .subscribe(
        value => {
          this.getAllBaseVoltage();
        });

    jQuery("#ajoutBaseNewtwork").modal("hide");
    this.messageSave = "La base voltage a bien été ajoutée";
    this.display = 'block';

  }

  editnewtworkBaseVoltage(newtworkbaseVoltage: NewtworkbaseVoltage) {
    if (newtworkbaseVoltage) {
      //TODO is not yet implemented
      alert("TODO is not yet implemented")
    }
  }

  onDelete(newtworkbaseVoltage: NewtworkbaseVoltage) {
    var r = confirm("Êtes-vous sûr(e) de vouloir supprimer ?!");
    if (r) {
      if (newtworkbaseVoltage) {
        this.networkService.deleteNewtworkbaseVoltage(newtworkbaseVoltage.objectid).subscribe(
          res => {
            this.getAllBaseVoltage();
          });
      }
      this.messageSave = "La base voltage a bien été supprimée";
      this.display = 'block';
    }
  }

  ngOnDestroy() {
    this.listBaseVoltageSubscription.unsubscribe();
  }

}
