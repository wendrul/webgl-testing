"use strict";

function init(gl) {
    let vsSource, fsSource
    fetch("/vertex.glsl").then((str) => {
        vsSource = str;
        return fetch("/fragment.glsl");
    }).then((str) => {
        fsSource = str;
        return (initShaderProgram(gl, vsSource, fsSource))
    });
}


function main() {
    const canvas = document.querySelector("#glCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    init(gl).then((shaderProgram) => {
        
        
        // Set clear color to black, fully opaque
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);
    })
}

window.onload = main;


async function fetch(data_url) {
    var fetchingPromise = new Promise((resolve, reject) => {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", data_url, true);
        oReq.responseType = "arraybuffer";
        oReq.onload = function (oEvent) {
            var arrayBuffer = oReq.response;
            if (arrayBuffer) {
                var byteArray = new Uint8Array(arrayBuffer);
                //// Inflating when file is .gz
                // byteArray = pako.inflate(byteArray)
                var s = new TextDecoder("utf-8").decode(byteArray);
                resolve(s);
            }
        };
        oReq.send(null);
    })
    return (fetchingPromise);
}