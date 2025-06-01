import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PostActions from './post.actions';
import { PostService } from '../../services/post.service';
import { Post } from './post.model';
import { map, catchError, mergeMap, tap } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class PostEffects{
    private actions$ = inject(Actions);
    private postService = inject(PostService);
    
    //load posts
    loadPosts$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PostActions.loadPosts),
            mergeMap(() => 
                this.postService.getPosts().pipe(
                    map((posts: Post[]) => PostActions.loadPostsSuccess({posts})),
                    catchError((error) => of(PostActions.createPostFailure({error})))
                )
            )

        )
    )

    //create post
    createPost$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PostActions.createPost),
            mergeMap(({post}) => 
                this.postService.createPost(post).pipe(
                    map((docRef) => {
                        const createdPost: Post = { ...post, id: docRef.id};
                        return PostActions.createPostSuccess({ post: createdPost});
                    },
                    catchError((error) => of(PostActions.createPostFailure({ error })))
                )
            )
        )
    ))

    //update post
    updatePost$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PostActions.updatePost),
            mergeMap(({ post }) => 
                this.postService.updatePost(post).pipe(
                    map((post) => PostActions.updatePostSuccess({post})),
                    catchError(error => of(PostActions.updatePostFailure({ error })))
                ))
        )
    )

    //delete post
    deletePost$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PostActions.deletePost),
            mergeMap(({ id }) => 
                this.postService.deletePost(id).pipe(
                    map(() => PostActions.deletePostSuccess({ id })),
                    catchError(error => of(PostActions.deletePostFailure({ error })))
                )
            )
        )
    )
}

