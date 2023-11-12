import regl, { Regl } from 'regl';
import React from 'react';

export function ReglDemo() {
  React.useEffect(() => {
    const reglInstance = regl();
    setup(reglInstance);
  }, []);
  return null;
}

function setup(regl: Regl) {
  const r1 = regl({
    frag: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1);
      }
    `,
    attributes: {
      position: [
        [-1, 0],
        [0, -1],
        [1, 1],
      ],
    },
    count: 3,
  });

  regl.clear({ color: [0, 0, 0, 1] });
  r1();
}
