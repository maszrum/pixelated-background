import { Color } from '../../core/color';
import { IGradientFilter } from '../core/gradient-filter-interface';
import { IGradient } from '../../gradients/core/gradient-interface';

export class NoiseFilter implements IGradientFilter {
    private customGradient?: IGradient;
    private factor: number;

    constructor(factor: number, customGradient?: IGradient) {
        this.factor = 255 * factor;
        this.customGradient = customGradient;
    }

    apply(forColor: Color, x: number, y: number, _gradient: IGradient): Color {
        if (this.customGradient) {
            forColor = this.customGradient.getColorAt(x, y);
        }
        
        let rand = this.factor * (Math.random() - 0.5);
        forColor.r = forColor.r + rand;
        forColor.g = forColor.g + rand;
        forColor.b = forColor.b + rand;

        return forColor;
    }
}
