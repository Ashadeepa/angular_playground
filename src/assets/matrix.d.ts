/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * assembly/matrix/multiply
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param cPtr `usize`
 * @param n `i32`
 */
export declare function multiply(aPtr: number, bPtr: number, cPtr: number, n: number): void;
/**
 * assembly/matrix/multiplyOptimized
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param cPtr `usize`
 * @param n `i32`
 */
export declare function multiplyOptimized(aPtr: number, bPtr: number, cPtr: number, n: number): void;
/**
 * assembly/matrix/multiplyRect
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param cPtr `usize`
 * @param m `i32`
 * @param k `i32`
 * @param n `i32`
 */
export declare function multiplyRect(aPtr: number, bPtr: number, cPtr: number, m: number, k: number, n: number): void;
/**
 * assembly/matrix/addMatrices
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param cPtr `usize`
 * @param size `i32`
 */
export declare function addMatrices(aPtr: number, bPtr: number, cPtr: number, size: number): void;
/**
 * assembly/matrix/subtractMatrices
 * @param aPtr `usize`
 * @param bPtr `usize`
 * @param cPtr `usize`
 * @param size `i32`
 */
export declare function subtractMatrices(aPtr: number, bPtr: number, cPtr: number, size: number): void;
/**
 * assembly/matrix/transpose
 * @param srcPtr `usize`
 * @param dstPtr `usize`
 * @param rows `i32`
 * @param cols `i32`
 */
export declare function transpose(srcPtr: number, dstPtr: number, rows: number, cols: number): void;
/**
 * assembly/matrix/scalarMultiply
 * @param matPtr `usize`
 * @param scalar `f64`
 * @param size `i32`
 */
export declare function scalarMultiply(matPtr: number, scalar: number, size: number): void;
/**
 * assembly/matrix/createIdentity
 * @param matPtr `usize`
 * @param n `i32`
 */
export declare function createIdentity(matPtr: number, n: number): void;
