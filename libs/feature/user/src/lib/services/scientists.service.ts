import { Injectable } from '@angular/core';
import { User } from '@prisma/client';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScientistsService {
  users$ = of(UserMock).pipe(delay(1500));
  constructor() {}
}
const UserMock: Partial<User>[] = [
  {
    id: 'one',
    lastName: 'Einstein',
    firstName: 'Albert',

},
  {
    id: 'Two',
    lastName: 'Curie',
    firstName: 'Marie',
  }
];
