
#ifdef GL_ES
precision mediump float;
#endif



uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float scaleTo01(float value, float minValue, float maxValue) {
    return clamp((value - minValue) / (maxValue - minValue), 0.0, 1.0);
}

float customFunction(float x) {
    float re = 0.0;
    for(float i = 1.0; i<=5.0;i++){
        re += sin(x* (1.0/i));
    }

    return re;
}
void main() {
  
    // Resolution: 21,250 ; 
    float x = gl_FragCoord.x / 200.0; 
    float y = gl_FragCoord.y / 2.0;
	float normalizedValue = scaleTo01(customFunction(y),-5.0,5.0);
    vec3 color = vec3(normalizedValue, 0.0, 0.0);
	gl_FragColor = vec4(color, 1.0);
    
    
}