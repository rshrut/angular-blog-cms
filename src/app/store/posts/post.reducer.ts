import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { Post } from './post.model';

export interface PostState{
    posts: Post[];
    loading: boolean;
    error: any;
}

export const initialState: PostState = {
    posts: [],
    loading: false,
    error: null
}

export const postReducer = createReducer(
    initialState,
    //load posts
    on(PostActions.loadPosts,  (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(PostActions.loadPostsSuccess,  (state, { posts }) => ({
        ...state,
        posts,
        loading: false
    })),
    on(PostActions.loadPostsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
      })),

     // Create Post
    on(PostActions.createPost, (state) => ({
        ...state,
        loading: true,
    })),
    on(PostActions.createPostSuccess, (state, { post }) => ({
        ...state,
        posts: [...state.posts, post],
        loading: false,
    })),
    on(PostActions.createPostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Update Post
    on(PostActions.updatePost, (state) => ({
        ...state,
        loading: true,
    })),
    on(PostActions.updatePostSuccess, (state, { post }) => ({
        ...state,
        posts: state.posts.map(p => p.id === post.id ? post : p),
        loading: false,
    })),
    on(PostActions.updatePostFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    //delete post
    on(PostActions.deletePost, (state) => ({
        ...state,
        loading: true,
    })),
    on(PostActions.deletePostSuccess, (state, { id }) => ({
    ...state,
    posts: state.posts.filter(p => p.id !== id),
    loading: false,
    })),
    on(PostActions.deletePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    }))
)