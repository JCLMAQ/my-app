import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { getState } from '@ngrx/signals';
import { PostInterface } from '../store/post.interface';
import { PostStore } from '../store/post.state';


@Component({
  selector: 'lib-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ...MATERIAL
  ],
  templateUrl: './Post.component.html',
  styleUrl: './Post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [PostStore],
})
export class PostComponent implements OnInit {

  readonly postStore = inject(PostStore);
  readonly router = inject(Router)

  postsItems!: PostInterface[];

  fb = inject(FormBuilder);
  addForm = this.fb.nonNullable.group({
    title: '',
    content: ''
  });

  constructor() {
    console.log("Constructor step")
    effect(()=> {
      this.postStore.loaded();
      console.log("Loaded Statute: ", this.postStore.loaded())
      this.fetchData();
      const state = getState(this.postStore);
      console.log('posts state changed', state);
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit step')
  }

  fetchData(): void {
    this.postsItems = this.postStore.postEntities();
    console.log("Posts - nginit: ",this.postsItems)
    console.log('postEntities: ', this.postStore.postEntities())
  }

  addPost() {
    const val = this.addForm.value;
    console.log("Addform value: ", val)
    const data=  {
      title: val.title,
      content: val.content,
      orgId: "b64d3148-b2b2-4d7d-8c3e-cde4673f9665",
      ownerId: "7c672043-24e4-45a9-909c-693ba5044785",
    }
      this.postStore.add( data);
  }

  deletePost() {

  }

}
