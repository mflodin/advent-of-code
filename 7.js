export function findBottom(string) {
  var rows = string.split(/\n/).filter(r => r.length);
  return rows.reduce((acc, curr, i, arr) => {
    const name = /^\S+/.exec(curr)[0];
    const rowsWithName = arr.filter(row => row.indexOf(name) > 0);
    if (!rowsWithName.length) {
      return name;
    }
    return acc;
  }, "");
}

export function toTree(string) {
  var rows = string
    .split(/\n/)
    .filter(r => r.length)
    .map(row => {
      let res = {};
      res.name = /^\S+/.exec(row)[0];
      res.weight = Number(/\d+/.exec(row)[0]);
      const children = /-> (.+)/.exec(row);
      if (children !== null) {
        res.children = children[1].split(", ");
      }

      return res;
    });

  const bottomName = findBottom(string);
  const bottom = rows.find(row => row.name === bottomName);
  bottom.children = bottom.children.map(childMapper(rows));
  return bottom;
}

function childMapper(rows) {
  return function mapChildren(childName) {
    let child = rows.find(r => r.name === childName);
    if (child.children) {
      child.children = child.children.map(childMapper(rows));
    }

    return child;
  };
}

export function weightMapper(tree) {
  if (!tree.children) {
    return {
      fullWeight: tree.weight,
      ...tree
    };
  }

  if (!tree.fullWeight) {
    tree.fullWeight =
      tree.weight +
      tree.children
        .map(weightMapper)
        .reduce((acc, curr) => acc + curr.fullWeight, 0);
  }

  return tree;
}

export function balancer(tree) {
  if (!tree.children) {
    return tree;
  }

  let index;
  let unbalanced = tree.children.find((child, i, arr) => {
    index = i;
    return arr.filter(a => a.fullWeight === child.fullWeight).length === 1;
  });

  if (!unbalanced) {
    return tree;
  }

  unbalanced = balancer(unbalanced);

  debugger;
  if (unbalanced.balancedWeight) {
    return unbalanced;
  }

  const correctFullWeight =
    tree.children[(index + 1) % tree.children.length].fullWeight;

  let balancedWeight =
    unbalanced.weight + (correctFullWeight - unbalanced.fullWeight);

  return {
    ...unbalanced,
    balancedWeight
  };
}
