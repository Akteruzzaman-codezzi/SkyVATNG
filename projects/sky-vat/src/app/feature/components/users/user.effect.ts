import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from './user.service';
import {
  loadUsers,
  loadUsersApi,
  loadUsersFailure,
  loadUsersSuccess,
} from './user.action';
import { userFeature } from './user.feature';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private userService = inject(UsersService);

  checkUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      withLatestFrom(
        this.store.select(userFeature.selectUsers),
        this.store.select(userFeature.selectLoading)
      ),
      filter(([action, users, loading]) => {
        const hasData = users && users.length > 0;
        return !!action.force || (!hasData && !loading);
      }),
      map(() => loadUsersApi())
    )
  );

  loadUsersApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersApi),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) =>
            of(loadUsersFailure({ error: error?.message || 'Failed to load users' }))
          )
        )
      )
    )
  );
}