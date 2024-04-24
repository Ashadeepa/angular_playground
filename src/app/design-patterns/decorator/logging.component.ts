import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

function LoggingDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling method ${propertyKey} with arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Method ${propertyKey} returned:`, result);
        return result;
    };
    return descriptor;
}

@Component({
    selector: 'app-logging-component',
    template: '<button (click)="sayHello()">Say Hello</button>',
    standalone: true,
    imports: [CommonModule]
})
export class LoggingComponent {
    @LoggingDecorator
    sayHello() {
        console.log('Hello, world!');
    }
}
