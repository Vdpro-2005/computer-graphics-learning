// 3D demo (simple cube + rotations + projection)
const c3 = document.getElementById('canvas3d');
const ctx3 = c3.getContext('2d');
const rx = document.getElementById('rx');
const ry = document.getElementById('ry');
const rz = document.getElementById('rz');
const projection = document.getElementById('projection');
const fov = document.getElementById('fov');
const reset3d = document.getElementById('reset3d');

function deg(a){ return a*Math.PI/180; }
function rotateX(p, a){ const c=Math.cos(a), s=Math.sin(a); const [x,y,z]=p; return [x, y*c - z*s, y*s + z*c]; }
function rotateY(p, a){ const c=Math.cos(a), s=Math.sin(a); const [x,y,z]=p; return [x*c + z*s, y, -x*s + z*c]; }
function rotateZ(p, a){ const c=Math.cos(a), s=Math.sin(a); const [x,y,z]=p; return [x*c - y*s, x*s + y*c, z]; }

function project(p,proj, f){
  const [x,y,z]=p;
  const W=c3.width, H=c3.height;
  if(proj==='ortho') return [W/2 + x, H/2 - y];
  // perspective: camera at z=-f
  const camZ = -f;
  const dz = (z - camZ);
  const px = x * (f/dz);
  const py = y * (f/dz);
  return [W/2 + px, H/2 - py];
}

function draw3d(){
  ctx3.clearRect(0,0,c3.width,c3.height);
  // cube points
  const s = 70;
  const pts = [
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
  ].map(p => p.map(v => v*s));

  // apply rotations
  const ax = deg(Number(rx.value)), ay = deg(Number(ry.value)), az = deg(Number(rz.value));
  const transformed = pts.map(p=>{
    let r = rotateX(p, ax);
    r = rotateY(r, ay);
    r = rotateZ(r, az);
    return r;
  });

  // draw edges
  const proj = projection.value;
  const prj = Number(fov.value);
  const projected = transformed.map(p => project(p, proj, prj));
  const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  ctx3.strokeStyle='#0ea5a4'; ctx3.lineWidth=2;
  edges.forEach(e=>{
    const a = projected[e[0]], b = projected[e[1]];
    ctx3.beginPath(); ctx3.moveTo(a[0], a[1]); ctx3.lineTo(b[0], b[1]); ctx3.stroke();
  });
  // draw points
  projected.forEach(p=>{
    ctx3.fillStyle='#0f172a'; ctx3.beginPath(); ctx3.arc(p[0], p[1],4,0,Math.PI*2); ctx3.fill();
  });
  ctx3.fillStyle='#0f172a'; ctx3.font='13px Arial';
  ctx3.fillText('Projection: '+proj, 12, 18);
}

['rx','ry','rz','projection','fov'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', draw3d);
});
if(reset3d) reset3d.addEventListener('click', ()=>{ rx.value=20; ry.value=-30; rz.value=0; projection.value='persp'; fov.value=600; draw3d(); });
draw3d();
