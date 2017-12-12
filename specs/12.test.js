import { lineParser } from '../12';
//
const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

describe('lineParser', () => {
  it('should parse a line into a node and its connections', () => {
    let line = lineParser('0 <-> 2');
    expect(line.id).toBe(0);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([2]);

    line = lineParser('1 <-> 1');
    expect(line.id).toBe(1);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([1]);

    line = lineParser('2 <-> 0, 3, 4');
    expect(line.id).toBe(2);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([0, 3, 4]);

    line = lineParser('3 <-> 2, 4');
    expect(line.id).toBe(3);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([2, 4]);

    line = lineParser('4 <-> 2, 3, 6');
    expect(line.id).toBe(4);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([2, 3, 6]);

    line = lineParser('5 <-> 6');
    expect(line.id).toBe(5);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([6]);

    line = lineParser('6 <-> 4, 5');
    expect(line.id).toBe(6);
    expect(line.visited).toBe(false);
    expect(line.connections).toEqual([4, 5]);
  })
})
