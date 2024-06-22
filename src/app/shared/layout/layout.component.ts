import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <body>
      <div class="wrapper">
        <side-menu></side-menu>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </div>
    </body>
  `,
  styleUrls: ['./layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    RouterModule,
    SideMenuComponent,
  ],
})
export class LayoutComponent {
  
}
