import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { TodoInterface } from '../store/todo.model';
import { TodoStore } from '../store/todo.state';


@Component({
  selector: 'lib-todo',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStore],
})

export class TodoComponent implements OnInit, AfterViewInit { // implements OnInit,  AfterViewInit {
  // export class TodoComponent implements OnInit,  AfterViewInit {
  readonly todoStore = inject(TodoStore);
  readonly router = inject(Router)

  dataSource!: MatTableDataSource<TodoInterface> ;

  selection = new SelectionModel<TodoInterface>(true, []);
  tableColumns: string[]= [ 'numSeq','title'];

  todosEntities = this.todoStore.entities();
  todosItems = this.todoStore.items();

  index: number | undefined
  routeToDetail = "todos/tododetail";


  mode: 'Edit' | 'View' | 'Update' | undefined ;
  master = false; // true : button is disable
  owner = false; // true button is disable

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  readonly isLoading$ = this.todoStore.isLoading();
  readonly loaded$ = this.todoStore.loaded();
  readonly error$ = this.todoStore.error();

  ngOnInit(): void {
  this.dataSource = new MatTableDataSource(this.todoStore.entities());
  // this.dataSource = this.todoStore.items();
  console.log("Entities: ",this.todoStore.entities());
  console.log("Items 1: ", this.todoStore.items())
  //  this.dataSource = new MatTableDataSource(Object.values(this.todoStore.items()));
  console.log("Data Source for MatTable:", this.dataSource)
  this.dataSource.paginator = this.paginator!;
  this.dataSource.sort = this.sort!;
};


ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator!;
  this.dataSource.sort = this.sort!;
  }


  // addTodo() {
  //   this.todoStore.addTodo(this.form.value.todoValue);
  //   this.form.reset();
  // }

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

 // Filter the list
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

onNavigate() {

}

// Goto the detail page for view only
// navigate(id: String, index: String) {
//   this.router.navigate([this.routeToDetail, id, 'view']);
// }
navigate(todo: TodoInterface, index: string) {
  // console.log("route transfert" , user)
  this.router.navigate([this.routeToDetail,todo, 'view']);
}

navigateButton(id: string, mode: string) {
  // mode: 'view' | 'update' | 'create';
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

}
// MatTable mgt
// On click row action
onRowClicked(row: number) {
  // console.log('Row clicked: ', row);
}

}


