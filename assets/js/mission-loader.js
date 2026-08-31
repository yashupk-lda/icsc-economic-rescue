(function(){
  const BUILD="24";
  const params=new URLSearchParams(location.search);
  const id=params.get("mission")||"demand-1";
  const meta=(window.MISSION_META||{})[id];
  const main=document.getElementById("main");
  function fail(message){
    if(main) main.innerHTML=`<div class="eyebrow">Mission loading problem</div><h2>We hit a snag.</h2><p>${message}</p><div class="actions"><button class="btn primary" id="retryMission">Retry this mission</button><a class="btn secondary" href="menu.html">Course menu</a></div>`;
    const retry=document.getElementById("retryMission"); if(retry) retry.onclick=()=>location.reload();
  }
  window.addEventListener("error",e=>{
    console.error("Economics Rescue mission error",e.error||e.message);
    fail(`The lesson code stopped at: <b>${String(e.message||"Unknown error").replace(/[<>]/g,"")}</b>. Try Retry; if it repeats, this build needs a code fix.`);
  });
  window.addEventListener("unhandledrejection",e=>{console.error("Economics Rescue promise error",e.reason);fail("A lesson task failed to finish loading. Try Retry.")});
  if(!meta){fail(`Unknown mission: ${id}`);return}
  document.documentElement.style.setProperty("--mission-a",meta.color[0]);
  document.documentElement.style.setProperty("--mission-b",meta.color[1]);
  document.getElementById("missionBrand").innerHTML=`ECONOMICS RESCUE <span class="dim">/ ${meta.unit||"DEMAND"} ${meta.n}/${meta.total||6}</span>`; const mapLink=document.getElementById("unitMapLink"); if(mapLink){mapLink.href=meta.map||"demand.html";mapLink.textContent=(meta.unit||"Demand").replace(/\b\w/g,c=>c.toUpperCase())+" map";} const reviewLink=document.getElementById("reviewHubLink"); if(reviewLink){const u=(meta.unit||"DEMAND").toLowerCase().includes("market")?"market":(meta.unit||"").toLowerCase().includes("cost")?"cost":"demand";reviewLink.href=`review.html?unit=${u}`;}
  document.title=`${meta.title} — Economics Rescue`;
  const restart=document.getElementById("restartMission"); if(restart) restart.onclick=()=>{ if(confirm("Restart this mission from page 1? Your XP for this mission will reset.")){ localStorage.removeItem(meta.storageKey); location.reload(); } };
  const s=document.createElement("script");
  s.src=`missions/${id}.js?v=${BUILD}`;
  s.onload=()=>{window.__ECON_MISSION_LOADED__=id};
  s.onerror=()=>fail("The mission file could not be downloaded. Check the missions folder and refresh.");
  document.body.appendChild(s);
  setTimeout(()=>{
    if(!window.__ECON_MISSION_LOADED__) return;
    const text=(main?.innerText||"").trim();
    if(!text || text.startsWith("Getting your lesson ready")) fail("The mission file loaded, but the lesson did not render. Retry once; if it repeats, use the newest project build.");
  },1800);
})();