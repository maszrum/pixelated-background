import { AnimationBase } from "./animation-base";

export abstract class TimedAnimation extends AnimationBase {
    private interval: number = -1;

    protected startAnimation(animationTime: number): void {
        let stepSize = animationTime / this.calculateStepsCount();

        this.interval = setInterval(() => {
            this.animationStep();
        }, stepSize);
    }

    protected stopAnimation(): void {
        if (this.interval != -1) {
            clearInterval(this.interval);
            this.interval = -1;
        }
    }

    protected abstract animationStep(): void;
}
