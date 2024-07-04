import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListAppComponent } from './todo-list-app.component';

describe('TodoListAppComponent', () => {
  let component: TodoListAppComponent;
  let fixture: ComponentFixture<TodoListAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, TodoListAppComponent ] // Move TodoListAppComponent to imports
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addItem should add a new todo item', () => {
    const initialLength = component.todoList.length;
    component.newTodo = 'Test Todo';
    component.addTodo();
    expect(component.todoList.length).toBe(initialLength + 1);
    expect(component.todoList[component.todoList.length - 1].task).toEqual('Test Todo');
    expect(component.todoList[component.todoList.length - 1].completed).toBeFalse();
  });

  it('deleteItem should remove a todo item', () => {
    component.newTodo = 'Test Todo';
    component.addTodo();
    const itemToDelete = component.todoList[0];
    component.deleteTodo(itemToDelete);
    expect(component.todoList.length).toBe(0);
  });

  it('markComplete should mark a todo item as completed', () => {
    component.newTodo = 'Test Todo';
    component.addTodo();
    const itemToMark = component.todoList[0];
    component.markComplete(itemToMark);
    expect(itemToMark.completed).toBeTrue();
  });
});

