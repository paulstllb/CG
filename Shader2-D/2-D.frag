// Author: Paul 
// Title: 2- Shader
#ifdef GL_ES
precision mediump float;
#endif



uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
float t = 0.01 * (-u_time * 130.0);

float customFunction(float x) {
    float re = 0.0;
    for(float i = 1.0; i<=5.0;i++){
        re += sin(x* (1.0/i))*i;
        re += cos(i*x)*i;
    }

    return re;
}
float cF(float x){
    float frequency = 1.0;
    float y = sin(x * frequency);
	y += cos(x * frequency * 2.1 - t) * 4.5;
	y += sin(x * frequency * 1.72 + t * 1.121) * 4.0;
    y += cos(x * frequency * 2.413 - t * 0.437) * 5.0;
	y += sin(x * frequency * 2.864 + t * 4.269) * 2.5;
    return y;
}
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float Frand(float x){
    float y = 0.0;
    y += sin(x  * random(vec2(x,x))-random(vec2(0.0,x))) ;
    y += sin(x  * random(vec2(x,5.0))-random(vec2(4.1,x))); 
    y += sin(x  * random(vec2(1.0,x))-random(vec2(0.0,x))) ;
    y += sin(x  * random(vec2(x,x))-random(vec2(4.6,x))) ;
    y += sin(x  * random(vec2(x,4.0))-random(vec2(0.0,x))); 
    return y;
}



float scaleTo01(float value, float minValue, float maxValue) {
    return clamp((value - minValue) / (maxValue - minValue), 0.0, 1.0);
}


void main() {
  	float z = 0.0;
    float x = gl_FragCoord.x / 20.0; 
    float y = gl_FragCoord.y / 20.0;
    z += cF(y);
    z += cF(x);

    vec3 color = vec3(scaleTo01(z,20.0,-20.0), 0.0, 0.0);
	gl_FragColor = vec4(color, 1.0);
    
    
}