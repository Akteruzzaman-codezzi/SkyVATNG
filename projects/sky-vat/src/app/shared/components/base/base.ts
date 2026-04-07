import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActiveModuleService } from '../../services/active-module-service';
import { Toast } from 'ngx-toastr';
import { ToasterService } from '../../services/toaster-service';

@Component({
  selector: 'app-base',
  imports: [RouterModule],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base {
  protected activeRoute: ActivatedRoute = inject(ActivatedRoute);
  protected activeModule: ActiveModuleService = inject(ActiveModuleService);
  protected toaster: ToasterService = inject(ToasterService);
  protected router: Router = inject(Router);

}
