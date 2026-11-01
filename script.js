const navLinks=[...document.querySelectorAll('.nav-link')];
const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}})},{rootMargin:'-25% 0px -65% 0px'});
sections.forEach(s=>observer.observe(s));
const sidebar=document.getElementById('sidebar');
document.getElementById('menuToggle')?.addEventListener('click',()=>sidebar.classList.toggle('open'));
navLinks.forEach(a=>a.addEventListener('click',()=>sidebar.classList.remove('open')));

// Draw an illustrative 8-N-1 UART frame: idle=1, start=0, LSB-first data for 0xA5, stop=1.
const bits=[1,0,1,0,1,0,0,1,0,1,1];
const labels=['IDLE','START','D0','D1','D2','D3','D4','D5','D6','D7','STOP'];
const x0=76, step=74, highY=27, lowY=62, rxHigh=103, rxLow=138;
function pathFor(yHigh,yLow,offset=0){let d=`M ${x0} ${bits[0]?yHigh:yLow}`;for(let i=0;i<bits.length;i++){let x=x0+i*step;d+=` L ${x+step} ${bits[i]?yHigh:yLow}`;if(i<bits.length-1 && bits[i]!==bits[i+1])d+=` L ${x+step} ${bits[i+1]?yHigh:yLow}`;}return d;}
document.getElementById('txWave').setAttribute('d',pathFor(highY,lowY));
document.getElementById('rxWave').setAttribute('d',pathFor(rxHigh,rxLow));
const grid=document.querySelector('.gridlines'), labelGroup=document.getElementById('bitLabels');
for(let i=0;i<=11;i++){let x=x0+i*step;let line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',x);line.setAttribute('x2',x);line.setAttribute('y1',12);line.setAttribute('y2',158);grid.appendChild(line);if(i<11){let t=document.createElementNS('http://www.w3.org/2000/svg','text');t.setAttribute('x',x+step/2);t.setAttribute('y',177);t.setAttribute('text-anchor','middle');t.setAttribute('class','bit-text');t.textContent=labels[i];labelGroup.appendChild(t);}}
document.getElementById('animateWave').addEventListener('click',()=>{const tx=document.getElementById('txWave'),rx=document.getElementById('rxWave'),state=document.getElementById('waveState');tx.style.opacity='.25';rx.style.opacity='.25';state.textContent='Replaying illustrative frame…';setTimeout(()=>{tx.style.opacity='1';rx.style.opacity='1';state.textContent='Illustrative frame shown · replace with verified simulation evidence';},450);});
