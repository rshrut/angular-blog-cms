import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../store/posts/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPostById } from '../../../store/posts/post.selectors';
import { createPost, updatePost } from '../../../store/posts/post.actions';
import { QuillModule } from 'ngx-quill';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-create-edit-post',
  imports: [FormsModule, CommonModule, QuillModule],
  templateUrl: './create-edit-post.component.html',
  styleUrl: './create-edit-post.component.css'
})
export class CreateEditPostComponent {
  post: Post = {
    id: '',
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    imageUrl: '',
    tags: [],
    published: false,
    createdAt: new Date().toISOString()
  };
  tags: string = '';
  isEdit: boolean = false;
  imageUrlPreview: string = '';
  defaultImage: string = 'assets/images/placeholder-image.jpeg';
  private imageUrlSubject = new Subject<string>();
  private imageUrlSub?: Subscription;
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(Store);
  private matSnackbar = inject(MatSnackBar);

  ngOnInit(){
    this.imageUrlSub = this.imageUrlSubject
    .pipe(debounceTime(700))
    .subscribe((url) => {
      this.imageUrlPreview = url.trim();
    })

    if(this.post.imageUrl){
      this.imageUrlSubject.next(this.post.imageUrl);
    }

    const postId = this.route.snapshot.paramMap.get('id');
    console.log("route",this.route.snapshot);
    
    if(postId){
      this.isEdit = true;
      this.store.select(selectPostById(postId)).subscribe((post) => {
        if(post){
          this.post = { ...post };
          this.tags = post.tags.join(', ');
        }
      })
    }
  }

  onImageUrlChange(url: string){
    this.imageUrlSubject.next(url);
  }

  ngOnDestroy(){
    this.imageUrlSub?.unsubscribe();
  }

  onSubmit(publish: boolean): void{
    debugger
    this.post.tags  = this.tags.split(',').map(tag => tag.trim());

    if(!this.post.imageUrl?.trim()){
      this.post.imageUrl = this.defaultImage;
    }           

    if(this.isEdit){
      this.post.published = publish;
      this.store.dispatch(updatePost({ post: this.post}));
      this.matSnackbar.open(publish? 'Post published successfully!':'Draft saved successfully!','Close',{
        duration: 3000,
        panelClass:['success-snackbar']
      })
    }
    else{
      console.log("po",this.post);
      //for saving author field with current user
      this.authService.currentUser$.subscribe(user => {
        console.log("user",user);
        
      const newPost: Post = {
        ...this.post,
        authorName:user?.displayName ?? 'unknown',
        authorEmail: user?.email ?? 'unknownEmail',
        createdAt: new Date().toISOString(),
        published: publish,
      };

        this.store.dispatch(createPost({ post: newPost}));
        this.matSnackbar.open(publish ? 'Post published successfully!' : 'Draft saved successfully!','Close',{
          duration: 3000,
          panelClass:['success-snackbar']
        })
      })
    }
    this.router.navigate(['/posts']);
  }
}
