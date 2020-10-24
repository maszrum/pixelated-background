import { PixelatedBackground } from "../../main";
import { TimedAnimation } from "../core/timed-animation";

export class GlitterAnimation extends TimedAnimation {
    protected calculateStepsCount(): number {
        let size = this.getSize();
        return size.width * size.height;
    }

    protected animationStep(): void {
        let remainingPixels = this.getRemainingPixels();

        let random = Math.floor(Math.random() * remainingPixels.length);
        let randomPixel = remainingPixels[random];
        
        this.updatePixel(randomPixel.x, randomPixel.y);
    }
}

declare module '../../core/pixelated-background' {
    interface PixelatedBackground {
        createGlitterAnimation(fadingTime?: number): GlitterAnimation;
    }
}

PixelatedBackground.prototype.createGlitterAnimation = 
    function(this: PixelatedBackground, fadingTime?: number): GlitterAnimation {
        return new GlitterAnimation(this, fadingTime);
    }
