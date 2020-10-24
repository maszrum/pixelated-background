import './pix-style.css';

import { PixelatedBackground } from './core/pixelated-background';

export * from './core/color';
export * from './core/pixelated-background';
export * from './core/scene';

export * from './gradient-filters/gradient-filters';
export * from './gradients/gradients';
export * from './animations/animations';

export function Init(pixelSize: number): PixelatedBackground | null {
    if (!('Promise' in window)) {
        return null;
    }

    let bodyElement = document.getElementsByTagName('body')[0];
    let background = document.createElement('div');
    background.id = 'background-container';
    bodyElement.prepend(background);

    let pixBg = new PixelatedBackground(pixelSize, background);

    window.onresize = function() {
        pixBg.onWindowResized();
    };

    return pixBg;
}
