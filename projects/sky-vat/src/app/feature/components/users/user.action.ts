import { createAction, props } from "@ngrx/store";

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ force?: boolean }>()
);

export const loadUsersApi = createAction('[User] Load Users API');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);