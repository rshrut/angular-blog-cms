import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateEditPostComponent } from './pages/posts/create-edit-post/create-edit-post.component';
import { authGuard } from './pages/auth/auth.guard';
import { PostDetailComponent } from './pages/posts/post-detail/post-detail.component';

export const routes: Routes = [
    {
        path:'',
        component: LayoutComponent,
        children:[
            {
                path:'',
                component:HomeComponent,
                // canActivate:[authGuard]
            },
            {
                path:'posts',
                component:PostsComponent,
                canActivate:[authGuard]
            },
            {
                path:'posts/new',
                component: CreateEditPostComponent,
                canActivate: [authGuard]
            },
            {
                path: 'posts/edit/:id',
                component: CreateEditPostComponent,
                canActivate: [authGuard]
            },
            {
                path: 'posts/:id',
                component: PostDetailComponent,
                canActivate: [authGuard]
            }
        ]
    },
    {
        path:'auth',
        component: AuthComponent,
        children:[
            {
                path:'',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path:'login',
                loadComponent: () => import('../app/pages/auth/login/login.component').then(m => m.LoginComponent)
            },
            {
                path:'register',
                loadComponent: () => import('../app/pages/auth/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path:'forgot-password',
                loadComponent: () => import('../app/pages/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
            }
        ]
    },
    {
        path:'**',
        redirectTo:''
    },
];
