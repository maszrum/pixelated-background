import { Color } from "../main";
import { IGradient } from "../gradients/core/gradient-interface";
import { IGradientFilter } from "../gradient-filters/core/gradient-filter-interface";
import { IAnimation } from "../animations/core/animation-interface";

export class Scene {
    private gradient: IGradient;
    private transition?:IAnimation;
    private transitionTime: number = -1;
    private animation?: IAnimation;
    private animationTime: number = -1;
    private filters: IGradientFilter[] = [];
    private targetGradient?: IGradient;

    private _name: string;
    public get name(): string {
        return this._name;
    }

    constructor(name: string, gradient: IGradient) {
        this._name = name;
        this.gradient = gradient;
    }

    public withTransition(transition: IAnimation, transitionTime: number): Scene {
        this.transition = transition;
        this.transitionTime = transitionTime;
        return this;
    }

    public withAnimation(animation: IAnimation, cycleTime: number): Scene {
        this.animation = animation;
        this.animationTime = cycleTime;
        return this;
    }

    public appendFilter(filter: IGradientFilter): Scene {
        this.filters.push(filter);
        return this;
    }

    public start(isPreviousStyleOnly?: boolean): void {
        if (this.targetGradient) {
            this.gradient = this.targetGradient;
        }

        let transition = this.transition as IAnimation;

        if (isPreviousStyleOnly == undefined) {
            transition.start(this.transitionTime, () => {
                this.setStyleBackground();
                this.startAnimation();
            })
        } else {
            let isCurrentStyleOnly = this.gradient.isStyleOnly();
            
            if (!isCurrentStyleOnly) {
                transition.start(this.transitionTime, () => {
                    this.setStyleBackground();
                    this.startAnimation();
                });
            } else {
                if (isPreviousStyleOnly) {
                    this.targetGradient = this.gradient;
                    this.gradient = this.gradient.toPixelated();
    
                    transition.start(this.transitionTime, () => {
                        this.gradient = this.targetGradient as IGradient;
                        this.setStyleBackground();
                        transition.start(this.transitionTime, () => {
                            this.startAnimation();
                        });
                    });
                } else {
                    this.setStyleBackground();
                    transition.start(this.transitionTime, () => {
                        this.startAnimation();
                    });
                }
            }
        }
    }

    public stop(): void {
        if (this.transition && !this.transition.isFinished()) {
            this.transition.stop();
        }

        this.animation?.stop();
    }

    public hasTransition(): boolean {
        return this.transitionTime != -1;
    }

    public getGradient(): IGradient {
        return this.gradient;
    }

    public getPixelColor(x: number, y: number): Color {
        let color = this.getBasePixelColor(x, y);
        color = this.applyFiltersForPixel(color, x, y);
        return color;
    }

    private applyFiltersForPixel(color: Color, x: number, y: number): Color {
        for (let i = 0; i < this.filters.length; i++) {
            color = this.filters[i].apply(color, x, y, this.gradient);
        }
        return color;
    }

    private getBasePixelColor(x: number, y: number): Color {
        return this.gradient.getColorAt(x, y);
    }

    private setStyleBackground(): void {
        let backgroundStyle = this.gradient.getStyle();
        console.log(this.gradient);
        let bodyElement = document.getElementsByTagName('body')[0];
        if (backgroundStyle.length > 0) {
            bodyElement.style.backgroundImage = backgroundStyle;
            bodyElement.style.backgroundAttachment = 'fixed';
        } else {
            bodyElement.style.backgroundImage = '';
        }
    }

    private startAnimation(): void {
        if (this.animation) {
            this.animation.stop();
            this.animation.start(this.animationTime, () => {
                this.startAnimation();
            });
        }
    }
}
