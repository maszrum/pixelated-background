export class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a?: number) {
        this.r = Color.toColorComponent(r);
        this.g = Color.toColorComponent(g);
        this.b = Color.toColorComponent(b);
        
        if (a == undefined) {
            this.a = 1;
        } else if (a < 0) {
            this.a = 0;
        } else if (a > 1) {
            this.a = 1;
        } else {
            this.a = a;
        }
    }
    
    public toStyleString(): string {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }
    
    private static toColorComponent(v: number): number {
        if (v < 0) {
            return 0;
        } else if (v > 255) {
            return 255;
        } else {
            return Math.round(v);
        }
    }
    
    public static random(): Color {
        let r = this.getRandomColorComponent();
        let g = this.getRandomColorComponent();
        let b = this.getRandomColorComponent();
        return new Color(r, g, b);
    }
    
    private static getRandomColorComponent(): number {
        return Math.floor(Math.random() * 256);
    }
    
    public static black(): Color {
        return new Color(0, 0, 0);
    }
    
    public static white(): Color {
        return new Color(255, 255, 255);
    }
    
    public static transparent(): Color {
        return new Color(0, 0, 0, 0);
    }

    public static between(color1: Color, color2: Color, mix: number): Color {
        let invMix = 1-mix;
        
        let r = color1.r * mix + color2.r * invMix;
        let g = color1.g * mix + color2.g * invMix;
        let b = color1.b * mix + color2.b * invMix;
        
        return new Color(r, g, b);
    }
}