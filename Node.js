const nodeRadius = 5;

class Node {

  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;

    this.x = index % (puzzle.width + 1);
    this.y = Math.floor(index / (puzzle.width + 1));

    this.svg = this.puzzle.svg.circle(
      edgeThickness * 0.5 + (edgeThickness + cellSize) * this.x,
      edgeThickness * 0.5 + (edgeThickness + cellSize) * this.y,
      nodeRadius)
      .attr('fill', 'black');
  }

  get position() {
    return [this.svg.attr('cx'), this.svg.attr('cy')];
  }

  start() {
    this.start = true;
    this.svg.attr('fill', 'yellow');

    this.svg.mousedown(event => this.puzzle.startPath(this));

    return this;
  }

  end() {
    this.end = true;
    this.svg.attr('fill', 'pink');

    this.svg.mouseup(event => this.puzzle.stopPath(this));

    return this;
  }
}
