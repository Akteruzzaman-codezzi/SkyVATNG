import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, NzLayoutModule, NzCardModule, NzButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
