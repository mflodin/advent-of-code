export function runner({ input }) {
  const components = parseInput(input);
  console.log("parsed input...");
  const bridges = constructBridges({ components });
  console.log("constructed bridges...", bridges.length);
  const strengths = bridges.map(calculateStrength);
  console.log("calculated strengths...", strengths.length);
  const strongest = strengths.reduce((acc, curr) => {
    return curr > acc ? curr : acc;
  }, -Infinity);
  return strongest;
}

export function Component(portString) {
  this.ports = portString.split("/").map(n => Number(n));
  this.toString = () => this.ports.join("/");
}

export function Bridge() {
  this.sections = [];
  this.endConnection = 0;
  Object.defineProperty(this, "length", {
    get() {
      return this.sections.length;
    }
  });

  this.add = component => {
    if (component.ports[0] === this.endConnection) {
      this.endConnection = component.ports[1];
    } else if (component.ports[1] === this.endConnection) {
      this.endConnection = component.ports[0];
    } else {
      throw new Error(
        `Component ports ${component} does not match endConnection (${
          this.endConnection
        })!`
      );
    }

    this.sections.push(component);
  };

  this.toString = () => this.sections.join("--");
}

export function parseInput(input) {
  return input
    .split("\n")
    .filter(l => l)
    .map(l => new Component(l));
}

export function constructBridges({
  components,
  bridge = new Bridge(),
  bridgeContainer = []
}) {
  const fittingComponents = components.filter(
    c =>
      c.ports[0] === bridge.endConnection || c.ports[1] === bridge.endConnection
  );

  fittingComponents.forEach(section => {
    let newBridge = clone(bridge);
    newBridge.add(section);
    bridgeContainer.push(newBridge);
    let remainingComponents = components.filter(s => s !== section);
    if (remainingComponents.length > 0) {
      constructBridges({
        components: remainingComponents,
        bridge: newBridge,
        bridgeContainer
      });
    }
  });
  return bridgeContainer;
}

function clone(bridge) {
  let newBridge = new Bridge();
  bridge.sections.forEach(section => newBridge.add(section));
  return newBridge;
}

export function calculateStrength(bridge) {
  return bridge.sections.reduce((acc, curr) => {
    return acc + curr.ports[0] + curr.ports[1];
  }, 0);
}
