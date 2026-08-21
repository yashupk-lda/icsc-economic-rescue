const $=(id)=>document.getElementById(id);
(function(){
const KEY="econ_combined_v1v4";
const state=Object.assign({i:0,xp:0,streak:0,sound:true,answered:{},boss:0},JSON.parse(localStorage.getItem(KEY)||"{}"));

const screens=[
 {t:"intro"},
 {t:"sim"},
 {t:"q",q:"You raise the dosa price from ₹60 to ₹100. Nothing else changes. What would you normally expect?",a:["More dosas are bought","Fewer dosas are bought","The demand curve must shift right"],c:1,h:"Same dosa. Higher price. Think like the person paying."},
 {t:"law"},
 {t:"graph"},
 {t:"q",q:"On the graph, Point A is Price ₹100 and Quantity Demanded 60. What does Point A mean?",a:["At ₹100, consumers demand 60 units","₹60 is the price","Demand shifted by 100 units"],c:0,h:"A point pairs one price with one quantity demanded."},
 {t:"movement"},
 {t:"q",q:"The dosa price falls from ₹100 to ₹60 and people buy more. What happened?",a:["Demand shifted right","Movement down the same demand curve","Demand shifted left"],c:1,h:"Only the dosa's own price changed."},
 {t:"shift"},
 {t:"q",q:"The price stays ₹60. A famous food reviewer praises the stall and more people want dosas. What happened?",a:["Movement down the same demand curve","Demand shifted right","Demand shifted left"],c:1,h:"The dosa's own price did not cause the change."},
 {t:"uber"},
 {t:"q",q:"A concert ends and thousands of people request rides. What changed first?",a:["Demand for rides increased","The higher fare created the demand surge","Demand fell"],c:0,h:"The event brought more riders into the market before any price response."},
 {t:"airline"},
 {t:"q",q:"Two days before a major holiday, many more people want a limited number of flight seats. Which story fits best?",a:["Demand shifts right and fares may rise","The higher fare itself shifts demand right","Demand shifts left"],c:0,h:"More people want seats at many possible prices, while capacity is limited."},
 {t:"determinants"},
 {t:"rapid"},
 {t:"board"},
 {t:"boss"},
 {t:"finish"}
];
state.i=Math.max(0,Math.min(Number(state.i)||0,screens.length-1));
const PAGE_HELP={"intro": "This mission is about one basic relationship: when only a good's own price changes, people usually buy more at a lower price and less at a higher price. Everything else in the mission grows from that.", "sim": "Ignore economics words. Imagine you are the buyer. If the exact same dosa suddenly costs much more and nothing else changes, would you normally buy more or fewer? That intuition is the Law of Demand.", "law": "The law is conditional. It does NOT say demand always falls. It says: holding other demand determinants constant, price and quantity demanded move in opposite directions.", "graph": "Price is on the vertical axis and quantity demanded on the horizontal axis. Each point is one price–quantity pair. Moving down the curve means price is lower and quantity demanded is higher.", "movement": "Movement happens when the good's OWN price changes. Nothing about income, taste, population, related goods, or expectations needs to change. You remain on the same curve.", "shift": "A shift means the whole demand relationship changed because something OTHER than the good's own price changed. At the same price, consumers now want a different quantity.", "determinants": "Think of determinants as reasons the buyer's willingness or ability to buy changes even when the product's own price does not: income, tastes, related-good prices, expectations, number of buyers, etc.", "board": "Build the answer as a contrast: own-price change → movement on same curve; other determinant changes → entire curve shifts. The coach makes you write that logic in order.", "boss": "Do not memorize the nouns in the examples. Ask only: did the product's own price change, or did another determinant change?"};
const PAGE_LABELS={"intro": "Mission intro", "sim": "Try the situation", "q": "Practice question", "law": "Law of Demand", "graph": "Read the graph", "movement": "Movement along curve", "shift": "Shift of demand", "uber": "Real-world example", "airline": "Real-world example", "determinants": "Determinants", "rapid": "Quick review", "board": "Board answer coach", "boss": "Final Boss", "finish": "Mission complete", "define": "Definition of demand", "isDemand": "Demand or mere desire?", "buildDef": "Build the definition", "individual": "Individual demand", "whoGame": "Individual vs market", "market": "Market demand", "marketBuilder": "Build market demand", "scheduleExplain": "Demand schedule", "plotIndividual": "Plot individual demand", "plotMarket": "Plot market demand", "typesExplain": "Types of demand", "typeDefinitions": "Type definitions", "typeMatch": "Match demand types", "typeSort": "Sort demand types", "picExplain": "Price, income & cross demand", "picSort": "Classify demand relationships", "function": "Demand function", "predict": "Predict demand", "machine": "Demand machine", "fix": "Fix the economist", "graphMeaning": "What the slope means", "fiveReasons": "Five reasons", "dmuGame": "DMU reason", "incomeGame": "Income effect", "subGame": "Substitution effect", "newBuyers": "More consumers", "manyUses": "Several uses", "reasonSort": "Sort the reasons", "chainGame": "Build the causal chain", "exceptionsIntro": "Exceptions intro", "giffen": "Giffen goods", "snob": "Veblen/snob goods", "otherExceptions": "Other exceptions", "exceptionSort": "Sort exceptions", "fakeException": "Real or fake exception?", "upwardGraph": "Exception graph", "fixEconomist": "Fix the economist", "bridge": "Bridge to utility", "utility": "What is utility?", "utilityGame": "Utility practice", "cardinal": "Cardinal utility", "pizza": "DMU discovery", "tuMuExplain": "TU vs MU", "tableCalc": "Calculate MU", "tuMuGraph": "TU & MU graphs", "relationshipGame": "TU/MU relationships", "transferGame": "Transfer practice", "dmuLaw": "Law of DMU", "buildLaw": "Build the law", "assumptions": "Assumptions", "assumptionGame": "Assumption practice", "equilibriumIntro": "One-good equilibrium", "buyGame": "Buy or stop?", "equilibriumTable": "Equilibrium table", "equilibriumGraph": "Equilibrium graph", "priceChange": "Price change", "tennis": "Serve vs backhand", "tennisTable": "Tennis table", "tennisLesson": "What the tennis example means", "vacation": "Beach vs hiking", "vacationTable": "Vacation table", "notEqual": "Balanced ≠ 50–50", "parkIntro": "Theme park setup", "parkGame": "Roller coaster vs go-karts", "parkTable": "Theme park table", "perMinute": "Benefit per minute", "arcade": "Arcade tokens", "arcadeTable": "Arcade table", "resourceRule": "General scarce-resource rule", "foodIntro": "Pepper chicken vs biryani", "moneyGame": "Benefit per rupee", "foodTable": "Food MU table", "muReveal": "Introduce MU/P", "allocation": "Allocate the food budget", "equiReveal": "Reveal equi-marginal utility", "textbookBridge": "Translate into textbook symbols", "textbookSimple": "Simple textbook table", "formal": "Formal law & conditions", "scheduleWalk": "Unequal-price walkthrough", "schedule": "ISC numerical schedule", "dmuVsEqui": "DMU vs equi-marginal", "favoriteTrap": "Favourite ≠ marginal best", "repair": "Repair an allocation", "bundles": "Bundles & preferences", "ic": "Indifference curve", "budget": "Budget line", "equil": "Ordinal equilibrium"};
function currentScreenType(){
  const s=screens[state.i];
  return typeof s==="string"?s:(s&&s.t?s.t:"");
}
function pageHelpText(){
  const s=screens[state.i],t=currentScreenType();
  if(t==="q" && s && s.h) return `<p><b>What this page is testing:</b> ${s.h}</p><p>Try translating the question into the main rule from this mission before looking at the answer choices.</p>`;
  const h=PAGE_HELP[t]||"Focus on the main question on this page. Say the idea out loud in ordinary words before using the economics term.";
  return `<p>${h}</p>`;
}
function showPageHelp(){
  const old=document.getElementById("pageHelpBox");if(old)old.remove();
  const d=document.createElement("div");d.id="pageHelpBox";d.className="helpBox";
  d.innerHTML=`<h3>Still confused? Here is this page in slower English.</h3>${pageHelpText()}<p><b>What to do next:</b> Go back to the numbers or choices on the page and identify the one comparison the page is asking you to make.</p>`;
  $("main").appendChild(d);tone("click");
}
function setupMissionNavigation(){
  const sel=$("pageJump");if(!sel)return;
  sel.innerHTML=screens.map((s,idx)=>{const t=typeof s==="string"?s:(s.t||"page");const label=PAGE_LABELS[t]||t.replace(/([A-Z])/g," $1");return `<option value="${idx}">${idx+1}. ${label}</option>`}).join("");
  sel.value=String(state.i);
  sel.onchange=()=>{state.i=+sel.value;save();render();window.scrollTo({top:0,behavior:"smooth"})};
}
function syncMissionNavigation(){const sel=$("pageJump");if(sel)sel.value=String(state.i)}


function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function el(id){return document.getElementById(id)}
function header(){syncMissionNavigation();
  el("xp").textContent=state.xp;el("streak").textContent=state.streak;el("snd").textContent=state.sound?"ON":"OFF";
  el("fill").style.width=((state.i+1)/screens.length*100)+"%";
  el("back").disabled=state.i===0;
  el("next").textContent=state.i===screens.length-1?"Done ✓":"Continue →";
}
function tone(kind){
  if(!state.sound)return;
  try{
    const C=new (window.AudioContext||window.webkitAudioContext)(),o=C.createOscillator(),g=C.createGain();
    const map={click:[430,520,.05],good:[620,880,.10],bad:[220,170,.12],whoosh:[260,650,.18],win:[523,1046,.24]};
    const m=map[kind]||map.click;o.connect(g);g.connect(C.destination);o.frequency.setValueAtTime(m[0],C.currentTime);o.frequency.exponentialRampToValueAtTime(m[1],C.currentTime+m[2]);
    g.gain.setValueAtTime(.035,C.currentTime);g.gain.exponentialRampToValueAtTime(.0001,C.currentTime+m[2]);o.start();o.stop(C.currentTime+m[2]);
  }catch(e){}
}
function burst(){
  const c=el("confetti");c.innerHTML="";c.classList.remove("hidden");
  const colors=["#5b5bd6","#ffd166","#34d399","#60a5fa","#f472b6"];
  for(let i=0;i<34;i++){const d=document.createElement("div");d.className="piece";d.style.left=Math.random()*100+"vw";d.style.top=(-20-Math.random()*30)+"px";d.style.background=colors[Math.floor(Math.random()*colors.length)];d.style.animationDelay=Math.random()*.15+"s";c.appendChild(d)}
  setTimeout(()=>c.classList.add("hidden"),1350);
}
function reward(n=45){state.xp+=n;state.streak++;tone("good");burst();save();header()}
function miss(){state.streak=0;tone("bad");save();header()}
function labels(extra="D = Demand curve"){return `<div class="graphLabels"><span class="tag">Y-axis = Price</span><span class="tag">X-axis = Quantity Demanded</span><span class="tag">${extra}</span></div>`}

function render(){
  header();
  const s=screens[state.i],m=el("main");

  if(s.t==="intro"){
    m.innerHTML=`<div class="eyebrow">Mission 1 • Demand</div>
    <div class="grid2">
      <div><h1>You run a dosa stall.</h1><p class="big">Your first job: figure out what customers do when the price changes.</p>
      <div class="panel soft"><b>Rule:</b> don't memorize the answer. You'll see the same idea later with Uber, airlines, coffee and umbrellas.</div></div>
      <div class="scene"><div class="bigIcon float">🥞</div><div class="sceneTitle">₹60 per dosa</div><p>120 customers are willing to buy.</p></div>
    </div>`;
  }

  else if(s.t==="sim"){
    m.innerHTML=`<div class="eyebrow">Try it</div><h2>Change the price.</h2>
    <p>Only the price changes. Watch quantity demanded.</p>
    <div class="grid2">
      <div class="panel">
        <input id="priceRange" class="range" type="range" min="20" max="120" step="10" value="60">
        <div class="grid2" style="margin-top:14px">
          <div class="term"><small>PRICE</small><b id="pRead" style="font-size:34px">₹60</b></div>
          <div class="term"><small>QUANTITY DEMANDED</small><b id="qRead" style="font-size:34px">120</b></div>
        </div>
      </div>
      <div class="sim">
        <small>CUSTOMERS WILL BUY</small>
        <div class="qty" id="qtyBig">120</div>
        <div style="font-size:28px" id="faces">🙂🙂🙂🙂🙂</div>
        <small id="cap">at ₹60 each</small>
      </div>
    </div>
    <div class="feedback show hint"><b>Notice the direction:</b> price ↑ → quantity demanded ↓. Price ↓ → quantity demanded ↑.</div>`;
    setTimeout(()=>{
      const r=el("priceRange");
      r.addEventListener("input",()=>{
        const p=+r.value,q=Math.max(20,Math.round(192-p*1.2));
        el("pRead").textContent="₹"+p;el("qRead").textContent=q;el("qtyBig").textContent=q;el("cap").textContent=`at ₹${p} each`;
        el("faces").textContent="🙂".repeat(Math.max(1,Math.min(8,Math.round(q/22))));tone("click");
      });
    },0);
  }

  else if(s.t==="q"){
    m.innerHTML=`<div class="eyebrow">Quick check</div><h2>${s.q}</h2>
    <div class="answers">${s.a.map((x,i)=>`<button class="ans" data-i="${i}">${String.fromCharCode(65+i)}. ${x}</button>`).join("")}</div>
    <div id="fb" class="feedback"></div>`;
    setTimeout(()=>bindMCQ(s),0);
  }

  else if(s.t==="law"){
    m.innerHTML=`<div class="eyebrow">Now name what you discovered</div><h1>Law of Demand</h1>
    <p class="big"><b>Other things remaining the same</b>, when price rises, quantity demanded tends to fall; when price falls, quantity demanded tends to rise.</p>
    <div class="board"><small>ISC LANGUAGE</small><p><b>Ceteris paribus</b>, there is an inverse relationship between the price of a commodity and its quantity demanded.</p></div>
    <div class="panel warnbg"><b>Don't by-heart blindly:</b> “inverse” just means the two usually move in opposite directions.</div>`;
  }

  else if(s.t==="graph"){
    m.innerHTML=`<div class="eyebrow">See the same idea as a graph</div><h2>This curve is just the price experiment drawn.</h2>
    <div class="chartwrap"><canvas id="demandGraph" width="800" height="330"></canvas></div>${labels()}
    <div class="callout"><b>Point A:</b> ₹100 → 60 units demanded.<br><b>Point B:</b> ₹60 → 120 units demanded.<br>The line joins many price–quantity combinations.</div>`;
    setTimeout(drawDemandGraph,0);
  }

  else if(s.t==="movement"){
    m.innerHTML=`<div class="eyebrow">Concept • Movement</div><h2>The price changed. The curve did not.</h2>
    <div class="chartwrap"><canvas id="moveGraph" width="800" height="330"></canvas></div>${labels()}
    <div class="grid2" style="margin-top:12px">
      <div class="panel"><b>A: ₹100 → 60 units</b></div>
      <div class="panel goodbg"><b>B: ₹60 → 120 units</b></div>
    </div>
    <div class="feedback show hint"><b>Own price changed → movement along the same demand curve.</b></div>`;
    setTimeout(drawMovement,0);
  }

  else if(s.t==="shift"){
    m.innerHTML=`<div class="eyebrow">Concept • Shift</div><h2>Now keep price the same.</h2>
    <div class="grid2">
      <div class="scene"><div class="bigIcon">📱⭐</div><div class="sceneTitle">A famous reviewer posts</div><p>“Best dosa in Chennai.”</p></div>
      <div class="panel"><p>At the <b>same prices</b>, more people now want the dosa.</p><p>That means <b>demand itself increased.</b></p></div>
    </div>
    <div class="chartwrap" style="margin-top:14px"><canvas id="shiftGraph" width="800" height="330"></canvas></div>${labels("D₁ → D₂ = increase in demand")}
    <div class="actions"><button class="btn softBtn" id="shiftBtn">Show the rightward shift →</button></div>
    <div id="shiftFb" class="feedback show hint"><b>Something other than the dosa's own price changed.</b> That's when you think SHIFT.</div>`;
    setTimeout(()=>{
      drawShift(false);
      el("shiftBtn").addEventListener("click",()=>{
        drawShift(true);tone("whoosh");el("shiftFb").className="feedback show good";el("shiftFb").innerHTML="<b>D₁ moved right to D₂.</b> More is demanded at the same prices.";
        if(!state.answered.shiftAnim){state.answered.shiftAnim=1;reward(50)}
      });
    },0);
  }

  else if(s.t==="uber"){
    m.innerHTML=`<div class="eyebrow">Same concept • Uber-style pricing</div><h2>11:05 PM. Concert ends.</h2>
    <div class="scene">
      <div class="bigIcon">🎤➡️🚕🚕🚕</div><div class="event">Thousands request rides at once</div>
      <p>At many possible fares, more riders want trips than a few minutes earlier.</p>
    </div>
    <div class="chartwrap" style="margin-top:14px"><canvas id="uberGraph" width="800" height="330"></canvas></div>${labels("Demand shifts D₁ → D₂")}
    <div class="callout"><b>Cause:</b> the concert ending increased demand.<br><b>Then:</b> with a limited number of nearby drivers, the market can move toward a higher price.</div>
    <div class="panel warnbg" style="margin-top:12px"><b>Do not reverse the story:</b> the higher fare did not create the original rightward demand shift.</div>`;
    setTimeout(drawUber,0);
  }

  else if(s.t==="airline"){
    m.innerHTML=`<div class="eyebrow">Same concept • Airline fares</div><h2>Holiday week. Same route. More travelers.</h2>
    <div class="grid2">
      <div class="scene"><div class="bigIcon">✈️🎉</div><div class="sceneTitle">Demand rises</div><p>More people want those seats.</p></div>
      <div class="panel"><div class="bigIcon">🪑🪑🪑</div><p><b>But seats are limited.</b><br>An airline can't instantly add unlimited seats to that exact flight.</p></div>
    </div>
    <div class="chartwrap" style="margin-top:14px"><canvas id="airGraph" width="800" height="330"></canvas></div>${labels("D₁ → D₂; S = seat supply")}
    <div class="callout">Holiday/event → demand shifts right → with limited short-run capacity, the market-clearing price tends to be higher.</div>`;
    setTimeout(drawAirline,0);
  }

  else if(s.t==="determinants"){
    m.innerHTML=`<div class="eyebrow">What can shift demand?</div><h2>Different cause. Same graph idea.</h2>
    <div class="grid2">
      <div class="panel"><div class="bigIcon">💰</div><b>Income</b><p>For a normal good, higher income can shift demand right.</p></div>
      <div class="panel"><div class="bigIcon">😍</div><b>Tastes</b><p>A product becomes fashionable → demand can shift right.</p></div>
      <div class="panel"><div class="bigIcon">☕⬆️ 🫖</div><b>Related goods</b><p>Coffee gets expensive; tea is a substitute → tea demand can rise.</p></div>
      <div class="panel"><div class="bigIcon">🔮📱</div><b>Expectations</b><p>People expect phones to be cheaper next month → current demand can fall.</p></div>
    </div>
    <div class="feedback show hint"><b>Shortcut:</b> own price = movement. Another determinant = shift.</div>`;
  }

  else if(s.t==="rapid"){renderRapid()}

  else if(s.t==="board"){
    m.innerHTML=`<div class="eyebrow">Board answer coach</div><h2>Write it one sentence at a time.</h2>
    <p><b>Question:</b> Distinguish between movement along a demand curve and a shift of the demand curve.</p>
    <div id="boardCoach"></div><div id="boardFb" class="feedback"></div>`;
    setTimeout(initBoardCoach,0);
  }

  else if(s.t==="boss"){renderBoss()}

  else if(s.t==="finish"){
    m.innerHTML=`<div class="eyebrow">Mission complete</div><h1>Demand Tamer 🏆</h1>
    <p class="big">You saw the same idea as dosas, graphs, Uber rides, airline seats, tea, phones and umbrellas.</p>
    <div class="grid3">
      <div class="panel goodbg"><b>Own price changes</b><p>Movement along the same curve.</p></div>
      <div class="panel soft"><b>Something else changes</b><p>The demand curve shifts.</p></div>
      <div class="panel warnbg"><b>Board language</b><p>Now you know what the memorized words actually mean.</p></div>
    </div>
    <div style="margin-top:15px"><span class="badge">Law of Demand</span><span class="badge">Graph reading</span><span class="badge">Movement</span><span class="badge">Shifts</span><span class="badge">Real-world application</span></div>
    <div class="feedback show good"><b>Total XP:</b> ${state.xp}</div>`;
  }
  save();
}

function bindMCQ(s){
  document.querySelectorAll(".ans").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(state.answered[state.i])return;
      const ok=Number(btn.dataset.i)===s.c,fb=el("fb");
      if(ok){
        btn.classList.add("correct");fb.className="feedback show good";fb.textContent="✓ Correct. Now keep the rule and forget the example.";
        state.answered[state.i]=1;reward(45);
      }else{
        btn.classList.add("wrong");fb.className="feedback show bad";fb.textContent="Not quite. "+s.h;miss();setTimeout(()=>btn.classList.remove("wrong"),650);
      }
    });
  });
}

