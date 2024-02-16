import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from 'src/app/Models/post';
import { PostService } from 'src/app/Services/post.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatDialogModule]
})
export class AddPostComponent  implements OnInit {
  @Output() postAdded = new EventEmitter<any>();

  post:Post= new Post()
  myformbuilder:any
  ref=""
  errors:string
  message=""
  constructor(private myService:PostService,private fb:FormBuilder,private router:Router, private dialogRef: MatDialogRef<AddPostComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.myformbuilder = this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required],
   

    })
    this.ref=data.exampleData
    console.log(this.ref)
  }

  ngOnInit() {}


close(){
  this.dialogRef.close("close")
}

  addPost(){
    this.post = this.myformbuilder.value;
    this.myService.save(this.post).subscribe(
      (data) => {
        if(this.ref==='add'){
        this.dialogRef.close("added"); // Close the dialog and pass the new post
        }
        else {
          this.dialogRef.close("updated"); // Close the dialog and pass the new post

        }
      }
      
    );
  }
}
