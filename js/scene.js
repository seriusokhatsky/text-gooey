import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
import Composer from './composer';

export default class Scene {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: false } );
		this.renderer.setSize( window.innerWidth, window.innerHeight );

		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
		this.scene = new THREE.Scene();

		var controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.camera.position.z = 300;
		controls.update();

		var that = this;
		
		const composer = new Composer(this.renderer, this.scene, this.camera);

		let then = 0;
		function animate(now) {
			now *= 0.001;  // convert to seconds
			const deltaTime = now - then;
			then = now;

			requestAnimationFrame( animate );
			// that.renderer.render( that.scene, that.camera );
			composer.render(deltaTime);
		}
		animate();

		return this.scene;
	}
}