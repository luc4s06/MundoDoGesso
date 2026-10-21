document.getElementById('y').textContent=new Date().getFullYear();
const bar=document.getElementById('bar'),hd=document.getElementById('top');
const pars=[...document.querySelectorAll('[data-par]')];
const links=[...document.querySelectorAll('.nav ul a')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
let tick=false;
function frame(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform='scaleX('+(h>0?y/h:0)+')';
  hd.classList.toggle('scrolled',y>20);
  pars.forEach(el=>{
    const r=el.parentElement.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)return;
    const c=(r.top+r.height/2-innerHeight/2)*parseFloat(el.dataset.par);
    el.style.translate='0 '+c+'px';
  });
  let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});
  links.forEach((a,i)=>a.classList.toggle('on',i===cur));
  tick=false;
}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});
addEventListener('resize',frame);frame();
// entra ao rolar para baixo e tambem ao voltar para cima
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting)),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('[data-r]').forEach(el=>io.observe(el));
