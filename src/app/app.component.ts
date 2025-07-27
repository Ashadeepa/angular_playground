import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {VideoChatAppComponent} from "./webrtc-demo/video-chat-app/video-chat-app.component";
import {WebrtcTasksComponent} from "./webrtc-demo/webrtc-tasks/webrtc-tasks.component";
import {ScreenShareComponent} from "./webrtc-demo/screen-share/screen-share.component";
import {PwaComponent} from "./pwa/pwa.component";
import { ServerSideRenderComponent } from './server-side-render/server-side-render.component';
import { DesignTokenComponent } from './design-token/design-token.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, VideoChatAppComponent, WebrtcTasksComponent, ScreenShareComponent, PwaComponent, ServerSideRenderComponent, DesignTokenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
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
