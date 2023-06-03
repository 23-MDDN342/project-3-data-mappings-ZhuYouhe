/*this.detailColour
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

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
  this.knobRot_up = 90;   // Rotation of upper knob, range is 0 to 180
  this.knobRot_down = 90;   // Rotation of lower knob, range is 0 to 180
  this.speaker_size = 27;  // Speaker lines' number (size), range is 17 to 57

  this.chinColour = [153, 153, 51];
  this.lipColour = [136, 68, 68];
  this.eyebrowColour = [59, 95, 120];

  this.screenLight = ['#D9D1C7', '#F2B3D1', '#CEB3F2', '#BF946F'];
  this.screenNeutral = ['#F2D479', '#F26A1B', '#4480A6', '#485922'];
  this.screenDark = ['#D99B29', '#A60815', '#2E7B8C', '#012623'];
  this.colorOption = [this.screenLight, this.screenNeutral, this.screenDark];
  this.colorSwitch = 2;

  

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    let headPosX = positions.nose_bridge[0][0]; // Use nose coordinate as center of the face
    let headPosY = positions.nose_bridge[3][1];
    // headWidth = positions.chin[16][0] - positions.chin[0][0]; // Use 1st and last points of chin to get width
    // headHeight = positions.chin[8][1] - positions.nose_bridge[0][1]; // Top nose bridge point to bottom chin point
    let headWidth = 4;
    let headHeight = 2.5;
    // this.noseTipCenterX = positions.nose_tip[2][0]; // Center point of nose tip, to use for finding the offset of head left or right side
    let roundCorner = 0.8; // Radius of round corner (or tangent circle's radius)
    let headSize_L = positions.nose_tip[2][0] - positions.chin[2][0]; // Size of left side head
    let headSize_R = positions.chin[14][0] - positions.nose_tip[2][0]; // Size of right side head
    let headOffset;
    let knobPos_X;
    let knobPos_Y_up = headPosY - 1.1;
    let knobPos_Y_down = headPosY - 0.2;

    // this.topLeftCorner_X = headPosX - headWidth / 2 + roundCorner * 2;
    // this.topLeftCorner_Y = headPosY - headHeight*1.25 /2 + roundCorner * 2;
    // this.topRightCorner_X = headPosX + headWidth / 2 - roundCorner * 2;
    // this.topRightCorner_Y = headPosY - headHeight*1.25 /2 + roundCorner * 2;
    // this.bottomLeftCorner_X = headPosX - headWidth / 2 + roundCorner * 2;
    // this.bottomLeftCorner_Y = headPosY + headHeight*1.25 /2 - roundCorner * 2;
    this.speakerPos_X;
    this.speakerPos_Y = headPosY + (headHeight * 1.25 * 1.14) / 2 - roundCorner * 1;
    
    // TV/Monitor main shape and screen
    
    ellipseMode(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);
    
    stroke(stroke_color);
    strokeWeight(0.03);
    fill(this.mainColour);

    push();
    // Finding the short side of head to define the Radius
    // if(headWidth < headHeight) {
    //   roundCorner = headWidth * 0.25; 
    // } 
    // else if(headWidth > headHeight){
    //   roundCorner = headHeight * 0.25;
    // }

    // To get the facing direction
    if(headSize_L < headSize_R){
      headOffset = -headWidth;
      knobPos_X = headPosX - headOffset*0.44;
      this.speakerPos_X = headPosX + (headWidth *1.14) / 2 - roundCorner * 1;

      this.leftColorBar = 0; // Screen color bar from light to dark when screen on the left side
      this.leftMidColorBar = 1;
      this.rightMidColorBar = 2;
      this.rightColorBar = 3;
    }
    else if(headSize_L > headSize_R){
      headOffset = headWidth;
      knobPos_X = headPosX - headOffset*0.44;
      this.speakerPos_X = headPosX - (headWidth *1.14) / 2 + roundCorner * 1;

      this.leftColorBar = 3; // Screen color bar from dark to light when screen on the right side
      this.leftMidColorBar = 2;
      this.rightMidColorBar = 1;
      this.rightColorBar = 0;
    }
    // rect(segment_average(positions.chin)[0]+1.4, 0, 3.6, 3, 0.9);
    // rect(segment_average(positions.chin)[0]+1, 0, 3.6, 3.5, 0.5);
    push();
    // translate(headOffset*0.18, 0);
    fill(184, 182, 163);
    rect(headPosX, headPosY, headWidth*1.2, headHeight*1.25*1.2, roundCorner*1.2);
    pop();

    push();
    // translate(headOffset*0.12, 0);
    rect(headPosX, headPosY, headWidth*1.14, headHeight*1.25*1.14, roundCorner);
    pop();

    push();
    // strokeWeight(0.1);
    // translate(headOffset*0.12, 0);
    fill(50,50,50);
    rect(headPosX + headOffset*0.105, headPosY, headWidth*0.85, headHeight*1.25*1.05, roundCorner * 0.8);
    pop();

    push();
    // strokeWeight(0.1);
    // translate(headOffset*0.12, 0);
    fill(this.mainColour);
    rect(headPosX + headOffset*0.105, headPosY, headWidth*0.75, headHeight*1.25*0.9, roundCorner * 1);
    pop();

    // Draw the 'Test Pattern' screen
    push();
    
    noStroke();
    fill(this.colorOption[this.colorSwitch][this.leftColorBar]); // Left colour bar
    rect(headPosX + headOffset*0.105 - 0.75, headPosY, headWidth*0.75*0.5, headHeight*1.25*0.89, roundCorner * 1);
    fill(this.colorOption[this.colorSwitch][this.rightColorBar]); // Right colour bar
    rect(headPosX + headOffset*0.105 + 0.75, headPosY, headWidth*0.75*0.5, headHeight*1.25*0.89, roundCorner * 1);
    fill(this.colorOption[this.colorSwitch][this.leftMidColorBar]); // Middle left colour bar
    rect(headPosX + headOffset*0.105 - 0.375, headPosY, headWidth*0.75*0.25, headHeight*1.25*0.89, roundCorner * 0);
    fill(this.colorOption[this.colorSwitch][this.rightMidColorBar]); // Middle right colour bar
    rect(headPosX + headOffset*0.105 + 0.375, headPosY, headWidth*0.75*0.25, headHeight*1.25*0.89, roundCorner * 0);
    pop();

    // Draw circle helper
    push();
    translate(headOffset*0.1, 0);
    noFill();
    stroke(255, 153, 145);
    strokeWeight(0.02);
    // ellipse(this.topLeftCorner_X,this.topLeftCorner_Y,roundCorner*4);
    // ellipse(this.topRightCorner_X,this.topRightCorner_Y,roundCorner*4);
    // ellipse(this.bottomLeftCorner_X,this.bottomLeftCorner_Y,roundCorner*4);
    // ellipse(this.speakerPos_X,this.speakerPos_Y,roundCorner*4);
    pop();

    // push();
    // translate(headOffset*0.1, 0);
    // strokeWeight(0.1);
    // stroke(this.colorOption[this.colorSwitch]);
    // for(i=0;i<=90;i+=6){
    //   // for(j=0;j<=this.bottomLeftCorner_Y-this.topLeftCorner_Y;j+=0.5){
    //   //   stroke(15, 107, 255, 70);
    //   //  let a = map(j,0,this.bottomLeftCorner_Y-this.topLeftCorner_Y,65,115);
    //       // line(this.topLeftCorner_X - sin(a) * roundCorner * 2 * 1.12, this.topLeftCorner_Y+j,
    //       //  this.topRightCorner_X + roundCorner * 2, this.topRightCorner_Y+j*1.5);
    //   //      line(this.topLeftCorner_X - roundCorner * 2, this.topLeftCorner_Y+j,
    //   //      this.topRightCorner_X + roundCorner * 2, this.topRightCorner_Y+j);
    //   //  }
    // line(this.topLeftCorner_X-cos(i)*roundCorner * 2, this.topLeftCorner_Y-sin(i)*roundCorner * 2,
    //       this.topRightCorner_X+cos(i)*roundCorner * 2, this.topRightCorner_Y-sin(i)*roundCorner * 2);
     
    // line(this.bottomLeftCorner_X-cos(i)*roundCorner * 2, this.bottomLeftCorner_Y+sin(i)*roundCorner * 2,
    //       this.speakerPos_X+cos(i)*roundCorner * 2, this.speakerPos_Y+sin(i)*roundCorner * 2);
    // }
    
    // for(i=5.5;i<=12;i+=6){
    // line(this.topLeftCorner_X-cos(i)*roundCorner * 2, this.topLeftCorner_Y+sin(i)*roundCorner * 2,
    //       this.topRightCorner_X+cos(i)*roundCorner * 2, this.topRightCorner_Y+sin(i)*roundCorner * 2);
     
    // line(this.bottomLeftCorner_X-cos(i)*roundCorner * 2, this.bottomLeftCorner_Y-sin(i)*roundCorner * 2,
    //       this.speakerPos_X+cos(i)*roundCorner * 2, this.speakerPos_Y-sin(i)*roundCorner * 2);
    // }
    // pop();

    pop();

    ///////////////////////////////////////////////////////////////

    // Draw speaker (mouth)
    push();
    stroke(50,50,50);
    noFill();
    strokeWeight(0.1);
    // rect(knobPos_X, knobPos_Y_down+1, headHeight*0.3, headWidth*0.2, 0.1);
    // rect(headPosX, headPosY, headWidth*1.14, headHeight*1.25*1.14, roundCorner);
    // line(knobPos_X - 0.3, knobPos_Y_down + 0.8, knobPos_X + 0.3, knobPos_Y_down + 0.8);
    // line(knobPos_X - 0.3, knobPos_Y_down + 1, knobPos_X + 0.3, knobPos_Y_down + 1);
    
    // line(knobPos_X - 0.3, knobPos_Y_down + 1.2, knobPos_X + 0.3, knobPos_Y_down + 1.2);
    // ellipse(this.speakerPos_X, this.speakerPos_Y, roundCorner * 2);
    // stroke('red');
    if(headSize_L < headSize_R){
       this.speakerPos_X = headPosX + (headWidth *1.14) / 2 - roundCorner * 1;
       for(i=0;i<this.speaker_size;i=i*1.15+16.1){
        line(this.speakerPos_X, this.speakerPos_Y + sin(i)*roundCorner * 0.7, 
          this.speakerPos_X + cos(i)*roundCorner * 0.7, this.speakerPos_Y + sin(i)*roundCorner * 0.7);
          line(this.speakerPos_X, this.speakerPos_Y - sin(i)*roundCorner * 0.7,
          this.speakerPos_X + cos(0)*roundCorner * 0.7, this.speakerPos_Y - sin(i)*roundCorner * 0.7);
      }
    }
    else if(headSize_L > headSize_R){      
      this.speakerPos_X = headPosX - (headWidth *1.14) / 2 + roundCorner * 1;
      for(i=0;i<this.speaker_size;i=i*1.15+16.1){
        line(this.speakerPos_X, this.speakerPos_Y + sin(i)*roundCorner * 0.7, 
          this.speakerPos_X - cos(i)*roundCorner * 0.7, this.speakerPos_Y + sin(i)*roundCorner * 0.7);
          line(this.speakerPos_X, this.speakerPos_Y - sin(i)*roundCorner * 0.7,
          this.speakerPos_X - cos(0)*roundCorner * 0.7, this.speakerPos_Y - sin(i)*roundCorner * 0.7);
      }
    } 
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

    // Draw Knobs (eyes)
    push();
    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    noFill();
    stroke(0, 7, 56);
    // let curEyeShift = 0.04 * this.knobRot_up;
    // if(this.num_eyes == 2) {
      fill(this.detailColour);
      ellipse(knobPos_X, knobPos_Y_up, headHeight*0.3);
      ellipse(knobPos_X, knobPos_Y_down, headHeight*0.3);
      fill(this.mainColour);
      ellipse(knobPos_X, knobPos_Y_up, headHeight*0.2);
      ellipse(knobPos_X, knobPos_Y_down, headHeight*0.2);

      push();
      translate(knobPos_X, knobPos_Y_up);
      rotate(this.knobRot_up);
      rect(0, 0, headHeight*0.25, headHeight*0.05);
      pop();
      push();
      translate(knobPos_X, knobPos_Y_down);
      rotate(this.knobRot_down);
      rect(0, 0, headHeight*0.25, headHeight*0.05);
      pop();
    // }
    // else {
    //   let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
    //   let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

    //   fill(this.detailColour);
    //   ellipse(eyePosX, eyePosY, 0.45, 0.27);

    //   fill(this.mainColour);
    //   ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
    // }
    pop();
    ///////////////////////////////////////////////////////////////

    // Draw Antenna
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
    this.knobRot_up = map(settings[1], 0, 100, 0, 180);
    this.knobRot_down = map(settings[2], 0, 100, 0, 180);
    this.speaker_size = map(settings[3], 0, 100, 16, 57);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.colorOption, 0, 2, 0, 100);
    settings[1] = map(this.knobRot_up, 0, 180, 0, 100);
    settings[2] = map(this.knobRot_down, 0, 180, 0, 100);
    settings[3] = map(this.speaker_size, 16, 57, 0, 100);

    return settings;
  }
}
