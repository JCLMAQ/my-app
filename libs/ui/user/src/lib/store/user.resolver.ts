import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { UserEntityService } from "./user-entity.service";


@Injectable()
export class UserResolver  {

    constructor(
      private usersEntityService: UserEntityService) { }

    resolve(_route: ActivatedRouteSnapshot,
            _state: RouterStateSnapshot): Observable<boolean> {
        return this.usersEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                      this.usersEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );
    }
}
