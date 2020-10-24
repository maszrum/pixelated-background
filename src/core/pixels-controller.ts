import { Color } from "./color";
import { IPixelsController } from "./interfaces";
import { BackgroundSize } from "./background-size";

export class PixelsController implements IPixelsController {
	private static _instance: PixelsController;

	private element: HTMLElement;
	private fadingTime: number = 0;

	private constructor(elementId: string) {
		this.element = document.getElementById(elementId) as HTMLElement;
	}

	public static init(elementId: string): PixelsController {
		this._instance = new PixelsController(elementId);
		return this._instance;
	}

	public static instance(): IPixelsController {
		return this._instance;
	}

	public updateCount(expectedDivCount: number): void {
		let currentLength = this.element.children.length;
		if (currentLength == expectedDivCount)
		{
			return;
		}
		else if (currentLength < expectedDivCount)
		{
			let elementsToAdd = expectedDivCount - currentLength;
			for (let i = 0; i < elementsToAdd; i++)
			{
				let pixel = this.initializePixel();
				this.element.appendChild(pixel);
			}
		}
		else if (currentLength > expectedDivCount)
		{
			let elementsToRemove = currentLength - expectedDivCount;
			for (let i = 0; i < elementsToRemove; i++)
			{
                let lastChild = this.element.lastChild as ChildNode;
				this.element.removeChild(lastChild);
			}
		}
	}

	private initializePixel(): HTMLDivElement {
		let pixel = document.createElement('div');

		pixel.style.width = PixelsController.getPixelSize() + 'px';
		pixel.style.height = PixelsController.getPixelSize() + 'px';

		let transition = PixelsController.getFadingStyle(this.fadingTime);
		pixel.style.transition = transition;

		return pixel;
	}

	private getDivAt(index: number): HTMLElement {
        return this.element.children[index] as HTMLElement;
	}

	public setPixelColor(index: number, color: Color): void {
		let div = this.getDivAt(index);
		div.style.backgroundColor = color.toStyleString();
	}

	public setFadingTime(time: number): void {
		if (this.fadingTime == time) {
			return;
		}
		this.fadingTime = time;

		let transition = PixelsController.getFadingStyle(time);
		for (let i = 0; i < this.element.children.length; i++) {
			let pixel = this.element.children[i] as HTMLElement;
			pixel.style.transition = transition;
		}
	}

	private static getFadingStyle(time: number): string {
		return time > 0 ? `background-color ${time}ms linear` : '';
	}

	private static getPixelSize(): number {
		return BackgroundSize.instance().getPixelSize();
	}
}
