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
    alert("Contact ITZ_RYMO on Tiktok or Email us at redline.bike.car.community@gmail.com. With the product you are trying to buy!");
  });
});
