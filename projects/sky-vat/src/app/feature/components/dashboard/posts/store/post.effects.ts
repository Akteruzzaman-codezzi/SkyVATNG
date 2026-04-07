import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import * as PostActions from './post.actions';
import * as PostSelectors from './post.selectors';
import { Store } from '@ngrx/store';
import { PostService } from '../../../../../core/service/post.service';


@Injectable()
 export class PostEffects {
  private actions$ = inject(Actions);
  private postService = inject(PostService);
  private store = inject(Store);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      switchMap(({ page = 1, limit = 10, search = '' }) =>
        this.postService.getPosts(page, limit, search).pipe(
          map((response) =>
            PostActions.loadPostsSuccess({
              posts: response.data,
              total: response.total,
              page,
              limit,
              search
            })
          ),
          catchError((error) =>
            of(PostActions.loadPostsFailure({ error: error.message || 'Failed to load posts' }))
          )
        )
      )
    )
  );

  loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPostById),
      switchMap(({ id }) =>
        this.postService.getPostById(id).pipe(
          map((post) => PostActions.loadPostByIdSuccess({ post })),
          catchError((error) =>
            of(PostActions.loadPostByIdFailure({ error: error.message || 'Failed to load post' }))
          )
        )
      )
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map((createdPost) => PostActions.createPostSuccess({ post: createdPost })),
          catchError((error) =>
            of(PostActions.createPostFailure({ error: error.message || 'Failed to create post' }))
          )
        )
      )
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      mergeMap(({ id, changes }) =>
        this.postService.updatePost(id, changes).pipe(
          map((updatedPost) => PostActions.updatePostSuccess({ post: updatedPost })),
          catchError((error) =>
            of(PostActions.updatePostFailure({ error: error.message || 'Failed to update post' }))
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap(({ id }) =>
        this.postService.deletePost(id).pipe(
          map(() => PostActions.deletePostSuccess({ id })),
          catchError((error) =>
            of(PostActions.deletePostFailure({ error: error.message || 'Failed to delete post' }))
          )
        )
      )
    )
  );

  reloadAfterPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.setPage, PostActions.setSearch),
      withLatestFrom(this.store.select(PostSelectors?.selectQueryParams)),
      map(([, query]) =>
        PostActions.loadPosts({
          page: query?.page || 1,
          limit: query?.limit || 10,
          search: query?.search || ''
        })
      )
    )
  );
}