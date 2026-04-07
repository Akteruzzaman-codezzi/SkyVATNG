import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActiveModuleService } from '../../services/active-module-service';
import { Toast } from 'ngx-toastr';
import { ToasterService } from '../../services/toaster-service';
import { Subject } from 'rxjs';
import { Auth } from '../../../core/service/auth';

@Component({
  selector: 'app-base',
  imports: [RouterModule],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base implements OnDestroy {
  protected activeRoute: ActivatedRoute = inject(ActivatedRoute);
  protected activeModule: ActiveModuleService = inject(ActiveModuleService);
  protected toaster: ToasterService = inject(ToasterService);
  protected authService: Auth = inject(Auth);
  protected router: Router = inject(Router);
  protected destroy$ = new Subject<void>();
  errorMessage = signal<string | any>(null);
  currentRole!: string;

  constructor() {
    effect(() => {
      const value = this.errorMessage();
      this.onErrorMessage(value);
    });
  }

  onErrorMessage(msg: string | null) {
    if (!msg) return;
    this.toaster.showMessage('error', msg);
  }

  public setPageName(pageName: string): void {
    this.activeModule.setPageName(pageName);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
