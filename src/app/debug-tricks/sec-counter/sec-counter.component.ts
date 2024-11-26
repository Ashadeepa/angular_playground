import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, takeWhile } from 'rxjs';
import  fruitesAndVeggies from '../../../assets/fruitesAndVegetables.json';
import { FruitsAndVegetablesResponse } from '../FruitsAndVegetablesResponse.model';

@Component({
  selector: 'app-sec-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sec-counter.component.html',
  styleUrl: './sec-counter.component.css'
})
export class SecCounterComponent implements OnInit, OnDestroy {

  counter = 0;
  maxSeconds = 100;
  counterSubscription: Subscription | undefined;
  
  fruitsAndVegetablesResponse:FruitsAndVegetablesResponse[] = fruitesAndVeggies;
  itemsStartingWithA: string[] = [];
  processedFruitesAndVeggies:FruitsAndVegetablesResponse[] = []

  ngOnInit(): void {
    this.startCounter();
    // Initialize list of 100 fruits and vegetables

    // Filter the list for items that start with 'A'
    this.enrichFruitesAndVeggies();
    this.logAllOders();
  }

  private logAllOders() {
    let orders = [
      { name: 'Apple', category: 'Fruit', price: 1.2, quantity: 100 },
      { name: 'Banana', category: 'Fruit', price: 0.5, quantity: 150 },
      { name: 'Orange', category: 'Fruit', price: 1.0, quantity: 120 },
      { name: 'Grapes', category: 'Fruit', price: 2.5, quantity: 80 },
      { name: 'Carrot', category: 'Vegetable', price: 0.8, quantity: 200 },
      { name: 'Tomato', category: 'Vegetable', price: 1.1, quantity: 130 },
      { name: 'Potato', category: 'Vegetable', price: 0.6, quantity: 250 },
      { name: 'Broccoli', category: 'Vegetable', price: 1.7, quantity: 90 }
    ];
    // console.log('Orders: ',orders);
    // console.table(orders);
  }

  enrichFruitesAndVeggies() {
    console.log('fruites and veggies processing start');
    this.processedFruitesAndVeggies = this.fruitsAndVegetablesResponse.filter((item)=>{
      return item.cost && (item.cost < 100) && (item.status.toLowerCase() === 'fresh');
    })
    this.itemsStartingWithA = this.fruitsAndVegetablesResponse.map(ele=>ele.name)
      .map(item => `${item}_${item?.length}`)
      .filter(item => {
        return item.toUpperCase().startsWith('A');
      });
    console.log('fruites and veggies processing complete');
  }

  startCounter(): void {
    // Stop any previous counter if exists
    console.group('seconds Counter');
    this.stopCounter();
    console.log('counting is starting');

    // Start the interval counter
    this.counterSubscription = interval(1000)
      .pipe(takeWhile(() => this.counter < this.maxSeconds))
      .subscribe(() => {
        this.counter++;
      });
    console.log('counting is started');
    console.groupEnd();
  }

  stopCounter(): void {
    console.group('seconds Counter stop');
    console.log('counter is stopping')
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
      console.log('counter unsubscribed');
    }
    console.groupEnd()
  }

  resetCounter(): void {
    this.counter = 0;
    this.startCounter();
  }

  ngOnDestroy(): void {
    this.stopCounter();
  }
}
