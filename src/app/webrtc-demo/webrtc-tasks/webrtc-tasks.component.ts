import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-webrtc-tasks',
  standalone: true,
  imports: [],
  templateUrl: './webrtc-tasks.component.html',
  styleUrl: './webrtc-tasks.component.scss'
})
export class WebrtcTasksComponent {
  @ViewChild('webcamVideo') webcamVideo!: ElementRef<HTMLVideoElement>;
  private pc!: RTCPeerConnection;
  private localStream!: MediaStream;

  ngAfterViewInit() {
    this.pc = new RTCPeerConnection({
      iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
      ],
      iceCandidatePoolSize: 10,
    });
  }

  async startWebcam() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    this.localStream.getTracks().forEach(track => {
      this.pc.addTrack(track, this.localStream);
    });

    this.webcamVideo.nativeElement.srcObject = this.localStream;
  }

  async stopWebcam() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null!;
      this.webcamVideo.nativeElement.srcObject = null;
    }
  }

}
