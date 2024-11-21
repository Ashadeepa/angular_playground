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

  ngOnInit(): void {
    this.advantagesList = document.getElementById('advantages-list') as HTMLUListElement;
    this.newAdvantage = document.createElement('li');
    this.newAdvantage.innerHTML = "<strong>Comprehensive Documentation:</strong> Backed by Google with extensive documentation and community support.";

  }
  title = 'angular-debug-demo';

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
