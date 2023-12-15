
var time0 = (new Date()).getTime() / 1000;

//Allgemeiner 3DVektor
function Vector3() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

Vector3.prototype = {
    set : function(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
};
//Element wird ignorrirt 
/**
 * Nimmt aus dem DOM Baum
 * @param id - ID of the DOM element
 * @returns {string}
 */
function getStringFromDOMElement(id) {
    var node = document.getElementById(id);

    //Alle Nodes bekommen
    var recurseThroughDOMNode = function recurseThroughDOMNode(childNode, textContext) {
        if (childNode) {
            if (childNode.nodeType === 3) {
                textContext += childNode.textContent;
            }
            return recurseThroughDOMNode(childNode.nextSibling, textContext);
        } else {
            return textContext;
        }
    };
    return recurseThroughDOMNode(node.firstChild, '');
}

/**
 * Create and attach a shader to gl program
 * @param gl
 * @param program
 * @param type
 * @param src
 */
function addshader(gl, program, type, src) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw "Cannot compile shader:\n\n" + gl.getShaderInfoLog(shader);
    }
    gl.attachShader(program, shader);
}

/**
 * Function that creates and links the gl program with the
 * application's vertex and fragment shader.
 * @param gl
 * @param vertexShader
 * @param fragmentShader
 */
function gl_init(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    var buffer = gl.createBuffer();
    addshader(gl, program, gl.VERTEX_SHADER, vertexShader);
    addshader(gl, program, gl.FRAGMENT_SHADER, fragmentShader);
    gl.linkProgram(program);

    if (! gl.getProgramParameter(program, gl.LINK_STATUS))
        throw "Could not link the shader program!";
    gl.useProgram(program);

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.uTime = gl.getUniformLocation(program, "uTime");
    gl.rad = gl.getUniformLocation(program, "rad");
    gl.lig = gl.getUniformLocation(program, "lig");
    
}

/**
 * This function is called once per frame.
 * @param gl
 */
function gl_update(gl) {
    gl.uniform1f(gl.uTime, (new Date()).getTime() / 1000 - time0);
    
    
    var k = document.getElementById("in");
    var i = document.getElementById("slider");
    gl.uniform1f(gl.rad,k.value);
    gl.uniform1f(gl.lig,i.value);
    console.log(i.value);
    // Start the next frame
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimFrame(function() { gl_update(gl); });
}

/**
 * Start the
 * @param canvas_id
 * @param vertexShader
 * @param fragmentShader
 */
function start_gl(canvas_id, vertexShader, fragmentShader) {
    try {
        var canvas = document.getElementById(canvas_id);
        var gl = canvas.getContext("experimental-webgl");
    } catch (e) {
        throw "Sorry, your browser does not support WebGL.";
    }

    gl_init(gl, vertexShader, fragmentShader);
    gl_update(gl);
}


requestAnimFrame = (function() {
    return requestAnimationFrame
        || webkitRequestAnimationFrame
        || mozRequestAnimationFrame
        || oRequestAnimationFrame
        || msRequestAnimationFrame
        || function(callback) {
               setTimeout(callback, 1000 / 60);
           }; })();
