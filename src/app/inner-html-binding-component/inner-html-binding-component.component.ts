import { Component } from '@angular/core';

@Component({
  selector: 'app-inner-html-binding-component',
  imports: [],
  templateUrl: './inner-html-binding-component.component.html',
  styleUrl: './inner-html-binding-component.component.css',
  standalone: true
})
export class InnerHtmlBindingComponentComponent {
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
