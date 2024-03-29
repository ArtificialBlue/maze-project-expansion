# maze-team-project | A randomized maze game
This project is a website that will randomly generate a maze, display it in a retro style, and allow a user to traverse the maze and search for the end.

[Project Specifications](https://docs.google.com/document/d/1YDo1MzGOKieYouBfuKFHnEN0cn-uIYnLnZX0pUUVdz4/edit)

## Technologies:
For this project, we are using
- [Flask](https://palletsprojects.com/p/flask/) - A python based server-side architecture used for url routing.
- [Jinja2](https://palletsprojects.com/p/jinja/) - A front-end templating library compatible with flask.
- [Typescript](https://www.typescriptlang.org/) - A compiled extension to the JavaScript language, used for the maze gameplay.
- [HTML Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - An API that provides the means to draw using HTML and JavaScript, used for drawing the maze and player.

## Usage:
[Click here](https://artificialblue.github.io/maze-team-project/) to play!

## Collaboration:
If you're interested in adding/improving a feature to the project, follow these steps:
1. Fork or download the repository onto your machine.
2. Navigate to the repository in your terminal and run "pip install" in the command line. This will install all necessary python dependencies.
3. Make your changes/updates.
4. Run "python3 app.py" in the command line. This will start a local flask server for testing.
5. Navigate to localhost:5000 in a web browser to see the routes built by the local flask server.

## Acknowledgements:
The maze generator is based off of [Orestis Zekai's work](https://github.com/OrWestSide/python/blob/master/maze.py).<br>
[Click here](https://medium.com/swlh/fun-with-python-1-maze-generator-931639b4fb7e) to learn more about the maze's generation theory.
