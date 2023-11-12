import regl, { Regl } from 'regl';
import React from 'react';
import { Matrix4 } from '@math.gl/core';

export function SquareInstanceDemo() {
  React.useEffect(() => {
    const reglInstance = regl({ extensions: ['angle_instanced_arrays'] });
    setup(reglInstance);
  }, []);
  return null;
}

// 先熟悉下 regl 中 instance 的用法

function setup(regl: Regl) {
  const positions = [
    [100, 100],
    [-100, -100],
  ];

  const line_mesh = [
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 1],
  ];

  const square_mesh = [
    [0.5, 0.5],
    [-0.5, 0.5],
    [0.5, -0.5],
    [-0.5, -0.5],
  ];

  const drawCmd = regl({
    frag: `
      void main() {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      attribute vec2 offset;
      uniform mat4 transform;
      void main() {
        gl_Position = transform * vec4(position * 20.0 + offset, 0, 1);
      }
    `,
    uniforms: {
      transform: (context) => {
        const { viewportHeight, viewportWidth } = context;
        const viewMat = new Matrix4().scale([
          2 / viewportWidth,
          2 / viewportHeight,
          1,
          1,
        ]);

        const modelMatrix = new Matrix4();

        return viewMat.multiplyRight(modelMatrix);
      },
    },
    attributes: {
      position: square_mesh,
      offset: {
        buffer: regl.buffer(positions),
        divisor: 1, // one separate offset for every triangle.
      },
    },
    primitive: 'triangle strip',
    count: square_mesh.length,
    instances: positions.length,
  });

  regl.frame(() => {
    regl.clear({ color: [0, 0, 0, 1] });
    drawCmd({});
  });
}
