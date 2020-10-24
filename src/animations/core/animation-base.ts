import { ISize, IPixelUpdater } from "../../core/interfaces";
import { PixelsController } from "../../core/pixels-controller";
import { BackgroundSize } from "../../core/background-size";
import { IAnimation } from "./animation-interface";

export abstract class AnimationBase implements IAnimation {
    private pixelUpdater: IPixelUpdater;
    private remaining: { x: number, y: number }[] = [];
    private onFinish: () => void = () => {};
    private fadingTime?: number;
    private finished: boolean = false;
    private fadingTimer: number = -1;

    constructor(pixelUpdater: IPixelUpdater, pixelFadingTime?: number) {
        this.pixelUpdater = pixelUpdater;
        this.fadingTime = pixelFadingTime;
    }

    public start(animationTime: number, onFinish?: () => void): void {
        this.finished = false;

        if (this.fadingTime) {
            AnimationBase.setFadingTime(this.fadingTime);
        } else {
            AnimationBase.setFadingTime(0);
        }

        if (onFinish) {
            this.onFinish = onFinish;
        }

        this.initializeRemainingArray();
        this.startAnimation(animationTime);
    }

    public stop(): void {
        this.finished = false;
        this.remaining = [];

        if (this.fadingTimer != -1) {
            clearTimeout(this.fadingTimer);
            this.fadingTimer = -1;
        }

        this.stopAnimation();
    }

    public isFinished(): boolean {
        return this.finished;
    }

    protected getSize(): ISize {
        return BackgroundSize.instance().getSize();
    }

    protected updatePixel(x: number, y: number): void {
        this.pixelUpdater.updatePixelColor(x, y);

        let index = this.remaining.findIndex(
            element => element.x == x && element.y == y);

        if (index >= 0) {
            let wasFinished = this.isFinished();

            this.remaining.splice(index, 1);

            if (this.remaining.length == 0 && !wasFinished) {
                this.finish();
            }
        }
    }

    protected getRemainingPixels(): { x: number, y: number }[] {
        return this.remaining;
    }

    private initializeRemainingArray(): void {
        let size = this.getSize();

        this.remaining = [];

        for (let j = 0; j < size.height; j++) {
            for (let i = 0; i < size.width; i++) {
                this.remaining.push({ x: i, y: j });
            }
        }
    }

    private finish(): void {
        this.stop();

        this.fadingTimer = setTimeout(() => {
            this.fadingTimer = -1;
            this.finished = true;
            this.onFinish();
        }, this.fadingTime);
    }

    protected abstract calculateStepsCount(): number;

    protected abstract startAnimation(animationTime: number): void;

    protected abstract stopAnimation(): void;

    private static setFadingTime(time: number): void {
        PixelsController.instance().setFadingTime(time);
    }
}
