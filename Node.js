const nodeRadius = 8;

class Node {

  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;

    this.x = index % (puzzle.width + 1);
    this.y = Math.floor(index / (puzzle.width + 1));

    this.svg = this.puzzle.svg.svg();
    this.icon = this.svg.circle(
      edgeThickness * 0.5 + (edgeThickness + cellSize) * this.x,
      edgeThickness * 0.5 + (edgeThickness + cellSize) * this.y,
      nodeRadius)
      .addClass('node');

    this.tokens = [];
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
    return [parseInt(this.icon.attr('cx')), parseInt(this.icon.attr('cy'))];
  }

  start() {
    this.start = true;
    this.icon.addClass('start');

    this.icon.mousedown(event => this.puzzle.startPath(this));

    return this;
  }

  end() {
    this.end = true;
    this.svg.addClass('end');

    this.svg.mouseup(event => this.puzzle.stopPath(this));

    return this;
  }

  token(TokenType, ...tokenParams) {
    var token = new TokenType(this, ...tokenParams);
    this.tokens.push(token);
    token.attach(this.svg);
  }
}
