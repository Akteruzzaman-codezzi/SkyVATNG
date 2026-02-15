import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Base } from '../api/base/base';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth extends Base {
  private readonly tokenKey = 'auth_token';
  private readonly menuTokenKey = 'auth_menu_token';
  private readonly decodedObjKey = 'decoded_obj';
  public origin = '';

  constructor(
    protected override http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    super(http);
    if (isPlatformBrowser(this.platformId)) {
      this.origin = window.location.origin + '/#/';
    }
  }

  logout(): void {
    localStorage.setItem('language', 'en');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.menuTokenKey);
    localStorage.removeItem(this.decodedObjKey);
    this.router.navigate(['/login']);
  }
}
