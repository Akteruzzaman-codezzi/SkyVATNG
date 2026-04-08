import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { userFeature } from '../user.feature';
import { loadUsers } from '../user.action';
import { Base } from '../../../../shared/components/base/base';

@Component({
  selector: 'app-user',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User extends Base implements OnInit {
  constructor() {
    super();
    this.setPageName('User List');
  }

  private store = inject(Store);

  state$ = this.store.select(userFeature.selectUsersState);
  users$ = this.store.select(userFeature.selectUsers);

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'username', headerName: 'Username' },
    { field: 'email', headerName: 'Email' },
  ];

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ force: false }));
  }

  loadUsers(): void {
    this.store.dispatch(loadUsers({ force: true }));
  }
}
