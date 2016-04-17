const nodeRadius = 8;

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
      .addClass('node');
  }

  get top() {
    return this.y > 0 ? this.puzzle.nodes[this.index - this.puzzle.width - 1] : null;
  }

  get right() {
    return this.x < this.puzzle.width ? this.puzzle.nodes[this.index + 1] : null;
  }

  get bottom() {
    return this.y < this.puzzle.height ? this.puzzle.nodes[this.index+ this.puzzle.width + 1] : null;
  }

  get left() {
    return this.x > 0 ? this.puzzle.nodes[this.index - 1] : null;
  }

  get neighbors() {
    return [this.top, this.right, this.bottom, this.left]
      .filter(n => n !== null);
  }

  get position() {
    return [this.svg.attr('cx'), this.svg.attr('cy')];
  }

  start() {
    this.start = true;
    this.svg.addClass('start');

    this.svg.mousedown(event => this.puzzle.startPath(this));

    return this;
  }

  end() {
    this.end = true;
    this.svg.addClass('end');

    this.svg.mouseup(event => this.puzzle.stopPath(this));

    return this;
  }
}
