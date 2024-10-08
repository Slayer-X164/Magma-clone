function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

let textH1 = document.querySelector("#page2>h1")
var clut = "";

textH1.textContent.split(" ").forEach(function(e){
  clut+= `<span> ${e} </span>`
  textH1.innerHTML = clut
})

gsap.to("#page2>h1>span",{
  scrollTrigger:{
  trigger:`#textP>span`,
  start:`top bottom`,
  end:`bottom top`,
  scroller:`#main`,
  scrub:.5,
},
stagger:.1,
color:`#f0fff0`,

})

function canvas(){
  const canvas = document.querySelector("#page3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    img/frames00007.png
img/frames00010.png
img/frames00013.png
img/frames00016.png
img/frames00019.png
img/frames00022.png
img/frames00025.png
img/frames00028.png
img/frames00031.png
img/frames00034.png
img/frames00037.png
img/frames00040.png
img/frames00043.png
img/frames00046.png
img/frames00049.png
img/frames00052.png
img/frames00055.png
img/frames00058.png
img/frames00061.png
img/frames00064.png
img/frames00067.png
img/frames00070.png
img/frames00073.png
img/frames00076.png
img/frames00079.png
img/frames00082.png
img/frames00085.png
img/frames00088.png
img/frames00091.png
img/frames00094.png
img/frames00097.png
img/frames00100.png
img/frames00103.png
img/frames00106.png
img/frames00109.png
img/frames00112.png
img/frames00115.png
img/frames00118.png
img/frames00121.png
img/frames00124.png
img/frames00127.png
img/frames00130.png
img/frames00133.png
img/frames00136.png
img/frames00139.png
img/frames00142.png
img/frames00145.png
img/frames00148.png
img/frames00151.png
img/frames00154.png
img/frames00157.png
img/frames00160.png
img/frames00163.png
img/frames00166.png
img/frames00169.png
img/frames00172.png
img/frames00175.png
img/frames00178.png
img/frames00181.png
img/frames00184.png
img/frames00187.png
img/frames00190.png
img/frames00193.png
img/frames00196.png
img/frames00199.png
img/frames00202.png

   `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: .5,
      trigger: `#page3`,
      start: `top top`,
      end: `250% top`,
      scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `#main`,
    start: `top top`,
    end: `250% top`,
  });
  }
canvas()
