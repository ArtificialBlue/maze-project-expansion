module.exports = generate_maze;
//!!Uncomment for Testing
//module.exports = random_id;
const Libhoney = require("libhoney");

let hny = new Libhoney({
  //!Setup as environment variables!//
  writeKey: process.env.HONEYCOMB_API_KEY,
  dataset: "honeycomb-javascript-maze",
  responseCallback: responses => {
    responses.forEach(resp => {
      console.log(resp);
    });
  }
});

hny.sendNow({
    name: "app.js Initialized",
    randomFloat: Math.random()
});

function random_id(nbytes) {
  let hexString = "";
  while (hexString.length < nbytes * 2) {
    let hexRep = Math.floor(Math.random() * 256).toString(16);
    if (hexRep.length < 2) {
      hexString += "0" + hexRep;
    }
  }
  return hexString;
}

function getSpanId() {
    return random_id(8);
}

function getInitialTime() {
    return performance.now();
}

eventBuilder = hny.newBuilder();
eventBuilder.addDynamicField("initial_time",getInitialTime);
eventBuilder.addDynamicField("trace.span_id",getSpanId);


let maze = [];

function createEvent(trace_id, parent_id = null) {
  const Event = eventBuilder.newEvent();
  Event.add({
    "trace.trace_id": trace_id,
    "trace.parent_id": parent_id,
  });
  Event.timestamp = Date.now();
  return Event;
}

function endEvent(Event, name, additionalFields = null) {
  const endT = performance.now();
  const totalT = endT - Event.data["initial_time"];
  Event.add({
    duration_ms: totalT,
    name: name,
  });
  //Add Additional Fields
  //additionalFields Type is Object {}
  for (var field in additionalFields) {
    Event.addField(field, additionalFields[field]);
  }
  Event.metadata = {id: name}
  Event.send();
  hny.flush();
}

function clear_maze(trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  maze.length = 0;
  //-----------
  endEvent(functionEvent, "clear_maze()", { isFunction: true });
}

function init_maze(size, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  for (let i = 0; i < size; i++) {
    let line = Array(size).fill("u");
    maze.push(line);
  }
  //-----------
  endEvent(functionEvent, "init_maze()", { dimension: size, isFunction: true });
}

function make_walls(width, height, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (maze[i][j] == "u") {
        maze[i][j] = "1";
      }
    }
  }
  //-----------
  endEvent(functionEvent, "make_walls()", {
    width: width,
    height: height,
    dimension: width,
    isFunction: true,
  });
}

function delete_wall(walls, rand_wall, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  walls.forEach(function (wall) {
    if (wall[0] == rand_wall[0] && wall[1] == rand_wall[1]) {
      walls.splice(walls.indexOf(wall), 1);
    }
  });
  //-----------
  endEvent(functionEvent, "delete_wall()", {
    walls: walls,
    rand_wall: rand_wall,
    isFunction: true,
  });
}

function create_entrance(maze, width, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  for (let i = 0; i < width; i++) {
    if (maze[1][i] == "0") {
      maze[0][i] = "2";
      break;
    }
  }
  //-----------
  endEvent(functionEvent, "create_entrance()", {
    maze: maze,
    width: width,
    dimension: width,
    isFunction: true,
  });
}

function create_exit(maze, width, height, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  for (let i = width - 1; i >= 0; i--) {
    if (maze[height - 2][i] == "0") {
      maze[height - 1][i] = "2";
      break;
    }
  }
  //-----------
  endEvent(functionEvent, "create_exit()", {
    maze: maze,
    width: width,
    height: height,
    dimension: width,
    isFunction: true,
  });
}

function create_entrance_exit(maze, width, height, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  const span_id = functionEvent.data["trace.span_id"];
  //-----------
  create_entrance(maze, width, trace_id, span_id);
  create_exit(maze, width, height, trace_id, span_id);
  //-----------
  endEvent(functionEvent, "create_entrance_exit()", {
    maze: maze,
    width: width,
    height: height,
    dimension: width,
    isFunction: true,
  });
}

