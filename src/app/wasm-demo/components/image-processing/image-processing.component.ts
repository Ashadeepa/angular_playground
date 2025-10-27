import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WasmLoaderService } from '../../services/wasm-loader.service';

interface FilterConfig {
  name: string;
  displayName: string;
  wasmFunction: string;
  hasParameters: boolean;
  description: string;
  parameters?: { [key: string]: number };
  parameterRanges?: { [key: string]: { min: number; max: number; step: number } };
}

@Component({
  selector: 'app-image-processing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-processing.component.html',
  styleUrls: ['./image-processing.component.scss']
})
export class ImageProcessingComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('originalCanvas') originalCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('processedCanvas') processedCanvas!: ElementRef<HTMLCanvasElement>;

  originalImageData: ImageData | null = null;
  processedImageData: ImageData | null = null;
  isProcessing = false;
  wasmLoaded = false;
  error: string | null = null;

  availableFilters: FilterConfig[] = [
    { 
      name: 'grayscale', 
      displayName: 'Grayscale', 
      wasmFunction: 'grayscale', 
      hasParameters: false,
      description: 'Convert image to black and white'
    },
    { 
      name: 'sepia', 
      displayName: 'Sepia Tone', 
      wasmFunction: 'sepia', 
      hasParameters: false,
      description: 'Apply vintage sepia tone effect'
    },
    { 
      name: 'invert', 
      displayName: 'Invert Colors', 
      wasmFunction: 'invert', 
      hasParameters: false,
      description: 'Invert all colors like a photo negative'
    },
    { 
      name: 'brightness', 
      displayName: 'Brightness', 
      wasmFunction: 'brightness', 
      hasParameters: true,
      parameters: { factor: 50 },
      parameterRanges: { factor: { min: -100, max: 100, step: 5 } },
      description: 'Adjust image brightness (-100 to +100)'
    },
    { 
      name: 'contrast', 
      displayName: 'Contrast', 
      wasmFunction: 'contrast', 
      hasParameters: true,
      parameters: { factor: 1.5 },
      parameterRanges: { factor: { min: 0.1, max: 3.0, step: 0.1 } },
      description: 'Adjust image contrast (0.1 to 3.0)'
    }
  ];

  selectedFilter = 'grayscale';
  currentFilterConfig: FilterConfig = this.availableFilters[0];

  viewReady = false;

  private wasm: any;

  constructor(
    private wasmLoader: WasmLoaderService
  ) {}

  async ngOnInit() {
    try {
      await this.loadWasm();
      this.wasmLoaded = true;
      this.updateFilterConfig();
    } catch (error) {
      console.error('Failed to load WASM:', error);
      this.error = 'Failed to load WebAssembly module for image processing';
    }
  }

  /** AfterViewInit lifecycle hook to ensure ViewChild elements are ready. */
  ngAfterViewInit() {
    setTimeout(() => {
      console.log('Checking ViewChild elements:');
      console.log('originalCanvas:', this.originalCanvas);
      console.log('processedCanvas:', this.processedCanvas);
      console.log('originalCanvas.nativeElement:', this.originalCanvas?.nativeElement);
      console.log('processedCanvas.nativeElement:', this.processedCanvas?.nativeElement);
      
      this.viewReady = true;
      console.log('Image processing view initialized, viewReady:', this.viewReady);
    }, 200);
  }

  /**
   * Load the WebAssembly module for image processing using WasmLoaderService.
   */
  private async loadWasm() {
    this.wasm = await this.wasmLoader.loadWasm('assets/image.wasm');
  }

  /**
   * Update configuration when a different filter is selected and reapply
   * the filter if an image is already loaded.
   */
  onFilterChange() {
    this.updateFilterConfig();
    if (this.originalImageData) {
      this.applyFilter();
    }
  }

  /** Update the current filter configuration based on the selected filter */
  private updateFilterConfig() {
    this.currentFilterConfig = this.availableFilters.find(f => f.name === this.selectedFilter) || this.availableFilters[0];
  }

  /** Ensure parameter ranges are respected and reapply the filter when changed. */
  onParameterChange() {
    if (this.currentFilterConfig.parameters) {
      if (this.currentFilterConfig.name === 'brightness') {
        this.currentFilterConfig.parameters['factor'] = Math.max(-100, Math.min(100, this.currentFilterConfig.parameters['factor']));
      } else if (this.currentFilterConfig.name === 'contrast') {
        this.currentFilterConfig.parameters['factor'] = Math.max(0.1, Math.min(3.0, this.currentFilterConfig.parameters['factor']));
      }
    }
    
    if (this.originalImageData) {
      this.applyFilter();
    }
  }

  /**
   * Check if the view (canvas elements) is ready for operations.
   * Returns true if the view is ready, false otherwise.
   */
  isViewReady(): boolean {
    const ready = this.viewReady && 
           !!this.originalCanvas?.nativeElement && 
           !!this.processedCanvas?.nativeElement;
    
    if (!ready) {
      console.log('View readiness check:', {
        viewReady: this.viewReady,
        originalCanvas: !!this.originalCanvas?.nativeElement,
        processedCanvas: !!this.processedCanvas?.nativeElement
      });
    }
    
    return ready;
  }

  /**
   * Wait for the view (canvas elements) to be ready.
   * @param maxAttempts Maximum number of attempts to check readiness
   * @param delay Delay between attempts in milliseconds
   * @returns True if the view is ready, false otherwise
   */
  private async waitForViewReady(maxAttempts: number = 10, delay: number = 100): Promise<boolean> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (this.isViewReady()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    return false;
  }

  /**
   * Handle file selection events. Triggered when a user selects a file.
   * @param event The file input change event
   */
  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log('File selected:', file);
    
    if (file && file.type.startsWith('image/')) {
      console.log('Valid image file:', file.name, file.type);
      
      if (!this.isViewReady()) {
        console.log('View not ready, waiting...');
        const isReady = await this.waitForViewReady(20, 150);
        if (!isReady) {
          this.error = 'Canvas elements not ready. Please wait a moment and try again.';
          return;
        }
        console.log('View is now ready after waiting');
      }

      try {
        this.isProcessing = true;
        await this.loadImageFromFile(file);
        this.error = null;
        console.log('Image loaded successfully');
      } catch (error) {
        this.error = 'Failed to load image file';
        console.error('Error loading image:', error);
      } finally {
        this.isProcessing = false;
      }
    } else {
      console.log('Invalid file type or no file selected');
    }
  }


