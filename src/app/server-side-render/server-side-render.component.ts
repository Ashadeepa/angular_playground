import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-server-side-render',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf],
  templateUrl: './server-side-render.component.html',
  styleUrl: './server-side-render.component.scss',
  providers: [ApiService]
})
export class ServerSideRenderComponent {
  public imagePath:any = '' ;
  public factLoading: boolean = true;
  public imgLoading: boolean = true;
  public dogFacts:any = '' ;

constructor(public apiService:ApiService) {
    this.getRandomDogImage();
    this.getDogFacts();
  }
  getDogFacts(){
    this.apiService.getAboutDogFacts().subscribe(
      (data) => {
        this.dogFacts = data.data;
        console.log('Cat Facts:', data);
        this.factLoading = false;
      },
      (error) => {
        console.error('Error fetching cat facts:', error);
      }
    );
  }

getRandomDogImage(){
    this.apiService.getRandomImageForDog().subscribe(
      (response) => {
        this.imagePath = response;
        this.imgLoading = false;
      },
      (error) => {
        console.error('Error fetching dog Image:', error);
      }
    );

  }


}
