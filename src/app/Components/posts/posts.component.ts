import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { PostService } from 'src/app/Services/post.service';

import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import { AddPostComponent } from '../add-post/add-post.component';
import { CommonModule } from '@angular/common';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [ CommonModule,MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule,MatInputModule,IonicModule,MatDialogModule,MatSnackBarModule],
})
export class PostsComponent implements OnInit {
  posts:Post[]= []
  displayedColumns: string[] = ['Id', 'title','content', 'dateCreated','Actions'];
  dataSource: any;
  message=""
  ref=""
  isEmpty="false"

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog,private myService:PostService,private route:Router,private _snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.myService.allPosts().subscribe(
      data=>{
        this.posts=data
        this.dataSource = new MatTableDataSource<Post>(this.posts);
        this.dataSource.paginator = this.paginator;
        if(this.posts.length==0) this.isEmpty="true"
        else this.isEmpty="false"
      })

  }

addPost(){
  this.openDialog("add")

}
  updatePost(id:number){
      this.openDialog("update")
  }
  
  deletePost(id:number){
    console.log(id)
    this.myService.deletePost(id).subscribe((data)=>{console.log(data);this.ngOnInit()})
  }



  openDialog(ref:string) {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.height = '370px';
   
    if(ref==="add"){

      dialogConfig.data = { // Pass data to the dialog
        exampleData: 'add'
      };

    const dialogRef = this.dialog.open(AddPostComponent,dialogConfig);

    dialogRef.afterClosed().subscribe((m:any) => {
     if(m==='added'){
      this.message=m   
      this.ngOnInit()
      this.openSnackBar("Post added Successfully !!","close")
     }

       });
}



else {

  dialogConfig.data = { // Pass data to the dialog
    exampleData: 'update'
  };
  const dialogRef = this.dialog.open(AddPostComponent,dialogConfig);

  dialogRef.afterClosed().subscribe((m:string) => {
    if(m==='updated'){
      this.message=m   
      this.ngOnInit()
      this.openSnackBar("Post added Successfully !!","close")
     }
  });
}
  }




  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
