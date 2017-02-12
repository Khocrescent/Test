import { Component } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
// Import class so we can register it as dependency injection token
import {TodoDataService} from './todo-data.service';
import {Todo} from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  newTodo: Todo = new Todo(); 
  viewComplete :boolean = false;
  storage;

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(
    private localStorageService: LocalStorageService,
    private todoDataService: TodoDataService) {
  }
  store(){
    localStorage.setItem("todo", JSON.stringify(this.todoDataService.getAllTodos()));
    var storeArray = JSON.parse(localStorage.getItem("todo"));
    console.log(storeArray);
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    this.store();
  }

  // Service is now available as this.todoDataService
  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  toggleTodoViewComplete() {
    this.viewComplete = !this.viewComplete;
    return this.viewComplete;
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
    this.store();
  }

  updateTodo(todo, newValue){
    todo.title = newValue;
    todo.edit = false;
    return this.todoDataService.updateTodo(todo.id);
  }

  toggleView(){
    return this.viewComplete;
  }
  get todos() {
    return this.todoDataService.getAllTodos();
  }

  title = 'app works! hello world';
}
