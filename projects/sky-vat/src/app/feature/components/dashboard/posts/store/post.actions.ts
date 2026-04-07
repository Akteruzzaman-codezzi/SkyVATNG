import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post.model';

export const loadPosts = createAction(
  '[Post] Load Posts',
  props<{ page?: number; limit?: number; search?: string }>()
);

export const loadPostsSuccess = createAction(
  '[Post] Load Posts Success',
  props<{ posts: Post[]; total: number; page: number; limit: number; search: string }>()
);

export const loadPostsFailure = createAction(
  '[Post] Load Posts Failure',
  props<{ error: string }>()
);

export const loadPostById = createAction(
  '[Post] Load Post By Id',
  props<{ id: number }>()
);

export const loadPostByIdSuccess = createAction(
  '[Post] Load Post By Id Success',
  props<{ post: Post }>()
);

export const loadPostByIdFailure = createAction(
  '[Post] Load Post By Id Failure',
  props<{ error: string }>()
);

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: Omit<Post, 'id'> }>()
);

export const createPostSuccess = createAction(
  '[Post] Create Post Success',
  props<{ post: Post }>()
);

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ error: string }>()
);

export const updatePost = createAction(
  '[Post] Update Post',
  props<{ id: number; changes: Partial<Post> }>()
);

export const updatePostSuccess = createAction(
  '[Post] Update Post Success',
  props<{ post: Post }>()
);

export const updatePostFailure = createAction(
  '[Post] Update Post Failure',
  props<{ error: string }>()
);

export const deletePost = createAction(
  '[Post] Delete Post',
  props<{ id: number }>()
);

export const deletePostSuccess = createAction(
  '[Post] Delete Post Success',
  props<{ id: number }>()
);

export const deletePostFailure = createAction(
  '[Post] Delete Post Failure',
  props<{ error: string }>()
);

export const setSelectedPost = createAction(
  '[Post] Set Selected Post',
  props<{ id: number | null }>()
);

export const setPage = createAction(
  '[Post] Set Page',
  props<{ page: number }>()
);

export const setSearch = createAction(
  '[Post] Set Search',
  props<{ search: string }>()
);

export const clearPostError = createAction('[Post] Clear Error');