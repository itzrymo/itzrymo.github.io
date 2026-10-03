const target=new Date("October 31, 2026 18:00:00").getTime();
function tick(){
 const d=target-Date.now();
 const vals=d<=0?[0,0,0,0]:[
 Math.floor(d/86400000),
 Math.floor(d%86400000/3600000),
 Math.floor(d%3600000/60000),
 Math.floor(d%60000/1000)];
 ["days","hours","minutes","seconds"].forEach((id,i)=>{
  const e=document.getElementById(id);
  if(e)e.textContent=String(vals[i]).padStart(2,"0");
 });
}
tick();setInterval(tick,1000);

const mark=document.querySelector(".orbit");
if(mark&&matchMedia("(pointer:fine)").matches){
 document.addEventListener("mousemove",e=>{
  const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
  mark.style.transform=`translate(${x*12}px,${y*8}px)`;
 });
}

document.querySelectorAll(".gallery-grid img").forEach((img, index) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    img.parentElement.classList.add("image-missing");
    img.parentElement.insertAdjacentHTML(
      "beforeend",
      `<span class="missing-image">IMAGE ${String(index + 1).padStart(2,"0")}<br>CHECK FILE NAME</span>`
    );
  });
});
