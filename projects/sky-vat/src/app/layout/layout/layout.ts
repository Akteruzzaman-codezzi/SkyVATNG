import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Base } from '../../shared/components/base/base';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, NzLayoutModule, NzCardModule, NzButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout extends Base implements OnInit {
  public pageName = '';
  constructor() {
    super();
  }
  ngOnInit(): void {
    this.activeModule.currentPageName.subscribe((pageName) => {
      this.pageName = pageName;
      console.log('Current page name:', this.pageName);
    });
  }
}
