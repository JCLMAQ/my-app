import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { User } from '@prisma/client';

@Injectable({
  providedIn: 'root'
})
export class UserEntityService extends EntityCollectionServiceBase<User>{

  constructor( serviceElementsFactory: EntityCollectionServiceElementsFactory ) {
    super('User', serviceElementsFactory );
  }
}
