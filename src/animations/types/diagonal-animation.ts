import { PixelatedBackground } from "../../main";
import { TimedAnimation } from "../core/timed-animation";

export enum DiagonalStart {
    TopLeft,
    TopRight,
    BottomRight,
    BottomLeft
}

export class DiagonalAnimation extends TimedAnimation {
    private stepFunction: () => void = this.stepTopLeft;

    public startsAt(start: DiagonalStart): DiagonalAnimation {
        switch (start) {
            case DiagonalStart.TopLeft:
                this.stepFunction = this.stepTopLeft;
                break;
            case DiagonalStart.TopRight:
                this.stepFunction = this.stepTopRight;
                break;
            case DiagonalStart.BottomRight:
                this.stepFunction = this.stepBottomRight;
                break;
            case DiagonalStart.BottomLeft:
                this.stepFunction = this.stepBottomLeft;
                break;
        }
        return this;
    }

    protected calculateStepsCount(): number {
        let size = this.getSize();
        return size.width + size.height - 1;
    }

    protected animationStep(): void {
        this.stepFunction();
    }

    private stepTopLeft(): void {
        let size = this.getSize();
        let remainingPixels = this.getRemainingPixels();

        let x = remainingPixels[0].x;
        let y = remainingPixels[0].y;

        this.updatePixel(x, y);

        let update = false;
        do {
            x -= 1;
            y += 1;

            update = x >= 0 && y < size.height;
            if (update) {
                this.updatePixel(x, y);
            }
        } while (update);
    }

    private stepTopRight(): void {
        let size = this.getSize();
        let remainingPixels = this.getRemainingPixels();

        let x = 0;
        let y = 0;

        if (remainingPixels[0].y == 0) {
            let y0Pixels = remainingPixels.filter(rp => rp.y == 0);
            x = y0Pixels[y0Pixels.length - 1].x;
            y = 0;
        } else {
            x = remainingPixels[0].x;
            y = remainingPixels[0].y;
        }

        this.updatePixel(x, y);

        let update = false;
        do {
            x += 1;
            y += 1;

            update = x < size.width && y < size.height;
            if (update) {
                this.updatePixel(x, y);
            }
        } while (update);
    }

    private stepBottomRight(): void {
        let size = this.getSize();
        let remainingPixels = this.getRemainingPixels();

        let x = 0;
        let y = 0;

        let lastPixel = remainingPixels[remainingPixels.length - 1];
        if (lastPixel.y == size.height - 1) {
            x = lastPixel.x;
            y = lastPixel.y;
        } else {
            let x0Pixels = remainingPixels.filter(rp => rp.x == 0);
            x = 0;
            y = x0Pixels[x0Pixels.length - 1].y;
        }

        this.updatePixel(x, y);

        let update = false;
        do {
            x += 1;
            y -= 1;

            update = x < size.width && y >= 0;
            if (update) {
                this.updatePixel(x, y);
            }
        } while (update);
    }

    private stepBottomLeft(): void {
        let size = this.getSize();
        let remainingPixels = this.getRemainingPixels();

        let x = 0;
        let y = 0;

        let x0Pixels = remainingPixels.filter(rp => rp.x == 0);
        if (x0Pixels.length == 0) {
            x = remainingPixels[0].x;
            y = 0;
        } else {
            x = 0;
            y = x0Pixels[x0Pixels.length - 1].y;
        }

        this.updatePixel(x, y);

        let update = false;
        do {
            x += 1;
            y += 1;

            update = x < size.width && y < size.height;
            if (update) {
                this.updatePixel(x, y);
            }
        } while (update);
    }
}

declare module '../../core/pixelated-background' {
    interface PixelatedBackground {
        createDiagonalAnimation(fadingTime?: number): DiagonalAnimation;
    }
}

PixelatedBackground.prototype.createDiagonalAnimation = 
    function(this: PixelatedBackground, fadingTime?: number): DiagonalAnimation {
        return new DiagonalAnimation(this, fadingTime);
    }
