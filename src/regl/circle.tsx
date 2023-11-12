import regl, { Regl } from 'regl';
import React from 'react';
import { Matrix4 } from '@math.gl/core';
import { createCircleFan } from './utils';

export function ReglCircleDemo() {
  React.useEffect(() => {
    const reglInstance = regl();
    setup(reglInstance);
  }, []);
  return null;
}

function setup(regl: Regl) {
  const circle = createCircleFan(60);
  const r1 = regl({
    frag: `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `,
    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 transform;
      void main() {
        gl_Position = transform * vec4(position, 0, 1);
        // gl_Position = vec4(position, 0, 1);
      }
    `,
    uniforms: {
      width: regl.context('viewportWidth'),
      height: regl.context('viewportHeight'),
      scale: 0.58,
      transform: (context, props: any) => {
        const { viewportHeight, viewportWidth } = context;
        const mat = new Matrix4().scale([2 / viewportWidth, 2 / viewportHeight, 1, 1]);

        // const rotateDeg = 0; // Date.now() / 10 % 360 / 360 * Math.PI * 2
        // const modelMatrix = new Matrix4().rotateZ(rotateDeg);
        // const modelMatrix = new Matrix4().translate([...props.position, 0, 0]).scale(props.size);

        const offsetM = new Matrix4().translate([...props.position, 0, 0]);
        const scaleM = new Matrix4().scale(props.size);
        const modelMatrix = offsetM.multiplyRight(scaleM);
        // equals
        // const modelMatrix = new Matrix4().translate([...props.position, 0, 0]).scale(props.size);

        return mat.multiplyRight(modelMatrix);
      },
    },
    attributes: {
      position: circle,
    },
    primitive: 'triangle fan',
    count: circle.length,
  });

  let animate = true;
  let frame = 0;
  document.onclick = () => {
    animate = !animate;
  };
  regl.frame(() => {
    if (!animate) return;
    frame++;
    const s = Math.sin(frame / 10);
    // -1. 1
    const norm = (1 + s) / 2;
    const scale = 1 + norm * 0.5;

    regl.clear({ color: [0, 0, 0, 1] });
    r1({ position: [0, 0], size: 100 * scale });
    r1({ position: [300, 300], size: 50 * scale });
  });
}
