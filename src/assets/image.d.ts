/** Exported memory */
export declare const memory: WebAssembly.Memory;
// Exported runtime interface
export declare function __new(size: number, id: number): number;
export declare function __pin(ptr: number): number;
export declare function __unpin(ptr: number): void;
export declare function __collect(): void;
export declare const __rtti_base: number;
/**
 * assembly/image/grayscale
 * @param imagePtr `usize`
 * @param width `i32`
 * @param height `i32`
 */
export declare function grayscale(imagePtr: number, width: number, height: number): void;
/**
 * assembly/image/sepia
 * @param imagePtr `usize`
 * @param width `i32`
 * @param height `i32`
 */
export declare function sepia(imagePtr: number, width: number, height: number): void;
/**
 * assembly/image/invert
 * @param imagePtr `usize`
 * @param width `i32`
 * @param height `i32`
 */
export declare function invert(imagePtr: number, width: number, height: number): void;
/**
 * assembly/image/brightness
 * @param imagePtr `usize`
 * @param width `i32`
 * @param height `i32`
 * @param factor `i32`
 */
export declare function brightness(imagePtr: number, width: number, height: number, factor: number): void;
/**
 * assembly/image/contrast
 * @param imagePtr `usize`
 * @param width `i32`
 * @param height `i32`
 * @param factor `f32`
 */
export declare function contrast(imagePtr: number, width: number, height: number, factor: number): void;
