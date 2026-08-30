(function(){
  const BUILD="25";
  const params=new URLSearchParams(location.search);
  const id=params.get("mission")||"demand-1";
  const COST_FALLBACK={
    "cost-1":{n:1,total:7,unit:"COST & REVENUE",map:"cost.html",title:"What Did It Really Cost?",color:["#f59e0b","#c2410c"],storageKey:"econ_cost_m1_v22"},
    "cost-2":{n:2,total:7,unit:"COST & REVENUE",map:"cost.html",title:"Even When You Sell Nothing",color:["#f97316","#ea580c"],storageKey:"econ_cost_m2_v25"},
    "cost-3":{n:3,total:7,unit:"COST & REVENUE",map:"cost.html",title:"Cost Per Unit & The Next One",color:["#22c55e","#15803d"],storageKey:"econ_cost_m3_v25"},
    "cost-4":{n:4,total:7,unit:"COST & REVENUE",map:"cost.html",title:"Why the Curves Behave That Way",color:["#06b6d4","#2563eb"],storageKey:"econ_cost_m4_v25"},
    "cost-5":{n:5,total:7,unit:"COST & REVENUE",map:"cost.html",title:"Build the Right Size",color:["#a855f7","#7e22ce"],storageKey:"econ_cost_m5_v25"},
    "cost-6":{n:6,total:7,unit:"COST & REVENUE",map:"cost.html",title:"What Did the Sale Earn?",color:["#eab308","#a16207"],storageKey:"econ_cost_m6_v25"},
    "cost-7":{n:7,total:7,unit:"COST & REVENUE",map:"cost.html",title:"Revenue Curves & Final Boss",color:["#ec4899","#be185d"],storageKey:"econ_cost_m7_v25"}
  };
  window.MISSION_META=window.MISSION_META||{};
  if(COST_FALLBACK[id] && !window.MISSION_META[id]) window.MISSION_META[id]=COST_FALLBACK[id];
  const meta=window.MISSION_META[id]||COST_FALLBACK[id];
  const main=document.getElementById("main");
  function fail(message){
    if(main) main.innerHTML=`<div class="eyebrow">Mission loading problem</div><h2>We hit a snag.</h2><p>${message}</p><div class="actions"><button class="btn primary" id="retryMission">Retry this mission</button><a class="btn secondary" href="cost.html">Cost & Revenue map</a></div>`;
    const retry=document.getElementById("retryMission"); if(retry) retry.onclick=()=>location.reload();
  }
  window.addEventListener("error",e=>{
    console.error("Economics Rescue mission error",e.error||e.message);
    fail(`The lesson stopped at: <b>${String(e.message||"Unknown error").replace(/[<>]/g,"")}</b>.`);
  });
  window.addEventListener("unhandledrejection",e=>{console.error("Economics Rescue promise error",e.reason);fail("A lesson task failed to finish loading. Retry this mission.")});
  if(!meta){fail(`Unknown mission: ${id}`);return}
  document.documentElement.style.setProperty("--mission-a",meta.color[0]);
  document.documentElement.style.setProperty("--mission-b",meta.color[1]);
  const brand=document.getElementById("missionBrand"); if(brand) brand.innerHTML=`ECONOMICS RESCUE <span class="dim">/ ${meta.unit||"DEMAND"} ${meta.n}/${meta.total||6}</span>`;
  const mapLink=document.getElementById("unitMapLink"); if(mapLink){mapLink.href=meta.map||"demand.html";mapLink.textContent=(meta.unit||"Demand").replace(/\b\w/g,c=>c.toUpperCase())+" map";}
  document.title=`${meta.title} — Economics Rescue`;
  const restart=document.getElementById("restartMission"); if(restart) restart.onclick=()=>{ if(confirm("Restart this mission from page 1? Your XP for this mission will reset.")){ localStorage.removeItem(meta.storageKey); location.reload(); } };
  const s=document.createElement("script");
  s.src=`missions/${id}.js?v=${BUILD}`;
  s.onload=()=>{window.__ECON_MISSION_LOADED__=id};
  s.onerror=()=>fail(`The mission file <b>missions/${id}.js</b> could not be loaded. Make sure the newest patch was uploaded to the repo root.`);
  document.body.appendChild(s);
})();
