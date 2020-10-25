import { Color } from "../../core/color";
import { LinearGradient } from "./linear-gradient";
import { IGradient } from "../core/gradient-interface";
import { PixelatedLinearGradient } from "./pixelated-linear-gradient";

export class SmoothLinearGradient extends LinearGradient {
    public getColorAt(_x: number, _y: number): Color {
        return Color.transparent();
    }

    public isStyleOnly(): boolean {
        return true;
    }

    public getStyle(): string {
        return Color.createCssGradient(this.fromColor, this.toColor, this.angleDegrees);
    }

    public toPixelated(): IGradient {
        return new PixelatedLinearGradient(this.fromColor, this.toColor, this.angleDegrees);
    }
}
