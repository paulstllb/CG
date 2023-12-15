
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
float customFunction(float x) {
    float term1 = sin(x);
    float term2 = sin(3.0 * x - 1.0);
    float term3 = sin(0.5 * x + 1.0);
    float term4 = sin((1.0 / 3.0) * x + (1.0 / 3.0));
    float result = term1 + term2 + term3 + term4;

    // Normalisierung zwischen 0 und 1
    result = (1.0/8.0) * (result + 4.0);

    return result;
}
void main() {
    
    float x = gl_FragCoord.x / 2.0; 
    float y = gl_FragCoord.y / 10.0;
	float normalizedValue = customFunction(y);
    vec3 color = vec3(normalizedValue, 0.0, 0.0);
	gl_FragColor = vec4(color, 1.0);
}
