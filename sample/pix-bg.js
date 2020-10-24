let pixBg;

function setScene(name) {
    pixBg.startScene(name);
}

window.onload = function() {
    pixBg = PixelatedBackground.Init(100);

    if (!pixBg) {
        console.log("old browser detected");
        document.body.className = 'old-browser';
    } else {
        addFirstScene(pixBg, 'first');
        addSecondScene(pixBg, 'second');
        addThirdScene(pixBg, 'third');
        addFourthScene(pixBg, 'fourth');

        pixBg.startScene('first');
    }
};