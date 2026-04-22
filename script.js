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
/*
const div = document.createElement("div");
div.draggable = true;
div.classList.add("container");
const header = document.createElement("h1");
header.classList.add("header");
header.draggable = true;
header.innerHTML = "Hello World";
div.appendChild(header);
const Obj = new CSS3DObject(div);
Obj.position.set(10, 9, 0);
Obj.scale.set(0.1, 0.1, 0.1);
const i =  Obj.position.normalize();

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -(e.clientY / window.innerHeight) * 2 + 1;
  //Obj.position.set(x * 10, y * 10, 0);
  console.log(x,y);
})*/
//cssScene.add(Obj);
camera.position.z = 15;
function ndcToWorld(ndcX, ndcY, targetZ){
  const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
  vec.unproject(camera);
  const dir = vec.sub(camera.position).normalize();
  const distance = (targetZ - camera.position.z) / dir.z;
  return camera.position.clone().add(dir.multiplyScalar(distance));
}
function createElement(title, x = 0, y = 0, z = 0){
  const div = document.createElement("div");
  div.draggable = false;
  div.classList.add("container");
  const header = document.createElement("h1");
  header.classList.add("header");
  header.draggable = true;
  header.innerHTML = title;
  div.appendChild(header);
  const obj = new CSS3DObject(div);
  obj.position.set(x, y, z);
  obj.scale.set(0.1, 0.1, 0.1);
  cssScene.add(obj);
  // pointer-based dragging mapped to world coordinates (full range)
  let dragging = false;
  let dragDepth = obj.position.z;
  header.style.touchAction = 'none';
  const onPointerDown = (e) => {
    dragging = true;
    dragDepth = obj.position.z;
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    if(!dragging) return;
    const rect = CSSRender.domElement.getBoundingClientRect();
    const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    const worldPos = ndcToWorld(ndcX, ndcY, dragDepth);
    obj.position.x = worldPos.x;
    obj.position.y = worldPos.y;
  };
  const onPointerUp = () => { dragging = false; };
  header.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  return obj.position;
}

//createElement("Hello World", 0, 0, 0);
//createElement("Bisrat ", 5, 5, 0);
//createElement("Worku", -5, -5, 0);
function readJSON(){
  fetch('sample.json')
    .then(response => response.json())
    .then(data => {
        let c = createElement(data.title, 0, 0, 0);
        console.log(c);
        function trivese(arr){
          
          let branch = [];
          if(arr[0] === null){
            return 
          }
          else{
            
            for(let i = 0; i < arr.length; i++){
               createElement(arr[i].title,Math.random() , Math.random(), Math.random());  
              branch.push(arr[i].branches)  
            }
            
            trivese(branch.flat());
          }
        }    
        trivese(data.branches)
    });
}
readJSON();
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