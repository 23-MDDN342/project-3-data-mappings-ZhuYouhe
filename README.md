[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/wBh5q70M)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11103452&assignment_repo_type=AssignmentRepo)
## 2023 MDDN342 Assignment 3: Data Mappings

Now the CRT face will relate with the angle of faces, just a bit offset of the rect shape and the size according to face trackings.
I also tried the color 'blend' mode of p5JS to mimic that CRT look, but it doesn't work well, so I drew some RGB lines (fit in the screen's shape, cornered rect) and it seems OK for now. 
Basically, to draw the lines within the screen boundary (a round corner rect), I need to get the radius and coordinates of the tangent ellipse for each corner of the rect, and then just use some magic power of Sin/Cos to 'for loop' the lines out. The tangent ellipse's radius is equal to the big rect's corner radius.
I'll tidy the mess later.