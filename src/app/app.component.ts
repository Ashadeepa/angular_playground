import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular17';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  isRouterLinkEqualTo(route: string): boolean {
    // @ts-ignore
    const currentRoute = this.activatedRoute.snapshot['_routerState'].url;
    return currentRoute === route;
  }
}
