import random
from itertools import chain
from datetime import datetime
import libhoney

#!Setup as environment variables!#
libhoney.init(writekey="", dataset="honeycomb-python-maze", debug=True)

maze = []

def random_id(nbytes):
    b = [random.randint(0, 255) for i in range(nbytes)]
    return "".join([f"{x:x}" for x in b]) 

def clear_maze(parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    #------
    maze.clear()
    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "clear_maze()",
    "name": "clear_maze()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    })
    functionEvent.send()


def init_maze(size, parent_id = None,trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Initialize maze of given size."""
    #------
    maze
    for i in range(0, size):
        line = ["u"] * size
        maze.append(line)

    #-----
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "init_maze()",
    "name": "init_maze()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "dimension": size
    })
    functionEvent.send()


def make_walls(width, height, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    #------
    for i in range(0, height):
        for j in range(0, width):
            if maze[i][j] == "u":
                maze[i][j] = "1"
    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "make_walls()",
    "name": "make_walls()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "width": width,
    "height": height,
    "dimension": width
    })
    functionEvent.send()




def delete_wall(walls, rand_wall, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Remove the processed cell from the wall list."""
    #------
    for wall in walls:
        if wall[0] == rand_wall[0] and wall[1] == rand_wall[1]:
            walls.remove(wall)
    #------

    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "delete_wall()",
    "name": "delete_wall()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "walls": walls,
    "rand_wall": rand_wall
    })
    functionEvent.send()


def create_entrance(maze, width, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Create maze entrance."""
    #------
    for i in range(0, width):
        if maze[1][i] == "0":
            maze[0][i] = "2"
            break
    #------

    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "create_entrance()",
    "name": "create_entrance()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "maze": maze,
    "width": width,
    "dimension": width
    })
    functionEvent.send()


def create_exit(maze, width, height, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Create maze exit."""
    #------
    for i in range(width - 1, 0, -1):
        if maze[height - 2][i] == "0":
            maze[height - 1][i] = "2"
            break
    #------
    
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "create_exit()",
    "name": "create_exit()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "maze": maze,
    "width": width,
    "height": height,
    "dimension": width
    })
    functionEvent.send()


