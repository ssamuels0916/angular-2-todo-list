import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'my-app',
  template:`
  <section class="todoapp">
    <header class="header">
        <h1>{{name}}</h1>
        <input class="new-to" placeholder="what needs to be done?" autofocus="" [(ngModel)]="newTodo.title" (keyup.enter)="addTodo()">
    </header>
    <section class="main" *ngIf="todos.length > 0">
        <ul class="todo-list">
            <li *ngFor=" let todo of todos" [class.completed]="todo.complete">
                <div class="view"> 
                    <input class ="toggle" type="checkbox" (click)="toggleTodoComplete(todo)" [checked]="todo.complete">
                    <label>{{todo.title}}</label>
                    <button class="destroy" (click)="removeTodo(todo)"></button>
                </div>
            </li>
        </ul>
    </section>
    <footer class="footer" *ngIf="todos.length > 0">
        <span class="todo-count"><strong>{{todos.length}}</strong>{{todos.length == 1 ? 'item': 'items'}} left</span>
    </footer>
</section>
  
  
  
  `,
  providers: [TodoDataService],
})
export class AppComponent  { 
  name = 'To-Do List'; 
  // same Todo instance specified in the two-way binding expression of [(ngModel)] in our view:
  newTodo: Todo = new Todo();


  constructor(private todoDataService: TodoDataService){}

// Next, we implement all methods we used in our view:

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo  = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos();
  }


}

