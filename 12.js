export function lineParser(string) {
  let [id, connections] = string.split(' <-> ');
  id = Number(id);
  connections = connections.split(/,\s+/).map(c => Number(c));

  return {
    id,
    connections,
    visited: false
  };
}
