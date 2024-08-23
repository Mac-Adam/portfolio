export const BLOOM_SCENE = 1;
export const fragmentShader = `
uniform sampler2D baseTexture;
  uniform sampler2D bloomTexture;

  varying vec2 vUv;

  void main() {

    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

  }
`;
export const vertexShader = `
varying vec2 vUv;

  void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }
`;
export const lerp = (a, b, t) => {
  return a + (b - a) * t;
};
