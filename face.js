/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [0, 0, 0];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [93, 120, 185];
  this.mainColour = [255, 253, 227];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51];
  this.lipColour = [136, 68, 68];
  this.eyebrowColour = [59, 95, 120];

  

  

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    this.headPosX = positions.nose_bridge[0][0]; // Use nose coordinate as center of the face
    this.headPosY = positions.nose_bridge[3][1];
    this.headWidth = positions.chin[16][0] - positions.chin[0][0];
    this.headHeight = positions.chin[8][1] - positions.nose_bridge[0][1];
    this.noseTipCenterX = positions.nose_tip[2][0];
    // this.noseTipSize_right = abs(positions.nose_tip[4][0]);
    this.roundCorner = 0;
    // head
    
    ellipseMode(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);
    
    stroke(stroke_color);
    fill(this.mainColour);

    push();
    // shearX(5);
    if(this.headWidth < this.headHeight) {
      this.roundCorner = this.headWidth * 0.25; 
    } 
    else if(this.headWidth > this.headHeight){
      this.roundCorner = this.headHeight * 0.25;
    }
    // rect(segment_average(positions.chin)[0]+1.4, 0, 3.6, 3, 0.9);
    // rect(segment_average(positions.chin)[0]+1, 0, 3.6, 3.5, 0.5);
    rect(this.headPosX - this.noseTipCenterX *2.5, this.headPosY, this.headWidth*1.1, this.headHeight*1.25*1.1, this.roundCorner);
    // shearX(-5);
    rect(this.headPosX - this.noseTipCenterX * 1.5, this.headPosY, this.headWidth*1.1, this.headHeight*1.25*1.1, this.roundCorner * 0.6);

    push();
    // blendMode(HARD_LIGHT);
    // noStroke();
    fill(255, 50, 50);
    rect(this.headPosX - this.noseTipCenterX, this.headPosY, this.headWidth, this.headHeight*1.25, this.roundCorner * 2);
    fill(this.mainColour);
    rect(this.headPosX - this.noseTipCenterX, this.headPosY, this.headWidth, this.headHeight*1.25, this.roundCorner * 2);
    noFill();
    stroke('red');
    ellipse(this.headPosX - this.noseTipCenterX - this.headWidth / 2 + this.roundCorner * 2,
            this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2,
            this.roundCorner * 2 * 2);

    strokeWeight(0.01);
    stroke(0);
    for(topLeftCorner = 1; topLeftCorner < 90; topLeftCorner+=2){
      stroke(255, 0, 0);
      line(this.headPosX - this.noseTipCenterX - this.headWidth / 2 + this.roundCorner * 2 - cos(topLeftCorner) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner) * this.roundCorner * 2,
      this.headPosX - this.noseTipCenterX + this.headWidth / 2 - this.roundCorner * 2 + cos(topLeftCorner) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner) * this.roundCorner * 2
      );
      stroke(0, 255, 0);
      line(this.headPosX - this.noseTipCenterX - this.headWidth / 2 + this.roundCorner * 2 - cos(topLeftCorner-0.5) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner-0.5) * this.roundCorner * 2,
      this.headPosX - this.noseTipCenterX + this.headWidth / 2 - this.roundCorner * 2 + cos(topLeftCorner-0.5) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner-0.5) * this.roundCorner * 2
      );
      stroke(0, 0, 255);
      line(this.headPosX - this.noseTipCenterX - this.headWidth / 2 + this.roundCorner * 2 - cos(topLeftCorner+0.5) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner+0.5) * this.roundCorner * 2,
      this.headPosX - this.noseTipCenterX + this.headWidth / 2 - this.roundCorner * 2 + cos(topLeftCorner+0.5) * this.roundCorner * 2,
      this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2 - sin(topLeftCorner+0.5) * this.roundCorner * 2
      );
    }
    
    pop();

    pop();
    // Draw hatch lines
    push();
    // strokeWeight(0.01);
    // for (hatchingY = -1; hatchingY < 1.4; hatchingY += 0.1){
    //   line(segment_average(positions.chin)[0]+2.8, hatchingY, segment_average(positions.chin)[0]+2.5-hatchingY*0.04, hatchingY-0.2);
    //   line(segment_average(positions.chin)[0]+2.8, hatchingY, segment_average(positions.chin)[0]+3-hatchingY*0.02, hatchingY-0.1);
    //   line(segment_average(positions.chin)[0]+2.8, hatchingY-0.2, segment_average(positions.chin)[0]+3-hatchingY*0.02, hatchingY);
    // }
    pop();

    
    
    ///////////////////////////////////////////////////////////////

    // mouth
    push();
    noStroke();
    fill(this.detailColour);
    arc(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 
    segment_average(positions.bottom_lip)[1]-segment_average(positions.bottom_lip)[0], 1 * this.mouth_size, 
        0,180);
    pop();

    ///////////////////////////////////////////////////////////////

    // eyebrows
    
    fill( this.eyebrowColour);
    stroke( this.eyebrowColour);
    noStroke();
    // this.draw_segment(positions.left_eyebrow);
    // this.draw_segment(positions.right_eyebrow);
    
    // fill(this.detailColour);
    arc(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1], 
      positions.left_eyebrow[4][0] - positions.left_eyebrow[0][0], (positions.left_eyebrow[4][0] - positions.left_eyebrow[0][0]) / 2, 
        180,360);
    arc(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1], 
      positions.right_eyebrow[4][0] - positions.right_eyebrow[0][0], (positions.right_eyebrow[4][0] - positions.right_eyebrow[0][0]) / 2, 
        180,360);

    // draw the chin segment using points
    fill(this.chinColour);
    stroke(this.chinColour);
    this.draw_segment(positions.chin);

    fill(100, 0, 100);
    stroke(100, 0, 100);
    this.draw_segment(positions.nose_bridge);
    this.draw_segment(positions.nose_tip);

    strokeWeight(0.03);

    fill(this.lipColour);
    stroke(this.lipColour);
    this.draw_segment(positions.top_lip);
    this.draw_segment(positions.bottom_lip);

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    ///////////////////////////////////////////////////////////////

    // eyes
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      fill(this.detailColour);
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.4, 0.8);
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.4, 0.8);

      fill(this.mainColour);
      ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    }
    else {
      let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      fill(this.detailColour);
      ellipse(eyePosX, eyePosY, 0.45, 0.27);

      fill(this.mainColour);
      ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    }

    ///////////////////////////////////////////////////////////////

    // nose
    push();
    strokeWeight(0.08);
    stroke(255);
    // let noseTop = this.draw_segment(positions.nose_bridge);
    // let noseBottom = this.draw_segment(positions.nose_tip);
    line(positions.nose_bridge[0][0], positions.nose_bridge[0][1], positions.nose_tip[2][0], positions.nose_tip[2][1]);
    pop();

    ///////////////////////////////////////////////////////////////
   fill(255);
   ellipse(0,0, 0.1,0.1); //center point
  //  rect(-2,-2,4.5,4); //sizing debug 
  }


  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
}
