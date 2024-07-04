// src/app/todo-list-app/todo-list-app.component.ts
import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-todo-list-app',
  templateUrl: './todo-list-app.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass
  ],
  styleUrls: ['./todo-list-app.component.scss']
})
export class TodoListAppComponent {
  newTodo: string = '';
  todoList: any[] = [];

  // Function to add a new todo item
  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todoList.push({ task: this.newTodo, completed: false });
      this.newTodo = '';
    }
  }

  // Function to toggle the completion status of a todo item
  toggleComplete(todo: any) {
    todo.completed = !todo.completed;
  }

  // Function to delete a todo item from the list
  deleteTodo(todo: any) {
    const index = this.todoList.indexOf(todo);
    if (index > -1) {
      this.todoList.splice(index, 1);
    }
  }
}
