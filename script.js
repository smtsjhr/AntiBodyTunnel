const enable_interaction = true;

var hold = false;
var fill_alpha = 1;

var scrolling = false;
var scroll_y = 0;
var scroll_x= 0;

var get_mouse_pos = false;
var get_touch_pos = false;

const t_purerate = .03;
var t = 0;

const fps = 50;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var scale;
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;
var body_height = parseInt(document.getElementById("body").style.height.slice(0, -2));
var body_width = parseInt(document.getElementById("body").style.width.slice(0, -2));


window.onresize = function(e) {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    W = canvas.style.width = window.innerWidth;
    H = canvas.style.width = window.innerHeight;
    body_height = parseInt(document.getElementById("body").style.height.slice(0, -2));
    body_width = parseInt(document.getElementById("body").style.width.slice(0, -2));
  }


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t,scale, wind_x, wind_y) {
    for(x.strokeStyle='#FFF',i=400;i--;x.stroke())x.beginPath(x.fill()),x.arc(W/2+scale*((r=1.01**(300-i)*80)*S(a=i+t/2)+wind_x*S(b=i/50+t)),H/2+scale*(r*C(a)+wind_y*C(b)),scale*r/7,0,7);
}


startAnimating(fps);


function draw() {
    
    scale = Math.max(W,H)/1920;

    ctx.fillStyle = `rgba(0,0,0,${fill_alpha})`;

    wind_x = 100*(2*scroll_x - 1);
    wind_y = 100*(2*scroll_y - 1)


    DwitterCode(t, scale, wind_x, wind_y);


    if (hold) {
        fill_alpha -= .002;
        fill_alpha = Math.max(0.1, fill_alpha);
    }
    
    if(!hold && fill_alpha >= 0.1) {
        fill_alpha += .01;
        fill_alpha = Math.min(1.0, fill_alpha);
    }


    t += t_purerate;
    

}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();

     }


    if(enable_interaction) {

        // window.addEventListener('scroll', function(e) {
        //     scroll_pos_y = window.scrollY;
        //     scroll_pos_x = window.scrollX;
            
        //     if (!scrolling) {
        //         window.requestAnimationFrame(function() {
        //         scroll_interaction(scroll_pos_x, scroll_pos_y);
        //         scrolling = false;
        //         });
            
        //         scrolling = true;
        //     }
        // });

        canvas.addEventListener('mousedown', e => {
            hold = true;
            get_mouse_pos = true;
            mouse_action(canvas, e);
        });
        
        canvas.addEventListener('mouseup', e => {
            hold = false;
            get_mouse_pos = false;
        });

        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                mouse_action(canvas, e)
          }
        })
    
        canvas.addEventListener('touchstart', function(e) {
            hold = true;
            get_touch_pos = true;
        }, false);
        
        canvas.addEventListener('touchend', function(e) {
            hold = false;
            get_touch_pos = false;
        }, false);  

        canvas.addEventListener('touchmove', function(e) {
            touch_action(canvas,e);
            e.preventDefault();
        }, false);

    }
   
 }
 

function mouse_action(canvas, event) {
    interaction(canvas,event)
}

function touch_action(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event)
}

function interaction(canvas, event) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    x_center = mouse_x - 0.5;
    y_center = mouse_y - 0.5;

    scroll_x = 2*x_center;
    scroll_y = 2*y_center;

}

function scroll_interaction(scroll_pos_x, scroll_pos_y) {
    scroll_x = scroll_pos_x/(body_width - W);
    scroll_y = scroll_pos_y/(body_height - H);
}