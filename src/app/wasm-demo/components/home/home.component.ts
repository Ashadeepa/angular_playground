import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    {
      title: 'Matrix Multiplication',
      description: 'Compare WebAssembly vs JavaScript performance with real matrix operations',
      icon: '🔢',
      route: '/wasm-demo/matrix',
      highlights: ['Performance benchmarking', 'Large matrix operations', 'Memory optimization']
    },
    {
      title: 'Image Processing',
      description: 'Real-time image filters and transformations using WebAssembly',
      icon: '🖼️',
      route: '/wasm-demo/image',
      highlights: ['Multiple filters', 'Real-time processing', 'File upload support']
    },
    {
      title: 'TensorFlow + WASM',
      description: 'Machine learning digit recognition with WASM acceleration',
      icon: '🧠',
      route: '/wasm-demo/tensorflow',
      highlights: ['Digit recognition', 'WASM backend', 'Interactive canvas']
    }
  ];

  wasmBenefits = [
    { title: 'Near-native Performance', description: 'Execute code at near-native speed in the browser' },
    { title: 'Language Agnostic', description: 'Write in C, C++, Rust, AssemblyScript, and more' },
    { title: 'Secure Sandbox', description: 'Safe execution environment with memory isolation' },
    { title: 'Small Binary Size', description: 'Compact bytecode for efficient loading' }
  ];
}