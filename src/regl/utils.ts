export function createCircleFan(segments: number) {
  let pts = [] as [number, number][];
  const frag = (Math.PI * 2) / segments;
  for (let i = 0; i < segments; i++) {
    pts.push([0, 0]);
    pts.push([Math.cos(frag * i), Math.sin(frag * i)]);
    pts.push([Math.cos(frag * (i + 1)), Math.sin(frag * (i + 1))]);
  }
  return pts;
}
