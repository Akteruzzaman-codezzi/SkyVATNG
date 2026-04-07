import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../feature/components/dashboard/posts/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  getPosts(
    page: number,
    limit: number,
    search: string,
  ): Observable<{ data: Post[]; total: number }> {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    return this.http
      .get<Post[]>(this.baseUrl, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response: any) => {
          let data = response.body ?? [];
          if (search?.trim()) {
            const keyword = search.toLowerCase();
            data = data.filter(
              (x: any) =>
                x.title.toLowerCase().includes(keyword) || x.body.toLowerCase().includes(keyword),
            );
          }

          const total = Number(response.headers.get('x-total-count') ?? data.length);

          return { data, total };
        }),
      );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post);
  }

  updatePost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, changes);
  }

  deletePost(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
