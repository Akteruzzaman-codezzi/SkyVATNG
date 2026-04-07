import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as PostActions from './post.actions';
import { initialPostState, PostState } from './post.state';
import { Post } from '../models/post.model';

export const postFeatureKey = 'posts';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (post:any) => post.id,
  sortComparer: (a:any, b:any) => a.id - b.id
});

const reducer = createReducer<PostState>(
  postAdapter.getInitialState(initialPostState),

  on(PostActions.loadPosts, (state, { page = 1, limit = 10, search = '' }) => ({
    ...state,
    loading: true,
    error: null,
    page,
    limit,
    search
  })),

  on(PostActions.loadPostsSuccess, (state, { posts, total, page, limit, search }) =>
    postAdapter.setAll(posts, {
      ...state,
      loading: false,
      total,
      page,
      limit,
      search
    })
  ),

  on(PostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PostActions.loadPostById, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(PostActions.loadPostByIdSuccess, (state, { post }) =>
    postAdapter.upsertOne(post, {
      ...state,
      loading: false,
      selectedPostId: post.id
    })
  ),

  on(PostActions.loadPostByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(PostActions.createPost, (state) => ({
    ...state,
    submitting: true,
    error: null
  })),

  on(PostActions.createPostSuccess, (state, { post }) =>
    postAdapter.addOne(post, {
      ...state,
      submitting: false,
      total: state.total + 1
    })
  ),

  on(PostActions.createPostFailure, (state, { error }) => ({
    ...state,
    submitting: false,
    error
  })),

  on(PostActions.updatePost, (state) => ({
    ...state,
    submitting: true,
    error: null
  })),

  on(PostActions.updatePostSuccess, (state, { post }) =>
    postAdapter.updateOne(
      {
        id: post.id,
        changes: post
      },
      {
        ...state,
        submitting: false
      }
    )
  ),

  on(PostActions.updatePostFailure, (state, { error }) => ({
    ...state,
    submitting: false,
    error
  })),

  on(PostActions.deletePost, (state) => ({
    ...state,
    submitting: true,
    error: null
  })),

  on(PostActions.deletePostSuccess, (state, { id }) =>
    postAdapter.removeOne(id, {
      ...state,
      submitting: false,
      total: Math.max(0, state.total - 1),
      selectedPostId: state.selectedPostId === id ? null : state.selectedPostId
    })
  ),

  on(PostActions.deletePostFailure, (state, { error }) => ({
    ...state,
    submitting: false,
    error
  })),

  on(PostActions.setSelectedPost, (state, { id }) => ({
    ...state,
    selectedPostId: id
  })),

  on(PostActions.setPage, (state, { page }) => ({
    ...state,
    page
  })),

  on(PostActions.setSearch, (state, { search }) => ({
    ...state,
    search
  })),

  on(PostActions.clearPostError, (state) => ({
    ...state,
    error: null
  }))
);

export const postFeature = createFeature({
  name: postFeatureKey,
  reducer
});