import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bypass-security-component',
  imports: [],
  templateUrl: './bypass-security-component.component.html',
  styleUrl: './bypass-security-component.component.css',
  standalone: true
})
export class BypassSecurityComponentComponent {
  public dangerousUrl: string;
  public trustedUrl: SafeUrl;
  public dangerousVideoUrl: string | undefined;
  public videoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {
    // javascript: URLs are dangerous if attacker controlled.
    // Angular sanitizes them in data binding, but you can
    // explicitly tell Angular to trust this value:
    this.dangerousUrl = 'javascript:alert("Hi there")';
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
    // this.updateVideoUrl('PUBnlbjZFAI');
  }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}
