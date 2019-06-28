/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, Inject, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";
import {NbAuthService} from "@nebular/auth";
import {initTranslateService} from "./shared.module";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  user: any;
  localStorageLang: string;

  constructor(private analytics: AnalyticsService,
              private translate: TranslateService,
              private authService: NbAuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    initTranslateService(this.translate, this.authService, this.storage);
  }

}
