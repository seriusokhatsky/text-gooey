import { EffectComposer, RenderPass, ShaderPass } from 'postprocessing';
import { ShaderMaterial } from 'three';
export default class Composer {
	constructor(renderer, scene, camera) {
		this.composer = new EffectComposer(renderer);
		this.composer.addPass(new RenderPass(scene, camera));

		const colorShader = new ShaderMaterial({
			uniforms: {
			  tDiffuse: { value: null },
			},
			vertexShader: `
			  varying vec2 vUv;
			  void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
			  }
			`,
			fragmentShader: `
			  uniform sampler2D tDiffuse;
			  varying vec2 vUv;
			  void main() {
				vec4 previousPassColor = texture2D(tDiffuse, vUv);
				if( previousPassColor.r > 0.2 ) {
				  gl_FragColor = vec4(0.0,0.,1.,1.);
				} else {
				  gl_FragColor = vec4(1.0);
				}
				vec3 col = vec3(1.0,0.1,0.1) * smoothstep(0.4, 0.7, previousPassColor.r);
				gl_FragColor = vec4(col, 1.0);
				
			    // gl_FragColor = previousPassColor;
			  }
			`,
		  });
		
		  const colorPass = new ShaderPass(colorShader, 'tDiffuse');
		  colorPass.renderToScreen = true;
		  this.composer.addPass(colorPass);

		  return this.composer;
	}
}