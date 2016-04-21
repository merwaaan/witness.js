class TextToken extends Token {

  constructor(owner, text) {
    super(owner);

    this.text = text;
  }

  attach(svg) {
    svg.text(this.owner.position[0], this.owner.position[1], this.text)
      .attr({textAnchor: 'middle', alignmentBaseline: 'central'});
  }
}
