(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&h(u)}).observe(document,{childList:!0,subtree:!0});function m(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function h(t){if(t.ep)return;t.ep=!0;const i=m(t);fetch(t.href,i)}})();const c=document.getElementById("gameCanvas"),o=c.getContext("2d"),p=document.getElementById("startButton"),r=20;let a=[],s={},n="right",w=150,f,d=!1;function x(){a=[{x:10,y:10}],s={x:15,y:15},n="right",d=!1,f&&clearInterval(f),f=setInterval(()=>{k(),g()},w)}function g(){if(o.clearRect(0,0,c.width,c.height),d){o.fillStyle="black",o.font="30px Arial",o.textAlign="center",o.fillText("Game Over!",c.width/2,c.height/2);return}v(),b()}function v(){o.fillStyle="green",a.forEach(e=>{o.fillRect(e.x*r,e.y*r,r,r)})}function b(){o.fillStyle="red",o.fillRect(s.x*r,s.y*r,r,r)}function k(){if(d)return;const e={...a[0]};switch(n){case"up":e.y-=1;break;case"down":e.y+=1;break;case"left":e.x-=1;break;case"right":e.x+=1;break}a.unshift(e),e.x===s.x&&e.y===s.y?s={x:Math.floor(Math.random()*(c.width/r)),y:Math.floor(Math.random()*(c.height/r))}:a.pop(),O()}function O(){const e=a[0];(e.x<0||e.x>=c.width/r||e.y<0||e.y>=c.height/r)&&y();for(let l=1;l<a.length;l++)e.x===a[l].x&&e.y===a[l].y&&y()}function y(){clearInterval(f),d=!0,g()}document.addEventListener("keydown",e=>{switch(e.key){case"ArrowUp":n!=="down"&&(n="up");break;case"ArrowDown":n!=="up"&&(n="down");break;case"ArrowLeft":n!=="right"&&(n="left");break;case"ArrowRight":n!=="left"&&(n="right");break}});p.addEventListener("click",()=>{x()});
