/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 9;

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
  
  this.faceDirection = 0;    // Facing direction range 0 to 100, under 50 facing left, above 50 facing right
  this.cornerOptions = [0.3, 1];    // Change the corners radius between 0.3 and 1
  this.cornerChange = 1;
  this.antenna_rotation = 45;    // Antenna rotation, rang is 0 to 90
  this.antenna_length = 0.2;    // Antenna length, range is -0.5 to 0.5
  this.knobRotations = [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165];    // Knobs rotation range -60 to 165
  this.knobRot_up = 10;   // Rotation of upper knob, range is 15 to 5 int, default in vertical direction at 90 degree, from 165 to 15 degree
  this.knobRot_down = 4;   // Rotation of lower knob, range is 0 to 8 int, default in horizontal direction at 0 degree, from -60 to 60 degree
  this.speaker_size = 27;  // Speaker lines' number (size), range is 10 to 60

  this.knobColour = [93, 120, 185];
  this.mainColour = [255, 253, 227];

  this.screenLight = ['#D9D1C7', '#F2B3D1', '#CEB3F2', '#BF946F'];
  this.screenNeutral = ['#F2D479', '#F26A1B', '#4480A6', '#485922'];
  this.screenDark = ['#D99B29', '#A60815', '#2E7B8C', '#012623'];
  this.colorOption = [this.screenLight, this.screenNeutral, this.screenDark];
  this.screenColour = 1;  // Three options of screen colours, range is 0 to 2
  this.antennaColour = 0;  // Two options of antenna colours, range is 0 to 1
  this.antennaColourCur;  // Current antenna colour
  

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    
    this.headPosX = positions.nose_bridge[0][0]; // Use nose coordinate as center of the face
    this.headPosY = positions.nose_bridge[1][1];
    this.headWidth = 4;
    this.headHeight = 2.5;
    this.headSize_L = positions.nose_tip[2][0] - positions.chin[2][0]; // Size of left side head
    this.headSize_R = positions.chin[14][0] - positions.nose_tip[2][0]; // Size of right side head
    this.headOffset;
    this.roundCorner = 0.8; // Radius of round corner (or tangent circle's radius)
    
    this.antennaPos_X;
    this.antennaPos_Y = this.headPosY - this.headHeight * 0.71;
    this.antenna_size = segment_average(positions.right_eye)[0] - segment_average(positions.left_eye)[0];
    this.knobPos_X;
    this.knobPos_Y_up = this.headPosY - 1.1;
    this.knobPos_Y_down = this.headPosY - 0.2;
    this.speakerPos_X;
    this.speakerPos_Y = this.headPosY + (this.headHeight * 1.25 * 1.14) / 2 - this.roundCorner * 1;

    ellipseMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);

    strokeWeight(0.03);
    stroke(stroke_color);
    fill(this.mainColour);

    ///////////////////////////////////////////////////////////////
    // To get the facing direction
    if(this.faceDirection <= 50){ // Facing left, screen on the left side
      this.headOffset = -this.headWidth;
      this.antennaPos_X =  this.headPosX - this.headOffset*0.1;
      this.knobPos_X = this.headPosX - this.headOffset*0.44;
      this.speakerPos_X = this.headPosX + (this.headWidth *1.14) / 2 - this.roundCorner;

      this.leftColorBar = 0; // Screen color bar from light to dark when screen on the left side
      this.leftMidColorBar = 1;
      this.rightMidColorBar = 2;
      this.rightColorBar = 3;
    }
    else if(this.faceDirection > 50){ // Facing right, screen on the right side
      this.headOffset = this.headWidth;
      this.antennaPos_X =  this.headPosX - this.headOffset*0.1;
      this.knobPos_X = this.headPosX - this.headOffset*0.44;
      this.speakerPos_X = this.headPosX - (this.headWidth *1.14) / 2 + this.roundCorner;

      this.leftColorBar = 3; // Screen color bar from dark to light when screen on the right side
      this.leftMidColorBar = 2;
      this.rightMidColorBar = 1;
      this.rightColorBar = 0;
    }
    ///////////////////////////////////////////////////////////////


    // Draw antenna (eyebrows)
    if (this.antennaColour <= 50){  // light colour when slider on the left, dark colour when slider on the right
        this.antennaColourCur = this.mainColour;
    } else{
        this.antennaColourCur = ['#A69B86'];
    }

    push();
      push();
      translate(this.antennaPos_X, this.antennaPos_Y-0.1);
      rotate(this.antenna_rotation);
      stroke(stroke_color);
      strokeWeight(0.25);
      line(0, 0, -this.antenna_size - this.antenna_length, 0);
      stroke(this.antennaColourCur);
      strokeWeight(0.2);
      line(0, 0, -this.antenna_size - this.antenna_length, 0);
      stroke(stroke_color);
      fill(this.antennaColourCur);
      strokeWeight(0.03);
      ellipse(-this.antenna_size - this.antenna_length, 0, 0.5);
      pop();
      push();
      translate(this.antennaPos_X, this.antennaPos_Y-0.1);
      rotate(-this.antenna_rotation);
      stroke(stroke_color);
      strokeWeight(0.25);
      line(0, 0, this.antenna_size + this.antenna_length, 0);
      stroke(this.antennaColourCur);
      strokeWeight(0.2);
      line(0, 0, this.antenna_size + this.antenna_length, 0);
      stroke(stroke_color);
      fill(this.antennaColourCur);
      strokeWeight(0.03);
      ellipse(this.antenna_size + this.antenna_length, 0, 0.5);
      pop();
    
      fill(184, 182, 163);  // This is the base of antennas
      arc(this.antennaPos_X, this.antennaPos_Y, this.antenna_size * 0.8, this.antenna_size * 0.5, 180, 360, CHORD);
    pop();
    ///////////////////////////////////////////////////////////////


    // Draw TV/Monitor main shape and screen
    push();
      push();
      translate(this.headPosX, this.headPosY);
      fill(184, 182, 163);
      rect(0, 0, this.headWidth*1.2, this.headHeight*1.25*1.2, this.roundCorner*1.2);
      pop();

      push();
      translate(this.headPosX, this.headPosY);
      rect(0, 0, this.headWidth*1.14, this.headHeight*1.25*1.14, this.roundCorner);
      pop();

      push();
      translate(this.headPosX + this.headOffset*0.105, this.headPosY);
      fill(50,50,50);
      rect(0, 0, this.headWidth*0.85, this.headHeight*1.25*1.05, this.roundCorner * 0.8);
      pop();

      push();
      noStroke();
      translate(this.headPosX + this.headOffset*0.105, this.headPosY);
      fill(this.mainColour);
      pop();

      // Draw the 'Test Pattern' screen
      push();
      noStroke();
      fill(this.colorOption[this.screenColour][this.leftColorBar]);
      rect(this.headPosX + this.headOffset*0.105 - 0.75, this.headPosY, 
            this.headWidth*0.75*0.5, this.headHeight*1.25*0.89, this.roundCorner * this.cornerOptions[this.cornerChange]);
      fill(this.colorOption[this.screenColour][this.rightColorBar]);
      rect(this.headPosX + this.headOffset*0.105 + 0.75, this.headPosY, 
            this.headWidth*0.75*0.5, this.headHeight*1.25*0.89, this.roundCorner * this.cornerOptions[this.cornerChange]);
      fill(this.colorOption[this.screenColour][this.leftMidColorBar]);
      rect(this.headPosX + this.headOffset*0.105 - 0.375, this.headPosY, this.headWidth*0.75*0.25, this.headHeight*1.25*0.89);
      fill(this.colorOption[this.screenColour][this.rightMidColorBar]);
      rect(this.headPosX + this.headOffset*0.105 + 0.375, this.headPosY, this.headWidth*0.75*0.25, this.headHeight*1.25*0.89);
      pop();

    pop();
    ///////////////////////////////////////////////////////////////

    
    // Draw Knobs (nose)
    push();
      noFill();
      stroke(0, 7, 56);
    
      fill(this.knobColour);
      ellipse(this.knobPos_X, this.knobPos_Y_up, this.headHeight*0.3);
      ellipse(this.knobPos_X, this.knobPos_Y_down, this.headHeight*0.3);
      fill(this.mainColour);
      ellipse(this.knobPos_X, this.knobPos_Y_up, this.headHeight*0.2);
      ellipse(this.knobPos_X, this.knobPos_Y_down, this.headHeight*0.2);

      push();
      translate(this.knobPos_X, this.knobPos_Y_up);
      rotate(this.knobRotations[this.knobRot_up]);
      rect(0, 0, this.headHeight*0.25, this.headHeight*0.05);
      pop();

      push();
      translate(this.knobPos_X, this.knobPos_Y_down);
      rotate(this.knobRotations[this.knobRot_down]);
      rect(0, 0, this.headHeight*0.25, this.headHeight*0.05);
      pop();
    pop();
    ///////////////////////////////////////////////////////////////


    // Draw speaker (mouth)
    push();
      stroke(50,50,50);
      noFill();
      strokeWeight(0.1);
      
      if(this.faceDirection <= 50){
          this.speakerPos_X = this.headPosX + (this.headWidth *1.14) / 2 - this.roundCorner * 1;

        line(this.speakerPos_X, this.speakerPos_Y - sin(16.1)*this.roundCorner * 0.7, 
              this.speakerPos_X + cos(0)*this.roundCorner * 0.7, this.speakerPos_Y - sin(16.1)*this.roundCorner * 0.7);

        for(i=0;i<this.speaker_size;i=i*1.15+16.1){
            line(this.speakerPos_X, this.speakerPos_Y + sin(i)*this.roundCorner * 0.7, 
            this.speakerPos_X + cos(i)*this.roundCorner * 0.7, this.speakerPos_Y + sin(i)*this.roundCorner * 0.7);
            line(this.speakerPos_X, this.speakerPos_Y - sin(i)*this.roundCorner * 0.7,
            this.speakerPos_X + cos(0)*this.roundCorner * 0.7, this.speakerPos_Y - sin(i)*this.roundCorner * 0.7);
        }
      }else if(this.faceDirection > 50){      
        this.speakerPos_X = this.headPosX - (this.headWidth *1.14) / 2 + this.roundCorner * 1;

        line(this.speakerPos_X, this.speakerPos_Y - sin(16.1)*this.roundCorner * 0.7,
            this.speakerPos_X - cos(0)*this.roundCorner * 0.7, this.speakerPos_Y - sin(16.1)*this.roundCorner * 0.7);

        for(i=0;i<this.speaker_size;i=i*1.15+16.1){
          line(this.speakerPos_X, this.speakerPos_Y + sin(i)*this.roundCorner * 0.7, 
            this.speakerPos_X - cos(i)*this.roundCorner * 0.7, this.speakerPos_Y + sin(i)*this.roundCorner * 0.7);
            line(this.speakerPos_X, this.speakerPos_Y - sin(i)*this.roundCorner * 0.7,
            this.speakerPos_X - cos(0)*this.roundCorner * 0.7, this.speakerPos_Y - sin(i)*this.roundCorner * 0.7);
        }
      } 
    pop();

    ///////////////////////////////////////////////////////////////

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
    this.screenColour = int(map(settings[0], 0, 100, 0, 2));
    this.cornerChange = int(map(settings[1], 0, 100, 0, 1));
    this.antennaColour = map(settings[2], 0, 100, 0, 100);
    this.antenna_rotation = map(settings[3], 0, 100, 0, 90);
    this.antenna_length = map(settings[4], 0, 100, -0.5, 0.5);
    this.knobRot_up = int(map(settings[5], 0, 100, 15, 5));
    this.knobRot_down = int(map(settings[6], 0, 100, 0, 8));
    this.speaker_size = map(settings[7], 0, 100, 10, 60);
    this.faceDirection = map(settings[8], 0, 100, 0, 100);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.screenColour, 0, 2, 0, 100);
    settings[1] = map(this.cornerChange, 0, 1, 0, 100);
    settings[2] = map(this.antennaColour, 0, 100, 0, 100);
    settings[3] = map(this.antenna_rotation, 0, 90, 0, 100);
    settings[4] = map(this.antenna_length, -0.5, 0.5, 0, 100);
    settings[5] = map(this.knobRot_up, 15, 5, 0, 100);
    settings[6] = map(this.knobRot_down, 0, 8, 0, 100);
    settings[7] = map(this.speaker_size, 10, 60, 0, 100);
    settings[8] = map(this.faceDirection, 0, 100, 0, 100);

    return settings;
  }
}
