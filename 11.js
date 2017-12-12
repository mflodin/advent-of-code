// export function Node() {
//   this.nw = null;
//   this.n = null;
//   this.ne = null;
//   this.se = null;
//   this.s = null;
//   this.sw = null;
// }

export function toArray(string) {
  return string.trim().split(",");
}

export function Walker() {
  this.y = 0;
  this.x = 0;
  this.distance = 0;
  this.maxDistance = 0;

  this.walk = function walk(direction) {
    switch (direction) {
      case "nw":
        this.y += 0.5;
        this.x -= 0.5;
        break;
      case "n":
        this.y += 1;
        break;
      case "ne":
        this.y += 0.5;
        this.x += 0.5;
        break;
      case "se":
        this.y -= 0.5;
        this.x += 0.5;
        break;
      case "s":
        this.y -= 1;
        break;
      case "sw":
        this.y -= 0.5;
        this.x -= 0.5;
        break;
      default:
    }

    this.distance = Math.abs(this.y) + Math.abs(this.x);
    if (this.distance > this.maxDistance) {
      this.maxDistance = this.distance;
    }
  };
}
