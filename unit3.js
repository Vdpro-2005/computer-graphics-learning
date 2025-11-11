// 2D visualizer
const c2 = document.getElementById('canvas2d');
const ctx2 = c2.getContext('2d');
const tx = document.getElementById('tx');
const ty = document.getElementById('ty');
const rot = document.getElementById('rot');
const sx = document.getElementById('sx');
const sy = document.getElementById('sy');
const reset2d = document.getElementById('reset2d');
const orderToggle = document.getElementById('orderToggle');

function draw2d(){
  const W = c2.width, H = c2.height;
  ctx2.clearRect(0,0,W,H);
  // grid
  ctx2.strokeStyle='#eef2ff';
  for(let x=0;x<W;x+=20){ ctx2.beginPath(); ctx2.moveTo(x,0); ctx2.lineTo(x,H); ctx2.stroke(); }
  for(let y=0;y<H;y+=20){ ctx2.beginPath(); ctx2.moveTo(0,y); ctx2.lineTo(W,y); ctx2.stroke(); }

  ctx2.save();
  ctx2.translate(W/2, H/2);
  // original square (grey)
  drawSquare(0,0,80,'#cbd5e1');

  // transformed square (blue)
  ctx2.save();
  // choose order
  const doSRT = orderToggle.checked; // S->R->T
  if(!doSRT){
    // T -> R -> S
    ctx2.translate(Number(tx.value), -Number(ty.value));
    ctx2.rotate(-Number(rot.value)*Math.PI/180);
    ctx2.scale(Number(sx.value), Number(sy.value));
  } else {
    // S -> R -> T (apply scale first)
    ctx2.scale(Number(sx.value), Number(sy.value));
    ctx2.rotate(-Number(rot.value)*Math.PI/180);
    ctx2.translate(Number(tx.value), -Number(ty.value));
  }
  drawSquare(0,0,80,'#60a5fa', true);
  ctx2.restore();

  ctx2.restore();
  // legend
  ctx2.fillStyle='#0f172a'; ctx2.font='13px Arial';
  ctx2.fillText('Grey = original', 12, 18);
  ctx2.fillStyle='#0f172a'; ctx2.fillText('Blue = transformed', 12, 36);
}
function drawSquare(cx,cy,size,color,fill){
  ctx2.beginPath();
  const h = size/2;
  if(fill){ ctx2.fillStyle=color; ctx2.fillRect(cx-h, cy-h, size, size); }
  else { ctx2.strokeStyle=color; ctx2.lineWidth=2; ctx2.strokeRect(cx-h, cy-h, size, size); }
}
['tx','ty','rot','sx','sy','orderToggle'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('input', draw2d);
});
if(reset2d) reset2d.addEventListener('click', ()=>{
  tx.value=0; ty.value=0; rot.value=0; sx.value=1; sy.value=1; orderToggle.checked=false; draw2d();
});
draw2d();