function surrounding_cells(rand_wall, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  //-----------
  let s_cells = 0;

  if (maze[rand_wall[0] - 1][rand_wall[1]] == "0") {
    s_cells += 1;
  }
  if (maze[rand_wall[0] + 1][rand_wall[1]] == "0") {
    s_cells += 1;
  }
  if (maze[rand_wall[0]][rand_wall[1] - 1] == "0") {
    s_cells += 1;
  }
  if (maze[rand_wall[0]][rand_wall[1] + 1] == "0") {
    s_cells += 1;
  }
  //-----------
  endEvent(functionEvent, "surrounding_cells()", {
    rand_wall: rand_wall,
    isFunction: true,
  });

  return s_cells;
}

function flatten_maze(maze, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  const span_id = functionEvent.data["trace.span_id"];
  //-----------
  let bitstring = "";
  for (let item of maze) {
    if (Array.isArray(item)) bitstring += flatten_maze(item, trace_id, span_id);
    else bitstring += item;
  }
  //-----------
  endEvent(functionEvent, "flatten_maze()", { maze: maze, isFunction: true });

  return bitstring;
}

function create_maze(maze, width, height, walls, trace_id, parent_id = null) {
  const functionEvent = createEvent(trace_id, parent_id);
  const span_id = functionEvent.data["trace.span_id"];
  //-----------
  let wallsIter = walls[Symbol.iterator]();

  let condition = wallsIter.next();

  while (!condition.done && walls.length > 0) {
    const loopEvent = createEvent(trace_id, span_id);

    // Pick a random wall
    let ranIndex = Math.floor(Math.random() * walls.length);
    if (ranIndex != 0) {
      ranIndex -= 1;
    }
    let rand_wall = walls[ranIndex];

    //Check if it is a left wall
    if (rand_wall[1] != 0) {
      if (
        maze[rand_wall[0]][rand_wall[1] - 1] == "u" &&
        maze[rand_wall[0]][rand_wall[1] + 1] == "0"
      ) {
        // Find the number of surrounding cells
        let s_cells = surrounding_cells(rand_wall, trace_id, span_id);

        if (s_cells < 2) {
          // Denote the new path
          maze[rand_wall[0]][rand_wall[1]] = "0";

          // Mark the new walls
          // Upper cell
          if (rand_wall[0] != 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] - 1, rand_wall[1]])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }
          //Bottom cell
          if (rand_wall[0] != height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] + 1, rand_wall[1]])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }
          //Leftmost cell
          if (rand_wall[1] != 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] - 1])) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }
        }
        delete_wall(walls, rand_wall, trace_id, span_id);

        endEvent(loopEvent, "ifLeftWall", {
          maze: maze,
          width: width,
          height: height,
          walls: walls,
          dimension: width,
          isFunction: false,
        });

        continue;
      }
    }
    //Check if it is an upper wall
    if (rand_wall[0] != 0) {
      if (
        maze[rand_wall[0] - 1][rand_wall[1]] == "u" &&
        maze[rand_wall[0] + 1][rand_wall[1]] == "0"
      ) {
        // Find the number of surrounding cells
        let s_cells = surrounding_cells(rand_wall, trace_id, span_id);

        if (s_cells < 2) {
          // Denote the new path
          maze[rand_wall[0]][rand_wall[1]] = "0";

          // Mark the new walls
          // Upper cell
          if (rand_wall[0] != 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] - 1, rand_wall[1]])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }
          // Leftmost cell
          if (rand_wall[1] != 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] - 1])) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }
          //Rightmost cell
          if (rand_wall[1] != width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] + 1])) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
        }
        delete_wall(walls, rand_wall, trace_id, span_id);

        endEvent(loopEvent, "ifUpperWall", {
          maze: maze,
          width: width,
          height: height,
          walls: walls,
          dimension: width,
          isFunction: false,
        });

        continue;
      }
    }
    //Check the bottom wall
    if (rand_wall[0] != height - 1) {
      if (
        maze[rand_wall[0] + 1][rand_wall[1]] == "u" &&
        maze[rand_wall[0] - 1][rand_wall[1]] == "0"
      ) {
        // Find the number of surrounding cells
        let s_cells = surrounding_cells(rand_wall, trace_id, span_id);
        if (s_cells < 2) {
          // Denote the new path
          maze[rand_wall[0]][rand_wall[1]] = "0";

          // Mark the new walls
          //Bottom cell
          if (rand_wall[0] != height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] + 1, rand_wall[1]])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }
          // Leftmost cell
          if (rand_wall[1] != 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] - 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] - 1])) {
              walls.push([rand_wall[0], rand_wall[1] - 1]);
            }
          }
          // Rightmost cell
          if (rand_wall[1] != width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] + 1])) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
        }
        delete_wall(walls, rand_wall, trace_id, span_id);

        endEvent(loopEvent, "ifBottomWall", {
          maze: maze,
          width: width,
          height: height,
          walls: walls,
          dimension: width,
          isFunction: false,
        });

        continue;
      }
    }
    //Check the right wall
    if (rand_wall[1] != width - 1) {
      if (
        maze[rand_wall[0]][rand_wall[1] + 1] == "u" &&
        maze[rand_wall[0]][rand_wall[1] - 1] == "0"
      ) {
        // Find the number of surrounding cells
        let s_cells = surrounding_cells(rand_wall, trace_id, span_id);

        if (s_cells < 2) {
          // Denote the new path
          maze[rand_wall[0]][rand_wall[1]] = "0";
          // Mark the new walls
          // Rightmost cell
          if (rand_wall[1] != width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
              maze[rand_wall[0]][rand_wall[1] + 1] = "1";
            }
            if (!walls.includes([rand_wall[0], rand_wall[1] + 1])) {
              walls.push([rand_wall[0], rand_wall[1] + 1]);
            }
          }
          // Bottom cell
          if (rand_wall[0] != height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] + 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] + 1, rand_wall[1]])) {
              walls.push([rand_wall[0] + 1, rand_wall[1]]);
            }
          }
          //Upper cell
          if (rand_wall[0] != 0) {
            if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
              maze[rand_wall[0] - 1][rand_wall[1]] = "1";
            }
            if (!walls.includes([rand_wall[0] - 1, rand_wall[1]])) {
              walls.push([rand_wall[0] - 1, rand_wall[1]]);
            }
          }
        }
        delete_wall(walls, rand_wall, trace_id, span_id);

        endEvent(loopEvent, "ifRightWall", {
          maze: maze,
          width: width,
          height: height,
          walls: walls,
          dimension: width,
          isFunction: false,
        });

        continue;
      }
    }
    delete_wall(walls, rand_wall, trace_id, span_id);
  }
  //-----------
  endEvent(functionEvent, "create_maze()", {
    maze: maze,
    width: width,
    height: height,
    walls: walls,
    dimension: width,
    isFunction: true,
  });
}

