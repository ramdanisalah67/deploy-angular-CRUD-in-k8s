import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './Components/add-post/add-post.component';
import { PostsComponent } from './Components/posts/posts.component';


const routes: Routes = [
{path:'add',component:AddPostComponent},
{path:'all',component:PostsComponent},


 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
