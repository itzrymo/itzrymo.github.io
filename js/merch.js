const video=document.getElementById("bgVideo");
if(video){
  video.muted=true;
  const start=()=>video.play().catch(()=>{});
  window.addEventListener("load",start);
  document.addEventListener("visibilitychange",()=>document.hidden?video.pause():start());
}

document.querySelectorAll('a[href^="YOUR_PRODUCT_LINK"]').forEach(a=>{
  a.addEventListener("click",e=>{
    e.preventDefault();
    alert("Add this product's store URL in merch/index.html first.");
  });
});
