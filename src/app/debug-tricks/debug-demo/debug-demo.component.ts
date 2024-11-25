import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-debug-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './debug-demo.component.html',
  styleUrl: './debug-demo.component.css'
})
export class DebugDemoComponent implements OnInit {
  public advantagesList: any;
  public newAdvantage: any;
  showPopup: boolean = false;

  pop_messages: string[] = [
    "Whoa! Thinking of clicking me? Be gentle!",
    "Careful! I’m ticklish!",
    "Hey, are you sure? I’m not ready for this kind of commitment.",
    "Oh no, here comes the finger...",
    "Before you click, make a wish!",
    "Wait! Are you sure you trust a button like me?",
    "Click me if you dare... but don’t say I didn’t warn you."
  ];
  randomMessage: string = '';
  title = 'angular-debug-demo';

  ngOnInit(): void {
    this.advantagesList = document.getElementById('advantages-list') as HTMLUListElement;
    this.newAdvantage = document.createElement('li');
    this.newAdvantage.innerHTML = "<strong>Comprehensive Documentation:</strong> Backed by Google with extensive documentation and community support.";
  }

  randomize() {
    this.randomMessage = this.pop_messages[Math.floor(Math.random() * this.pop_messages.length)];
  }

  // app.ts

  // Selecting the advantages list and defining the new advantage element
  // Function to toggle the new advantage
  toggleAdvantage(): void {
    console.log('toggleAdvantage start');
    if (this.advantagesList.contains(this.newAdvantage)) {
      console.log('removing advantage');
      this.advantagesList.removeChild(this.newAdvantage);
    } else {
      console.log('Adding advantage');
      this.advantagesList.appendChild(this.newAdvantage);
    }
    console.log('toggleAdvantage end'); 
  }
}
