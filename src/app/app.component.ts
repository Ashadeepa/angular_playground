import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule],
  template: `<mat-toolbar color="primary">
      <mat-toolbar-row> Deferred Loading </mat-toolbar-row>
    </mat-toolbar>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {}
