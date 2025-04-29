import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pwa',
  standalone: true,
  imports: [CommonModule], // Import CommonModule to use *ngIf
  templateUrl: './app-pwa.component.html',
  styleUrls: ['./app-pwa.component.scss']
})
export class AppPwaComponent {
  isImageVisible = false;

  ngAfterViewInit() {
    const images = document.querySelectorAll('.progressive-image');
    images.forEach(img => {
      const highResImage = new Image();
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        highResImage.src = dataSrc;
        highResImage.onload = () => {
          img.setAttribute('src', highResImage.src);
        };
      }
    });
  }

  toggleImageVisibility() {
    this.isImageVisible = !this.isImageVisible;
  }
}
