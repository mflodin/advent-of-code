export function captcha(string) {
  const numbers = Array.from(string).map(x => Number(x));
  // console.log(string);
  return numbers.reduce((acc, curr, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    // console.log(`i: ${i}, curr: ${curr}, next: ${next}`);
    return next === curr ? acc + curr : acc;
  }, 0);
}

export function captcha2(string) {
  const numbers = Array.from(string).map(x => Number(x));
  // console.log(string);
  return numbers.reduce((acc, curr, i, arr) => {
    const hw = arr[(arr.length / 2 + i) % arr.length];
    // console.log(`i: ${i}, curr: ${curr}, hw: ${hw}`);
    return hw === curr ? acc + curr : acc;
  }, 0);
}
