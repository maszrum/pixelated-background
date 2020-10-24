import { Color } from '../../core/color';
import { IGradientFilter } from '../core/gradient-filter-interface';
import { IGradient } from '../../gradients/core/gradient-interface';

export class BlowFilter implements IGradientFilter {
	private customGradient: IGradient | null;
	private factor: number;

	constructor(factor: number, customGradient?: IGradient) {
		this.factor = 1 - factor;
		this.customGradient = customGradient || null;
	}

	public apply(forColor: Color, x: number, y: number, gradient: IGradient): Color {
		let apply = Math.random() > this.factor;
		if (apply) {
			let g = this.customGradient || gradient;

			let size = g.getSize();
			x = Math.floor(Math.random() * size.width);
			y = Math.floor(Math.random() * size.height);

			let color = g.getColorAt(x, y);
			return color;
		} else {
			return forColor;
		}
	}
}
