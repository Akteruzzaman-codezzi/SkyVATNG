import { createSelector } from '@ngrx/store';
import { postFeature } from './post.reducer';
import { postAdapter } from './post.reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  postAdapter.getSelectors(postFeature.selectPostsState);

export const selectPostIds = selectIds;
export const selectPostEntities = selectEntities;
export const selectAllPosts = selectAll;
export const selectPostEntityTotal = selectTotal;

const selectPostsState = postFeature.selectPostsState;

export const selectLoading = createSelector(
  selectPostsState,
  (state:any) => state.loading
);
export const selectSubmitting = createSelector(
  selectPostsState,
  (state:any) => state.submitting
);
export const selectError = createSelector(
  selectPostsState,
  (state:any) => state.error
);
export const selectPage = createSelector(
  selectPostsState,
  (state:any) => state.page
);
export const selectLimit = createSelector(
  selectPostsState,
  (state:any) => state.limit
);
export const selectSearch = createSelector(
  selectPostsState,
  (state:any) => state.search
);
export const selectApiTotal = createSelector(
  selectPostsState,
  (state:any) => state.total
);
export const selectSelectedPostId = createSelector(
  selectPostsState,
  (state:any) => state.selectedPostId
);

export const selectSelectedPost = createSelector(
  selectPostEntities,
  selectSelectedPostId,
  (entities:any, selectedId:any) => (selectedId ? entities[selectedId] ?? null : null)
);

export const selectTotalPages = createSelector(
  selectApiTotal,
  selectLimit,
  (total:any, limit:any) => Math.ceil(total / limit)
);

export const selectQueryParams = createSelector(
  selectPage,
  selectLimit,
  selectSearch,
  (page, limit, search) => ({ page, limit, search })
);