/** Load an image from a file input */
  private async loadImageFromFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        console.log('Image loaded from file:', img.width, 'x', img.height);
        this.processLoadedImage(img);
        URL.revokeObjectURL(img.src);
        resolve();
      };
      img.onerror = (error) => {
        console.error('Image load error:', error);
        URL.revokeObjectURL(img.src);
        reject(error);
      };
      const objectUrl = URL.createObjectURL(file);
      console.log('Created object URL:', objectUrl);
      img.src = objectUrl;
    });
  }

/** Process the loaded image and prepare canvases */
  private processLoadedImage(img: HTMLImageElement) {
    console.log('processLoadedImage called with image:', img.width, 'x', img.height);
    
    if (!this.isViewReady()) {
      console.error('Canvas elements not ready for processing');
      this.error = 'Canvas elements not ready. Please try again.';
      return;
    }

    const canvas = this.originalCanvas.nativeElement;
    const ctx = canvas.getContext('2d')!;
    
    console.log('Canvas element:', canvas);
    
    const maxSize = 600;
    let { width, height } = img;
    
    if (width > maxSize || height > maxSize) {
      const ratio = Math.min(maxSize / width, maxSize / height);
      width *= ratio;
      height *= ratio;
    }
    
    console.log('Setting canvas dimensions to:', width, 'x', height);
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(img, 0, 0, width, height);
    this.originalImageData = ctx.getImageData(0, 0, width, height);
    
    console.log('Image data created:', this.originalImageData);

    setTimeout(() => {
      this.updateVisibleCanvases();
    }, 50);

    this.applyFilter();
  }

  /** Apply the selected filter to the image */
  async applyFilter() {
    console.log('applyFilter called:', {
      hasOriginalImageData: !!this.originalImageData,
      wasmLoaded: this.wasmLoaded,
      isProcessing: this.isProcessing,
      selectedFilter: this.selectedFilter,
      currentFilterConfig: this.currentFilterConfig
    });
    
    if (!this.originalImageData || !this.wasmLoaded || this.isProcessing) {
      console.log('Skipping filter application - conditions not met');
      return;
    }

    this.isProcessing = true;
    console.log('Starting filter application...');
    
    try {
      const { width, height } = this.originalImageData;
      console.log('Image dimensions:', width, 'x', height);
      
      const wasmResult = await this.applyWasmFilter();
      console.log('WASM filter applied successfully');
      
      this.processedImageData = wasmResult;
      this.displayProcessedImage(wasmResult);
      console.log('Image displayed successfully');
      
    } catch (error) {
      console.error('Error applying filter:', error);
      this.error = 'Failed to apply image filter';
    } finally {
      this.isProcessing = false;
      console.log('Filter application completed');
    }
  }

  /**
   * Apply WASM filter to the image data. Uses the WASM module's linear
   * memory for fast pixel manipulation.
   */
  private async applyWasmFilter(): Promise<ImageData> {
    const { width, height, data } = this.originalImageData!;
    const pixelCount = width * height;
    const imageSize = pixelCount * 4;
    
    const memory = (this.wasm.memory as WebAssembly.Memory).buffer;
    const requiredMemory = imageSize * 2 + 1024;
    
    if (requiredMemory > memory.byteLength) {
      const additionalPages = Math.ceil((requiredMemory - memory.byteLength) / 65536);
      (this.wasm.memory as WebAssembly.Memory).grow(additionalPages);
    }

    const sourcePointer = 1024;
    const destinationPointer = 1024 + imageSize;

    const memoryBuffer = (this.wasm.memory as WebAssembly.Memory).buffer;
    const sourceArray = new Uint8Array(memoryBuffer, sourcePointer, imageSize);
    const destinationArray = new Uint8Array(memoryBuffer, destinationPointer, imageSize);

    sourceArray.set(data);

    const filter = this.currentFilterConfig;
    console.log(`Applying ${filter.displayName} filter...`);
    
    try {
      if (filter.hasParameters) {

        this.applyParameterizedFilter(filter, sourcePointer, width, height);

        destinationArray.set(sourceArray);
      } else {

        this.applySimpleFilter(filter, sourcePointer, width, height);

        destinationArray.set(sourceArray);
      }
      

      const processedPixels = new Uint8ClampedArray(destinationArray);
      return new ImageData(processedPixels, width, height);
      
    } catch (error) {
      console.error('WASM filter failed:', error);
      throw new Error(`${filter.displayName} filter failed: ${error}`);
    }
  }
  
  /** Apply filters that need parameters (brightness, contrast) */
  private applyParameterizedFilter(filter: FilterConfig, pointer: number, width: number, height: number) {
    switch (filter.name) {
      case 'brightness':
        const brightnessValue = Math.round(filter.parameters!['factor']);
        this.wasm[filter.wasmFunction](pointer, width, height, brightnessValue);
        break;
        
      case 'contrast':
        const contrastValue = filter.parameters!['factor'];
        this.wasm[filter.wasmFunction](pointer, width, height, contrastValue);
        break;
    }
  }
  
  /** Apply simple filters that don't need parameters (grayscale, sepia, invert) */
  private applySimpleFilter(filter: FilterConfig, pointer: number, width: number, height: number) {
    this.wasm[filter.wasmFunction](pointer, width, height);
  }

  private displayProcessedImage(imageData: ImageData) {
    this.processedImageData = imageData;
    
    this.updateVisibleCanvases();
  }

  private updateVisibleCanvases() {
    if (!this.originalImageData) return;

    const visibleCanvases = document.querySelectorAll('.image-comparison .image-canvas');
    
    if (visibleCanvases.length >= 2) {

      const originalDisplayCanvas = visibleCanvases[0] as HTMLCanvasElement;
      if (originalDisplayCanvas) {
        const originalCtx = originalDisplayCanvas.getContext('2d')!;
        originalDisplayCanvas.width = this.originalImageData.width;
        originalDisplayCanvas.height = this.originalImageData.height;
        originalCtx.putImageData(this.originalImageData, 0, 0);
      }

      if (this.processedImageData) {
        const processedDisplayCanvas = visibleCanvases[1] as HTMLCanvasElement;
        if (processedDisplayCanvas) {
          const processedCtx = processedDisplayCanvas.getContext('2d')!;
          processedDisplayCanvas.width = this.processedImageData.width;
          processedDisplayCanvas.height = this.processedImageData.height;
          processedCtx.putImageData(this.processedImageData, 0, 0);
        }
      }
    }
  }


  /** Reset the image to its original state */
  resetImage() {
    if (this.originalImageData) {
      this.processedImageData = this.originalImageData;
      this.updateVisibleCanvases();
    }
  }

  /** Get the keys of the filter parameters */
  getParameterKeys(): string[] {
    return this.currentFilterConfig.parameters ? Object.keys(this.currentFilterConfig.parameters) : [];
  }

  /** Select a filter by name and reapply it if an image is present */
  selectFilter(filterName: string) {
    this.selectedFilter = filterName;
    this.updateFilterConfig();
    if (this.originalImageData) {
      this.applyFilter();
    }
  }

  /** Reset the component state to allow for a new image upload */
  resetToUpload() {
    this.originalImageData = null;
    this.processedImageData = null;
    this.error = null;
    
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  /** Download the processed image as a PNG file */
  downloadProcessedImage() {
    if (!this.processedImageData) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    canvas.width = this.processedImageData.width;
    canvas.height = this.processedImageData.height;
    ctx.putImageData(this.processedImageData, 0, 0);
    
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `processed-image-${this.selectedFilter}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  }

  /** Debug method — logs current view + WASM state */
  debugViewState() {
    console.log('Debug View State:');
    console.log('viewReady:', this.viewReady);
    console.log('wasmLoaded:', this.wasmLoaded);
    console.log('originalCanvas:', this.originalCanvas);
    console.log('processedCanvas:', this.processedCanvas);
    console.log('originalCanvas.nativeElement:', this.originalCanvas?.nativeElement);
    console.log('processedCanvas.nativeElement:', this.processedCanvas?.nativeElement);
    console.log('isViewReady():', this.isViewReady());
  }

  /** Force view ready for testing */
  forceViewReady() {
    this.viewReady = true;
    console.log('View ready forced to true');
  }
}