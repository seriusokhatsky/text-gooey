varying vec2 vUV;
varying vec3 vColor;
uniform sampler2D texture;
void main() {
	vec4 tex = texture2D(texture, gl_PointCoord);
	vec3 col = vec3(gl_PointCoord.x, .5,.5);
	col = tex.rgb;
	float alpha = 1.;
	alpha = tex.a;
	if( gl_PointCoord.x  > .5 ) { //  gl_PointCoord.x 
		// alpha = 0.;
	}

	gl_FragColor = vec4(col, alpha);

}