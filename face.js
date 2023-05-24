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

  this.screenRed = [255, 15, 115, 70];
  this.screenGreen = [38, 145, 40, 80];
  this.screenBlue = [15, 107, 255, 70];
  this.colorPick = [this.screenRed, this.screenGreen, this.screenBlue];
  this.colorSwitch = 2;

  

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    this.headPosX = positions.nose_bridge[0][0]; // Use nose coordinate as center of the face
    this.headPosY = positions.nose_bridge[3][1];
    this.headWidth = positions.chin[16][0] - positions.chin[0][0]; // Use 1st and last points of chin to get width
    this.headHeight = positions.chin[8][1] - positions.nose_bridge[0][1]; // Top nose bridge point to bottom chin point
    this.noseTipCenterX = positions.nose_tip[2][0]; // Center point of nose tip, to use for finding the offset of head left or right side
    this.roundCorner; // Radius of round corner (or tangent circle's radius)
    this.headSize_L = positions.nose_tip[2][0] - positions.chin[2][0]; // Size of left side head
    this.headSize_R = positions.chin[14][0] - positions.nose_tip[2][0]; // Size of right side head
    this.headOffset;
    this.headOffsetRatio;

    this.topLeftCorner_X = this.headPosX - this.headWidth / 2 + this.roundCorner * 2;
    this.topLeftCorner_Y = this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2;
    this.topRightCorner_X = this.headPosX + this.headWidth / 2 - this.roundCorner * 2;
    this.topRightCorner_Y = this.headPosY - this.headHeight*1.25 /2 + this.roundCorner * 2;
    this.bottomLeftCorner_X = this.headPosX - this.headWidth / 2 + this.roundCorner * 2;
    this.bottomLeftCorner_Y = this.headPosY + this.headHeight*1.25 /2 - this.roundCorner * 2;
    this.bottomRightCorner_X = this.headPosX + this.headWidth / 2 - this.roundCorner * 2;
    this.bottomRightCorner_Y = this.headPosY + this.headHeight*1.25 /2 - this.roundCorner * 2;
    
    // head
    
    ellipseMode(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);
    
    stroke(stroke_color);
    strokeWeight(0.14);
    fill(this.mainColour);

    push();
    // Finding the short side of head to define the Radius
    if(this.headWidth < this.headHeight) {
      this.roundCorner = this.headWidth * 0.25; 
    } 
    else if(this.headWidth > this.headHeight){
      this.roundCorner = this.headHeight * 0.25;
    }

    // To get the facing direction
    if(this.headSize_L < this.headSize_R){
      this.headOffset = this.headSize_R * (this.headSize_R / this.headSize_L);
      this.headOffsetRatio = this.headSize_R / this.headSize_L;
    }
    else if(this.headSize_L > this.headSize_R){
      this.headOffset = -this.headSize_L * (this.headSize_L / this.headSize_R);
      this.headOffsetRatio = this.headSize_L / this.headSize_R;
    }
    // rect(segment_average(positions.chin)[0]+1.4, 0, 3.6, 3, 0.9);
    // rect(segment_average(positions.chin)[0]+1, 0, 3.6, 3.5, 0.5);
    push();
    translate(this.headOffset*0.22, 0);
    fill(184, 182, 163);
    rect(this.headPosX, this.headPosY, this.headWidth*1.1, this.headHeight*1.25*1.1, this.roundCorner);
    pop();

    push();
    translate(this.headOffset*0.15, 0);
    rect(this.headPosX, this.headPosY, this.headWidth*1.1, this.headHeight*1.25*1.1, this.roundCorner * 0.9);
    pop();

    push();
    // blendMode(HARD_LIGHT);
    // noStroke();
    translate(this.headOffset*0.1, 0);
    fill(this.mainColour);
    rect(this.headPosX, this.headPosY, this.headWidth, this.headHeight*1.25, this.roundCorner * 2);
    pop();

    // Draw circle helper
    push();
    translate(this.headOffset*0.1, 0);
    noFill();
    stroke(255, 153, 145);
    strokeWeight(0.02);
    // ellipse(this.topLeftCorner_X,this.topLeftCorner_Y,this.roundCorner*4);
    // ellipse(this.topRightCorner_X,this.topRightCorner_Y,this.roundCorner*4);
    // ellipse(this.bottomLeftCorner_X,this.bottomLeftCorner_Y,this.roundCorner*4);
    // ellipse(this.bottomRightCorner_X,this.bottomRightCorner_Y,this.roundCorner*4);
    pop();

    push();
    translate(this.headOffset*0.1, 0);
    strokeWeight(0.1);
    stroke(this.colorPick[this.colorSwitch]);
    for(i=0;i<=90;i+=6){
      // for(j=0;j<=this.bottomLeftCorner_Y-this.topLeftCorner_Y;j+=0.5){
      //   stroke(15, 107, 255, 70);
      //  let a = map(j,0,this.bottomLeftCorner_Y-this.topLeftCorner_Y,65,115);
          // line(this.topLeftCorner_X - sin(a) * this.roundCorner * 2 * 1.12, this.topLeftCorner_Y+j,
          //  this.topRightCorner_X + this.roundCorner * 2, this.topRightCorner_Y+j*1.5);
      //      line(this.topLeftCorner_X - this.roundCorner * 2, this.topLeftCorner_Y+j,
      //      this.topRightCorner_X + this.roundCorner * 2, this.topRightCorner_Y+j);
      //  }
    line(this.topLeftCorner_X-cos(i)*this.roundCorner * 2, this.topLeftCorner_Y-sin(i)*this.roundCorner * 2,
          this.topRightCorner_X+cos(i)*this.roundCorner * 2, this.topRightCorner_Y-sin(i)*this.roundCorner * 2);
     
    line(this.bottomLeftCorner_X-cos(i)*this.roundCorner * 2, this.bottomLeftCorner_Y+sin(i)*this.roundCorner * 2,
          this.bottomRightCorner_X+cos(i)*this.roundCorner * 2, this.bottomRightCorner_Y+sin(i)*this.roundCorner * 2);
    }
    
    for(i=5.5;i<=12;i+=6){
    line(this.topLeftCorner_X-cos(i)*this.roundCorner * 2, this.topLeftCorner_Y+sin(i)*this.roundCorner * 2,
          this.topRightCorner_X+cos(i)*this.roundCorner * 2, this.topRightCorner_Y+sin(i)*this.roundCorner * 2);
     
    line(this.bottomLeftCorner_X-cos(i)*this.roundCorner * 2, this.bottomLeftCorner_Y-sin(i)*this.roundCorner * 2,
          this.bottomRightCorner_X+cos(i)*this.roundCorner * 2, this.bottomRightCorner_Y-sin(i)*this.roundCorner * 2);
    }
    pop();

    pop();

    ///////////////////////////////////////////////////////////////

    // mouth
    push();
    stroke(0, 7, 56, 100);
    noFill();
    point(positions.top_lip[4][0], positions.top_lip[4][1]);
    triangle(positions.top_lip[4][0], positions.top_lip[4][1], 
      positions.bottom_lip[0][0], positions.bottom_lip[0][1]+this.mouth_size*0.1, 
      positions.bottom_lip[6][0], positions.bottom_lip[6][1]+this.mouth_size*0.1);
    
    pop();

    ///////////////////////////////////////////////////////////////

    // eyebrows
    push();
    fill( this.eyebrowColour);
    stroke( this.eyebrowColour);
    noStroke();
    // this.draw_segment(positions.left_eyebrow);
    // this.draw_segment(positions.right_eyebrow);
    
    // fill(this.detailColour);
    // arc(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1], 
    //   positions.left_eyebrow[4][0] - positions.left_eyebrow[0][0], (positions.left_eyebrow[4][0] - positions.left_eyebrow[0][0]) / 2, 
    //     180,360);
    // arc(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1], 
    //   positions.right_eyebrow[4][0] - positions.right_eyebrow[0][0], (positions.right_eyebrow[4][0] - positions.right_eyebrow[0][0]) / 2, 
    //     180,360);
    pop();

    // draw the chin segment using points
    // push();
    // fill(this.chinColour);
    // stroke(this.chinColour);
    // this.draw_segment(positions.chin);

    // fill(100, 0, 100);
    // stroke(100, 0, 100);
    // this.draw_segment(positions.nose_bridge);
    // this.draw_segment(positions.nose_tip);

    // strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);
    // pop();
    
    ///////////////////////////////////////////////////////////////

    // eyes
    push();
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    blendMode(BURN);
    noFill();
    stroke(0, 7, 56, 100);
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      // fill(this.detailColour);
      ellipse(left_eye_pos[0]+0.1, positions.nose_bridge[2][1], this.headHeight*0.5, this.headHeight*0.5);
      ellipse(right_eye_pos[0]-0.1, positions.nose_bridge[2][1], this.headHeight*0.5, this.headHeight*0.5);

      ellipse(left_eye_pos[0]+0.1 + curEyeShift, positions.nose_bridge[2][1], this.headHeight*0.2);
      ellipse(right_eye_pos[0]-0.1 + curEyeShift, positions.nose_bridge[2][1], this.headHeight*0.2);

      fill(0);
      arc(left_eye_pos[0]+0.1, positions.nose_bridge[2][1], this.headHeight*0.5, this.headHeight*0.5, 180, 360, CHORD);
      arc(right_eye_pos[0]-0.1, positions.nose_bridge[2][1], this.headHeight*0.5, this.headHeight*0.5, 180, 360, CHORD);
    }
    else {
      let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      fill(this.detailColour);
      ellipse(eyePosX, eyePosY, 0.45, 0.27);

      fill(this.mainColour);
      ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    }
    pop();
    ///////////////////////////////////////////////////////////////

    // nose
    push();
    strokeWeight(0.08);
    stroke(255);
    // let noseTop = this.draw_segment(positions.nose_bridge);
    // let noseBottom = this.draw_segment(positions.nose_tip);
    // line(positions.nose_bridge[0][0], positions.nose_bridge[0][1], positions.nose_tip[2][0], positions.nose_tip[2][1]);
    pop();

    ///////////////////////////////////////////////////////////////
   fill(0);
  //  ellipse(0,0, 0.1,0.1); //center point
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

  this.draw_head = function(){
    
  }

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.colorSwitch = int(map(settings[0], 0, 100, 0, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.colorPick, 0, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);

    return settings;
  }
}