function generate_maze(height, width) {
  const trace_id = random_id(16);
  const functionEvent = createEvent(trace_id);
  const span_id = functionEvent.data["trace.span_id"];
  //-----------
  const wall = "1";
  const cell = "0";

  clear_maze(trace_id, span_id);

  init_maze(height, trace_id, span_id);

  // Randomize starting point and set it as a cell
  let starting_height = Math.floor(Math.random() * height);
  let starting_width = Math.floor(Math.random() * width);
  if (starting_height == 0) {
    starting_height += 1;
  }
  if (starting_height == height - 1) {
    starting_height -= 1;
  }
  if (starting_width == 0) {
    starting_width += 1;
  }
  if (starting_width == width - 1) {
    starting_width -= 1;
  }

  // Mark it as a cell and add surrounding walls to the list
  maze[starting_height][starting_width] = cell;
  let walls = [];
  walls.push([starting_height - 1, starting_width]);
  walls.push([starting_height, starting_width - 1]);
  walls.push([starting_height, starting_width + 1]);
  walls.push([starting_height + 1, starting_width]);

  // Denote walls in maze
  maze[starting_height - 1][starting_width] = "1";
  maze[starting_height][starting_width - 1] = "1";
  maze[starting_height][starting_width + 1] = "1";
  maze[starting_height + 1][starting_width] = "1";

  create_maze(maze, width, height, walls, trace_id, span_id);

  make_walls(width, height, trace_id, span_id);

  create_entrance_exit(maze, width, height, trace_id, span_id);

  flattened_maze = flatten_maze(maze, trace_id, span_id);

  //-----------
  endEvent(functionEvent, "generate_maze()", {
    width: width,
    height: height,
    dimension: width,
    isFunction: true,
  });

  return flattened_maze;
}
