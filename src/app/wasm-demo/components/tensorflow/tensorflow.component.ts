import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-wasm';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';
import * as use from '@tensorflow-models/universal-sentence-encoder';

interface IntentPrediction {
  intent: string;
  similarity: number;
}

@Component({
  selector: 'app-tensorflow',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tensorflow.component.html',
  styleUrls: ['./tensorflow.component.scss']
})
export class TensorflowComponent implements OnInit {
  userText = '';
  model: use.UniversalSentenceEncoder | null = null;
  isModelLoading = false;
  currentPrediction: IntentPrediction | null = null;
  error: string | null = null;

intents = [
  {
    label: 'Booking',
    examples: [
      "I'd like to reserve a table for four this Saturday evening",
      'Can I book a table for tomorrow evening?',
      'Please reserve a spot for me at 7 PM',
      'I need to book a room for next weekend',
      'Do you have availability for a dinner reservation?'
    ]
  },
  {
    label: 'Compliment',
    examples: [
      'Thank you so much for the excellent service!',
      'This was absolutely amazing, I loved every bit of it',
      'Outstanding work, you guys are fantastic!',
      'I really appreciate your help, great job!',
      'The experience was wonderful, thanks a lot!'
    ]
  },
  {
    label: 'Greeting',
    examples: [
      'Hello there, how are you doing today?',
      'Good morning! Hope you are well',
      'Hi everyone, nice to meet you all',
      'Hey, what’s up?',
      'Greetings! How’s your day going?'
    ]
  },
  {
    label: 'Complaint',
    examples: [
      'I am very disappointed with the service quality',
      'This experience was terrible and not worth the money',
      'I am not satisfied with what I received',
      'The food arrived cold and late',
      'I had a bad experience with customer support'
    ]
  },
  {
    label: 'Goodbye',
    examples: [
      'Thank you for everything, goodbye and take care',
      'It was nice talking to you, see you later',
      'Have a wonderful day, bye for now!',
      'Catch you later, bye!',
      'Good night, see you tomorrow'
    ]
  },
  {
    label: 'Question',
    examples: [
      'What time does the restaurant close today?',
      'How much does this cost and what does it include?',
      'Can you help me find the nearest location?',
      'Do you have vegetarian options available?',
      'Where can I find more information about your services?'
    ]
  }
];

 /**
  * Component initialization
  * Load TensorFlow WASM backend and Universal Sentence Encoder model
  */
  async ngOnInit(): Promise<void> {
    try {
      setWasmPaths('/assets/'); // your Angular assets fold
      await tf.setBackend('wasm');
      await tf.ready();
      console.log('✅ TensorFlow WASM backend ready:', tf.getBackend());

      this.isModelLoading = true;
      this.loadModel();
      console.log('✅ USE model loaded');
    } catch (err) {
      console.error('Initialization error:', err);
      this.error = 'Failed to initialize TensorFlow or model.';
      this.isModelLoading = false;
    }
  }

  /**
   * Load the Universal Sentence Encoder model
   * Uses Google-hosted model for simplicity
   * In production, consider hosting your own model
   * for reliability and performance
   */
  private async loadModel(): Promise<void> {
    this.isModelLoading = true;

    try {
      const useModule = await import('@tensorflow-models/universal-sentence-encoder');
      // Google-hosted model
      this.model = await useModule.load({
        modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/universal_sentence_encoder/model.json'
      });
      console.log('✅ USE model loaded successfully from Google storage');
    } catch (err) {
      console.error('Failed to load USE model:', err);
      this.error = 'Failed to load Universal Sentence Encoder.';
    } finally {
      this.isModelLoading = false;
    }
  }

  /**
   * Predict the intent of the user input text
   * Uses cosine similarity between input embedding and example embeddings
   * to determine the best matching intent
   */
  async predictIntent(): Promise<void> {
    if (!this.model || !this.userText.trim()) return;

    try {
      const inputEmbeddingTensor = await this.model.embed([this.userText]);
      const [inputVector] = await inputEmbeddingTensor.array();

      // console.log("Input Embedding:", inputEmbeddingTensor);
      // console.log("Input Vector:", inputVector);

      let bestIntent: IntentPrediction = { intent: '', similarity: -1 };

      for (const intent of this.intents) {
        const exampleEmbeddingTensor = await this.model.embed(intent.examples);
        const exampleVectors = await exampleEmbeddingTensor.array();

        // console.log("Example Embedding:", exampleEmbeddingTensor);
        // console.log("Example Vectors:", exampleVectors);

        const similarities = exampleVectors.map(vec => this.cosineSimilarity(vec, inputVector));

        // console.log("Similarities:", similarities);

        const avgSim = similarities.reduce((a, b) => a + b, 0) / similarities.length;

        // console.log(`Intent: ${intent.label}, Average Similarity: ${avgSim}`);

        if (avgSim > bestIntent.similarity) {
          bestIntent = { intent: intent.label, similarity: avgSim };
        }

        exampleEmbeddingTensor.dispose();
      }

      this.currentPrediction = bestIntent;
      inputEmbeddingTensor.dispose();
    } catch (err) {
      console.error('Prediction error:', err);
      this.error = 'Prediction failed: ' + (err as Error).message;
    }
  }

  /**
   * Compute the cosine similarity between two vectors
   * @param a First vector
   * @param b Second vector
   * @returns Cosine similarity score
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
  }

  /**
   * Clear the input and prediction results
   * Resets the user text, current prediction, and error state
   */
  clear(): void {
    this.userText = '';
    this.currentPrediction = null;
    this.error = null;
  }

  /**
   * Get the icon associated with a specific intent label
   * @param intentLabel The label of the intent
   * @returns The corresponding icon as a string
   */
  getIntentIcon(intentLabel: string): string {
    const icons: Record<string, string> = {
      'Booking': '📅',
      'Compliment': '👍',
      'Greeting': '👋',
      'Complaint': '😠',
      'Goodbye': '👋',
      'Question': '❓'
    };
    return icons[intentLabel] || '💬';
  }
}
