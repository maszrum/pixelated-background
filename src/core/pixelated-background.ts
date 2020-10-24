import { ISize, IPixelUpdater } from "./interfaces";
import { BackgroundSize } from "./background-size";
import { PixelsController } from "./pixels-controller";
import { Color } from "./color";
import { Scene } from "./scene";
import { NoAnimation } from "../animations/types/no-animation";

export class PixelatedBackground implements IPixelUpdater {
    private pixelSizeConverter: BackgroundSize;
    private pixelsController: PixelsController;
    private scenes: Scene[] = [];
    private currentScene?: Scene;

    constructor(pixelSize: number, element: HTMLElement) {
        this.initializeContainer(element, pixelSize);

        this.pixelSizeConverter = BackgroundSize.init(pixelSize);
        this.pixelsController = PixelsController.init(element.id);
    }
    
    private initializeContainer(element: HTMLElement, pixelSize: number): void {
        let topLeft = -Math.floor(pixelSize / 2) + 'px';
        element.style.top = topLeft;
        element.style.left = topLeft;

        element.style.width = `calc(100vw + ${Math.floor(pixelSize * 1.5)}px - 1px)`;
    }

    public onWindowResized(): void {
        let pixelSizeChanged = this.recalculateSize();
        
        if (pixelSizeChanged && this.currentScene) {
            this.currentScene.stop();
            this.currentScene.start();
        }
    }

    private recalculateSize(): boolean {
        let changed = this.pixelSizeConverter.recalculate();

        if (changed) {
            let expectedDivs = this.pixelSizeConverter.getPixelsCount();
            this.pixelsController.updateCount(expectedDivs);
        }

        return changed;
    }

    public updatePixelColor(x: number, y: number, index?: number): void {
        let i: number;
        if (index == undefined) {
            i = this.pixelSizeConverter.coordinateToIndex(x, y);
        } else {
            i = index;
        }

        let color: Color;
        if (this.currentScene) {
            color = this.currentScene.getPixelColor(x, y);
        }
        else {
            color = Color.transparent();
        }

        this.pixelsController.setPixelColor(i, color);
    }

    public getSize(): ISize {
        return this.pixelSizeConverter.getSize();
    }

    public startScene(name: string): void {
        let sceneId = this.scenes
            .findIndex(s => s.name == name);

        if (sceneId == -1) {
            return;
        }

        let isPreviousStyleOnly = false;
        if (this.currentScene) {
            this.currentScene.stop();

            isPreviousStyleOnly = this.currentScene
                .getGradient()
                .isStyleOnly();
        } else {
            this.recalculateSize();
        }

        this.currentScene = this.scenes[sceneId];
        this.currentScene.start(isPreviousStyleOnly);
    }

    public appendScene(scene: Scene): void {
        if (!scene.hasTransition()) {
            let noAnimation = new NoAnimation(this);
            scene.withTransition(noAnimation, 0);
        }
        this.scenes.push(scene);
    }

    public setFadingTime(time: number) {
        this.pixelsController.setFadingTime(time);
    }
}
