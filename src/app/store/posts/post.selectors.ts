import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
    selectPostState,
    (state) => state.posts
)

export const selectPostById = (id: string) => 
    createSelector(
        selectPostState,
        (state) => state.posts.find(post => post.id === id)
    )

export const selectPostsLoading = createSelector(
    selectPostState,
    (state) => state.loading
)

export const selectPostsError = createSelector(
    selectPostState,
    (state) => state.error
  );