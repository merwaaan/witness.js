class Path {
  constructor(puzzle, firstNode) {
    this.puzzle = puzzle;

    this.nodes = [firstNode];

    let [x, y] = firstNode.position;
    this.svgSegments = [this.puzzle.svg.line(x, y, x, y).attr('stroke', 'red')];
  }

  clear() {
    for (let segment of this.svgSegments)
      segment.remove();
  }

  update(x, y) {

    let lastNode = this.nodes[this.nodes.length - 1];
    let delta = [x - lastNode.position[0], y - lastNode.position[1]];

    let pos = [lastNode.position[0], lastNode.position[1]];

    // Check the main axis of the motion (0 = x, 1 = y)
    var axis = +(Math.abs(delta[0]) < Math.abs(delta[1]));

    // Which node are we headed to?
    let nextNode = null;
    if (axis === 0)
      nextNode = delta[0] >= 0 ? lastNode.right : lastNode.left;
    else
      nextNode = delta[1] >= 0 ? lastNode.bottom : lastNode.top;

    // If there is no neighbor node in that direction, stay on the current one
    if (nextNode === null) {
      pos = lastNode.position;
      return;
    }

    let progress = Math.min(1, Math.abs(delta[axis] / cellSize));
    pos[axis] += delta[axis];

    // Are we moving towards a node that is already visited?
    var nextNodeIndex = this.nodes.indexOf(nextNode);
    if (nextNodeIndex > -1) {

      // If we are backing up towards the previous node, shorten the path
      if (nextNodeIndex ===  this.nodes.length - 2) {
        // Remove the last node
        this.nodes.pop();

        // Remove the SVG segment leading to the last node
        var segment = this.svgSegments.pop();
        segment.remove();
      }

      // Otherwise we are going to collide with the path, so we stop
      // expanding it in that direction
      else if (progress >= 0.9) {
        return;
      }
    }

    if (progress >= 1) {
      // Add the next node to the path
      this.nodes.push(nextNode);

      // Change the end of the current SVG segment
      this.svgSegments[this.svgSegments.length - 1].attr({
        x2: nextNode.position[0],
        y2: nextNode.position[1]
      });

      // Add a new segment
      this.svgSegments.push(this.puzzle.svg.line(
        nextNode.position[0],
        nextNode.position[1],
        nextNode.position[0],
        nextNode.position[1]).attr('stroke', 'red'));
    }

    this.svgSegments[this.svgSegments.length - 1].attr({
      x2: pos[0],
      y2: pos[1]
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
