import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasmLoaderService } from '../../services/wasm-loader.service';
import { PerformanceService, BenchmarkComparison } from '../../services/performance.service';

@Component({
  selector: 'app-matrix-multiplication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './matrix-multiplication.component.html',
  styleUrls: ['./matrix-multiplication.component.scss']
})
export class MatrixMultiplicationComponent implements OnInit {
  /** Component configuration defaults */
  matrixSize = 100;
  iterations = 10;
  isRunning = false;

  /** Options presented in the matrix size dropdown (value, label, description) */
  matrixSizeOptions = [
    { value: 10, label: '10×10', description: 'Tiny (100 elements)', operations: '1,000 operations' },
    { value: 25, label: '25×25', description: 'Small (625 elements)', operations: '15,625 operations' },
    { value: 50, label: '50×50', description: 'Medium (2,500 elements)', operations: '125,000 operations' },
    { value: 100, label: '100×100', description: 'Large (10,000 elements)', operations: '1,000,000 operations' },
    { value: 150, label: '150×150', description: 'Extra Large (22,500 elements)', operations: '3,375,000 operations' },
    { value: 200, label: '200×200', description: 'Huge (40,000 elements)', operations: '8,000,000 operations' },
    { value: 300, label: '300×300', description: 'Massive (90,000 elements)', operations: '27,000,000 operations' },
    { value: 400, label: '400×400', description: 'Extreme (160,000 elements)', operations: '64,000,000 operations' }
  ];

  /** Memory management and diagnostic state */
  // Memory diagnostics and recommended sizes were removed from the UI.
  // Keep runtime checks in validateAndPrepareMemory to avoid OOM, but
  // we don't maintain UI-specific memory state here.

  /** Benchmark results and progress state */
  benchmarkResult: BenchmarkComparison | null = null;
  currentProgress = 0;
  performanceAnalysis: string = '';

  /** Visualization matrices used when `matrixSize` is small for UI display */
  showMatrices = false;
  matrixA: number[][] = [];
  matrixB: number[][] = [];
  resultMatrix: number[][] = [];
  matrixCalculationSteps: string[] = [];

  /** Flags to show educational explanations in the UI */
  showIterationExplanation = false;
  showMatrixExplanation = false;

  /** Error and loading state */
  error: string | null = null;
  wasmLoaded = false;

  constructor(
    public wasmLoader: WasmLoaderService,
    public performanceService: PerformanceService
  ) { }

  async ngOnInit() {
    try {
      await this.loadWasm();
      this.wasmLoaded = true;
      // WASM loaded. Memory UI state was removed.
    } catch (error) {
      console.error('Failed to load WASM:', error);
      this.error = 'Failed to load WebAssembly module';
    }
  }

  private wasm: any;

  /**
   * Load the matrix WASM module using the WasmLoaderService.
   * The loaded exports are stored on this component instance.
   */
  async loadWasm() {
    this.wasm = await this.wasmLoader.loadWasm('assets/matrix.wasm');
  }

  /**
   * Validate matrix operation parameters and ensure WASM memory capacity.
   * Returns true when memory has been validated and prepared.
   */
  async validateAndPrepareMemory(): Promise<boolean> {
    if (!this.wasm) {
      this.error = 'WASM module not loaded';
      return false;
    }


    const validation = this.wasmLoader.validateMatrixOperation(this.matrixSize, this.wasm);

    if (!validation.isValid) {
      this.error = validation.errorMessage || 'Matrix operation validation failed';
      return false;
    }


    const memoryEnsured = await this.wasmLoader.ensureMemoryCapacity(
      this.wasm,
      validation.requirement.totalBytesNeeded
    );

    if (!memoryEnsured) {
      this.error = `Insufficient memory for ${this.matrixSize}x${this.matrixSize} matrices. Try a smaller size.`;
      return false;
    }
    return true;
  }

  /**
   * Run the JavaScript vs WebAssembly benchmark for matrix multiplication.
   * Generates test matrices, runs warmups and timed iterations, then
   * populates `benchmarkResult` and `performanceAnalysis`.
   */
  async runBenchmark() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.error = null;
    this.currentProgress = 0;

