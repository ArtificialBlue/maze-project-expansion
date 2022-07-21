//Random functions done with Math.random()
//Datetime functions done with Date() objects/methods
module.exports = generate_maze;
const Libhoney = require("libhoney");

let hny = new Libhoney({
    //!Setup as environment variables!//
   writeKey: process.env["HONEYCOMB_API_KEY"],
   dataset: "honeycomb-javascript-maze"
 });

function random_id(nbytes){
    let hexString = "";
    for (let i = 0; i < nbytes; i++) {
        let hexRep = Math.floor(Math.random() * 256).toString(16); 
        hexString += hexRep;
    }
    return hexString
}

let maze = [];

function clear_maze(parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    maze.length = 0;
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "clear_maze()",
        "name": "clear_maze()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id
    });
    functionEvent.send();
}

function init_maze(size, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    for (let i = 0; i < size; i++) {
        let line = Array(size).fill("u");
        maze.push(line);
      }
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "init_maze()",
        "name": "init_maze()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "dimension": size
    });
    functionEvent.send();

}

function make_walls(width, height, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (maze[i][j] == "u"){
                maze[i][j] = "1";
            }
        }
    }
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "make_walls()",
        "name": "make_walls()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "width": width,
        "height": height,
        "dimension": width
    });
    functionEvent.send();

}

function delete_wall(walls, rand_wall, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    walls.forEach(function (wall) {
        if (wall[0] == rand_wall[0] && wall[1] == rand_wall[1]){
            walls.splice(walls.indexOf(wall),1);
        }
    });
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "delete_wall()",
        "name": "delete_wall()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "walls": walls,
        "rand_wall": rand_wall
    }); 
    functionEvent.send();
}

function create_entrance(maze, width, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    for (let i = 0; i < width; i++) {
        if (maze[1][i] == "0") {
            maze[0][i] = "2";
            break;
        }
    }
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": " create_entrance()",
        "name": " create_entrance()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "maze": maze,
        "width": width,
        "dimension": width
    });
    functionEvent.send();
}

function create_exit(maze, width, height, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    for (let i = width - 1; i >= 0; i--) {
        if (maze[height - 2][i] == "0") {
            maze[height - 1][i] = "2";
            break;
        }
    }
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "create_exit()",
        "name": "create_exit()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "maze": maze,
        "width": width,
        "height": height,
        "dimension": width
    });
    functionEvent.send();
}

function create_entrance_exit(maze, width, height, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    create_entrance(maze, width, span_id, trace_id);
    create_exit(maze, width, height, span_id, trace_id);
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "create_entrance_exit()",
        "name": "create_entrance_exit()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "maze": maze,
        "width": width,
        "height": height,
        "dimension": width
    });
    functionEvent.send();

}

function surrounding_cells(rand_wall, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
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
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "surrounding_cells()",
        "name": "surrounding_cells()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "rand_wall": rand_wall
    });
    functionEvent.send();

    return s_cells;
}

function flatten_maze(maze, parent_id = None, trace_id =  None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    //-----------
    let bitstring = "";
    for (let item of maze) {
        if (Array.isArray(item)) bitstring += flatten_maze(item, span_id, trace_id);
        else bitstring += item;
    }
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;
    functionEvent.add({
        "duration_ms": totalT,
        "function": "flatten_maze()",
        "name": "flatten_maze()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "maze": maze
    });
    functionEvent.send();

    return bitstring;
}


