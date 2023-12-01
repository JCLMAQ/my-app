import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@my-app/material';
import { EntityMetadataMap } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { User } from '@prisma/client';
import { Observable, Subject, first } from 'rxjs';
import { UserEntityService } from '../store/user-entity.service';
import { UserListService } from '../userList.service';
import { UsersDetailsComponent } from '../users-details/users-details.component';

const entityMetadata: EntityMetadataMap = {
  User: {},
};

export const entityConfig = {
  entityMetadata
};
@Component({
    selector: 'my-app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    standalone: true,
    imports: [
      CommonModule,
      ...MATERIAL,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        UsersDetailsComponent
    ],
})

export class UsersListComponent implements OnInit, AfterViewInit {

  private _isDead$ = new Subject();

  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  tableColumns  :  string[] = [ 'num','select','nickName', 'lastName', 'firstName', 'email', 'tools'];

  users?: User[];
  index: number | undefined
  users$?: Observable<User[]>;
  routeToDetail = 'users/usersdetail';

  mode: 'Edit' | 'View' | 'Update' | undefined ;
  master = false; // true : button is disable
  owner = false; // true button is disable

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
   // private userService: UserService,
    private router: Router,
    private store: Store,
    private userEntityService: UserEntityService,
    private userListService: UserListService,
    // private entityDefinitionService: EntityDefinitionService,
    // private entityDataService: EntityDataService,
    // private userDataService: UserDataService
  ){
    // entityDefinitionService.registerMetadataMap(entityUserMetadata);
    // entityDataService.registerService('User', userDataService)
  }

  ngOnInit(): void {
    this.reload();
  }

  // ngOnDestroy(): void {
  //   // this._isDead$.next();
  // }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }

  reload() {
    this.userEntityService.entities$.subscribe((objectResult) => {
      this.users = Object.values(objectResult)
      this.dataSource  =  new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // onNavigate() {

  // }

  changeUserList() {
    this.userListService.changeUserList(this.dataSource.filteredData);
  }

  // Goto the detail page for view only
  navigateid(id: string, index: string) {
    // this.dataSource.data.values()
    console.log(this.routeToDetail, id)
    const indexrun = index
    this.router.navigate([this.routeToDetail, id, 'view']);
  }

  navigate(user: User, index: string) {
    // console.log("route transfert" , user
    this.router.navigate([this.routeToDetail, user, 'view']);
  }

  navigateButton(id: string, mode: string) {
    // mode: 'view' | 'update' | 'create';

    this.userListService.changeUserList(this.dataSource.filteredData);
    // const filterData = this.dataSource.filteredData
    this.router.navigate([this.routeToDetail, id, mode]);
  }

  addOneUser() {
    this.router.navigate([this.routeToDetail, '', 'create']);
  }
  // Delete the selected item
  async remove( id: string ) {
    // const user = this.userEntityService.delete(user.id = id)
  }

  virtualRemove(id: string) {
    const user = this.userEntityService.getByKey(id)
    .pipe(first()).subscribe(user => user.isDeletedDT = new Date());
  }
  // MatTable mgt
  // On click row action
  onRowClicked(row: number) {
    // console.log('Row clicked: ', row);
  }
  // Filter the list
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }


}
