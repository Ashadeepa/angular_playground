// assembly/matrix.ts - Optimized matrix multiplication

// Standard matrix multiplication - O(n³) complexity
export function multiply(aPtr: usize, bPtr: usize, cPtr: usize, n: i32): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0.0;
      for (let k = 0; k < n; k++) {
        const aIndex = i * n + k;
        const bIndex = k * n + j;
        const aValue = load<f64>(aPtr + (aIndex << 3)); // << 3 is * 8 for f64
        const bValue = load<f64>(bPtr + (bIndex << 3));
        sum += aValue * bValue;
      }
      const cIndex = i * n + j;
      store<f64>(cPtr + (cIndex << 3), sum);
    }
  }
}

// Cache-optimized matrix multiplication with loop tiling
export function multiplyOptimized(aPtr: usize, bPtr: usize, cPtr: usize, n: i32): void {
  const blockSize: i32 = 64; // Tile size for cache optimization
  
  // Initialize result matrix to zero
  for (let i = 0; i < n * n; i++) {
    store<f64>(cPtr + (i << 3), 0.0);
  }
  
  // Tiled matrix multiplication
  for (let ii = 0; ii < n; ii += blockSize) {
    for (let jj = 0; jj < n; jj += blockSize) {
      for (let kk = 0; kk < n; kk += blockSize) {
        const iMax = min(ii + blockSize, n);
        const jMax = min(jj + blockSize, n);
        const kMax = min(kk + blockSize, n);
        
        for (let i = ii; i < iMax; i++) {
          for (let j = jj; j < jMax; j++) {
            let sum = load<f64>(cPtr + ((i * n + j) << 3));
            for (let k = kk; k < kMax; k++) {
              const aValue = load<f64>(aPtr + ((i * n + k) << 3));
              const bValue = load<f64>(bPtr + ((k * n + j) << 3));
              sum += aValue * bValue;
            }
            store<f64>(cPtr + ((i * n + j) << 3), sum);
          }
        }
      }
    }
  }
}

// Rectangular matrix multiplication: A(m×k) × B(k×n) = C(m×n)
export function multiplyRect(aPtr: usize, bPtr: usize, cPtr: usize, m: i32, k: i32, n: i32): void {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0.0;
      for (let kIdx = 0; kIdx < k; kIdx++) {
        const aValue = load<f64>(aPtr + ((i * k + kIdx) << 3));
        const bValue = load<f64>(bPtr + ((kIdx * n + j) << 3));
        sum += aValue * bValue;
      }
      store<f64>(cPtr + ((i * n + j) << 3), sum);
    }
  }
}

// Matrix addition
export function addMatrices(aPtr: usize, bPtr: usize, cPtr: usize, size: i32): void {
  for (let i = 0; i < size; i++) {
    const aValue = load<f64>(aPtr + (i << 3));
    const bValue = load<f64>(bPtr + (i << 3));
    store<f64>(cPtr + (i << 3), aValue + bValue);
  }
}

// Matrix subtraction  
export function subtractMatrices(aPtr: usize, bPtr: usize, cPtr: usize, size: i32): void {
  for (let i = 0; i < size; i++) {
    const aValue = load<f64>(aPtr + (i << 3));
    const bValue = load<f64>(bPtr + (i << 3));
    store<f64>(cPtr + (i << 3), aValue - bValue);
  }
}

// Matrix transpose
export function transpose(srcPtr: usize, dstPtr: usize, rows: i32, cols: i32): void {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const srcIndex = i * cols + j;
      const dstIndex = j * rows + i;
      const value = load<f64>(srcPtr + (srcIndex << 3));
      store<f64>(dstPtr + (dstIndex << 3), value);
    }
  }
}

// Scalar multiplication
export function scalarMultiply(matPtr: usize, scalar: f64, size: i32): void {
  for (let i = 0; i < size; i++) {
    const value = load<f64>(matPtr + (i << 3));
    store<f64>(matPtr + (i << 3), value * scalar);
  }
}

// Matrix identity creation
export function createIdentity(matPtr: usize, n: i32): void {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const index = i * n + j;
      const value = i === j ? 1.0 : 0.0;
      store<f64>(matPtr + (index << 3), value);
    }
  }
}

// Utility function to get minimum of two values
function min(a: i32, b: i32): i32 {
  return a < b ? a : b;
}
