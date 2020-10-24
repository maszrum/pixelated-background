/*
	1st scene
*/

function addFirstScene(pixBg, name) {
	let fromColor = new PixelatedBackground.Color(11, 104, 135);
	let toColor = new PixelatedBackground.Color(228, 139, 152);
	let angle = 120;

	let gradient = new PixelatedBackground.PixelatedLinearGradient(fromColor, toColor, angle);
	let transition = pixBg.createDiagonalAnimation(1000).startsAt(PixelatedBackground.DiagonalStart.TopLeft);

	let scene = new PixelatedBackground.Scene(name, gradient)
		.withTransition(transition, 2000);

	pixBg.appendScene(scene);
}

/*
	2nd scene
*/

function addSecondScene(pixBg, name) {
	let fromColor = new PixelatedBackground.Color(60, 29, 113);
	let toColor = new PixelatedBackground.Color(254, 174, 123);
	let angle = 60;
	let blowingFactor = 0.01;
	
	let gradient = new PixelatedBackground.SmoothLinearGradient(fromColor, toColor, angle);
	let filterGradient = new PixelatedBackground.PixelatedLinearGradient(fromColor, toColor, angle);
	let transition = pixBg.createDiagonalAnimation(500).startsAt(PixelatedBackground.DiagonalStart.BottomLeft);
	let animation = pixBg.createGlitterAnimation(3000);
	let blowFilter = new PixelatedBackground.BlowFilter(blowingFactor, filterGradient);

	let scene = new PixelatedBackground.Scene(name, gradient)
		.withTransition(transition, 1000)
		.withAnimation(animation, 5000)
		.appendFilter(blowFilter);
	
		pixBg.appendScene(scene);
}

/*
	3rd scene
*/

function addThirdScene(pixBg, name) {
	let fromColor = new PixelatedBackground.Color(255, 46, 101);
	let toColor = new PixelatedBackground.Color(52, 14, 63);
	let angle = 120;
	let blowingFactor = 0.02;

	let gradient = new PixelatedBackground.SmoothLinearGradient(fromColor, toColor, angle);
	let filterGradient = new PixelatedBackground.PixelatedLinearGradient(fromColor, toColor, angle);
	let transition = pixBg.createDiagonalAnimation(500);
	let animation = pixBg.createGlitterAnimation(3000);
	let blowFilter = new PixelatedBackground.BlowFilter(blowingFactor, filterGradient);
	
	let scene = new PixelatedBackground.Scene(name, gradient)
		.withTransition(transition, 2000)
		.withAnimation(animation, 1000)
		.appendFilter(blowFilter);

	pixBg.appendScene(scene);
}