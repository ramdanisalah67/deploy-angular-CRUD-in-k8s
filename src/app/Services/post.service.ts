import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api="http://www.posts.com/api/post/"
  constructor(private http:HttpClient) { }


  public allPosts():Observable<any>{
    return this.http.get(this.api+'all')
  }

  public save(p:Post):Observable<any>{
   return this.http.post(this.api+'addPost',p)
  }

  deletePost(id:number) :Observable<any>{
   return  this.http.delete(this.api+'delete/'+id)
  }
}
