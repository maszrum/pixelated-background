import { Color } from "../../main";
import { IGradient } from "../../gradients/core/gradient-interface";

export interface IGradientFilter {
	apply(forColor: Color, x: number, y: number, gradient: IGradient) : Color;
}
