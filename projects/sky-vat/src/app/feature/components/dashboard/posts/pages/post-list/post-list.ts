import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostActions from '../../store/post.actions';
import * as PostSelectors from '../../store/post.selectors';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post.model';
import { Base } from '../../../../../../shared/components/base/base';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList extends Base   implements OnInit {
  private store = inject(Store);

  posts$ = this.store.select(PostSelectors.selectAllPosts);
  loading$ = this.store.select(PostSelectors.selectLoading);
  submitting$ = this.store.select(PostSelectors.selectSubmitting);
  error$ = this.store.select(PostSelectors.selectError);
  selectedPost$ = this.store.select(PostSelectors.selectSelectedPost);

  page$ = this.store.select(PostSelectors.selectPage);
  totalPages$ = this.store.select(PostSelectors.selectTotalPages);
  total$ = this.store.select(PostSelectors.selectApiTotal);

  search = '';

  constructor() {
    super();
    this.setPageName('Post List');
  }

  ngOnInit(): void {
    this.store.dispatch(PostActions.loadPosts({ page: 1, limit: 10, search: '' }));
  }

  onSearch(): void {
    this.store.dispatch(PostActions.setSearch({ search: this.search }));
  }

  goToPage(page: number): void {
    this.store.dispatch(PostActions.setPage({ page }));
  }

  selectPost(post: Post): void {
    this.store.dispatch(PostActions.setSelectedPost({ id: post.id }));
  }

  createSamplePost(): void {
    this.store.dispatch(
      PostActions.createPost({
        post: {
          userId: 1,
          title: 'New post title',
          body: 'New post body'
        }
      })
    );
  }

  updateSamplePost(post: Post): void {
    this.store.dispatch(
      PostActions.updatePost({
        id: post.id,
        changes: {
          ...post,
          title: post.title + ' (updated)'
        }
      })
    );
  }

  deleteCurrentPost(id: number): void {
    this.store.dispatch(PostActions.deletePost({ id }));
  }
}