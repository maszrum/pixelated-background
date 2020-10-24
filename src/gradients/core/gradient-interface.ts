import { Color } from "../../main";
import { ISize } from "../../core/interfaces";

export interface IGradient {
    getColorAt(x: number, y: number): Color;
    getStyle(): string;
    getSize(): ISize;
    isStyleOnly(): boolean;
    toPixelated(): IGradient;
}
