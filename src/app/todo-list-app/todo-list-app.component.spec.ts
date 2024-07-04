import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListAppComponent } from './todo-list-app.component';

describe('TodoListAppComponent', () => {
  let component: TodoListAppComponent;
  let fixture: ComponentFixture<TodoListAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TodoListAppComponent ] // Import the standalone component here
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

  it('addTodo() should add a new todo item', () => {
    const initialLength = component.todoList.length;
    component.newTodo = 'Test Todo';
    component.addTodo();
    expect(component.todoList.length).toBeGreaterThan(initialLength);
  });

  it('toggleComplete() should toggle the completion status of a todo item', () => {
    component.todoList = [{ task: 'Test Todo', completed: false }];
    component.toggleComplete(component.todoList[0]);
    expect(component.todoList[0].completed).toBeTruthy();
  });

  it('deleteTodo() should remove a todo item', () => {
    component.todoList = [{ task: 'Test Todo', completed: false }];
    const initialLength = component.todoList.length;
    component.deleteTodo(component.todoList[0]);
    expect(component.todoList.length).toBeLessThan(initialLength);
  });
});
