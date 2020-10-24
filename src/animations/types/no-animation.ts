import { AnimationBase } from "../core/animation-base";

export class NoAnimation extends AnimationBase {
    protected calculateStepsCount(): number {
        return 1;
    }

    protected startAnimation(animationTime: number): void {
        let size = this.getSize();
        for (let j = 0; j < size.height; j++) {
            for (let i = 0; i < size.width; i++) {
                this.updatePixel(i, j);
            }
        }
    }

    protected stopAnimation(): void {
    }
}
