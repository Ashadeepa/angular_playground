import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot, addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-video-chat-app',
  standalone: true,
  imports: [],
  templateUrl: './video-chat-app.component.html',
  styleUrl: './video-chat-app.component.scss'
})
export class VideoChatAppComponent implements AfterViewInit {
@ViewChild('webcamVideo') webcamVideo!: ElementRef<HTMLVideoElement>;
@ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;
@ViewChild('callInput') callInput!: ElementRef<HTMLInputElement>;

private pc!: RTCPeerConnection;
private localStream!: MediaStream;
private remoteStream!: MediaStream;

private firebaseConfig = {}; 

private app = initializeApp(this.firebaseConfig);
private firestore = getFirestore(this.app);

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
    this.remoteStream = new MediaStream();

    this.localStream.getTracks().forEach(track => {
      this.pc.addTrack(track, this.localStream);
    });

    this.pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => {
        this.remoteStream.addTrack(track);
      });
    };

    this.webcamVideo.nativeElement.srcObject = this.localStream;
    this.remoteVideo.nativeElement.srcObject = this.remoteStream;
  }

  async createCall() {
    const callDocRef = doc(collection(this.firestore, 'calls'));
    const offerCandidates = collection(callDocRef, 'offerCandidates');
    const answerCandidates = collection(callDocRef, 'answerCandidates');

    this.callInput.nativeElement.value = callDocRef.id;

    this.pc.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await this.pc.createOffer();
    await this.pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDocRef, { offer });

    onSnapshot(callDocRef, (snapshot) => {
      const data = snapshot.data();
      if (!this.pc.currentRemoteDescription && data?.['answer']) {
        const answerDescription = new RTCSessionDescription(data['answer']);
        this.pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.pc.addIceCandidate(candidate);
        }
      });
    });
  }

  async answerCall() {
    const callId = this.callInput.nativeElement.value;
    const callDocRef = doc(this.firestore, 'calls', callId);
    const offerCandidates = collection(callDocRef, 'offerCandidates');
    const answerCandidates = collection(callDocRef, 'answerCandidates');

    this.pc.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const callData = (await getDoc(callDocRef)).data();
    if (!callData?.['offer']) return;

    const offerDescription = new RTCSessionDescription(callData['offer']);
    await this.pc.setRemoteDescription(offerDescription);

    const answerDescription = await this.pc.createAnswer();
    await this.pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await setDoc(callDocRef, { ...callData, answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          this.pc.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  hangUp() {
    this.pc.close();
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.remoteStream?.getTracks().forEach((track) => track.stop());
    this.webcamVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
    console.log('Call ended.');
  }
}
