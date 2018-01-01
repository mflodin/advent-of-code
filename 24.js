export function runner({ input }) {
  const components = parseInput(input);
  const bridges = constructBridges({ components });

  const strongest = getStrongest(bridges);

  const longestLength = getLongest(bridges);
  const longestBridges = bridges.filter(
    bridge => bridge.length === longestLength
  );
  const strongestLongest = getStrongest(longestBridges);

  return [strongest, strongestLongest];
}

function getStrongest(bridges) {
  return bridges.reduce((acc, curr) => {
    return curr.strength > acc ? curr.strength : acc;
  }, -Infinity);
}

function getLongest(bridges) {
  return bridges.reduce((acc, curr) => {
    return curr.length > acc ? curr.length : acc;
  }, -Infinity);
}

export function Component(portString) {
  this.ports = portString.split("/").map(n => Number(n));
  this.toString = () => this.ports.join("/");
}

export function Bridge() {
  this.sections = [];
  this.endConnection = 0;
  this.length = 0;
  this.strength = 0;

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
    this.length += 1;
    this.strength += component.ports[0] + component.ports[1];
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
