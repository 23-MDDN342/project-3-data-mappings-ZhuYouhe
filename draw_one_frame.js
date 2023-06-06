
function draw_one_frame(cur_frac) {
	angleMode(DEGREES);

	noStroke();
	let backgroundColor = color("#DFF2EF");
	fill(backgroundColor);
	rect(0, 0, width, height);
	////////////////////////////////////////////
	let mainColor = color("#1BBFA1"); // cube color
	let backupColor = color("#F2B441"); // cube color
	let mainColorCC = color("#F2A341"); // circle color
	let buackupColorCC = color("#9ABF4B"); // circle color

	let orbSize = width / 30; // Square size
	let sqRadius = orbSize / 14; // Square radius
	let spacingSize = orbSize * 2.2;
	let spacingSizeY = orbSize * 3.6;

	let firstStop = 0.3; // cur_frac first half pause
	let secondStop = 0.8; // cur_frac second half pause

	let noiseColor;
	let noiseyLerp;
	let noiseSize;
	let noiseLine;
	let moveYMap;

	//////////////////////////////////////////////
	push();
	scale(1);
	drawSquare();
	pop();

	push();
	fill(100);
	translate(-orbSize * 1.1, orbSize * 1.8);
	drawSquare();
	pop();
	//////////////////////////////////////////////

	//Draw square to cube function
	function drawSquare() {

		fill(mainColor);

		for (let accross = -1; accross <= width * 1.6 / spacingSize; accross++) {
			for (let down = -1; down <= height * 1.6 / spacingSizeY; down++) {

				noiseColor = getNoiseValue(spacingSize * accross, spacingSize * down, 0.8, "noiseColor", 0, 1, 100);
				noiseyLerp = lerpColor(mainColor, backupColor, noiseColor);  // https://p5js.org/reference/#/p5/lerpColor
				noiseSize = getNoiseValue(spacingSize * accross, spacingSize * down, 0.8, "noiseSize", 0, 1, 80);
				noiseLine = getNoiseValue(spacingSize * accross, spacingSize * down, 0.8, "noiseLine", 0, 1, 60);

				let noiseyLerpCircle = lerpColor(mainColorCC, buackupColorCC, noiseColor);
				let colorChange = lerpColor(noiseyLerpCircle, noiseyLerp, cur_frac);
				let colorChangeRv = lerpColor(noiseyLerp, noiseyLerpCircle, cur_frac);

				let changeRadius;
				let changeRadiusMapRd = map(cur_frac, firstStop, 0.5, sqRadius * 10, sqRadius);
				let changeRadiusMapSq = map(cur_frac, secondStop, 1, sqRadius, sqRadius * 10);

				///////////////////////////////////
				// Circles are actually squares with large radius
				//Draw top quad
				push();
				rectMode(CENTER);
				let top_rotSquare = map(cur_frac, firstStop, 0.5, 0, -22.5); // Rotate in first half
				let top_rotQuad = map(cur_frac, secondStop, 1, -22.5, 0); // Rotate in second half
				let top_deformSquare = map(cur_frac, firstStop, 0.5, 0, 45); // Deform in first half
				let top_deformQuad = map(cur_frac, secondStop, 1, 45, 0); // Deform in second half
				let top_scaleSquare = map(cur_frac, firstStop, 0.5, 1, 0.5); // Scale in first half
				let top_scaleQuad = map(cur_frac, secondStop, 1, 0.5, 1); // Scale in second half
				let top_MoveRight = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.55);
				let top_MoveLeft = map(cur_frac, secondStop, 1, orbSize * 0.55, 0);
				let top_MoveUp = map(cur_frac, firstStop, 0.5, 0, -orbSize * 0.55);
				let top_MoveDown = map(cur_frac, secondStop, 1, -orbSize * 0.55, 0);

				if (cur_frac < firstStop) {
					fill(noiseyLerpCircle);
					translate(spacingSize * accross, spacingSizeY * down);
					rotate(0);
					shearX(0);
					scale(1, sqrt(1)); // This is some weird triangle formula based on square size, which works well hence keeping
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					fill(colorChange);
					translate(spacingSize * accross + top_MoveRight, spacingSizeY * down + top_MoveUp);
					rotate(top_rotSquare);
					shearX(top_deformSquare);
					scale(1, sqrt(top_scaleSquare));
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					fill(noiseyLerp);
					translate(spacingSize * accross + orbSize * 0.55, spacingSizeY * down - orbSize * 0.55);
					rotate(-22.5);
					shearX(45);
					scale(1, sqrt(0.5));
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					fill(colorChangeRv);
					translate(spacingSize * accross + top_MoveLeft, spacingSizeY * down + top_MoveDown);
					rotate(top_rotQuad);
					shearX(top_deformQuad);
					scale(1, sqrt(top_scaleQuad));
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize, changeRadius);

				pop();

				///////////////////////////////////
				//Draw top quad #2 Small version (noise sizes)
				push();
				rectMode(CENTER);
				let top_rotSquareS = map(cur_frac, firstStop, 0.5, 0, -22.5);
				let top_rotQuadS = map(cur_frac, secondStop, 1, -22.5, 0);
				let top_deformSquareS = map(cur_frac, firstStop, 0.5, 0, 45);
				let top_deformQuadS = map(cur_frac, secondStop, 1, 45, 0);
				let top_scaleSquareS = map(cur_frac, firstStop, 0.5, 1, 0.5);
				let top_scaleQuadS = map(cur_frac, secondStop, 1, 0.5, 1);
				let top_MoveRightS = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.55);
				let top_MoveLeftS = map(cur_frac, secondStop, 1, orbSize * 0.55, 0);
				let top_MoveUpS = map(cur_frac, firstStop, 0.5, 0, -orbSize * 0.55);
				let top_MoveDownS = map(cur_frac, secondStop, 1, -orbSize * 0.55, 0);

				fill(140);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross, spacingSizeY * down);
					rotate(0);
					shearX(0);
					scale(1, sqrt(1));
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + top_MoveRightS, spacingSizeY * down + top_MoveUpS);
					rotate(top_rotSquareS);
					shearX(top_deformSquareS);
					scale(1, sqrt(top_scaleSquareS));
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross + orbSize * 0.55, spacingSizeY * down - orbSize * 0.55);
					rotate(-22.5);
					shearX(45);
					scale(1, sqrt(0.5));
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + top_MoveLeftS, spacingSizeY * down + top_MoveDownS);
					rotate(top_rotQuadS);
					shearX(top_deformQuadS);
					scale(1, sqrt(top_scaleQuadS));
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseSize * 0.9, changeRadius);

				pop();
				/////////////////////////////////////

				//Draw top quad #3 Line version (noise sizes)
				push();
				rectMode(CENTER);
				let top_rotSquareL = map(cur_frac, firstStop, 0.5, 0, -22.5);
				let top_rotQuadL = map(cur_frac, secondStop, 1, -22.5, 0);
				let top_deformSquareL = map(cur_frac, firstStop, 0.5, 0, 45);
				let top_deformQuadL = map(cur_frac, secondStop, 1, 45, 0);
				let top_scaleSquareL = map(cur_frac, firstStop, 0.5, 1, 0.5);
				let top_scaleQuadL = map(cur_frac, secondStop, 1, 0.5, 1);
				let top_MoveRightL = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.55);
				let top_MoveLeftL = map(cur_frac, secondStop, 1, orbSize * 0.55, 0);
				let top_MoveUpL = map(cur_frac, firstStop, 0.5, 0, -orbSize * 0.55);
				let top_MoveDownL = map(cur_frac, secondStop, 1, -orbSize * 0.55, 0);

				noFill();
				stroke(backgroundColor);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross, spacingSizeY * down);
					rotate(0);
					shearX(0);
					scale(1, sqrt(1));
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + top_MoveRightL, spacingSizeY * down + top_MoveUpL);
					rotate(top_rotSquareL);
					shearX(top_deformSquareL);
					scale(1, sqrt(top_scaleSquareL));
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross + orbSize * 0.55, spacingSizeY * down - orbSize * 0.55);
					rotate(-22.5);
					shearX(45);
					scale(1, sqrt(0.5));
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + top_MoveLeftL, spacingSizeY * down + top_MoveDownL);
					rotate(top_rotQuadL);
					shearX(top_deformQuadL);
					scale(1, sqrt(top_scaleQuadL));
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseLine, changeRadius);

				pop();
				/////////////////////////////////////

				//Draw left quad
				push();
				rectMode(CENTER);
				let left_deformSquare = map(cur_frac, firstStop, 0.5, 0, 22.5);
				let left_deformQuad = map(cur_frac, secondStop, 1, 22.5, 0);
				let left_scaleSquare = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let left_scaleQuad = map(cur_frac, secondStop, 1, 0.9, 1);
				let left_moveLeft = map(cur_frac, firstStop, 0.5, 0, -orbSize * 1.02);
				let left_moveRight = map(cur_frac, secondStop, 1, -orbSize * 1.02, 0);
				let left_MoveDown = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.78);
				let left_MoveUp = map(cur_frac, secondStop, 1, orbSize * 0.78, 0);

				if (cur_frac < firstStop) {
					fill(noiseyLerpCircle);
					translate(spacingSize * accross, spacingSizeY * down + orbSize * 1.2);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					fill(colorChange);
					translate(spacingSize * accross + left_moveLeft, spacingSizeY * down + orbSize * 1.2 + left_MoveDown);
					shearY(left_deformSquare);
					scale(left_scaleSquare, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					fill(noiseyLerp);
					translate(spacingSize * accross - orbSize * 1.02, spacingSizeY * down + orbSize * 1.2 + orbSize * 0.78);
					shearY(22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					fill(colorChangeRv);
					translate(spacingSize * accross + left_moveRight, spacingSizeY * down + orbSize * 1.2 + left_MoveUp);
					shearY(left_deformQuad);
					scale(left_scaleQuad, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize, changeRadius);

				pop();
				/////////////////////////////////////

				//Draw left quad #2 Small version (noise sizes)
				push();
				rectMode(CENTER);
				let left_deformSquareS = map(cur_frac, firstStop, 0.5, 0, 22.5);
				let left_deformQuadS = map(cur_frac, secondStop, 1, 22.5, 0);
				let left_scaleSquareS = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let left_scaleQuadS = map(cur_frac, secondStop, 1, 0.9, 1);
				let left_moveLeftS = map(cur_frac, firstStop, 0.5, 0, -orbSize * 1.02);
				let left_moveRightS = map(cur_frac, secondStop, 1, -orbSize * 1.02, 0);
				let left_MoveDownS = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.78);
				let left_MoveUpS = map(cur_frac, secondStop, 1, orbSize * 0.78, 0);

				fill(140);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross, spacingSizeY * down + orbSize * 1.2);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + left_moveLeftS, spacingSizeY * down + orbSize * 1.2 + left_MoveDownS);
					shearY(left_deformSquareS);
					scale(left_scaleSquareS, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross - orbSize * 1.02, spacingSizeY * down + orbSize * 1.2 + orbSize * 0.78);
					shearY(22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + left_moveRightS, spacingSizeY * down + orbSize * 1.2 + left_MoveUpS);
					shearY(left_deformQuadS);
					scale(left_scaleQuadS, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseSize, changeRadius);

				pop();
				/////////////////////////////////////

				//Draw left quad #3 Line version (noise sizes)
				push();
				rectMode(CENTER);
				let left_deformSquareL = map(cur_frac, firstStop, 0.5, 0, 22.5);
				let left_deformQuadL = map(cur_frac, secondStop, 1, 22.5, 0);
				let left_scaleSquareL = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let left_scaleQuadL = map(cur_frac, secondStop, 1, 0.9, 1);
				let left_moveLeftL = map(cur_frac, firstStop, 0.5, 0, -orbSize * 1.02);
				let left_moveRightL = map(cur_frac, secondStop, 1, -orbSize * 1.02, 0);
				let left_MoveDownL = map(cur_frac, firstStop, 0.5, 0, orbSize * 0.78);
				let left_MoveUpL = map(cur_frac, secondStop, 1, orbSize * 0.78, 0);

				noFill();
				stroke(backgroundColor);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross, spacingSizeY * down + orbSize * 1.2);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + left_moveLeftL, spacingSizeY * down + orbSize * 1.2 + left_MoveDownL);
					shearY(left_deformSquareL);
					scale(left_scaleSquareL, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross - orbSize * 1.02, spacingSizeY * down + orbSize * 1.2 + orbSize * 0.78);
					shearY(22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + left_moveRightL, spacingSizeY * down + orbSize * 1.2 + left_MoveUpL);
					shearY(left_deformQuadL);
					scale(left_scaleQuadL, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseLine, changeRadius);

				pop();
				/////////////////////////////////////

				// Draw right quad
				push();
				rectMode(CENTER);
				let right_deformSquare = map(cur_frac, firstStop, 0.5, 0, -22.5);
				let right_deformQuad = map(cur_frac, secondStop, 1, -22.5, 0);
				let right_scaleSquare = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let right_scaleQuad = map(cur_frac, secondStop, 1, 0.9, 1);
				let right_moveRight = map(cur_frac, firstStop, 0.5, 0, orbSize * 1.02);
				let right_moveLeft = map(cur_frac, secondStop, 1, orbSize * 1.02, 0);
				let right_MoveUp = map(cur_frac, firstStop, 0.5, 0, -orbSize * 2.22);
				let right_MoveDown = map(cur_frac, secondStop, 1, -orbSize * 2.22, 0);

				if (cur_frac < firstStop) {
					fill(noiseyLerpCircle);
					translate(spacingSize * accross + orbSize * 1.1, spacingSizeY * down + orbSize * 0.6);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					fill(colorChange);
					translate(spacingSize * accross + orbSize * 1.1 + right_moveRight, spacingSizeY * down + orbSize * 0.6 + right_MoveUp);
					shearY(right_deformSquare);
					scale(right_scaleSquare, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					fill(noiseyLerp);
					translate(spacingSize * accross + orbSize * 1.1 + orbSize * 1.02, spacingSizeY * down + orbSize * 0.6 - orbSize * 2.22);
					shearY(-22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					fill(colorChangeRv);
					translate(spacingSize * accross + orbSize * 1.1 + right_moveLeft, spacingSizeY * down + orbSize * 0.6 + right_MoveDown);
					shearY(right_deformQuad);
					scale(right_scaleQuad, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize, changeRadius);

				pop();
				///////////////////////////////////////

				// Draw right quad #2 Small version (noise sizes)
				push();
				rectMode(CENTER);
				let right_deformSquareS = map(cur_frac, firstStop, 0.5, 0, -22.5);
				let right_deformQuadS = map(cur_frac, secondStop, 1, -22.5, 0);
				let right_scaleSquareS = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let right_scaleQuadS = map(cur_frac, secondStop, 1, 0.9, 1);
				let right_moveRightS = map(cur_frac, firstStop, 0.5, 0, orbSize * 1.02);
				let right_moveLeftS = map(cur_frac, secondStop, 1, orbSize * 1.02, 0);
				let right_MoveUpS = map(cur_frac, firstStop, 0.5, 0, -orbSize * 2.22);
				let right_MoveDownS = map(cur_frac, secondStop, 1, -orbSize * 2.22, 0);

				fill(140);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross + orbSize * 1.1, spacingSizeY * down + orbSize * 0.6);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + orbSize * 1.1 + right_moveRightS, spacingSizeY * down + orbSize * 0.6 + right_MoveUpS);
					shearY(right_deformSquareS);
					scale(right_scaleSquareS, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross + orbSize * 1.1 + orbSize * 1.02, spacingSizeY * down + orbSize * 0.6 - orbSize * 2.22);
					shearY(-22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + orbSize * 1.1 + right_moveLeftS, spacingSizeY * down + orbSize * 0.6 + right_MoveDownS);
					shearY(right_deformQuadS);
					scale(right_scaleQuadS, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseLine, changeRadius);

				pop();
				///////////////////////////////////////

				// Draw right quad #3 Line version (noise sizes)
				push();
				rectMode(CENTER);
				let right_deformSquareL = map(cur_frac, firstStop, 0.5, 0, -22.5);
				let right_deformQuadL = map(cur_frac, secondStop, 1, -22.5, 0);
				let right_scaleSquareL = map(cur_frac, firstStop, 0.5, 1, 0.9);
				let right_scaleQuadL = map(cur_frac, secondStop, 1, 0.9, 1);
				let right_moveRightL = map(cur_frac, firstStop, 0.5, 0, orbSize * 1.02);
				let right_moveLeftL = map(cur_frac, secondStop, 1, orbSize * 1.02, 0);
				let right_MoveUpL = map(cur_frac, firstStop, 0.5, 0, -orbSize * 2.22);
				let right_MoveDownL = map(cur_frac, secondStop, 1, -orbSize * 2.22, 0);

				noFill();
				stroke(backgroundColor);

				if (cur_frac < firstStop) {
					translate(spacingSize * accross + orbSize * 1.1, spacingSizeY * down + orbSize * 0.6);
					shearY(0);
					scale(1, 1);
					changeRadius = sqRadius * 10;
				} else if (cur_frac >= firstStop && cur_frac < 0.5) {
					translate(spacingSize * accross + orbSize * 1.1 + right_moveRightL, spacingSizeY * down + orbSize * 0.6 + right_MoveUpL);
					shearY(right_deformSquareL);
					scale(right_scaleSquareL, 1);
					changeRadius = changeRadiusMapRd;
				} else if (cur_frac >= 0.5 && cur_frac < secondStop) {
					translate(spacingSize * accross + orbSize * 1.1 + orbSize * 1.02, spacingSizeY * down + orbSize * 0.6 - orbSize * 2.22);
					shearY(-22.5);
					scale(0.9, 1);
					changeRadius = sqRadius;
				} else if (cur_frac >= secondStop) {
					translate(spacingSize * accross + orbSize * 1.1 + right_moveLeftL, spacingSizeY * down + orbSize * 0.6 + right_MoveDownL);
					shearY(right_deformQuadL);
					scale(right_scaleQuadL, 1);
					changeRadius = changeRadiusMapSq;
				}

				square(0, 0, orbSize * noiseSize, changeRadius);

				pop();
				///////////////////////////////////////

				if (cur_frac >= firstStop && cur_frac <= 0.5 && noiseColor < 0.6
					|| cur_frac >= secondStop && noiseColor < 0.6) {
					fill("#03A678");
					moveYMap = map(cur_frac, 0, 1, spacingSize * down, spacingSize * (down - 2) + orbSize * 2);
					square(spacingSize * accross, moveYMap, orbSize * noiseColor * 0.5, cur_frac * 12);
				}
			}

		}

	}
}
