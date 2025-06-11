import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../../store/posts/post.model';
import { selectPostById } from '../../../store/posts/post.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  post$!: Observable<Post | undefined>;

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.post$ = this.store.select(selectPostById(id));
    }
  }
}
