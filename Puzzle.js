const cellSize = 50;
const edgeThickness = 10;

class Puzzle {

  constructor(width, height, container) {
    this.width = width;
    this.height = height;
    this.container = container;

    this.svg = Snap(
      cellSize * width + edgeThickness * (width + 1),
      cellSize * height + edgeThickness * (height + 1));

    this.svg.rect(
      0,
      0,
      cellSize * width + edgeThickness * (width + 1),
      cellSize * height + edgeThickness * (height + 1))
      .attr('stroke', 'grey')
      .attr('fill', 'transparent');

    this.cells = new Array(width * height)
      .fill()
      .map((_,i) => new Cell(this, i));

    this.nodes = new Array((width + 1) * (height + 1))
      .fill()
      .map((_,i) => new Node(this, i));

    this.rules = [];

    this.path = null;

    this.svg.mousemove(event => {
      if (this.dragging)
        this.path.update(event.pageX, event.pageY);
    });

    // TODO on document instead?
    this.svg.mouseup(event => {
      if (this.dragging)
        this.stopPath();
    });
  }

  cell(x, y) {
    return this.cells[this.width * y + x]
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  check(path) {
    console.log('checking stuff...');
    return this.ruleEvaluators.every(e => e(this, path));
  }

  startPath(node) {
    this.path = new Path(this, node);
    this.dragging = true;

    console.log('dragging starts');
  }

  stopPath(node) {console.log(node);
    this.dragging = false;

    if (!node) {
      this.path = null;
    }
    else {
      this.check(this.path);
    }

    console.log('dragging stops');
  }
}
