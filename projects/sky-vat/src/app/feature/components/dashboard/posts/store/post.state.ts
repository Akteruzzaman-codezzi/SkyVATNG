import { Post } from "../models/post.model";
import { EntityState } from "@ngrx/entity";

export interface PostState extends EntityState<Post> {
  selectedPostId: number | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;

  page: number;
  limit: number;
  total: number;
  search: string;
}

export const initialPostState: PostState = {
  ids: [],
  entities: {},

  selectedPostId: null,
  loading: false,
  submitting: false,
  error: null,

  page: 1,
  limit: 10,
  total: 0,
  search: ''
};