function axes(ctx,w,h,xlab="QUANTITY DEMANDED",ylab="PRICE"){
  const p=58;ctx.strokeStyle="#98a2b3";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p,18);ctx.lineTo(p,h-p);ctx.lineTo(w-18,h-p);ctx.stroke();
  ctx.fillStyle="#475467";ctx.font="bold 14px system-ui";ctx.fillText(ylab,8,24);ctx.fillText(xlab,w-190,h-16);return p;
}
function curve(ctx,pts,color,label){
  ctx.strokeStyle=color;ctx.lineWidth=4;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
  const last=pts[pts.length-1];ctx.fillStyle=color;ctx.font="bold 15px system-ui";ctx.fillText(label,last[0]+8,last[1]);
}
function dot(ctx,x,y,label){
  ctx.fillStyle="#111827";ctx.beginPath();ctx.arc(x,y,7,0,Math.PI*2);ctx.fill();ctx.font="bold 14px system-ui";ctx.fillText(label,x+10,y-8);
}
function drawDemandGraph(){
  const c=el("demandGraph"),ctx=c.getContext("2d"),w=c.width,h=c.height,p=axes(ctx,w,h);
  const pts=[[180,70],[290,115],[405,165],[545,222]];curve(ctx,pts,"#5b5bd6","D");
  dot(ctx,290,115,"A");dot(ctx,405,165,"B");
  ctx.font="12px system-ui";ctx.fillStyle="#111827";ctx.fillText("₹100",14,120);ctx.fillText("₹60",20,170);ctx.fillText("60",278,h-p+21);ctx.fillText("120",395,h-p+21);
}
function drawMovement(){
  const c=el("moveGraph"),ctx=c.getContext("2d"),w=c.width,h=c.height;axes(ctx,w,h);
  const pts=[[180,70],[290,115],[405,165],[545,222]];curve(ctx,pts,"#5b5bd6","D");
  dot(ctx,290,115,"A");dot(ctx,405,165,"B");
  ctx.strokeStyle="#ef8b3d";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(306,122);ctx.lineTo(388,157);ctx.stroke();
  ctx.fillStyle="#ef8b3d";ctx.font="bold 13px system-ui";ctx.fillText("movement ↓ along D",320,145);
}
function drawShift(showSecond){
  const c=el("shiftGraph"),ctx=c.getContext("2d"),w=c.width,h=c.height;ctx.clearRect(0,0,w,h);axes(ctx,w,h);
  curve(ctx,[[165,72],[275,115],[385,165],[500,220]],"#888","D₁");
  if(showSecond){curve(ctx,[[300,72],[410,115],[520,165],[635,220]],"#5b5bd6","D₂");ctx.fillStyle="#111827";ctx.font="bold 13px system-ui";ctx.fillText("MORE DEMANDED AT THE SAME PRICE →",315,44);}
}
function drawUber(){
  const c=el("uberGraph"),ctx=c.getContext("2d"),w=c.width,h=c.height;axes(ctx,w,h,"RIDES DEMANDED","FARE");
  curve(ctx,[[165,72],[275,115],[385,165],[500,220]],"#888","D₁");curve(ctx,[[300,72],[410,115],[520,165],[635,220]],"#5b5bd6","D₂");
  ctx.strokeStyle="#16a085";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(300,235);ctx.lineTo(610,65);ctx.stroke();ctx.fillStyle="#16a085";ctx.font="bold 15px system-ui";ctx.fillText("S",615,65);
  ctx.fillStyle="#111827";ctx.font="bold 13px system-ui";ctx.fillText("concert ends → demand shifts right",300,42);
}
function drawAirline(){
  const c=el("airGraph"),ctx=c.getContext("2d"),w=c.width,h=c.height;axes(ctx,w,h,"SEATS DEMANDED","TICKET PRICE");
  curve(ctx,[[165,72],[275,115],[385,165],[500,220]],"#888","D₁");curve(ctx,[[300,72],[410,115],[520,165],[635,220]],"#5b5bd6","D₂");
  ctx.strokeStyle="#16a085";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(505,238);ctx.lineTo(528,60);ctx.stroke();ctx.fillStyle="#16a085";ctx.font="bold 15px system-ui";ctx.fillText("S",535,66);
  ctx.fillStyle="#111827";ctx.font="bold 13px system-ui";ctx.fillText("holiday demand →",330,42);
}
function renderRapid(){
  const cases=[
    {icon:"🌧️☔",q:"Heavy rain begins. Umbrella demand?",a:["Shift right","Shift left","Movement only"],c:0,why:"Weather changed willingness to buy at many prices."},
    {icon:"👟💸",q:"Sneaker price falls. Income and tastes stay unchanged.",a:["Shift right","Movement along the curve","Shift left"],c:1,why:"The sneaker's own price changed."},
    {icon:"☕⬆️🫖",q:"Coffee gets expensive. Tea is a substitute.",a:["Tea demand shifts right","Tea demand shifts left","Movement along tea's curve"],c:0,why:"Some buyers switch from coffee to tea."},
    {icon:"📱🔮",q:"People expect phones to be much cheaper next month.",a:["Current demand shifts right","Current demand shifts left","Only movement"],c:1,why:"Expectations changed current demand."},
    {icon:"🎮🔥",q:"A must-play exclusive launches for a console.",a:["Console demand may shift right","Console demand must shift left","Console's own price moved"],c:0,why:"Tastes/preferences can raise demand."}
  ];
  let idx=0,score=0;
  el("main").innerHTML=`<div class="eyebrow">Speed round</div><h2>Five disguises. One set of rules.</h2><div id="rapidBox"></div><div id="rapidFb" class="feedback"></div>`;
  function show(){
    const x=cases[idx];
    el("rapidBox").innerHTML=`<div class="scene"><div class="bigIcon">${x.icon}</div><p class="big">${x.q}</p></div><div class="answers">${x.a.map((a,i)=>`<button class="ans" data-r="${i}">${a}</button>`).join("")}</div>`;
    document.querySelectorAll("[data-r]").forEach(b=>b.addEventListener("click",()=>{
      if(Number(b.dataset.r)===x.c){score++;tone("good");el("rapidFb").className="feedback show good";el("rapidFb").textContent="✓ "+x.why}
      else{tone("bad");el("rapidFb").className="feedback show bad";el("rapidFb").textContent="No. "+x.why}
      idx++;
      if(idx<cases.length){setTimeout(()=>{el("rapidFb").className="feedback";show()},420)}
      else{
        el("rapidBox").innerHTML=`<div class="panel ${score>=4?"goodbg":"warnbg"}"><h2>${score}/5</h2><p>${score>=4?"Nice. You recognized the concept even when the product changed.":"Run this round again later. The goal is recognition, not memorizing examples."}</p></div>`;
        if(!state.answered.rapid){state.answered.rapid=1;state.xp+=score*25;if(score>=4)burst();save();header()}
      }
    }));
  }
  show();
}
function initBoardCoach(){
  const steps=[
    {label:"Sentence 1 • Movement",q:"What causes movement along the demand curve?",a:[
      ["Movement along a demand curve is caused by a change in the commodity's own price.",true],
      ["Movement is caused by a change in income.",false],
      ["Movement means the whole demand curve changes position.",false]
    ]},
    {label:"Sentence 2 • Shift",q:"What causes a shift of the demand curve?",a:[
      ["A shift is caused by a change in determinants other than the commodity's own price.",true],
      ["A shift happens whenever the commodity's own price changes.",false],
      ["A shift means quantity demanded never changes.",false]
    ]},
    {label:"Sentence 3 • Graph difference",q:"How do you finish the distinction?",a:[
      ["Movement stays on the same demand curve, while a shift moves the entire curve to a new position.",true],
      ["Both changes always stay on the same curve.",false],
      ["Movement and shift are two names for the same thing.",false]
    ]}
  ];
  let i=0,answer=[];
  function show(){
    if(i>=steps.length){
      el("boardCoach").innerHTML=`<div class="answerPreview"><h3>Your board answer</h3>${answer.map(x=>`<div class="answerLine">${x}</div>`).join("")}</div>`;
      const f=el("boardFb");f.className="feedback show good";f.innerHTML="<b>Board-ready.</b> You built the distinction in the order an examiner can follow: cause of movement → cause of shift → graphical difference.";
      if(!state.answered.board){state.answered.board=1;reward(100)}
      return;
    }
    const s=steps[i],opts=s.a.sort(()=>Math.random()-.5);
    el("boardCoach").innerHTML=`<div class="panel soft"><div class="stepLabel">${s.label}</div><p class="big">${s.q}</p></div>
      <div class="answers">${opts.map((x,j)=>`<button class="ans" data-j="${j}">${x[0]}</button>`).join("")}</div>
      <div class="answerPreview"><h3>Answer so far</h3>${answer.length?answer.map(x=>`<div class="answerLine">${x}</div>`).join(""):"<p class='tiny'>Your correct sentences will appear here.</p>"}</div>`;
    document.querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>{
      const pick=opts[+b.dataset.j];
      if(pick[1]){answer.push(pick[0]);i++;tone("good");setTimeout(show,400)}
      else{const f=el("boardFb");f.className="feedback show bad";f.textContent="Not that one. Ask: own price or another determinant?";miss()}
    });
  }
  show();
}function renderBoss(){
  const qs=[
    ["The fare for the same ride falls and more rides are demanded.",["Movement","Shift"],0],
    ["A concert ends and more riders want trips at each possible fare.",["Movement","Demand shifts right"],1],
    ["Tea's own price falls and more tea is bought.",["Demand shifts right","Movement"],1],
    ["Coffee price rises. Coffee and tea are substitutes. Tea demand:",["Shifts right","Shifts left"],0],
    ["Consumers expect laptops to be cheaper next month. Current laptop demand:",["Shifts right","Shifts left"],1],
    ["Holiday travel increases while flight capacity is limited.",["Demand can shift right and equilibrium fare can rise","Higher fare itself must be the original cause of the shift"],0]
  ];
  let idx=0,score=0;
  el("main").innerHTML=`<div class="eyebrow">Boss battle</div><h1>No repeated wording.</h1><p>Six questions. Same concepts. New situations.</p><div id="bossBox"></div><div id="bossFb" class="feedback"></div>`;
  function show(){
    const q=qs[idx];
    el("bossBox").innerHTML=`<h2>${idx+1}/6 — ${q[0]}</h2><div class="answers">${q[1].map((a,i)=>`<button class="ans" data-b="${i}">${a}</button>`).join("")}</div>`;
    document.querySelectorAll("[data-b]").forEach(b=>b.addEventListener("click",()=>{
      if(Number(b.dataset.b)===q[2]){score++;tone("good");el("bossFb").className="feedback show good";el("bossFb").textContent="✓ Correct."}
      else{tone("bad");el("bossFb").className="feedback show bad";el("bossFb").textContent="No — identify what changed first."}
      idx++;
      if(idx<qs.length){setTimeout(()=>{el("bossFb").className="feedback";show()},380)}
      else{
        el("bossBox").innerHTML=`<div class="panel ${score>=5?"goodbg":"warnbg"}"><h1>${score}/6</h1><p>${score>=5?"Demand Tamer unlocked 🏆":"Close. Repeat the mixed examples until you can do them without relying on the nouns."}</p></div>`;
        if(!state.answered.boss){state.answered.boss=1;state.boss=score;state.xp+=score*30;if(score>=5){burst();tone("win")}save();header()}
      }
    }));
  }
  show();
}

el("next").addEventListener("click",()=>{if(state.i<screens.length-1){state.i++;render();window.scrollTo({top:0,behavior:"smooth"})}else{window.location.href="mission.html?mission=demand-2"}});
el("back").addEventListener("click",()=>{if(state.i>0){state.i--;render()}else{window.location.href="demand.html"}});
el("hint").addEventListener("click",showPageHelp);
el("sound").addEventListener("click",()=>{state.sound=!state.sound;save();header()});
setupMissionNavigation();render();
})();
