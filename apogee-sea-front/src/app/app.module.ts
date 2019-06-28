/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthJWTInterceptor,
  NbAuthModule,
  NbAuthOAuth2JWTToken,
  NbOAuth2AuthStrategy,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
} from '@nebular/auth';
import {NbOAuth2PasswordLoginComponent} from "./oauth/oauth2-password-login.component";
import {FormsModule} from "@angular/forms";
import {NbAlertModule, NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule} from '@nebular/theme';
import {NbRoleProvider, NbSecurityModule} from "@nebular/security";
import {AuthGuard} from "./auth-guard.service";
import {RoleProvider} from "./role.provider";
import {SharedModule} from "./shared.module";
import {DecodeHtmlEntitiesModule} from "decode-html-entities";

@NgModule({
  declarations: [AppComponent, NbOAuth2PasswordLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,

    DecodeHtmlEntitiesModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbDialogModule.forRoot(),

    NbSecurityModule.forRoot({
      accessControl: {
        guest: {},
        user: {
          parent: 'guest',
          view: ['ctx-list', 'ctx'],
          read: '*',
        },
        admin: {
          parent: 'user',
          view: ['zones'],
          write: '*',
        },
      },
    }),

    SharedModule,

    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: NbOAuth2PasswordLoginComponent,
      },
    ]),

    NbAuthModule.forRoot({
      forms: {
        login: {
          redirectDelay: 0,
          showMessages : {
            error: true,
            success: false,
          },
          strategy: 'password',
        },
      },
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'password',
          clientId: 'client',
          clientSecret: 'secret',
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,
          baseEndpoint: '/api/oauth/',
          token: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2JWTToken,
            requireValidToken: true,
          },
          redirect: {
            success: '/pages',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    NbInputModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    { provide: NbRoleProvider, useClass: RoleProvider },
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req) => {
        return req.url.includes('oauth');
    }},
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
})

export class AppModule {
}

export function changeLanguage(lang){
  this.translate.use(lang);
}
