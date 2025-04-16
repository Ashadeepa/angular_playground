import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {VideoChatAppComponent} from "./webrtc-demo/video-chat-app/video-chat-app.component";
import {WebrtcTasksComponent} from "./webrtc-demo/webrtc-tasks/webrtc-tasks.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, VideoChatAppComponent, WebrtcTasksComponent],
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
