const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

let stopComputeFPS = false;
let steadyNum = 0;
let maxGeneration =
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 4 : 5;
const computeFPS = function(cb:any) {
  let fps:any; let last:any; let offset:any; let step:any;
  fps = 0;
  last = Date.now();
  step = function() {
    offset = Date.now() - last;
    fps += 1;
    if (offset >= 1000) {
      last += offset;
      cb(fps);
      fps = 0;
    }

    if (!stopComputeFPS) {
      requestAnimationFrame(step);
    } else {
      console.log(maxGeneration);
    }
  };
  step();
};

computeFPS((fps:any) => {
  if (fps > 50) {
    maxGeneration++;
    steadyNum++;
  } else if (fps < 30) {
    maxGeneration--;
    steadyNum--;
  } else {
    steadyNum++;
  }
  if (steadyNum > 5) {
    stopComputeFPS = true;
  }
  if (maxGeneration > 6) {
    maxGeneration = 6;
  } else if (maxGeneration < 3) {
    maxGeneration = 0;
    const canvas:any=document.getElementById('canvas');
    canvas.style.display = 'none';
  }
});

export default function initBg() {

  const frameDuration = 1000 / 60;

  const duration = 3000;

  const rotationSpeed = 0.3;

  const totalIterations = Math.floor(duration / frameDuration);

  const maxBaseSize = 100;

  const baseSizeSpeed = 0.02;

  const canvas:any = document.getElementById('canvas');

  const ctx = canvas.getContext('2d');

  let canvasWidth = document.documentElement.clientWidth;

  let canvasHeight = document.documentElement.clientHeight;

  let shapes = [];

  let sizeVariation:any;

  let iteration = 0;

  let animationDirection = 1;

  const sizeVariationRange:any= 0.15;

  let baseRotation = 0;

  let baseSize = 120;

  let c1 = 43;

  let c1S = 1;

  let c2 = 205;

  let c2S = 1;

  let c3 = 255;

  let c3S = 1;

  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);

  class Shape{
    generation:any
    size:any
    rotation:any
    start:any
    end:any
    constructor(gen:any, x:any, y:any, size:any, rotation:any){
      this.generation = gen;
      this.size = size;
      this.rotation = -rotation;
      this.start = {
        x,
        y
      };
      this.end = {
        x_1: this.start.x + Math.cos(degToRad(this.rotation)) * this.size,
        y_1: this.start.y + Math.sin(degToRad(this.rotation)) * this.size,
        x_2:
          this.start.x + Math.cos(degToRad(this.rotation + 360 / 3)) * this.size,
        y_2:
          this.start.y + Math.sin(degToRad(this.rotation + 360 / 3)) * this.size,
        x_3:
          this.start.x +
          Math.cos(degToRad(this.rotation + (360 / 3) * 2)) * this.size,
        y_3:
          this.start.y +
          Math.sin(degToRad(this.rotation + (360 / 3) * 2)) * this.size
      };
      this.init();
    }

    init() {
      if (this.generation < maxGeneration) {
        const gen = this.generation + 1;
  
        const newSize = this.size * sizeVariation;
  
        const newRotation = this.rotation;
        
         const s1= new Shape(gen, this.end.x_3, this.end.y_3, newSize, newRotation)
       
        
         const s2= new Shape(gen, this.end.x_1, this.end.y_1, newSize, newRotation)
       
        
         const s3= new Shape(gen, this.end.x_2, this.end.y_2, newSize, newRotation)
       
        shapes.push(s1,s2,s3)
      }
      this.draw();
    };
  
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y);
      ctx.lineTo(this.end.x_1, this.end.y_1);
      ctx.moveTo(this.start.x, this.start.y);
      ctx.lineTo(this.end.x_2, this.end.y_2);
      ctx.moveTo(this.start.x, this.start.y);
      ctx.lineTo(this.end.x_3, this.end.y_3);
      // ctx.closePath();
      ctx.strokeStyle =
        'rgba(' + c1 + ',' + c2 + ',' + c3 + ',' + 1 / this.generation / 5 + ')';
      ctx.stroke();
      // ctx.fill();
    };
  }

  

  

  function animate() {
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.globalCompositeOperation = 'lighter';
    shapes = [];
    const s = new Shape(0, canvasWidth / 2, canvasHeight / 2, baseSize, baseRotation);
    shapes.push(
      s
    );

    changeColor();
    iteration++;
    if (baseSize < maxBaseSize) {baseSize += baseSizeSpeed;}
    baseRotation += rotationSpeed;
    sizeVariation = easeInOutSine(
      iteration,
      1 - sizeVariationRange * animationDirection,
      sizeVariationRange * 2 * animationDirection,
      totalIterations
    );
    if (iteration >= totalIterations) {
      iteration = 0;
      animationDirection *= -1;
    }
    if (maxGeneration === 0) {
      return;
    }
    requestAnimationFrame(animate);
  }

  function degToRad(deg:any) {
    return (Math.PI / 180) * deg;
  }

  function easeInOutSine(
    currentIteration:any,
    startValue:any,
    changeInValue:any,
    totalIterations:any
  ) {
    return (
      (changeInValue / 2) *
        (1 - Math.cos((Math.PI * currentIteration) / totalIterations)) +
      startValue
    );
  }

  function changeColor() {
    if (c1 === 0 || c1 === 255) {c1S *= -1;}
    if (c2 === 0 || c2 === 255) {c2S *= -1;}
    if (c3 === 0 || c3 === 255) {c3S *= -1;}
    c1 += 1 * c1S;
    c2 += 1 * c2S;
    c3 += 1 * c3S;
  }

  ctx.globalCompositeOperation = 'lighter';
  animate();

  window.addEventListener('resize', function() {
    canvasWidth = document.documentElement.clientWidth;
    canvasHeight = document.documentElement.clientHeight;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    ctx.strokeStyle = 'rgba(66,134,240,.3)';
    ctx.globalCompositeOperation = 'lighter';
  });
}
