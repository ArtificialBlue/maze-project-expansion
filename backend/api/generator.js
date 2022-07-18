//Random functions done with Math.random()
//Datetime functions done with Date() objects/methods
//var Libhoney = require("libhoney");

// let hny = new Libhoney({
//     //!Setup as environment variables!//
//    writeKey: "YOUR_API_KEY",
//    dataset: "honeycomb-python-maze",
//    disabled: true // uncomment for testing or development.
//  });

module.exports = generate_maze;

var maze = [];


function random_id(nbytes){
//     //#Creates random letter-number ID of nbytes *2  characters long -1.
//     //b = [random.randint(0, 255) for i in range(nbytes)]
//     //return "".join([f"{x:x}" for x in b]) 
}

function clear_maze(){
    maze.length = 0;
}

function init_maze(size){
    for (let i = 0; i < size; i++) {
        var line = Array(size).fill("u");
        maze.push(line);
      }
}

function make_walls(width, height){
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (maze[i][j] == "u"){
                maze[i][j] = "1";
            }
        }
    }

}

function delete_wall(walls, rand_wall){
    walls.forEach(function (wall) {
        if (wall[0] == rand_wall[0] && wall[1] == rand_wall[1]){
            walls.splice(walls.indexOf(wall),1);
        }
    });
}

function create_entrance(maze, width){
    for (let i = 0; i < width; i++) {
        if (maze[1][i] == "0") {
            maze[0][i] = "2";
            break;
        }
    }
}

function create_exit(maze, width, height){
    for (let i = width - 1; i >= 0; i--) {
        if (maze[height - 2][i] == "0") {
            maze[height - 1][i] = "2";
            break;
        }
    }
}

function create_entrance_exit(maze, width, height){
    create_entrance(maze, width);
    create_exit(maze, width, height);

}

function surrounding_cells(rand_wall){
    var s_cells = 0;

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

    return s_cells;
}

function flatten_maze(maze){
    let bitstring = "";
    for (let item of maze) {
        if (Array.isArray(item)) bitstring += flatten_maze(item);
        else bitstring += item;
    }
    return bitstring;
}


function create_maze(maze, width, height, walls){
    let wallsIter =  walls[Symbol.iterator]();

    let condition = wallsIter.next();

    while( !condition.done && walls.length > 0){
        // Pick a random wall
        var ranIndex = Math.floor(Math.random() * walls.length); // - 1;
        if (ranIndex != 0) {
            ranIndex -= 1;
        }
        var rand_wall = walls[ranIndex];

        //Check if it is a left wall
        if (rand_wall[1] != 0) {
            if (maze[rand_wall[0]][rand_wall[1] - 1] == "u" && maze[rand_wall[0]][rand_wall[1] + 1] == "0"){
                // Find the number of surrounding cells
                var s_cells = surrounding_cells(rand_wall);

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
                delete_wall(walls, rand_wall);
                continue;
            }
            
        }

        //Check if it is an upper wall
        if (rand_wall[0] != 0) {
            if ( maze[rand_wall[0] - 1][rand_wall[1]] == "u" && maze[rand_wall[0] + 1][rand_wall[1]] == "0") {
                // Find the number of surrounding cells
                var s_cells = surrounding_cells(rand_wall);

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
                delete_wall(walls, rand_wall);
                continue;
            }
            
        }


        //Check the bottom wall
        if (rand_wall[0] != height - 1) {
            if (maze[rand_wall[0] + 1][rand_wall[1]] == "u" && maze[rand_wall[0] - 1][rand_wall[1]] == "0") {
                // Find the number of surrounding cells
                var s_cells = surrounding_cells(rand_wall);
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
                delete_wall(walls, rand_wall);
                continue;
            }
        }

        //Check the right wall
        if (rand_wall[1] != width - 1) {
            if (maze[rand_wall[0]][rand_wall[1] + 1] == "u" && maze[rand_wall[0]][rand_wall[1] - 1] == "0") {
                // Find the number of surrounding cells
                var s_cells = surrounding_cells(rand_wall);

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
                delete_wall(walls, rand_wall);
                continue;
        }
    }
    delete_wall(walls, rand_wall);
}
}

function generate_maze(height, width){
    const wall = "1";
    const cell = "0";

    clear_maze();

    init_maze(height);

    // Randomize starting point and set it as a cell
    var starting_height = Math.floor(Math.random() * height);
    var starting_width = Math.floor(Math.random() * width);
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
    var walls = [];
    walls.push([starting_height - 1, starting_width]);
    walls.push([starting_height, starting_width - 1]);
    walls.push([starting_height, starting_width + 1]);
    walls.push([starting_height + 1, starting_width]);

    // Denote walls in maze
    maze[starting_height - 1][starting_width] = "1";
    maze[starting_height][starting_width - 1] = "1";
    maze[starting_height][starting_width + 1] = "1";
    maze[starting_height + 1][starting_width] = "1";

    create_maze(maze, width, height, walls);

    make_walls(width, height);

    create_entrance_exit(maze, width, height);

    return flatten_maze(maze);

}