function create_maze(maze, width, height, walls, parent_id = None, trace_id = None){
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    //!!Additional complicated subroutine instrumentation because of continue statements. Pay close attention.
    let wallsIter =  walls[Symbol.iterator]();

    let condition = wallsIter.next();

    while( !condition.done && walls.length > 0){
        const loopEvent = hny.newEvent();
        const loopStartT = performance.now();


        // Pick a random wall
        let ranIndex = Math.floor(Math.random() * walls.length); // - 1;
        if (ranIndex != 0) {
            ranIndex -= 1;
        }
        let rand_wall = walls[ranIndex];

        //Check if it is a left wall
        if (rand_wall[1] != 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] == "u" && maze[rand_wall[0]][rand_wall[1] + 1] == "0"){
                // Find the number of surrounding cells
                let s_cells = surrounding_cells(rand_wall, span_id, trace_id);

                if (s_cells < 2) {
                    // Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0";

                    // Mark the new walls
                    // Upper cell
                    if (rand_wall[0] != 0) {
                        if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] - 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] - 1, rand_wall[1]]);
                        }
                    }
                    //Bottom cell
                    if (rand_wall[0] != height - 1) {
                        if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] + 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] + 1, rand_wall[1]]);
                        }
                    }
                    //Leftmost cell
                    if (rand_wall[1] != 0) {
                        if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] - 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] - 1]);
                        }
                    }
                    
                }
                delete_wall(walls, rand_wall, span_id, trace_id);

                const loopEndT = performance.now();
                const loopDurationT = loopEndT - loopStartT;

                loopEvent.add({ 
                    "duration_ms": loopDurationT,
                    "trace.trace_id": trace_id,
                    "trace.span_id": random_id(8),
                    "trace.parent_id": span_id,
                    "name": "ifLeftWall",
                    "maze": maze,
                    "width": width,
                    "height": height,
                    "walls": walls,
                    "dimension": width
                });
                loopEvent.send();
                continue;
            }
            
        }

        //Check if it is an upper wall
        if (rand_wall[0] != 0) {
            if ( maze[rand_wall[0] - 1][rand_wall[1]] == "u" && maze[rand_wall[0] + 1][rand_wall[1]] == "0") {
                // Find the number of surrounding cells
                let s_cells = surrounding_cells(rand_wall, span_id, trace_id);

                if (s_cells < 2) {
                    // Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0";


                    // Mark the new walls
                    // Upper cell
                    if (rand_wall[0] != 0) {
                        if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] - 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] - 1, rand_wall[1]]);
                        }
                        
                    }
                    // Leftmost cell
                    if (rand_wall[1] != 0) {
                        if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] - 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] - 1]);
                        }
                        
                    }
                    //Rightmost cell
                    if (rand_wall[1] != width - 1) {
                        if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] + 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] + 1]);
                        }
                    }
                }
                delete_wall(walls, rand_wall, span_id, trace_id);

                const loopEndT = performance.now();
                const loopDurationT = loopEndT - loopStartT;

                loopEvent.add({ 
                    "duration_ms": loopDurationT,
                    "trace.trace_id": trace_id,
                    "trace.span_id": random_id(8),
                    "trace.parent_id": span_id,
                    "name": "ifUpperWall",
                    "maze": maze,
                    "width": width,
                    "height": height,
                    "walls": walls,
                    "dimension": width
                });
                loopEvent.send();

                continue;
            }
            
        }


        //Check the bottom wall
        if (rand_wall[0] != height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] == "u" && maze[rand_wall[0] - 1][rand_wall[1]] == "0") {
                // Find the number of surrounding cells
                let s_cells = surrounding_cells(rand_wall, span_id, trace_id);
                if (s_cells < 2) {
                    // Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0";

                    // Mark the new walls
                    //Bottom cell
                    if (rand_wall[0] != height - 1) {
                        if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] + 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] + 1, rand_wall[1]]);
                        }
                    }
                    // Leftmost cell 
                    if (rand_wall[1] != 0) {
                        if (maze[rand_wall[0]][rand_wall[1] - 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] - 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] - 1]);
                        }
                    }
                    // Rightmost cell
                    if (rand_wall[1] != width - 1) {
                        if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] + 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] + 1]);
                        }
                        
                    }
                }
                delete_wall(walls, rand_wall, span_id, trace_id);

                const loopEndT = performance.now();
                const loopDurationT = loopEndT - loopStartT;

                loopEvent.add({ 
                    "duration_ms": loopDurationT,
                    "trace.trace_id": trace_id,
                    "trace.span_id": random_id(8),
                    "trace.parent_id": span_id,
                    "name": "ifBottomWall",
                    "maze": maze,
                    "width": width,
                    "height": height,
                    "walls": walls,
                    "dimension": width
                });
                loopEvent.send();

                continue;
            }
        }

        //Check the right wall
        if (rand_wall[1] != width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] == "u" && maze[rand_wall[0]][rand_wall[1] - 1] == "0") {
                // Find the number of surrounding cells
                let s_cells = surrounding_cells(rand_wall, span_id, trace_id);

                if (s_cells < 2) {
                    // Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0";
                    // Mark the new walls
                    // Rightmost cell
                    if (rand_wall[1] != width - 1) {
                        if (maze[rand_wall[0]][rand_wall[1] + 1] != "0") {
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1";
                        }
                        if (!(walls.includes([rand_wall[0], rand_wall[1] + 1]))) {
                            walls.push([rand_wall[0], rand_wall[1] + 1]);
                        }
                    }
                    // Bottom cell
                    if (rand_wall[0] != height - 1) {
                        if (maze[rand_wall[0] + 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] + 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] + 1, rand_wall[1]]);
                          
                        }
                    }
                    //Upper cell
                    if (rand_wall[0] != 0) {
                        if (maze[rand_wall[0] - 1][rand_wall[1]] != "0") {
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1";
                        }
                        if (!(walls.includes([rand_wall[0] - 1, rand_wall[1]]))) {
                            walls.push([rand_wall[0] - 1, rand_wall[1]]);
                        }
                    }
                }
                delete_wall(walls, rand_wall, span_id, trace_id);

                const loopEndT = performance.now();
                const loopDurationT = loopEndT - loopStartT;

                loopEvent.add({ 
                    "duration_ms": loopDurationT,
                    "trace.trace_id": trace_id,
                    "trace.span_id": random_id(8),
                    "trace.parent_id": span_id,
                    "name": "ifRightWall",
                    "maze": maze,
                    "width": width,
                    "height": height,
                    "walls": walls,
                    "dimension": width
                });
                loopEvent.send();

                continue;
        }
    }
    delete_wall(walls, rand_wall, span_id, trace_id);
}
    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;

    functionEvent.add({
        "duration_ms": totalT,
        "function": "create_maze()",
        "name": "create_maze()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "trace.parent_id": parent_id,
        "maze": maze,
        "width": width,
        "height": height,
        "walls": walls,
        "dimension": width
    });
    functionEvent.send();

}

function generate_maze(height, width){
    const trace_id = random_id(16);
    const span_id = random_id(8);
    const initialT = performance.now();
    const functionEvent = hny.newEvent();
    functionEvent.timestamp = Date.now();
    //-----------
    const wall = "1";
    const cell = "0";

    clear_maze(span_id, trace_id);

    init_maze(height,span_id,trace_id);

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

    create_maze(maze, width, height, walls, span_id, trace_id);

    make_walls(width, height, span_id,trace_id);

    create_entrance_exit(maze, width, height, span_id, trace_id);

    flattened_maze = flatten_maze(maze, span_id, trace_id);

    //-----------
    const endT = performance.now();
    const totalT = endT - initialT;

    functionEvent.add({
        "duration_ms": totalT,
        "function": "generate_maze()",
        "name": "generate_maze()",
        "trace.trace_id": trace_id,
        "trace.span_id": span_id,
        "width": width,
        "height": height,
        "dimension": width
    });
    functionEvent.send();

    return flattened_maze;

}
