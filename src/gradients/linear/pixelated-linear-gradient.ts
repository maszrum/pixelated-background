import { Color } from "../../core/color";
import { LinearGradient } from "./linear-gradient";
import { IGradient } from "../core/gradient-interface";

export class PixelatedLinearGradient extends LinearGradient {
    private lfA: number = 0;
	private lfA_Denominator: number = -1;

	public getColorAt(x: number, y: number): Color {
		if (this.lfA_Denominator == -1) {
			this.initLF();
		}

		let size = this.getSize();
		
		if (x >= size.width || y >= size.height) {
			return Color.black();
		}
		
		let xNormalized = ((x / size.width) - 0.5) * 2;
		let yNormalized = ((y / size.height) - 0.5) * 2;
		
		let coeff = ((this.lfA * xNormalized) - yNormalized) / this.lfA_Denominator;
		
		coeff = (coeff + 1) / 2;
		if (coeff < 0) {
			coeff = 0;
		}
		else if (coeff > 1) {
			coeff = 1;
		}
		
		return Color.between(this.fromColor, this.toColor, coeff);
	}

	public getStyle(): string {
		return '';
	}

	public toPixelated(): IGradient {
		return this;
	}

	private initLF(): void {
		this.lfA = Math.tan(2 * Math.PI * this.angleDegrees / 360);
		this.lfA_Denominator = Math.sqrt((this.lfA * this.lfA) + 1);
	}
}
