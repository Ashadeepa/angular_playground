import { Injectable } from '@angular/core';

interface MemoryInfo {
  currentPages: number;
  currentBytes: number;
  maxPages: number;
  maxBytes: number;
  availableBytes: number;
}

interface MatrixMemoryRequirement {
  matrixSize: number;
  totalElements: number;
  bytesPerMatrix: number;
  totalBytesNeeded: number;
  pagesNeeded: number;
  isWithinLimits: boolean;
  recommendation: string;
}

@Injectable({ providedIn: 'root' })
export class WasmLoaderService {
  private wasmCache: Record<string, any> = {};
  /** WASM memory page size in bytes (64KB) */
  private readonly WASM_PAGE_SIZE = 65536;
  /** Conservative recommended maximum matrix dimension to avoid large memory growth */
  private readonly MAX_SAFE_MATRIX_SIZE = 500;
  private readonly BYTES_PER_F64 = 8;
  /** Number of matrices used in a single operation (A, B, and result C) */
  private readonly MATRICES_PER_OPERATION = 3;

  async loadWasm(path: string) {
    if (this.wasmCache[path]) return this.wasmCache[path];

    const imports = {
      env: {
        abort(_msg: number, _file: number, line: number, column: number) {
          console.error("WASM abort at", line, ":", column);
        }
      }
    };

    const response = await fetch(path);
    const bytes = await response.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(bytes, imports);

    const instance = wasmModule.instance;
    const exports = instance.exports as any;

    this.wasmCache[path] = exports;
    return exports;
  }

  /**
   * Calculate memory requirements for matrix operations
   */
  calculateMatrixMemoryRequirement(matrixSize: number): MatrixMemoryRequirement {
    const totalElements = matrixSize * matrixSize;
    const bytesPerMatrix = totalElements * this.BYTES_PER_F64;
    const totalBytesNeeded = bytesPerMatrix * this.MATRICES_PER_OPERATION;
    const pagesNeeded = Math.ceil(totalBytesNeeded / this.WASM_PAGE_SIZE);
    
    const isWithinLimits = matrixSize <= this.MAX_SAFE_MATRIX_SIZE;
    
    let recommendation = '';
    if (matrixSize > this.MAX_SAFE_MATRIX_SIZE) {
      recommendation = `Matrix size ${matrixSize} exceeds recommended limit of ${this.MAX_SAFE_MATRIX_SIZE}. Consider using smaller matrices for optimal performance.`;
    } else if (matrixSize > 300) {
      recommendation = `Large matrix size (${matrixSize}). Performance may vary depending on available memory.`;
    } else if (matrixSize > 100) {
      recommendation = `Medium matrix size (${matrixSize}). Good for performance testing.`;
    } else {
      recommendation = `Small matrix size (${matrixSize}). Suitable for quick testing.`;
    }

    return {
      matrixSize,
      totalElements,
      bytesPerMatrix,
      totalBytesNeeded,
      pagesNeeded,
      isWithinLimits,
      recommendation
    };
  }

  /**
   * Get current memory information from WASM instance
   */
  getMemoryInfo(wasmInstance: any): MemoryInfo {
    const memory = wasmInstance.memory as WebAssembly.Memory;
    const currentPages = memory.buffer.byteLength / this.WASM_PAGE_SIZE;
    const currentBytes = memory.buffer.byteLength;
    
  /**
   * WebAssembly memory can grow up to 4GB (65536 pages) in theory,
   * but browsers often impose lower practical limits. We use a
   * conservative maxPages value for compatibility.
   */
  const maxPages = 1024;
    const maxBytes = maxPages * this.WASM_PAGE_SIZE;
    const availableBytes = maxBytes - currentBytes;

    return {
      currentPages: Math.floor(currentPages),
      currentBytes,
      maxPages,
      maxBytes,
      availableBytes
    };
  }

  /**
   * Ensure WASM memory can accommodate the required size
   */
  async ensureMemoryCapacity(wasmInstance: any, requiredBytes: number): Promise<boolean> {
    const memory = wasmInstance.memory as WebAssembly.Memory;
    const currentBytes = memory.buffer.byteLength;
    
    if (currentBytes >= requiredBytes) {
      return true;
    }

    const requiredPages = Math.ceil(requiredBytes / this.WASM_PAGE_SIZE);
    const currentPages = Math.floor(currentBytes / this.WASM_PAGE_SIZE);
    const additionalPages = requiredPages - currentPages;

    try {
      memory.grow(additionalPages);
      console.log(`WASM memory grown by ${additionalPages} pages (${additionalPages * this.WASM_PAGE_SIZE / 1024}KB)`);
      return true;
    } catch (error) {
      console.error('Failed to grow WASM memory:', error);
      return false;
    }
  }

  /**
   * Validate if matrix operation is feasible with current memory constraints
   */
  validateMatrixOperation(matrixSize: number, wasmInstance?: any): {
    isValid: boolean;
    requirement: MatrixMemoryRequirement;
    memoryInfo?: MemoryInfo;
    errorMessage?: string;
  } {
    const requirement = this.calculateMatrixMemoryRequirement(matrixSize);
    
    
    if (matrixSize <= 0) {
      return {
        isValid: false,
        requirement,
        errorMessage: 'Matrix size must be positive'
      };
    }

    if (matrixSize > 1000) {
      return {
        isValid: false,
        requirement,
        errorMessage: 'Matrix size too large. Maximum supported size is 1000x1000'
      };
    }

  if (wasmInstance) {
      const memoryInfo = this.getMemoryInfo(wasmInstance);
      
      if (requirement.totalBytesNeeded > memoryInfo.maxBytes) {
        return {
          isValid: false,
          requirement,
          memoryInfo,
          errorMessage: `Required memory (${this.formatBytes(requirement.totalBytesNeeded)}) exceeds maximum available (${this.formatBytes(memoryInfo.maxBytes)})`
        };
      }
    }

    return {
      isValid: true,
      requirement,
      memoryInfo: wasmInstance ? this.getMemoryInfo(wasmInstance) : undefined
    };
  }

  /**
   * Format bytes for human-readable display
   */
  formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  /**
   * Get recommended matrix sizes for different performance levels
   */
  getRecommendedSizes(): { size: number; label: string; description: string }[] {
    return [
      { size: 50, label: 'Small', description: 'Quick testing, minimal memory usage' },
      { size: 100, label: 'Medium', description: 'Balanced performance testing' },
      { size: 200, label: 'Large', description: 'Stress testing, higher memory usage' },
      { size: 300, label: 'Extra Large', description: 'Maximum recommended size' }
    ];
  }
}
