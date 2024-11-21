import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, takeWhile } from 'rxjs';

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
  private counterSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.startCounter();
     // Initialize list of 100 fruits and vegetables
     this.fruitsAndVegetables = [
      'Apple', 'Apricot', 'Avocado', 'Asparagus', 'Artichoke', 'Banana', 'Blueberry', 'Blackberry', 'Broccoli', 'Cabbage',
      'Carrot', 'Cauliflower', 'Celery', 'Cherry', 'Cucumber', 'Date', 'Dragonfruit', 'Durian', 'Eggplant', 'Elderberry',
      'Fennel', 'Fig', 'Grape', 'Grapefruit', 'Garlic', 'Ginger', 'Gooseberry', 'Guava', 'Honeydew', 'Jackfruit',
      'Jalapeño', 'Jujube', 'Kale', 'Kiwi', 'Kumquat', 'Lemon', 'Lime', 'Lychee', 'Mango', 'Mulberry',
      'Mushroom', 'Nectarine', 'Olive', 'Onion', 'Orange', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Pineapple',
      'Plum', 'Pomegranate', 'Potato', 'Pumpkin', 'Quince', 'Radish', 'Raspberry', 'Rhubarb', 'Spinach', 'Starfruit',
      'Strawberry', 'Sweet Potato', 'Tamarind', 'Tomato', 'Turnip', 'Ugli Fruit', 'Watermelon', 'Yam', 'Zucchini', 
      'Acorn Squash', 'Acerola', 'Arugula', 'Bok Choy', 'Butternut Squash', 'Chayote', 'Collard Greens', 'Cranberry', 
      'Daikon', 'Dandelion Greens', 'Endive', 'Escarole', 'Horseradish', 'Jicama', 'Kohlrabi', 'Leek', 'Lettuce', 
      'Okra', 'Parsley', 'Parsnip', 'Pea', 'Poblano', 'Rutabaga', 'Snow Pea', 'Sorrel', 'Swiss Chard', 'Watercress'
    ];

    
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

  private enrichFruitesAndVeggies() {
    console.log('fruites and veggies processing start')
    this.itemsStartingWithA = this.fruitsAndVegetables
      .map(item => `${item}_${item.length}`)
      .filter(item => {
        return item.startsWith('A');
      });
    console.log('fruites and veggies processing complete')
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

  fruitsAndVegetables: string[] = [];
  itemsStartingWithA: string[] = [];

  ngOnDestroy(): void {
    this.stopCounter();
  }
}
