import { Component, Input, OnInit } from '@angular/core';

import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import {TranslateService} from "@ngx-translate/core";
import {NbAuthOAuth2JWTToken, NbAuthResult, NbAuthService} from "@nebular/auth";
import {filter, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu : NbMenuItem[] = [{ title: 'Log out', data: {path: '/logout'} }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2JWTToken) => {

        if (token.isValid()) {
          this.user = token.getAccessTokenPayload(); // here we receive a payload from the token and assigne it to our `user` variable
        }

      });

    this.menuService.onItemClick()
      .pipe(
        filter(({tag}) => tag === 'user-context-menu'),
        map((item) => item),
      )
      .subscribe(({item}) => {
        if (item.title === "Log out"){
          this.authService.logout('password')
            .subscribe((authResult: NbAuthResult) => {
              this.router.navigateByUrl(item.data.path);
            });
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

}
