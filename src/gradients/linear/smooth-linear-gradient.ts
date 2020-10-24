import { Color } from "../../core/color";
import { LinearGradient } from "./linear-gradient";
import { IGradient } from "../core/gradient-interface";
import { PixelatedLinearGradient } from "./pixelated-linear-gradient";

export class SmoothLinearGradient extends LinearGradient {
	public getColorAt(_x: number, _y: number): Color {
		return Color.transparent();
	}

	public getStyle(): string {
		let angle = Math.round(this.angleDegrees);
		let from = this.fromColor.toStyleString();
		let to = this.toColor.toStyleString();
		return `linear-gradient(${angle}deg, ${from}, ${to})`;
	}

	public toPixelated(): IGradient {
		return new PixelatedLinearGradient(this.fromColor, this.toColor, this.angleDegrees);
	}
}
