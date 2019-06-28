import { NgModule } from '@angular/core';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CommonModule} from "@angular/common";
import {StorageService, StorageServiceModule} from "angular-webstorage-service";
import {NbAuthOAuth2JWTToken, NbAuthService} from "@nebular/auth";

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    CommonModule,
    TranslateModule,
    StorageServiceModule,
  ]
})

export class SharedModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
}

export function initTranslateService(translate: TranslateService, authService: NbAuthService, storage: StorageService){
  translate.addLangs(["en", "fr"]);
  translate.setDefaultLang('fr');

  let localStorageLang = null;

  authService.onTokenChange()
    .subscribe((token: NbAuthOAuth2JWTToken) => {

      if (token.isValid()) {
        let user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        localStorageLang = storage.get(user.user_name);
      }
    });

  let browserLang = translate.getBrowserLang();

  if (localStorageLang == null) {
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
  } else {
    translate.use(localStorageLang.match(/en|fr/) ? localStorageLang : 'fr');
  }
}
