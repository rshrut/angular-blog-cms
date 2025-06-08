import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { Post } from '../../../app/store/posts/post.model';
import * as PostSelectors from '../../store/posts/post.selectors';
import { loadPosts } from '../../store/posts/post.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  posts$ !: Observable<Post[]>;
  loading$ !: Observable<boolean>;

  private store = inject(Store);
  public authService = inject(AuthService);

  constructor(){
    this.posts$ = this.store.select(PostSelectors.selectAllPosts).pipe(
      map(posts => (posts).filter(post => !!post.publishedVersion).map(post => ({
        ...post,...post.publishedVersion
      })))
    );
    this.loading$ = this.store.select(PostSelectors.selectPostsLoading);
  }
  ngOnInit(){
    this.store.dispatch(loadPosts());
  }
}
