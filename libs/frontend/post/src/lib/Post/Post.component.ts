import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { getState } from '@ngrx/signals';
import { PostInterface } from '../store/post.model';
import { PostStore } from '../store/post.state';


@Component({
  selector: 'lib-post',
  standalone: true,
  imports: [
    CommonModule,
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

  // this.postStore.

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
    console.log("Todos - nginit: ",this.postsItems)
    console.log('postEntities: ', this.postStore.postEntities())
  }



}
