import Canvas2d from './canvas2d';
import Scene from './scene';
import * as THREE from 'three';
import LeonSans from './leon';
import { TweenMax } from 'gsap';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragments.glsl';

export default class App {
	constructor() {
		const canvas2d = new Canvas2d();
		const scene = new Scene();

		var leon = new LeonSans({
			text: 'Serge',
			size: 250,
			weight: 100,
			isPath: true,
			pathGap: 0.1
		});

		var texture = new THREE.CanvasTexture(canvas2d);

		// texture = new THREE.TextureLoader().load( 'spark1.png' );

		// create the particle variables
		var geometry = new THREE.BufferGeometry();

		var material = new THREE.ShaderMaterial( {

			uniforms: {
				texture: { value: texture },
				time: { value: 1.0 },
				color: { value: new THREE.Color( 0xffff00 ) },
				resolution: { value: new THREE.Vector2() }
			},
		
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,

			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		
		} );

		// material = new THREE.PointsMaterial( { size: 48, sizeAttenuation: false, map: texture, alphaTest: 0.5, transparent: true } );

		// material = new THREE.PointsMaterial({ color: 0x883388 }  );
		
		var points = leon.paths;
		var num = points.length;

		var vertices = [];
		var pointsObj = [];

		points.forEach((p, i) => {
			var point = {
				x: Math.random() * 400 + 400,
				y: Math.random() * 400 - 400,
				z: Math.random() * 400
			}
			vertices.push( point.x );
			vertices.push( point.y );
			vertices.push( point.z );
			pointsObj.push({
				x: point.x,
				y: point.y,
				z: point.z
			})
		});

		geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

		var colors = []; // 1 values per vertex

		for( var i = 0; i < num; i ++ ) {
			// set alpha randomly
			colors.push( Math.random() );
			colors.push( Math.random() );
			colors.push( Math.random() );
		}

		geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

		geometry.attributes.color.needsUpdate = true;
		 
		// create the particle system
		var particleSystem = new THREE.Points( geometry, material );

		particleSystem.position.x = -400;
		particleSystem.position.y = 100;

		// add it to the scene
		scene.add(particleSystem);

		for( var i = 0; i < num; i ++ ) {
			TweenMax.to(pointsObj[i], 3.5 + i / num * 5., {x: points[i].x, y: -points[i].y, z: 0 });
		}

		function animate() {

			var positions = geometry.attributes.position.array;
			var colors = geometry.attributes.color.array;
			colors.forEach((color, i) => {
				// colors[i] = Math.random();
			});

			for( var i = 0; i < num; i ++ ) {
				positions[i*3] = pointsObj[i].x;
				positions[i*3 + 1] = pointsObj[i].y;
				positions[i*3 + 2] = pointsObj[i].z;
			}

			geometry.attributes.position.needsUpdate = true;
			geometry.attributes.color.needsUpdate = true;
			requestAnimationFrame(animate);
		}

		animate();

	}
	
}