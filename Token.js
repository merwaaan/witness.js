class Token {

  constructor(owner) {
    this.owner = owner;
  }

  attach(svg) {
    throw `${this.constructor.name} does not implement the "attach" method`;
  }
}
