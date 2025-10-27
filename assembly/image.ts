/**
 * Applies a grayscale filter to the image.
 * @param imagePtr Pointer to the image data
 * @param width Width of the image
 * @param height Height of the image
 */

export function grayscale(imagePtr: usize, width: i32, height: i32): void {
  const pixelCount = width * height;
  
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = load<u8>(imagePtr + offset);
    const g = load<u8>(imagePtr + offset + 1);
    const b = load<u8>(imagePtr + offset + 2);
    
    // Luminance formula: 0.299*R + 0.587*G + 0.114*B
    const gray = u8(0.299 * f32(r) + 0.587 * f32(g) + 0.114 * f32(b));
    
    store<u8>(imagePtr + offset, gray);
    store<u8>(imagePtr + offset + 1, gray);
    store<u8>(imagePtr + offset + 2, gray);
    // Alpha channel remains unchanged
  }
}

/**
 * Applies a sepia tone effect to the image.
 * @param imagePtr Pointer to the image data
 * @param width Width of the image
 * @param height Height of the image
 */
export function sepia(imagePtr: usize, width: i32, height: i32): void {
  const pixelCount = width * height;
  
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = f32(load<u8>(imagePtr + offset));
    const g = f32(load<u8>(imagePtr + offset + 1));
    const b = f32(load<u8>(imagePtr + offset + 2));
    
    // Sepia transformation matrix
    const newR = u8(min(255.0, r * 0.393 + g * 0.769 + b * 0.189));
    const newG = u8(min(255.0, r * 0.349 + g * 0.686 + b * 0.168));
    const newB = u8(min(255.0, r * 0.272 + g * 0.534 + b * 0.131));
    
    store<u8>(imagePtr + offset, newR);
    store<u8>(imagePtr + offset + 1, newG);
    store<u8>(imagePtr + offset + 2, newB);
  }
}

/**
 * Applies a color inversion effect to the image.
 * @param imagePtr Pointer to the image data
 * @param width Width of the image
 * @param height Height of the image
 */
export function invert(imagePtr: usize, width: i32, height: i32): void {
  const pixelCount = width * height;
  
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = load<u8>(imagePtr + offset);
    const g = load<u8>(imagePtr + offset + 1);
    const b = load<u8>(imagePtr + offset + 2);
    
    store<u8>(imagePtr + offset, 255 - r);
    store<u8>(imagePtr + offset + 1, 255 - g);
    store<u8>(imagePtr + offset + 2, 255 - b);
  }
}

/**
 * Applies a brightness adjustment to the image.
 * @param imagePtr Pointer to the image data
 * @param width Width of the image
 * @param height Height of the image
 * @param factor Brightness adjustment factor (positive to increase brightness, negative to decrease)
 */
export function brightness(imagePtr: usize, width: i32, height: i32, factor: i32): void {
  const pixelCount = width * height;
  
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = i32(load<u8>(imagePtr + offset));
    const g = i32(load<u8>(imagePtr + offset + 1));
    const b = i32(load<u8>(imagePtr + offset + 2));
    
    store<u8>(imagePtr + offset, u8(clamp(r + factor, 0, 255)));
    store<u8>(imagePtr + offset + 1, u8(clamp(g + factor, 0, 255)));
    store<u8>(imagePtr + offset + 2, u8(clamp(b + factor, 0, 255)));
  }
}

/**
 * Applies a contrast adjustment to the image.
 * @param imagePtr Pointer to the image data
 * @param width Width of the image
 * @param height Height of the image
 * @param factor Contrast adjustment factor (1.0 for no change, <1.0 for lower contrast, >1.0 for higher contrast)
 */
export function contrast(imagePtr: usize, width: i32, height: i32, factor: f32): void {
  const pixelCount = width * height;
  
  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = f32(load<u8>(imagePtr + offset));
    const g = f32(load<u8>(imagePtr + offset + 1));
    const b = f32(load<u8>(imagePtr + offset + 2));
    
    const newR = u8(clampF32((r - 128.0) * factor + 128.0, 0.0, 255.0));
    const newG = u8(clampF32((g - 128.0) * factor + 128.0, 0.0, 255.0));
    const newB = u8(clampF32((b - 128.0) * factor + 128.0, 0.0, 255.0));
    
    store<u8>(imagePtr + offset, newR);
    store<u8>(imagePtr + offset + 1, newG);
    store<u8>(imagePtr + offset + 2, newB);
  }
}

/**
 * Returns the minimum of two values.
 * @param a First value
 * @param b Second value
 * @returns Minimum value
 */
function min(a: f32, b: f32): f32 {
  return a < b ? a : b;
}

/**
 * Clamps a value between a minimum and maximum range.
 * @param value Value to clamp
 * @param minVal Minimum value
 * @param maxVal Maximum value
 * @returns Clamped value
 */
function clamp(value: i32, minVal: i32, maxVal: i32): i32 {
  return value < minVal ? minVal : (value > maxVal ? maxVal : value);
}
/**
 * Clamps a floating-point value between a minimum and maximum range.
 * @param value Value to clamp
 * @param minVal Minimum value
 * @param maxVal Maximum value
 * @returns Clamped value
 */
function clampF32(value: f32, minVal: f32, maxVal: f32): f32 {
  return value < minVal ? minVal : (value > maxVal ? maxVal : value);
}

/**
 * Returns the square root of a number.
 * @param x Number to find the square root of
 * @returns Square root of the input number
 */
function sqrt(x: f32): f32 {
  return f32(Math.sqrt(x));
}
