import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list-app',
  templateUrl: './todo-list-app.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./todo-list-app.component.scss']
})
export class TodoListAppComponent {
  newTodo: string = '';
  todoList: any[] = [];
  jsonString: any;
  reverseList: any[] | undefined;
  reversejsonString: any;
  findfromLastList: any[] | undefined;
  findfromLastListString: string | undefined;
  isAtChar: any;

  // Function to add a new todo item
  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todoList.push({ task: this.newTodo, completed: false });
      this.newTodo = ''; // Reset input field
    }
    
    //TODO : change array by copy

    //TODO : At()
    
    //TODO : find from last
    
    //TODO: RegExp Match using /d flag
    
  }

  // Function to mark a todo item as completed
  markComplete(todo: any) {
    todo.completed = true;
  }

  // Function to delete a todo item
  deleteTodo(todo: any) {
    this.todoList = this.todoList.filter(t => t !== todo);
  }
}
