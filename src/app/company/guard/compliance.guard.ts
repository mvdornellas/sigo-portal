import { CompanyService } from './../services/company.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplianceGuard implements CanActivate {
  constructor(private companyService: CompanyService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const {token, id: companyId} = route.params;
      const company = this.companyService.get(companyId);
      return company !== undefined;
  }

}
