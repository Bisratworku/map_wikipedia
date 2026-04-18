import * as THREE from "three"
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';


const glScene = new THREE.Scene();
const cssScene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const glRender = new THREE.WebGLRenderer({antialias : true, alpha : true});
const CSSRender = new CSS3DRenderer();
glRender.setSize(window.innerWidth, window.innerHeight);
CSSRender.setSize(window.innerWidth, window.innerHeight);
CSSRender.domElement.style.fontSize = "1px";
CSSRender.domElement.style.top = 0;
document.body.appendChild(CSSRender.domElement);
glRender.setClearColor(0x000000, 0);
CSSRender.domElement.appendChild(glRender.domElement);

const header = document.createElement("h1");
header.classList.add("header");
header.innerHTML = "War What is it good for"

const obj = new CSS3DObject(header);
cssScene.add(obj);

const header2 = document.createElement("h1");
header2.classList.add("header2");
header2.innerHTML = "War What is it good for"
const obj2 = new CSS3DObject(header2);
cssScene.add(obj2);

camera.position.z = 5
function createPlane(w, h, position, rotation) {

    var material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.0,
      side: THREE.DoubleSide
    });

    var geometry = new THREE.PlaneGeometry(w, h);

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;

    mesh.rotation.x = rotation.x;
    mesh.rotation.y = rotation.y;
    mesh.rotation.z = rotation.z;

    return mesh;
  }
var plane = createPlane(w, h,position,rotation);
glScene.add(plane);

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