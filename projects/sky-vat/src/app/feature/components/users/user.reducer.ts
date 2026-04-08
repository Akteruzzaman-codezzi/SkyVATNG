import { createReducer, on } from '@ngrx/store';
import { loadUsersApi, loadUsersFailure, loadUsersSuccess } from './user.action';

export interface UserState {
  users: any[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [],
  loading: false,
  loaded: false,
  error: null,
};

export const reducer = createReducer(
  initialUserState,

  on(loadUsersApi, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    loaded: true,
    error: null,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);