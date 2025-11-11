// quiz logic
const quizData = [
  {q:'Which extra coordinate is added for 2D homogeneous coordinates?', a:'1'},
  {q:'Which matrix size is used for 3D homogeneous transforms?', a:'4x4'},
  {q:'Which projection gives realistic depth?', a:'perspective'},
  {q:'What transformation moves an object?', a:'translation'}
];
function startQuiz(){
  const area = document.getElementById('quizArea');
  if(!area) return;
  let i=0;
  show();
  function show(){
    area.innerHTML = `<div class="card"><h3>${quizData[i].q}</h3>
      <input id="ans" placeholder="Type answer" style="padding:8px;width:100%;margin-top:8px"/><div style="margin-top:8px">
      <button id="chk" class="btn small">Check</button> <button id="nxt" class="btn small ghost">Skip</button>
      <p id="msg" style="margin-top:8px;color:#334155"></p></div></div>`;
    document.getElementById('chk').onclick = check;
    document.getElementById('nxt').onclick = ()=>{ i=(i+1)%quizData.length; show(); }
  }
  function check(){
    const ans = document.getElementById('ans').value.trim().toLowerCase();
    const msg = document.getElementById('msg');
    if(ans===quizData[i].a.toLowerCase()) msg.textContent = '✅ Correct!';
    else msg.textContent = '❌ Try again';
  }
}
document.addEventListener('DOMContentLoaded', startQuiz);
