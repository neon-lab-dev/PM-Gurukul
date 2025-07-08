/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    electron?: {
      ipcRenderer?: any;
      [key: string]: any;
    };
  }
}

export class ScreenRecordingDetector {
  private static instance: ScreenRecordingDetector;
  private recordingDetected = false;
  private observers: ((isRecording: boolean) => void)[] = [];

  private constructor() {
    this.setupDetection();
  }

  public static getInstance(): ScreenRecordingDetector {
    if (!ScreenRecordingDetector.instance) {
      ScreenRecordingDetector.instance = new ScreenRecordingDetector();
    }
    return ScreenRecordingDetector.instance;
  }

  private setupDetection(): void {
    // Method 1: Detect FPS changes (screen recording often lowers FPS)
    this.monitorFPS();

    // Method 2: Check for known screen recording processes (Electron-only)
    if (window.electron && window.electron.ipcRenderer) {
      this.checkForRecordingProcesses();
    }

    // Method 3: Canvas fingerprinting detection
    this.canvasFingerprintDetection();
  }

  private monitorFPS(): void {
    let lastTime = performance.now();
    let frameCount = 0;
    const checkInterval = 1000; // Check every second

    const checkFPS = () => {
      const now = performance.now();
      frameCount++;
      
      if (now >= lastTime + checkInterval) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        if (fps < 15) { // Screen recording often results in lower FPS
          this.handleRecordingDetected();
        }
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkFPS);
    };

    requestAnimationFrame(checkFPS);
  }

  private canvasFingerprintDetection(): void {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw a complex image to canvas
    ctx.fillStyle = 'rgb(128, 128, 128)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.font = '20px Arial';
    ctx.fillText('SCREEN_RECORDING_DETECTION', 10, 50);

    // Check if canvas is being captured
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let isEmpty = true;
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i] !== 0) {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      this.handleRecordingDetected();
    }
  }

  private handleRecordingDetected(): void {
    if (!this.recordingDetected) {
      this.recordingDetected = true;
      this.notifyObservers(true);
    }
  }

  // Method to check for known screen recording processes (Electron-only)
  private checkForRecordingProcesses(): void {
    // Example: Ask main process if any known recording process is running
    window.electron?.ipcRenderer?.invoke('check-screen-recording-processes').then((isRecording: boolean) => {
      if (isRecording) {
        this.handleRecordingDetected();
      }
    }).catch(() => {
      // Handle error or ignore if not implemented
    });
  }

  public subscribe(callback: (isRecording: boolean) => void): void {
    this.observers.push(callback);
  }

  private notifyObservers(isRecording: boolean): void {
    this.observers.forEach(observer => observer(isRecording));
  }

  public isRecording(): boolean {
    return this.recordingDetected;
  }
}