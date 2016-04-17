class Path {
  constructor(puzzle, firstNode) {
    this.puzzle = puzzle;

    this.nodes = [firstNode];

    this.movingHorizontally = undefined;

    this.previousMousePosition = undefined;

    let [x, y] = firstNode.position;
    this.svgSegments = [this.puzzle.svg.line(x, y, x, y).attr('stroke', 'red')];
  }

  clear() {
    for (let segment of this.svgSegments)
      segment.remove();
  }

  update(x, y) {

    this.svgSegments[this.svgSegments.length - 1].attr({
      x2: x,
      y2: y
    });

    // TODO study in-game interaction

    /*if (this.previousMousePosition == null)
      this.previousMousePosition = [x, y];

    let lastNodePosition = this.nodes[this.nodes.length - 1].position;
    let nodeToMouse = [x - lastNodePosition[0], y - lastNodePosition[1]];
    let nodeDistance = Math.sqrt(Math.pow(nodeToMouse[0], 2) + Math.pow(nodeToMouse[1], 2));

    // When close to the last node, allow redirections
    if (nodeDistance < 50 || this.movingHorizontally === undefined)
      this.movingHorizontally = Math.abs(nodeToMouse[0]) >= Math.abs(nodeToMouse[1]);

    let delta = [
      this.movingHorizontally ? x - this.previousMousePosition[0] : 0,
      this.movingHorizontally ? 0 : x - this.previousMousePosition[1]
    ];

    this.svgSegments[this.svgSegments.length - 1].attr({
      x2: this.previousMousePosition[0] + delta[0],
      y2: this.previousMousePosition[1] + delta[1]
    });*/
  }
}
