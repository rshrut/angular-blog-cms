import { CommonModule } from '@angular/common';
import { Component,inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PostSelectors from '../../store/posts/post.selectors';
import * as PostActions from '../../store/posts/post.actions';
import { Post } from '../../store/posts/post.model';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  posts$ !: Observable<Post[]>;
  loading$!: Observable<boolean>;
  public authService = inject(AuthService);
  private store = inject(Store);
  private matSnackbar = inject(MatSnackBar);
  myPosts$!: Observable<Post[]>;
  

  ngOnInit(){
    this.posts$ = this.store.select(PostSelectors.selectAllPosts);
    this.loading$ = this.store.select(PostSelectors.selectPostsLoading);
    this.store.dispatch(PostActions.loadPosts());

    this.myPosts$ = combineLatest([
      this.posts$,
      this.authService.currentUser$
    ]).pipe(
            tap(([_, user]) => console.log(user)
        ),
      map(([posts, user]) => 
        posts.filter(post => post.authorEmail === user?.email)
    )
  );
  }

  onDeletePost(id: string){
    if(confirm('Are you sure you want to delete this post?')){
      this.store.dispatch(PostActions.deletePost({ id }));
      this.matSnackbar.open('Post deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      })
    }
  }
}
