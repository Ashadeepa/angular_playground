import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-share',
  standalone: true,
  templateUrl: './screen-share.component.html',
  styleUrls: ['./screen-share.component.scss']
})
export class ScreenShareComponent {
  @ViewChild('screenVideo') screenVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('userVideo') userVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('voiceToText') voiceToText!: ElementRef<HTMLDivElement>;

  private displayStream!: MediaStream;
  private userMediaStream!: MediaStream;

  async toggleScreenShare() {
    if (this.displayStream) {
      this.stopSharing();
    } else {
      await this.startSharing();
    }
  }

  private async startSharing() {
    try {
      this.screenVideo.nativeElement.srcObject = this.displayStream;
      console.debug('Display stream set to video element.');

      this.displayStream.getVideoTracks()[0].onended = () => {
        console.debug('Display sharing stopped by user.');
        this.stopSharing();
      };
    } catch (error) {
      console.error('Error accessing display media:', error);
      alert('Failed to access screen sharing. Please try again.');
    }
  }

  private stopSharing() {
    console.debug('Stopping display sharing...');
    this.displayStream.getTracks().forEach(track => track.stop());
    this.displayStream = null!;
    this.screenVideo.nativeElement.srcObject = null;
    console.debug('Display sharing stopped.');
  }

  async startUserMedia() {
    try {
      console.debug('Requesting user media (camera and mic)...');
      this.userVideo.nativeElement.srcObject = this.userMediaStream;
      console.debug('User media stream set to video element.');

      // Explicitly play the video to handle autoplay restrictions
      //   await this.userVideo.nativeElement.play();
      console.debug('User video playback started.');

      this.startVoiceToText();
    } catch (error) {
      console.error('Error accessing user media:', error);
      alert('Failed to access camera and microphone. Please allow permissions.');
    }
  }

  private startVoiceToText() {
    console.debug('Initializing speech recognition...');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.debug('Speech recognition result received:', event);
      const results = event.results as unknown as SpeechRecognitionResultList; // Explicitly cast to SpeechRecognitionResultList
      let transcript = '';
      for (let i = 0; i < results.length; i++) {
        transcript += results[i][0].transcript;
      }
      console.debug('Transcript generated:', transcript);
      this.voiceToText.nativeElement.innerText = transcript;
    };

    recognition.onerror = (event: { error: string }) => {
      console.error('Speech recognition error:', event.error);
      alert('Speech recognition failed. Please try again.');
    };

    recognition.start();
    console.debug('Speech recognition started.');
  }
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type SpeechRecognitionEvent = Event & {
  results: {
    [index: number]: {
      isFinal: boolean;
      0: {
        transcript: string;
      };
    };
  };
};
