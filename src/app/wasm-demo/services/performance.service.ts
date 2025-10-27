import { Injectable } from '@angular/core';

export interface PerformanceResult {
  duration: number;
  operations: number;
  operationsPerSecond: number;
  memoryUsed?: number;
  name: string;
}

export interface BenchmarkComparison {
  javascript: PerformanceResult;
  webassembly: PerformanceResult;
  speedup: number;
  winner: 'javascript' | 'webassembly';
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  async measurePerformance<T>(
    operation: () => Promise<T> | T,
    operationCount: number = 1,
    name: string = 'Operation'
  ): Promise<PerformanceResult> {
    /**
     * Attempt to trigger garbage collection when a manual GC hook is
     * exposed in the environment (useful for more consistent benchmarking).
     */
    if ((window as any).gc) {
      (window as any).gc();
    }

    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const startTime = performance.now();

  /** Execute the operation under measurement */
  const result = await operation();

    const endTime = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

    const duration = endTime - startTime;
    const memoryUsed = endMemory - startMemory;

    return {
      duration,
      operations: operationCount,
      operationsPerSecond: operationCount / (duration / 1000),
      memoryUsed: memoryUsed > 0 ? memoryUsed : undefined,
      name
    };
  }

  async benchmarkComparison<T>(
    jsOperation: () => Promise<T> | T,
    wasmOperation: () => Promise<T> | T,
    operationCount: number = 1,
    jsName: string = 'JavaScript',
    wasmName: string = 'WebAssembly'
  ): Promise<BenchmarkComparison> {
  /** Warm up both operations to reduce cold-start noise in measurements */
  await jsOperation();
  await wasmOperation();

  const jsResult = await this.measurePerformance(jsOperation, operationCount, jsName);

  await new Promise(resolve => setTimeout(resolve, 100));

  const wasmResult = await this.measurePerformance(wasmOperation, operationCount, wasmName);

    const speedup = jsResult.duration / wasmResult.duration;
    const winner = speedup > 1 ? 'webassembly' : 'javascript';

    return {
      javascript: jsResult,
      webassembly: wasmResult,
      speedup: Math.abs(speedup),
      winner
    };
  }

  formatDuration(duration: number): string {
    if (duration < 1) {
      return `${(duration * 1000).toFixed(2)}μs`;
    } else if (duration < 1000) {
      return `${duration.toFixed(2)}ms`;
    } else {
      return `${(duration / 1000).toFixed(2)}s`;
    }
  }

  formatMemory(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes}B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)}KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
    }
  }

  formatOperationsPerSecond(ops: number): string {
    if (ops < 1000) {
      return `${ops.toFixed(0)} ops/sec`;
    } else if (ops < 1000000) {
      return `${(ops / 1000).toFixed(2)}K ops/sec`;
    } else {
      return `${(ops / 1000000).toFixed(2)}M ops/sec`;
    }
  }

  /**
   * Utility method to create a rows×cols matrix populated with random values.
   * Useful for generating realistic test data for benchmarks.
   */
  generateMatrix(rows: number, cols: number): number[][] {
    const matrix: number[][] = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = Math.random() * 100;
      }
    }
    return matrix;
  }

  generateImageData(width: number, height: number): ImageData {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    /** Generate random colorful image data (RGBA) */
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.random() * 255;
      data[i + 1] = Math.random() * 255;
      data[i + 2] = Math.random() * 255;
      data[i + 3] = 255;
    }
    
    return imageData;
  }
}