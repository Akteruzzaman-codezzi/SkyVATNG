import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
@Component({
  selector: 'app-not-found',
  imports: [NzButtonModule, NzResultModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  goHome(): void {
    window.location.href = '/#/';
  }
}
