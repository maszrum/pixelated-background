import { Color } from "../../main";
import { GradientBase } from "../core/gradient-base";

export abstract class LinearGradient extends GradientBase {
    private _fromColor: Color;
    private _toColor: Color;
    private _angle: number;

    public get fromColor(): Color {
        return this._fromColor;
    }

    public get toColor(): Color {
        return this._toColor;
    }

    public get angleDegrees(): number {
        return this._angle;
    }

	constructor (fromColor: Color, toColor: Color, angleDegrees: number) {
        super();
        this._fromColor = fromColor;
        this._toColor = toColor;
        this._angle = angleDegrees;
    }
}
