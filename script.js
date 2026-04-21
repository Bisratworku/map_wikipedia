import * as THREE from "three"
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
const glScene = new THREE.Scene();
const cssScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const glRender = new THREE.WebGLRenderer({antialias : true, alpha : true});
const CSSRender = new CSS3DRenderer();
glRender.setPixelRatio(window.devicePixelRatio);
glRender.setSize(window.innerWidth, window.innerHeight);
CSSRender.setSize(window.innerWidth, window.innerHeight);
CSSRender.domElement.style.fontSize = "1px";
CSSRender.domElement.style.top = 0;
document.body.appendChild(CSSRender.domElement);
glRender.setClearColor(0x000000, 0);
CSSRender.domElement.appendChild(glRender.domElement);
const mouse = new THREE.Vector3();
const div = document.createElement("div");
div.classList.add("contaner");

const objects = []
camera.position.z = 15;

function createElement(title, x = 0, y = 0, z = 0){
    const header = document.createElement("h1");    
    header.classList.add("header");
    header.innerHTML = title;
    header.draggable = true;
    div.appendChild(header);
    const obj = new CSS3DObject(div);
    obj.scale.set(0.1,0.1,0.1);
    obj.position.set(x,y,z);
    cssScene.add(obj);  
    objects.push(obj);
    let drag  = false;
    header.addEventListener('mousedown', () => {
      console.log("hello");  
      drag = true;
    });
    header.addEventListener('mousemove', (e) => {
        if(drag){
          const mouse  = new THREE.Vector3();
          let rect = CSSRender.domElement.getBoundingClientRect();
          mouse.x = (e.clientX/ window.innerWidth) * 2 -1;
          //mouse.y = e.clientY/ 23;
          //mouse.z = 0
          obj.position.normalize()
          //i.y = -(i.y / window.innerHeight) * 2 + 1;
          //i.z = 0;
          console.log(obj.position.x, mouse.x);
          
          
        }
    })
    header.addEventListener('mouseup', () => {
        drag = false;
    })
}
createElement("bisrat", 1);
function animate(time){
      requestAnimationFrame(animate);
      glRender.render(glScene, camera);
      CSSRender.render(cssScene, camera);
}
animate();
function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  glRender.setSize(window.innerWidth, window.innerHeight);
  CSSRender.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', resize);