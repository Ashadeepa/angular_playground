import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pwa',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import CommonModule to use *ngIf
  templateUrl: './app-pwa.component.html',
  styleUrls: ['./app-pwa.component.scss'],
  providers: [ApiService] // Provide ApiService here
})
export class AppPwaComponent implements OnInit {
  isImageVisible = false;
  isOnline = navigator.onLine;
  posts: any[] = [];
  users: any[] = [];
  dogFacts: any[] = [];
  imagePath: any;
  constructor(private apiService: ApiService) {}

  @HostListener('window:online', ['$event'])
  onOnline() {
    this.isOnline = true;
    alert('You are back online!');
  }

  @HostListener('window:offline', ['$event'])
  onOffline() {
    this.isOnline = false;
    alert('You are offline. Some features may not work.');
  }


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

  ngOnInit() {
    this.getRandomDogImage();
    setInterval(() => {
      this.getRandomDogImage(); // Fetch a new image every 10 seconds
    }, 10000);
    this.getDogFacts();
  }








  getDogFacts(){
    this.apiService.getAboutDogFacts().subscribe(
      (data) => {
        this.dogFacts = data.data;
        console.log('Cat Facts:', data);
      },
      (error) => {
        console.error('Error fetching cat facts:', error);
      }
    );
  }

  getRandomDogImage(){
    this.apiService.getRandomImageForDog().subscribe(
      (response) => {
        return this.imagePath = response;

      },
      (error) => {
        console.error('Error fetching dog Image:', error);
      }
    );

  }

}
