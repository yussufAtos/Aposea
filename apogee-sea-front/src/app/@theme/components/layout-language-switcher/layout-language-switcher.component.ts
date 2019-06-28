import {Component, OnDestroy, Input, Inject} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LOCAL_STORAGE, StorageService} from "angular-webstorage-service";
import {NbAuthOAuth2JWTToken, NbAuthService} from "@nebular/auth";

@Component({
  selector: 'ngx-layout-language-switcher',
  template: `
    <ngx-switcher
      [firstValue]="en"
      [secondValue]="fr"
      [firstValueLabel]="'EN'"
      [secondValueLabel]="'FR'"
      [value]="lang"
      (valueChange)="changeLanguage($event)"
      [vertical]="vertical"
    >
    </ngx-switcher>
  `,
})
export class LayoutLanguageSwitcherComponent implements OnDestroy {

  lang: string;
  browserLang: string;

  en = 'en';
  fr = 'fr';
  alive = true;

  user: any;

  @Input() vertical: boolean = false;

  constructor(private translate: TranslateService,
              private authService: NbAuthService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {

        if (token.isValid()) {
          this.user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigne it to our `user` variable
          this.lang = this.storage.get(this.user.user_name);
        }
      });

    this.browserLang = this.translate.getBrowserLang();

    if (this.lang == null) {
      this.lang = this.browserLang.match(/en|fr/) ? this.browserLang : 'fr';
    }
  }

  changeLanguage(lang){

    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          this.user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigne it to our `user` variable
          this.storage.set(this.user.user_name, lang);
        }
      });

    location.reload(true);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
