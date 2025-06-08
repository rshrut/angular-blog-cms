import { inject, Injectable } from '@angular/core';
import { Post } from '../store/posts/post.model';
import { from, map, mergeMap, Observable } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentReference, Firestore, getDoc, query, updateDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root'})
export class PostService{
    private fireStore = inject(Firestore);
    private postsCollection = collection(this.fireStore,'posts');
    
    getPosts():Observable<Post[]>{
        const postsQuery = query(this.postsCollection);
        return collectionData(postsQuery, { idField : 'id' }) as Observable<Post[]>;
    }

    createPost(post: Post): Observable<DocumentReference>{
        return from(addDoc(this.postsCollection, post));
    }

    updatePost(post: Post): Observable<Post> {
       const postDoc = doc(this.fireStore, `posts/${post.id}`);
       return from(updateDoc(postDoc,{...post })).pipe(
        mergeMap(() => this.getPostById(String(post.id)))
       )
    }

    getPostById(id: string): Observable<Post>{
        const postDoc = doc(this.fireStore, `posts/${id}`);
        return from(getDoc(postDoc)).pipe(
            map((docSnap) => {
                if(docSnap.exists()){
                    const data = docSnap.data();
                    console.log("docsnap",docSnap);
                    console.log("data",docSnap.data());
                    const post: Post = {
                        id: id,
                        authorName: data['authorName'] || '',
                        authorEmail: data['authorEmail'] || '',
                        published: data['published'] || false,
                        publishedAt: data['publishedAt'] || '',
                        createdAt: data['createdAt'] || '',
                        updatedAt: data['updatedAt'] || '',

                        // draft content
                        draft: {
                            title: data['draft']?.title || '',
                            content: data['draft']?.content || '',
                            imageUrl: data['draft']?.imageUrl || '',
                            tags: data['draft']?.tags || [],
                        },

                        // published version (optional)
                        publishedVersion: data['publishedVersion']
                            ? {
                                title: data['publishedVersion'].title || '',
                                content: data['publishedVersion'].content || '',
                                imageUrl: data['publishedVersion'].imageUrl || '',
                                tags: data['publishedVersion'].tags || [],
                                updatedAt: data['publishedVersion'].updatedAt || '',
                            }
                            : undefined,
                        };
                    return post;
                }
                else{
                    throw new Error('Post not found');
                }
            })
        )
    }

    deletePost(id: string): Observable<void> {
        const postDoc = doc(this.fireStore, `posts/${id}`);
        return from(deleteDoc(postDoc));
    }

}