import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { Component, OnInit } from '@angular/core';
import trainingData from '../../assets/trainingData.json';
import testingData from '../../assets/testdata.json'; // Import testing data
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sentiment-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sentiment-analysis.component.html',
  styleUrl: './sentiment-analysis.component.scss'
})
export class SentimentAnalysisComponent implements OnInit {
  model: any;
  tokenizer: Map<string, number> = new Map();
  maxLen: number = 0;
  sentences: string[] = [];
  labels: number[] = [];
  predictionResult: string = '';
  inputSentence: string = '';
  modelAccuracy: string = ''; // Add this line

  ngOnInit() {
    this.loadTrainingData();
  }

  loadTrainingData() {
    this.sentences = trainingData.sentences;
    this.labels = trainingData.labels;
    this.prepareData();
    this.createModel();
    this.trainModel();
  }

  prepareData() {
    let index = 1;
    this.sentences.forEach(sentence => {
      sentence.split(' ').forEach(word => {
        if (!this.tokenizer.has(word)) {
          this.tokenizer.set(word, index++);
        }
      });
    });
    this.maxLen = Math.max(...this.sentences.map(s => s.split(' ').length));
    console.log(`Max sentence length: ${this.maxLen}`);
  }

  encodeSentence(sentence: string): number[] {
    return sentence.split(' ').map(word => this.tokenizer.get(word) || 0);
  }

  createModel() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ inputShape: [this.maxLen], units: 16, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 8, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    this.model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    this.visualizeModel();
    this.visualizeLayers();
  }

  visualizeModel() {
    tfvis.show.modelSummary({ name: 'Model Summary' }, this.model);
  }

  visualizeLayers() {
    this.model.layers.forEach((layer:any, index:any) => {
      tfvis.show.layer({ name: `Layer ${index + 1}` }, layer);
    });
  }

  async trainModel() {
    const encodedSentences = this.sentences.map(s => {
      const encoded = this.encodeSentence(s);
      const padded = this.maxLen >= encoded.length ? [...encoded, ...Array(this.maxLen - encoded.length).fill(0)] : encoded.slice(0, this.maxLen);
      console.log(`Encoded sentence length: ${encoded.length}, Padded length: ${padded.length}`);
      return padded;
    });

    const xs = tf.tensor2d(encodedSentences);
    const ys = tf.tensor2d(this.labels, [this.labels.length, 1]);

    await this.model.fit(xs, ys, {
      epochs: 50,
      callbacks: tfvis.show.fitCallbacks({ name: 'Training Performance' }, ['loss', 'acc'])
    });
    console.log('Training complete!');
    this.evaluateModel();
  }

  async evaluateModel() {
    const testSentences = testingData.sentences;
    const testLabels = testingData.labels;

    console.log(`Test sentences: ${testSentences}`);
    console.log(`Test labels: ${testLabels}`);

    const encodedTestSentences = testSentences.map(s => {
      const encoded = this.encodeSentence(s);
      const padded = this.maxLen >= encoded.length ? [...encoded, ...Array(this.maxLen - encoded.length).fill(0)] : encoded.slice(0, this.maxLen);
      console.log(`Encoded test sentence length: ${encoded.length}, Padded length: ${padded.length}`);
      return padded;
    });

    const xsTest = tf.tensor2d(encodedTestSentences);
    const ysTest = tf.tensor2d(testLabels, [testLabels.length, 1]);

    const results = this.model.evaluate(xsTest, ysTest);
    const accuracy = results[1].dataSync()[0];
    this.modelAccuracy = `${(accuracy * 100).toFixed(2)}%`; // Update this line
    console.log(`Model Accuracy: ${this.modelAccuracy}`);
  }

  async predictSentiment(sentence: string) {
    const encoded = this.encodeSentence(sentence);
    const padded = this.maxLen >= encoded.length ? [...encoded, ...Array(this.maxLen - encoded.length).fill(0)] : encoded.slice(0, this.maxLen);
    const input = tf.tensor2d([padded]);
    const prediction = this.model.predict(input);
    const result = (await prediction.data())[0];
    console.log(`Sentiment Score: ${result.toFixed(3)} (${result > 0.5 ? 'Positive' : 'Negative'})`);
    this.predictionResult = result > 0.5 ? 'Positive' : 'Negative';
  }
}