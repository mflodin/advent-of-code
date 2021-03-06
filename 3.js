let res = [];

export function get(y, x) {
  return (res[y] && res[y][x]) || 0;
}

export function spiral(number) {
  res = [];
  let h = 0;
  let v = 0;
  for (let i = 1; i <= number; i++) {
    //     console.log(`i: ${i}, h: ${h}, v: ${v}, res[v][h]: ${get(v,h)}`)
    if (!res[v]) {
      res[v] = [];
    }

    if (!res[v][h]) {
      res[v][h] = i;
    }
    //       console.log(`n: ${i}, v: ${v}, h: ${h}`)

    if (i === number) {
      // console.log(`n: ${number}, v: ${v}, h: ${h}`);

      return {
        res,
        v,
        h
      };
    }

    if (get(v, h + 1) && !get(v - 1, h)) {
      //       console.log('down ' + i);
      v = v - 1;
    } else if (get(v - 1, h) && !get(v, h - 1)) {
      //       console.log('left ' + i)
      h = h - 1;
    } else if (get(v, h - 1) && !get(v + 1, h)) {
      //       console.log('up ' + i);
      v = v + 1;
    } else {
      //       console.log('right ' + i)
      h = h + 1;
    }
  }

  return res;
}

export function distance(number) {
  const s = spiral(number);
  return Math.abs(s.h) + Math.abs(s.v);
}

export function spiral2(number) {
  res = [];
  let h = 0;
  let v = 0;
  let found = false;
  for (let i = 1; i <= number; i++) {
    let sum = 0;

    //     console.log(`i: ${i}, h: ${h}, v: ${v}, res[v][h]: ${get(v,h)}`)
    if (!res[v]) {
      res[v] = [];
    }

    if (i === 1) {
      res[v][h] = 1;
    }

    if (!res[v][h]) {
      sum =
        get(v - 1, h - 1) +
        get(v - 1, h) +
        get(v - 1, h + 1) +
        get(v, h - 1) +
        get(v, h) +
        get(v, h + 1) +
        get(v + 1, h - 1) +
        get(v + 1, h) +
        get(v + 1, h + 1);
      res[v][h] = sum;
    }
    // console.log(`n: ${i}, v: ${v}, h: ${h}, res: ${get(v,h)}, sum: ${sum}`)

    if (sum > number && !found) {
      console.log(`Found it! n: ${number}, v: ${v}, h: ${h}, sum: ${sum}`);
      found = true;

      // return {
      //   res,
      //   v,
      //   h
      // }
    }

    if (i === number) {
      !found &&
        console.log(
          `Did not find it! n: ${number}, v: ${v}, h: ${h}, sum: ${sum}`
        );

      return {
        res,
        v,
        h
      };
    }

    if (get(v, h + 1) && !get(v - 1, h)) {
      //       console.log('down ' + i);
      v = v - 1;
    } else if (get(v - 1, h) && !get(v, h - 1)) {
      //       console.log('left ' + i)
      h = h - 1;
    } else if (get(v, h - 1) && !get(v + 1, h)) {
      //       console.log('up ' + i);
      v = v + 1;
    } else {
      //       console.log('right ' + i)
      h = h + 1;
    }
  }

  return res;
}

export function sum(number) {
  var s = spiral2(number);
  return s.res[s.v][s.h];
}
