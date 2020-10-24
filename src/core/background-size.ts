import { ISize, IBackgroundSize } from "./interfaces";

export class BackgroundSize implements IBackgroundSize {
    private static _instance: BackgroundSize;

    private pixelSize: number;
    private widthPixels: number;
    private heightPixels: number;

    private constructor(pixelSize: number) {
        this.pixelSize = pixelSize;
        this.widthPixels = -1;
        this.heightPixels = -1;
    }
    
    public static init(pixelSize: number): BackgroundSize {
        this._instance = new BackgroundSize(pixelSize);
        return this._instance;
    }

    public static instance(): IBackgroundSize {
        return this._instance;
    }

    public getPixelSize(): number {
        return this.pixelSize;
    }

    public recalculate(): boolean {
        let newWidth = BackgroundSize.getWidthPixels(this.pixelSize);
        let newHeight = BackgroundSize.getHeightPixels(this.pixelSize);
        let changed = newWidth != this.widthPixels || newHeight != this.heightPixels;
        
        if (changed) {
            this.widthPixels = newWidth;
            this.heightPixels = newHeight;
        }
        
        return changed;
    }
    
    public getPixelsCount(): number {
        return this.widthPixels * (this.heightPixels + 1);
    }
    
    public indexToCoordinate(index: number): {x: number, y: number} {
        let x = index % this.widthPixels;
        let y = Math.floor(index / this.widthPixels);
        return {
            x: x,
            y: y
        };
    }
    
    public coordinateToIndex(x: number, y: number): number {
        return (this.widthPixels * y) + x;
    }
    
    public getSize(): ISize {
        return {
            width: this.widthPixels,
            height: this.heightPixels
        };
    }
    
    private static getWidthPixels(pixelSize: number): number {
        let viewportWidth = BackgroundSize.getViewportWidth();
        return Math.ceil((viewportWidth / pixelSize) + 0.5);
    }
    
    private static getHeightPixels(pixelSize: number): number {
        let viewportHeight = BackgroundSize.getViewportHeight();
        return Math.ceil((viewportHeight / pixelSize) + 0.5);
    }
    
    private static getViewportWidth(): number {
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    
    private static getViewportHeight(): number {
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
}
