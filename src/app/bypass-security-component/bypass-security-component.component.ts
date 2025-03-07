import { Component } from '@angular/core';

@Component({
  selector: 'app-bypass-security-component',
  imports: [],
  templateUrl: './bypass-security-component.component.html',
  styleUrl: './bypass-security-component.component.css',
  standalone: true
})
export class BypassSecurityComponentComponent {
  public dangerousUrl: string;

  constructor() {
    // javascript: URLs are dangerous if attacker controlled.
    // Angular sanitizes them in data binding, but you can
    // explicitly tell Angular to trust this value:
    this.dangerousUrl = 'javascript:alert("Hi there")';
  }
}
