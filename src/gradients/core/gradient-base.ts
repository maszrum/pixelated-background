import { Color } from "../../core/color";
import { BackgroundSize } from "../../core/background-size";
import { IGradient } from "./gradient-interface";
import { ISize } from "../../core/interfaces";

export abstract class GradientBase implements IGradient {
    public getSize(): ISize {
        return BackgroundSize.instance().getSize();
    }

    public abstract isStyleOnly(): boolean;

    public abstract getColorAt(x: number, y: number): Color;

    public abstract getStyle(): string;

    public abstract toPixelated(): IGradient;
}
