# Bowling Score

This small project is a scoring system for bowling games.

Implementation:

- [x] A game consists of 10 frames.
- [x] In general each frame has 2 rolls.
- [x] In general a player scores the number of pins knocked down.
- [x] If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls.
- [x] If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.
- [ ] The player gets additional rolls in the last frame: (optional)
  - [ ] _one_ additional for a spare after the second roll, or
  - [ ] _two_ extra rolls for a strike.
- [x] Visualize the scoring of the game.
- [x] Create a method that randomly throws a roll (one roll is 1-10 pins knocked down), and progresses the scoring.

## Running

The build folder is added to the git repository, so you can just open `build/index.html` in your browser.

## Building

Ensure that you have Node.js/io.js installed and [Gulp](http://gulpjs.com) client (`npm install -g gulp`). To build the project, just execute:

```bash
npm install
gulp build
# look in the build/ directory.
```

If you want the project to be built continuously, just execute `gulp` without any arguments. It runs gulp in watch mode.

## Testing

To test the game logic, run `gulp test`.
