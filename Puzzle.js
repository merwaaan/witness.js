const margin = 20;
const cellSize = 50;
const edgeThickness = 10;

class Puzzle {

  constructor(width, height, container) {
    this.width = width;
    this.height = height;
    this.container = container;

    let outerSvg = Snap(
      margin * 2 + cellSize * width + edgeThickness * (width + 1),
      margin * 2 + cellSize * height + edgeThickness * (height + 1))
      .addClass('puzzle');

    this.svg = outerSvg.svg(
      margin,
      margin,
      cellSize * width + edgeThickness * (width + 1),
      cellSize * height + edgeThickness * (height + 1))
      .attr('overflow', 'visible');

    this.cells = new Array(width * height)
      .fill()
      .map((_,i) => new Cell(this, i));

    this.nodes = new Array((width + 1) * (height + 1))
      .fill()
      .map((_,i) => new Node(this, i));

    // TODO clean this up and encapsulate in Edge class
    this.edges = new Set();
    for (let node of this.nodes)
      for (let neighbor of node.neighbors)
        this.edges.add([node, neighbor]);

    for (let edge of this.edges)
      this.svg.line(
        edge[0].position[0],
        edge[0].position[1],
        edge[1].position[0],
        edge[1].position[1])
        .addClass('edge');

    this.rules = [];

    this.path = null;

    outerSvg.mousemove(event => {
      if (this.dragging)
        this.path.update(
          event.pageX - this.svg.node.getBoundingClientRect().left,
          event.pageY - this.svg.node.getBoundingClientRect().top);
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
    return this.rules.every(e => e(this, path));
  }

  startPath(node) {
    this.path = new Path(this, node);
    this.dragging = true;

    console.log('dragging starts');
  }

  stopPath(node) {
    this.dragging = false;

    if (!node) {
      this.path.clear();
      this.path = null;
    }
    else {
      this.check(this.path);
    }

    console.log('dragging stops');
  }
}