def create_entrance_exit(maze, width, height, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Create maze entrance and exit."""
    #------
    create_entrance(maze, width,span_id,trace_id)
    create_exit(maze, width, height,span_id,trace_id)
    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "create_entrance_exit()",
    "name": "create_entrance_exit()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "maze": maze,
    "width": width,
    "height": height,
    "dimension": width
    })
    functionEvent.send()


def flatten_maze(maze, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    """Turn a 2D maze into a string."""
    #------
    flattened_maze = "".join(list(chain.from_iterable(maze)))
    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "flatten_maze()",
    "name": "flatten_maze()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "maze": maze
    })
    functionEvent.send()

    return flattened_maze


def surrounding_cells(rand_wall, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    #------
    s_cells = 0

    if maze[rand_wall[0] - 1][rand_wall[1]] == "0":
        s_cells += 1
    if maze[rand_wall[0] + 1][rand_wall[1]] == "0":
        s_cells += 1
    if maze[rand_wall[0]][rand_wall[1] - 1] == "0":
        s_cells += 1
    if maze[rand_wall[0]][rand_wall[1] + 1] == "0":
        s_cells += 1

    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "surrounding_cells()",
    "name": "surrounding_cells()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "rand_wall": rand_wall
    })
    functionEvent.send()

    return s_cells



def create_maze(maze, width, height, walls, parent_id = None, trace_id = random_id(16)):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    span_id = random_id(8)
    #------
    while walls:
        LoopEvent = libhoney.new_event()
        LoopStartT = datetime.now()


        # Pick a random wall
        rand_wall = walls[int(random.random() * len(walls)) - 1]

        # Check if it is a left wall
        if rand_wall[1] != 0:
            if (
                maze[rand_wall[0]][rand_wall[1] - 1] == "u"
                and maze[rand_wall[0]][rand_wall[1] + 1] == "0"
            ):
                # Find the number of surrounding cells
                s_cells = surrounding_cells(rand_wall,span_id,trace_id)

                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    # Upper cell
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])

                    # Bottom cell
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])

                    # Leftmost cell
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])
                delete_wall(walls, rand_wall,span_id,trace_id)

                LoopEndT = datetime.now()
                LoopDurationT = LoopEndT - LoopStartT

            
                LoopEvent.add({"duration_ms": LoopDurationT.total_seconds()*1000,
                "trace.trace_id": trace_id,
                "trace.span_id": random_id(8),
                "trace.parent_id": span_id,
                "name": "ifLeftWall",
                "maze": maze,
                "width": width,
                "height": height,
                "walls": walls,
                "dimension": width
                })
                LoopEvent.send()
                continue

        # Check if it is an upper wall
        if rand_wall[0] != 0:
            if (
                maze[rand_wall[0] - 1][rand_wall[1]] == "u"
                and maze[rand_wall[0] + 1][rand_wall[1]] == "0"
            ):

                s_cells = surrounding_cells(rand_wall,span_id,trace_id)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    # Upper cell
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])

                    # Leftmost cell
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])

                    # Rightmost cell
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                delete_wall(walls, rand_wall,span_id,trace_id)


                LoopEndT = datetime.now()
                LoopDurationT = LoopEndT - LoopStartT

            
                LoopEvent.add({"duration_ms": LoopDurationT.total_seconds()*1000,
                "trace.trace_id": trace_id,
                "trace.span_id": random_id(8),
                "trace.parent_id": span_id,
                "name": "ifUpperWall",
                "maze": maze,
                "width": width,
                "height": height,
                "walls": walls,
                "dimension": width
                })
                LoopEvent.send()

                continue

        # Check the bottom wall
        if rand_wall[0] != height - 1:
            if (
                maze[rand_wall[0] + 1][rand_wall[1]] == "u"
                and maze[rand_wall[0] - 1][rand_wall[1]] == "0"
            ):

                s_cells = surrounding_cells(rand_wall,span_id,trace_id)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])
                    if rand_wall[1] != 0:
                        if maze[rand_wall[0]][rand_wall[1] - 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] - 1] = "1"
                        if [rand_wall[0], rand_wall[1] - 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] - 1])
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                delete_wall(walls, rand_wall,span_id,trace_id)


                LoopEndT = datetime.now()
                LoopDurationT = LoopEndT - LoopStartT

            
                LoopEvent.add({"duration_ms": LoopDurationT.total_seconds()*1000,
                "trace.trace_id": trace_id,
                "trace.span_id": random_id(8),
                "trace.parent_id": span_id,
                "name": "ifBottomWall",
                "maze": maze,
                "width": width,
                "height": height,
                "walls": walls,
                "dimension": width
                })
                LoopEvent.send()

                continue

        # Check the right wall
        if rand_wall[1] != width - 1:
            if (
                maze[rand_wall[0]][rand_wall[1] + 1] == "u"
                and maze[rand_wall[0]][rand_wall[1] - 1] == "0"
            ):

                s_cells = surrounding_cells(rand_wall,span_id,trace_id)
                if s_cells < 2:
                    # Denote the new path
                    maze[rand_wall[0]][rand_wall[1]] = "0"

                    # Mark the new walls
                    if rand_wall[1] != width - 1:
                        if maze[rand_wall[0]][rand_wall[1] + 1] != "0":
                            maze[rand_wall[0]][rand_wall[1] + 1] = "1"
                        if [rand_wall[0], rand_wall[1] + 1] not in walls:
                            walls.append([rand_wall[0], rand_wall[1] + 1])
                    if rand_wall[0] != height - 1:
                        if maze[rand_wall[0] + 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] + 1][rand_wall[1]] = "1"
                        if [rand_wall[0] + 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] + 1, rand_wall[1]])
                    if rand_wall[0] != 0:
                        if maze[rand_wall[0] - 1][rand_wall[1]] != "0":
                            maze[rand_wall[0] - 1][rand_wall[1]] = "1"
                        if [rand_wall[0] - 1, rand_wall[1]] not in walls:
                            walls.append([rand_wall[0] - 1, rand_wall[1]])
                delete_wall(walls, rand_wall,span_id,trace_id)

                LoopEndT = datetime.now()
                LoopDurationT = LoopEndT - LoopStartT

            
                LoopEvent.add({"duration_ms": LoopDurationT.total_seconds()*1000,
                "trace.trace_id": trace_id,
                "trace.span_id": random_id(8),
                "trace.parent_id": span_id,
                "name": "ifRightWall",
                "maze": maze,
                "width": width,
                "height": height,
                "walls": walls,
                "dimension": width
                })
                LoopEvent.send()

                continue
    
        delete_wall(walls, rand_wall,span_id,trace_id)

    #------
    endT = datetime.now()
    totalT = endT - intialT
    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "trace.parent_id": parent_id,
    "function": "create_maze()",
    "name": "create_maze()",
    "maze": maze,
    "width": width,
    "height": height,
    "walls": walls,
    "dimension": width
    })
    functionEvent.send()



def generate_maze(height, width):
    intialT = datetime.now()
    functionEvent = libhoney.new_event()
    trace_id = random_id(16)
    span_id = random_id(8)
    #------
    wall = "1"
    cell = "0"

    clear_maze(span_id,trace_id)

    init_maze(height,span_id,trace_id)

    # Randomize starting point and set it a cell
    starting_height = int(random.random() * height)
    starting_width = int(random.random() * width)
    if starting_height == 0:
        starting_height += 1
    if starting_height == height - 1:
        starting_height -= 1
    if starting_width == 0:
        starting_width += 1
    if starting_width == width - 1:
        starting_width -= 1

    # Mark it as cell and add surrounding walls to the list
    maze[starting_height][starting_width] = cell
    walls = []
    walls.append([starting_height - 1, starting_width])
    walls.append([starting_height, starting_width - 1])
    walls.append([starting_height, starting_width + 1])
    walls.append([starting_height + 1, starting_width])

    # Denote walls in maze
    maze[starting_height - 1][starting_width] = "1"
    maze[starting_height][starting_width - 1] = "1"
    maze[starting_height][starting_width + 1] = "1"
    maze[starting_height + 1][starting_width] = "1"

    create_maze(maze, width, height, walls, span_id,trace_id)

    make_walls(width, height, span_id,trace_id)

    create_entrance_exit(maze, width, height, span_id,trace_id)
    #------
    endT = datetime.now()
    totalT = endT - intialT

    functionEvent.add({"duration_ms": totalT.total_seconds()*1000,
    "function": "generate_maze()",
    "name": "generate_maze()",
    "trace.trace_id": trace_id,
    "trace.span_id": span_id,
    "width": width,
    "height": height,
    "dimension": width
    })
    functionEvent.send()

    return flatten_maze(maze, span_id,trace_id)
