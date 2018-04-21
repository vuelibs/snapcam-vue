<template>
  <div class="stage" style="position: relative;">
    <div class="camera">
      <div ref="_webcam" id="webcam" style="width:240px; height:320px;"></div>
      <canvas class="display" ref="_canvas" style="z-index: 1;"></canvas>
      <canvas class="canvas" ref="_t3d" style="z-index: 2;"></canvas>
      <canvas class="canvas" ref="_frame" style="z-index: 3;"></canvas>
      <canvas class="canvas" ref="_drawing" style="z-index: 4;"></canvas>
      <canvas class="canvas" ref="_buffer" style="z-index: 5;"></canvas>
    </div>
    <div class="camera-controls" style="position: absolute; top:80%; left: 20%; z-index: 6;">
      <b-button class="mt-1" href="#" variant="primary">
        <icon scale="2" name="angle-left"></icon>
      </b-button>
      <b-button class="mt-1" href="#" variant="primary">
        <icon scale="2" name="camera"></icon>
      </b-button>
      <b-button class="mt-1" href="#" variant="primary">
        <icon scale="2" name="angle-right"></icon>
      </b-button>
    </div>
  </div>
</template>

<script>
  import Webcam from 'webcamjs'

  export default {
    name:'webcamjs',
    methods:{
      // METHOD: Webcam Initialization
      webcamInit: function(){

        let webcam = this.$refs._webcam;          // Webcam Video Source

        let canvas = this.$refs._canvas;          // Webcam canvas render
        let t3d = this.$refs._t3d;                // BRV4: Face Tracker
        let frame = this.$refs._frame;            // Frames
        let drawing = this.$refs._drawing;        //
        let buffer = this.$refs._buffer;          //

        let context= canvas.getContext('2d');     // Context Webcam canvas render
        let screenWidth = window.innerWidth;      // Browser window width size
        let screenHeight = window.innerHeight;    // Browser window height size
        let video = null;
        let isMobile = false;

        function initResolution(){
          if(screenHeight >= screenWidth){  //Mobile
            isMobile = true;
            screenHeight = screenHeight - 153;
          }else if(screenHeight >= 1000){
            screenWidth = 400;
            screenHeight = 550;
          }else if(screenHeight >= 960){
            screenWidth = 350;
            screenHeight = 500;
          }else if(screenHeight >= 900){
            screenWidth = 300;
            screenHeight = 420;
          }else if(screenHeight >= 768){
            screenWidth = 250;
            screenHeight = 340;
          }else if(screenHeight >= 720){
            screenWidth = 250;
            screenHeight = 340;
          }else{
            screenWidth = 250;
            screenHeight = 340;
          }

          [canvas.width, t3d.width, frame.width,    // Resize all canvas width to same parameters
           drawing.width, buffer.width] = Array(5).fill(screenWidth);

          [canvas.height, t3d.height, frame.height, // Resize all canvas height to same parameters
           drawing.height, buffer.height] = Array(5).fill(screenHeight);

          Webcam.set({
            width: canvas.width,
        		height: canvas.height,
            dest_width: canvas.width,
            dest_height: canvas.height,
        		image_format: 'jpeg',
        		jpeg_quality: 100,
        		force_flash: false,
        		flip_horiz: true,
        		fps: 60
          });

          webcam.hidden = true;
        }

        function renderCanvas() {
          Webcam.snap(function(){}, canvas);
          setTimeout(renderCanvas, 1000/60);
        }

        Webcam.attach("#webcam");
        Webcam.on('load', function(){
          initResolution();
          renderCanvas();
        });
      },
      // METHOD: Webcam Frame initialization
      loadFrames: function(){

      },
      // METHOD: Webcam Capture
      captureImage: function(){

      },
      // METHOD: Webcam Video Record
      recordVideo(){

      }
    },
    mounted(){
      this.webcamInit();
    }
  }
</script>

<style scoped>
  .canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .display {
    position: relative;
    top: 0;
    left: 0;
  }
</style>