    try {

      const memoryReady = await this.validateAndPrepareMemory();
      if (!memoryReady) {
        this.isRunning = false;
        return;
      }
      const size = this.matrixSize;
      const iterations = this.iterations;


      this.showMatrices = size <= 5;
      if (this.showMatrices) {
        this.generateVisualizationMatrices();
      }


      const matrixA = this.performanceService.generateMatrix(size, size);
      const matrixB = this.performanceService.generateMatrix(size, size);



      // Use typed Float64Array for parity between JS and WASM paths
      const flatA = new Float64Array(matrixA.flat() as number[]);
      const flatB = new Float64Array(matrixB.flat() as number[]);



      const jsMultiply = () => {
        const n = size;
        const resultFlat = new Float64Array(n * n);

        for (let i = 0; i < n; i++) {
          const rowOffset = i * n;
          for (let j = 0; j < n; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
              sum += flatA[rowOffset + k] * flatB[k * n + j];
            }
            resultFlat[rowOffset + j] = sum;
          }
        }


        // If the UI needs a nested matrix (small sizes for visualization),
        // convert to number[][]. Otherwise return the flat Float64Array
        // for better benchmark accuracy and lower allocation overhead.
        if (this.showMatrices) {
          const result: number[][] = new Array(n);
          for (let i = 0; i < n; i++) {
            const row = new Array(n);
            const rowOffset = i * n;
            for (let j = 0; j < n; j++) {
              row[j] = resultFlat[rowOffset + j];
            }
            result[i] = row;
          }
          return result;
        }

        return resultFlat;
      };


      const wasmMultiply = () => {
        const memory = (this.wasm.memory as WebAssembly.Memory).buffer;
        const elementSize = 8;
        const matrixBytes = size * size * elementSize;


        const aPtr = 1024;
        const bPtr = 1024 + matrixBytes;
        const cPtr = 1024 + matrixBytes * 2;


        const aArray = new Float64Array(memory, aPtr, size * size);
        const bArray = new Float64Array(memory, bPtr, size * size);
        const cArray = new Float64Array(memory, cPtr, size * size);


        aArray.set(flatA);
        bArray.set(flatB);


        this.wasm.multiplyOptimized(aPtr, bPtr, cPtr, size);


        // Convert to nested arrays only when needed for visualization.
        if (this.showMatrices) {
          const result: number[][] = new Array(size);
          for (let i = 0; i < size; i++) {
            const row = new Array(size);
            const base = i * size;
            for (let j = 0; j < size; j++) {
              row[j] = cArray[base + j];
            }
            result[i] = row;
          }
          return result;
        }

        // Return a detached copy of the flat buffer for benchmarking
        return new Float64Array(cArray);
      };


      this.currentProgress = 25;
      await new Promise(resolve => setTimeout(resolve, 100));


      this.benchmarkResult = await this.performanceService.benchmarkComparison(
        jsMultiply,
        wasmMultiply,
        iterations,
        'JavaScript',
        'WebAssembly'
      );

      // Verify that both implementations produce (approximately) the same result.
      try {
        const jsOut = jsMultiply();
        const wasmOut = wasmMultiply();

        // Helper to convert either a flat Float64Array or number[][] to a flat Float64Array
        const toFlat = (v: any): Float64Array => {
          if (v instanceof Float64Array) return v as Float64Array;
          if (Array.isArray(v) && Array.isArray(v[0])) {
            const n = v.length;
            const out = new Float64Array(n * n);
            for (let i = 0; i < n; i++) {
              for (let j = 0; j < n; j++) out[i * n + j] = v[i][j];
            }
            return out;
          }
          // Fallback: coerce to Float64Array
          return new Float64Array(v as number[]);
        };

        const flatJs = toFlat(jsOut);
        const flatWasm = toFlat(wasmOut);

        // Compute simple checksum (sum of elements) and a small diff metric
        const sum = (arr: Float64Array) => {
          let s = 0;
          for (let i = 0; i < arr.length; i++) s += arr[i];
          return s;
        };

        const jsSum = sum(flatJs);
        const wasmSum = sum(flatWasm);
        let maxDiff = 0;
        for (let i = 0; i < Math.min(flatJs.length, flatWasm.length); i++) {
          const d = Math.abs(flatJs[i] - flatWasm[i]);
          if (d > maxDiff) maxDiff = d;
        }

        console.log('Result check — JS sum:', jsSum, 'WASM sum:', wasmSum, 'maxElemDiff:', maxDiff);
      } catch (err) {
        console.warn('Result verification failed:', err);
      }


