attribute float alpha;
attribute vec3 color;
varying vec3 vColor;
varying vec2 vUV;
void main() {
	vColor = color;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	vUV = uv;
	gl_PointSize = 80.0;
	gl_Position = projectionMatrix * mvPosition;
}