// Generative system to generate crystal patterns

// Vanaj Moorthy
// 25th February, 2020

const CRYSTAL_SIZE = 500;
const SIDES = 6;

let PALETTE = [];

function setup() {
	createCanvas(600, 600, SVG);

	PALETTE = [
        "black",
		color(29, 167, 234), // blue
        color(9255, 15, 83), // red
        "purple", // purple 
	];

	noLoop();
	angleMode(DEGREES);
	rectMode(CENTER);
}

function draw() {
	drawTestLines();
}

function drawTestLines() {
	const rando = random(1);

	let numberOfShapes = rando > 0.5 ? SIDES : SIDES * 2;

	const randomColour = floor(random(0, PALETTE.length));
	const strokeColour = PALETTE[randomColour];

	noFill();
	stroke(0);
	strokeWeight(4);

	push();
	translate(width / 2, height / 2);

	stroke(PALETTE[0]);
	ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE);

    const angle = 360 / numberOfShapes;
    
	stroke(strokeColour);

	for (let i = 0; i < numberOfShapes; i++) {
		line(0, 0, 0, CRYSTAL_SIZE / 2);
		rotate(angle);
	}

	pop();
}
