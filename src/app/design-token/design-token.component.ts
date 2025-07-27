import { Component } from '@angular/core';
import { ButtonModule } from '@niceltd/sol/button';
import { DropdownModule } from '@niceltd/sol/dropdown';
@Component({
  selector: 'app-design-token',
  standalone: true,
  imports: [ ButtonModule, DropdownModule ],
  // providers: [ SolarisModule ],
  templateUrl: './design-token.component.html',
  styleUrl: './design-token.component.scss'
})
export class DesignTokenComponent {

}
