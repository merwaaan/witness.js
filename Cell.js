class Cell {

  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;

    this.x = index % puzzle.width;
    this.y = Math.floor(index / puzzle.width);
    this.topLeftNodeIndex = this.y * (this.puzzle.width + 1) + this.x;

    this.svg = this.puzzle.svg.rect(
      cellSize * this.x + edgeThickness * (this.x + 1),
      cellSize * this.y + edgeThickness * (this.y + 1),
      cellSize,
      cellSize)
      .attr('fill', 'red');
  }

  get topLeft() {
    return this.puzzle.nodes[this.topLeftNodeIndex];
  }

  get topRight() {
    return this.puzzle.nodes[this.topLeftNodeIndex + 1];
  }

  get bottomLeft() {
    return this.puzzle.nodes[this.topLeftNodeIndex + this.puzzle.width + 1];
  }

  get bottomRight() {
    return this.puzzle.nodes[this.topLeftNodeIndex + this.puzzle.width + 2];
  }
}