      if (this.showMatrices) {
        const jsRes = jsMultiply();
        this.resultMatrix = jsRes as unknown as number[][];
        this.generateMatrixCalculationSteps();
      }

      this.currentProgress = 100;


      this.generatePerformanceAnalysis();

    } catch (error) {
      console.error('Benchmark error:', error);
      this.error = 'Benchmark failed: ' + (error as Error).message;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Generate small matrices for visual display and round values for readability.
   */
  private generateVisualizationMatrices() {
    const size = Math.min(this.matrixSize, 5);
    this.matrixA = this.performanceService.generateMatrix(size, size);
    this.matrixB = this.performanceService.generateMatrix(size, size);


    this.matrixA = this.matrixA.map(row => row.map(val => Math.round(val * 10) / 10));
    this.matrixB = this.matrixB.map(row => row.map(val => Math.round(val * 10) / 10));
  }

  onMatrixSizeChange() {
    this.benchmarkResult = null;
    this.performanceAnalysis = '';
    this.showMatrices = this.matrixSize <= 5;
    if (this.showMatrices) {
      this.generateVisualizationMatrices();
    }
  }

  /** Return the currently selected matrix option from the list */
  getSelectedMatrixOption() {
    return this.matrixSizeOptions.find(option => option.value === this.matrixSize);
  }

  /**
   * Return a human-readable description of the current multiplication setup,
   * including per-element operation counts and complexity.
   */
  getMatrixMultiplicationDescription(): string {
    const option = this.getSelectedMatrixOption();
    if (!option) return '';

    const size = this.matrixSize;
    return `${option.label} matrix × ${option.label} matrix = ${option.label} result matrix
Each element requires ${size} multiplications and ${size - 1} additions
Total computational complexity: O(n³) = ${option.operations}`;
  }

  /** Utility to compute CSS class for performance winner/loser badges */
  getPerformanceClass(winner: string, current: string): string {
    if (winner === current) {
      return winner === 'webassembly' ? 'winner-wasm' : 'winner-js';
    }
    return 'loser';
  }

  /** Return a short text describing the speedup and winner */
  getSpeedupText(): string {
    if (!this.benchmarkResult) return '';

    const { speedup, winner } = this.benchmarkResult;
    const winnerText = winner === 'webassembly' ? 'WebAssembly' : 'JavaScript';

    return `${winnerText} is ${speedup.toFixed(2)}x faster`;
  }

  /**
   * Produce human-readable step-by-step calculations for the first few
   * elements of the result matrix when matrices are displayed.
   */
  generateMatrixCalculationSteps() {
    if (!this.showMatrices || this.matrixA.length === 0 || this.matrixB.length === 0) return;

    this.matrixCalculationSteps = [];
    const size = this.matrixA.length;


    for (let i = 0; i < Math.min(2, size); i++) {
      for (let j = 0; j < Math.min(2, size); j++) {
        let calculation = `C[${i}][${j}] = `;
        let steps = [];

        for (let k = 0; k < size; k++) {
          const aVal = this.matrixA[i][k];
          const bVal = this.matrixB[k][j];
          steps.push(`A[${i}][${k}] × B[${k}][${j}] = ${aVal} × ${bVal} = ${(aVal * bVal).toFixed(1)}`);
        }

        calculation += steps.join(' + ');
        const result = this.resultMatrix[i][j];
        calculation += ` = ${result.toFixed(1)}`;

        this.matrixCalculationSteps.push(calculation);
      }
    }
  }

  /**
   * Create an explanatory performance analysis string based on the
   * benchmark results, summarizing why a winner was faster.
   */
  generatePerformanceAnalysis() {
    if (!this.benchmarkResult) return;

    const { winner, speedup, javascript, webassembly } = this.benchmarkResult;
    const jsTime = javascript.duration;
    const wasmTime = webassembly.duration;
    const matrixSize = this.matrixSize;
    const totalOperations = matrixSize * matrixSize * matrixSize;

    let analysis = '';

    if (winner === 'webassembly') {
      analysis = `🚀 **WebAssembly is ${speedup.toFixed(2)}x faster** (${wasmTime.toFixed(2)}ms vs ${jsTime.toFixed(2)}ms)\n\n`;

      if (matrixSize >= 200) {
        analysis += `**Why WASM wins for large matrices (${matrixSize}×${matrixSize}):**\n`;
        analysis += `• **Optimized Memory Access**: WASM uses linear memory with predictable layout\n`;
        analysis += `• **No Garbage Collection**: Avoids GC pauses during intensive computation\n`;
        analysis += `• **SIMD Instructions**: Can utilize vectorized operations\n`;
        analysis += `• **Cache Efficiency**: Better memory locality for large data sets\n`;
        analysis += `• **${totalOperations.toLocaleString()} operations** benefit from compiled code\n`;
      } else {
        analysis += `**Why WASM wins for medium matrices (${matrixSize}×${matrixSize}):**\n`;
        analysis += `• **Compiled Code**: No interpretation overhead\n`;
        analysis += `• **Optimized Loops**: Better loop unrolling and optimization\n`;
        analysis += `• **Memory Management**: Direct memory access without bounds checking\n`;
        analysis += `• **Type Safety**: No dynamic type checking during computation\n`;
      }
    } else {
      analysis = `⚡ **JavaScript is ${speedup.toFixed(2)}x faster** (${jsTime.toFixed(2)}ms vs ${wasmTime.toFixed(2)}ms)\n\n`;

      if (matrixSize <= 50) {
        analysis += `**Why JavaScript wins for small matrices (${matrixSize}×${matrixSize}):**\n`;
        analysis += `• **JIT Optimization**: V8 engine optimizes hot code paths\n`;
        analysis += `• **No WASM Overhead**: Avoids WebAssembly call/return costs\n`;
        analysis += `• **Native Arrays**: JavaScript arrays are highly optimized\n`;
        analysis += `• **Small Data Set**: JIT compilation overhead pays off quickly\n`;
        analysis += `• **${totalOperations.toLocaleString()} operations** are few enough for JS optimization\n`;
      } else {
        analysis += `**Why JavaScript wins (unexpected for ${matrixSize}×${matrixSize}):**\n`;
        analysis += `• **Aggressive JIT**: Modern JavaScript engines are extremely optimized\n`;
        analysis += `• **WASM Call Overhead**: WebAssembly function call costs\n`;
        analysis += `• **Memory Copy Costs**: Data transfer between JS and WASM\n`;
        analysis += `• **Browser Implementation**: WASM backend may not be fully optimized\n`;
        analysis += `• **Tip**: Try larger matrices (>300) where WASM typically excels\n`;
      }
    }

    analysis += `\n**About the ${this.iterations} iterations:**\n`;
    analysis += `• Each function ran ${this.iterations} times to get reliable averages\n`;
    analysis += `• First run is often slower due to "cold start" effects\n`;
    analysis += `• Multiple runs help eliminate random performance variations\n`;
    analysis += `• Standard deviation shows measurement consistency\n`;

    this.performanceAnalysis = analysis;
  }

  toggleIterationExplanation() {
    this.showIterationExplanation = !this.showIterationExplanation;
  }

  toggleMatrixExplanation() {
    this.showMatrixExplanation = !this.showMatrixExplanation;
  }
}