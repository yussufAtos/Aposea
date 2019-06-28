import {Injectable} from "@angular/core";
import {NbRoleProvider} from "@nebular/security";
import {NbAuthOAuth2JWTToken, NbAuthService} from "@nebular/auth";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthOAuth2JWTToken) => {
          return token.isValid() ? token.getAccessTokenPayload().authorities : 'guest';
        }),
      );
  }
}
