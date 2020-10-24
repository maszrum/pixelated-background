import { Color } from './color';

export interface IPixelsController {
	setPixelColor(index: number, color: Color): void;
	setFadingTime(time: number): void;
}

export interface IPixelUpdater {
	updatePixelColor(x: number, y: number, index?: number): void;
}

export interface IBackgroundSize {
	getPixelSize(): number;
	getPixelsCount(): number;
	indexToCoordinate(index: number): {x: number, y: number};
	coordinateToIndex(x: number, y: number): number;
	getSize(): ISize;
}

export interface ISize {
	width: number;
	height: number;
}
