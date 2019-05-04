/* ===============================================================================================
  HOW TO USE MARS ROVER: 
  1. commandsList("fflrbb") -> The rover make the movements of the string [f: forward, b: backward,
     l: turns left, r: turns right]
  2. The console prints a message if the rover tries to move out of the grid boundaries,
     or if it meets an obstacle or another rover. Also prints the updated grid.
  3. The obstacles have been already placed in the grid, but you can place the amount you want 
     randomly with the function: obstacles(numberObstacles).
  4. Another two rovers have been created ("R2" and "R3"), and they move randomly around the grid.
     You're "R" on the grid.

      :)                                 
================================================================================================== */

// Mars Rover object (directions: "N", "S", "E", "W")
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  mark: "R"
}

var rover2 = {
  direction: "N",
  x: 9,
  y: 9,
  travelLog: [],
  mark: "R2"
}

var rover3 = {
  direction: "N",
  x: 0,
  y: 9,
  travelLog: [],
  mark: "R3"
}

// Grid 10x10 (calls a function which returns bidimensional array with obstacles)
var grid = obstacles(10);

// We mark the position of the rovers in the grid
function roversPosition() {
  rover.x = 0; rover.y = 0;
  grid[rover.x][rover.y] = rover.mark;
  rover2.x = 9; rover2.y = 9;
  grid[rover2.x][rover2.y] = rover2.mark;
  rover3.x = 0; rover3.y = 9;
  grid[rover3.x][rover3.y] = rover3.mark;
}


// function to put obstacles randomly in a 10x10 grid
function obstacles(obstaclesNumber) {
  // 10x10 array with "null" values
  grid = [];
  for(var i = 0; i < 10; i++) {
    grid[i] = [];
    for(var j = 0; j < 10; j++) {
        grid[i][j] = null;
    }
  }
  // We add obstacles randomly with "X" value (not in [0,0] -> rover's starting position)
  var k = 0;
  while(k < obstaclesNumber) {
    var x = Math.floor(Math.random()*10);
    var y = Math.floor(Math.random()*10);

    if(grid[x][y] == null && x+y != 0){
      grid[x][y] = "X";
      k++;
    }
  }
  //Update rovers position to
  roversPosition();
  return grid;
}

// Direction functions
function turnLeft(rover) {
  selectTurn(rover, "L");
}

function turnRight(rover) {
  selectTurn(rover, "R");
}

// Function with two arguments: object (rover) and direction ("L" = Left | "R" = Right)
function selectTurn(rover, direction) {
  switch (rover.direction) {
    case "N":
      rover.direction = (direction === "L" ? "W" : "E");
      break;
    case "W":
      rover.direction = (direction === "L" ? "S" : "N");
      break;
    case "S":
      rover.direction = (direction === "L" ? "E" : "W");
      break;
    default:
      rover.direction = (direction === "L" ? "N" : "S");
      break;
  }
}

// Movement function
function moveForward(rover) {
  selectMovement(rover, "F");
}

function moveBackward(rover) {
  selectMovement(rover, "B");
}

// Function with two arguments: object (rover) and movement sense ("F" = Forward | "B" = Backward)
function selectMovement(rover, movement) {
  var x = rover.x;
  var y = rover.y;
  var msg = "Out of boundaries!"
  // In each case we check that rover is not out of boundaries, and there is not obstacles
  switch (rover.direction){
    case "N":
      movement === "F" ? rover.x === 0 ? message(msg,x,y,rover) : grid[x -= 1][y] == null ? roverMovement("subtraction","x") : message("",x,y,rover) 
                       : rover.x === 9 ? message(msg,x,y,rover) : grid[x += 1][y] == null ? roverMovement("addition","x") : message("",x,y,rover);
      break;
    case "S":
      movement === "F" ? rover.x === 9 ? message(msg,x,y,rover) : grid[x += 1][y] == null ? roverMovement("addition","x") : message("",x,y,rover) 
                       : rover.x === 0 ? message(msg,x,y,rover) : grid[x -= 1][y] == null ? roverMovement("subtraction","x") : message("",x,y,rover);
      break;
    case "W":
      movement === "F" ? rover.y === 0 ? message(msg,x,y,rover) : grid[x][y -= 1] == null ? roverMovement("subtraction","y") : message("",x,y,rover) 
                       : rover.y === 9 ? message(msg,x,y,rover) : grid[x][y += 1] == null ? roverMovement("addition","y") : message("",x,y,rover);
      break;
    default:
      movement === "F" ? rover.y === 9 ? message(msg,x,y,rover) : grid[x][y += 1] == null ? roverMovement("addition","y") : message("",x,y,rover) 
                       : rover.y === 0 ? message(msg,x,y,rover) : grid[x][y -= 1] == null ? roverMovement("subtraction","y") : message("",x,y,rover);
      break;
  }
  // Function to move the rover, and also update the "R" letter position in the grid
  function roverMovement(s,p){
    grid[rover.x][rover.y] = null;
    s === "addition" ? p === "x" ? rover.x += 1 : rover.y += 1 : p === "x" ? rover.x -= 1 : rover.y -= 1;
    grid[rover.x][rover.y] = rover.mark;
  }

  if(rover.mark == "R"){
    var travelLog = rover.x + "," + rover.y;
    rover.travelLog.push(travelLog);
  }
}

// We print the correct message
function message(msg,x,y,rover) {
  if(rover.mark === "R"){
    if(msg == ''){
      if(grid[x][y] === "X"){
        console.log("There is an obstacle in position: " + x + ", " + y);
      }else{
        console.log("Your friend " + grid[x][y] + " is in: " + x + ", " + y + "!");
      } 
    }else{
      console.log(msg);
    }
  }
}

// List of commands
function commandsList(commands) {
  for(var i = 0; i <= commands.length-1; i++){
    // Make a movement only if command's letter is "r"|"l"|"f"|"b"
    var command = commands[i];
    switch (command) {
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
    }
    // We move randomly the two others rover
    randomMovement(rover2);
    randomMovement(rover3);
  }

  function randomMovement(rov){
    switch (Math.floor(Math.random()*4)+1) {
      case 1:
        turnRight(rov);
        break;
      case 2: 
        turnLeft(rov);
        break;
      case 3:
        moveBackward(rov);
        break;
      default:
        moveForward(rov);
        break;
    }
  }
  // Print travelLog and Grid
  console.log("travelLog: " + rover.travelLog);
  console.log(grid);
}


