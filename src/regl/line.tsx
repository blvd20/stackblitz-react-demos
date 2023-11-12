import regl, { Regl } from 'regl';
import React from 'react';
import { Matrix4 } from '@math.gl/core';

export function LineDemo() {
  React.useEffect(() => {
    const reglInstance = regl({ extensions: ['angle_instanced_arrays'] });
    setup(reglInstance);
  }, []);
  return null;
}

// 参考下 https://wwwtyro.net/2019/11/18/instanced-lines.html
// 这个比 deckgl 的 path layer 更好理解
// https://mattdesl.svbtle.com/drawing-lines-is-hard

// 先熟悉下 regl 中 instance 的用法

function setup(regl: Regl) {
  const positions = [
    [-100, 0],
    [0, 100],
    [100, 0],
  ];

  const positionBuffer = regl.buffer(positions);

  const line_mesh = [
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 1],
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
      attribute vec2 a, b;
      uniform mat4 transform;
      uniform float width;
      void main() {
        vec2 xBasis = b - a;
        vec2 yBasis = normalize(vec2(-xBasis.y, xBasis.x));
        vec2 point = a + xBasis * position.x + yBasis * width * position.y;
        gl_Position = transform * vec4(point, 0, 1);
      }
    `,
    uniforms: {
      width: 100 / 2,
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
      position: line_mesh,
      a: {
        buffer: positionBuffer,
        divisor: 1,
        offset: 0,
      },
      b: {
        buffer: positionBuffer,
        divisor: 1,
        offset: Float32Array.BYTES_PER_ELEMENT * 2, // 跳过第一个点, (x,y)
      },
    },
    primitive: 'triangle strip',
    count: line_mesh.length,
    instances: positions.length - 1, // 最后一个 a 没有对应的 b, 所以跳过. 不过然 b 会是 (0, 0)
  });

  regl.clear({ color: [0, 0, 0, 1] });
  drawCmd({});

  // regl.frame(() => {

  // });
}
