import regl, { Regl } from 'regl';
import React from 'react';
import { Matrix4 } from '@math.gl/core';

export function Transform2dDemo() {
  React.useEffect(() => {
    const reglInstance = regl();
    setup(reglInstance);
  }, []);
  return null;
}

// 屏幕中为原点
// 单位为像素值

// 比如 (100, 100) 在中心右上100的位置
// 这个 transform 应该是怎么样的?
// y 进行反转, origin 移动到左上角
// 好像不用上面说的那么 麻烦, 直接缩放屏幕宽高就好了

// 在这个坐标系下可能还有别的 transform 那就是后话了

function setup(regl: Regl) {
  const drawCmd = regl({
    frag: `
      void main() {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      // uniform float angle, scale, width, height;
      uniform mat4 transform;
      void main() {
        // vec2 scaled_position = position * scale;
        vec2 scaled_position = position;
        gl_Position = transform * vec4(scaled_position, 0, 1);
      }
    `,
    uniforms: {
      width: regl.context('viewportWidth'),
      height: regl.context('viewportHeight'),
      scale: 0.58,
      transform: (context) => {
        const { viewportHeight, viewportWidth } = context;
        const mat = new Matrix4().scale([
          2 / viewportWidth,
          2 / viewportHeight,
          1,
          1,
        ]);

        const rotateDeg = 0; // Date.now() / 10 % 360 / 360 * Math.PI * 2
        const modelMatrix = new Matrix4().rotateZ(rotateDeg);

        return mat.multiplyRight(modelMatrix);
      },
    },
    attributes: {
      position: [
        [-100, -100],
        [100, -100],
        [0, 100],
      ],
    },
    count: 3,
  });

  // console.log(regl.context('viewportWidth'))

  regl.frame(() => {
    regl.clear({ color: [0, 0, 0, 1] });
    drawCmd({});
  });
}
