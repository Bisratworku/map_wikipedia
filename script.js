import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
const Graph = new ForceGraph3D(document.getElementById('3d-graph'), {
      extraRenderers: [new CSS2DRenderer()]
})
function org(data){
  let nodes = [];
  let links = [];
  function read(data, group = 0){  
      let node = {"id" : data.title, "group" : group}
      nodes.push(node);
      try{
        for(let j = 0; j < data.branches.length; j++){
          let link =   {"source" :  data.title, "target" : data.branches[j].title};
          links.push(link);
        }
      }catch(error){
        console.error(error);
      }
      
      if(data.branches == null){
        return
      }
      for(let i = 0; i < data.branches.length; i++){
            read(data.branches[i], group + 1); 
      }
    }
  read(data);
  return {links, nodes};
}

function json(){
  let group = 0;
  fetch("wikipedia-short.json")
  .then(responce => responce.json())
  .then(data => {
    let gData = org(data);
    const Graph = new ForceGraph3D(document.getElementById('3d-graph'), {
      extraRenderers: [new CSS2DRenderer()]
    })
    .graphData(gData)
    .nodeAutoColorBy('group')
    .nodeThreeObject(node =>{
      const nodeEl = document.createElement('div');
      nodeEl.textContent = node.id;
      nodeEl.style.color = node.color;
      nodeEl.classList.add("labels");
      return new CSS2DObject(nodeEl);
    }).nodeThreeObjectExtend(true);
  })
}
json()