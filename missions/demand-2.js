(function(){
const KEY='econ_demand_m2_games_v1';
let state=Object.assign({i:0,xp:0,streak:0,sound:true,rewarded:{}},JSON.parse(localStorage.getItem(KEY)||'{}'));
const screens=['intro','define','isDemand','buildDef','individual','whoGame','market','marketBuilder','scheduleExplain','plotIndividual','plotMarket','typesExplain','typeDefinitions','typeMatch','typeSort','picExplain','picSort','function','determinants','predict','machine','fix','board','boss','finish'];
const PAGE_HELP={"intro": "This mission answers four questions: whose demand is it, when is it measured, why is it demanded, and which variable is changing. The vocabulary looks large, but the categories are structured.", "define": "Demand is not merely wanting something. For economics, the consumer must want it, be able to pay for it, and be willing to buy it at a given price and time.", "isDemand": "For each case ask: does the person merely desire the item, or are willingness and purchasing power also present at a stated price/time?", "buildDef": "A strong definition needs all the pieces: desire + ability to pay + willingness to pay + given price + given period of time.", "individual": "Individual demand means the quantity ONE consumer is willing and able to buy at different prices.", "market": "Market demand means the TOTAL quantity all consumers in the market demand at each price.", "marketBuilder": "Use one common price. Add each consumer's quantity demanded horizontally. Do not add prices.", "scheduleExplain": "A demand schedule is simply the table form of the relationship: each price is paired with the quantity demanded at that price.", "plotIndividual": "Read each table row as coordinates. Quantity goes on X; price goes on Y. Plot the points and connect them.", "plotMarket": "First horizontally sum quantities at each common price; then plot those market totals against price.", "typesExplain": "Group the terms instead of memorizing a pile: WHO (individual/market), WHEN (ex-ante/ex-post), WHY/HOW (joint/derived/composite), WHICH VARIABLE (price/income/cross).", "function": "A demand function is a compact statement that quantity demanded depends on several determinants. It does not mean all determinants change at once.", "determinants": "Ask what changed in the buyer's situation. If it is not own price, it is a determinant that can shift demand.", "board": "The answer coach is teaching a derivation: same price → add individual quantities → repeat at each price → plot total quantity against price.", "boss": "Translate every unfamiliar example into structure before choosing a term."};
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

const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function tone(k){if(!state.sound)return;try{const C=new(window.AudioContext||window.webkitAudioContext)(),o=C.createOscillator(),g=C.createGain(),m={good:[620,880,.1],bad:[220,170,.12],click:[430,520,.05]}[k]||[430,520,.05];o.connect(g);g.connect(C.destination);o.frequency.setValueAtTime(m[0],C.currentTime);o.frequency.exponentialRampToValueAtTime(m[1],C.currentTime+m[2]);g.gain.setValueAtTime(.035,C.currentTime);g.gain.exponentialRampToValueAtTime(.0001,C.currentTime+m[2]);o.start();o.stop(C.currentTime+m[2])}catch(e){}}
function burst(){const c=$('confetti');c.innerHTML='';c.classList.remove('hidden');['#5b5bd6','#ffd166','#34d399','#60a5fa','#f472b6'].forEach((col,j)=>{for(let i=0;i<6;i++){const d=document.createElement('div');d.className='piece';d.style.left=Math.random()*100+'vw';d.style.top=(-20-Math.random()*25)+'px';d.style.background=col;c.appendChild(d)}});setTimeout(()=>c.classList.add('hidden'),1300)}
function reward(k,n=50){if(!state.rewarded[k]){state.rewarded[k]=1;state.xp+=n;burst()}state.streak++;tone('good');save();header()}
function miss(){state.streak=0;tone('bad');save();header()}
function header(){syncMissionNavigation();$('xp').textContent=state.xp;$('streak').textContent=state.streak;$('snd').textContent=state.sound?'ON':'OFF';$('fill').style.width=((state.i+1)/screens.length*100)+'%';$('back').disabled=state.i===0;$('next').textContent=state.i===screens.length-1?'Back to Demand map →':'Continue →'}
function fb(ok,title,why){const f=$('fb');f.className='feedback show '+(ok?'good':'bad');f.innerHTML='<b>'+(ok?'✓ ':'✗ ')+title+'</b><br>'+why}
function def(term,plain,formal,icon){return `<div class="definition"><div class="term">${icon} ${term}</div><div>${plain}</div><div class="formal"><b>ISC wording:</b> ${formal}</div></div>`}
function render(){header();const t=screens[state.i],m=$('main');
if(t==='intro')m.innerHTML=`<div class="eyebrow">Mission 2 • Market Builder</div><h1>Build demand instead of memorizing it.</h1><p class="big">You’ll classify, match, add buyers, plot curves, predict changes and repair bad economics.</p><div class="scene"><div class="bigIcon">👤 ➕ 👤 ➕ 👤 = 📈</div><p>By the end, you should be able to build a market demand curve yourself.</p></div>`;
else if(t==='define')m.innerHTML=`<div class="eyebrow">Start with meaning</div><h2>What is demand?</h2>${def('Demand','A want becomes economic demand only when you are <b>willing and able</b> to buy a quantity at a given price during a given period.','The quantity of a commodity a consumer is willing and able to purchase at various prices during a given period.','🛒')}<div class="grid2"><div class="panel goodbg"><b>₹50 sandwich + money to buy it</b><p>Demand.</p></div><div class="panel warnbg"><b>₹2 crore Ferrari + ₹300</b><p>Desire, not effective demand.</p></div></div>`;
else if(t==='isDemand')isDemand();
else if(t==='buildDef')buildDef();
else if(t==='individual')m.innerHTML=`<div class="eyebrow">One buyer</div><h2>Individual demand</h2>${def('Individual demand','Demand of <b>one consumer</b> at different prices.','The quantity of a commodity demanded by an individual consumer at various prices during a given period.','👤')}<div class="panel soft"><b>Example:</b><p>At ₹150 Riya buys 2 coffees; at ₹100 she buys 4.</p></div>`;
else if(t==='whoGame')whoGame();
else if(t==='market')m.innerHTML=`<div class="eyebrow">Many buyers</div><h2>Market demand</h2>${def('Market demand','Add the quantities demanded by <b>all consumers at the same price</b>.','The total quantity demanded by all consumers in a market at various prices during a given period.','👥')}<div class="feedback show hint"><b>Horizontal summation:</b> add quantities across consumers at each price.</div>`;
else if(t==='marketBuilder')marketBuilder();
else if(t==='scheduleExplain')scheduleExplain();
else if(t==='plotIndividual')plotIndividual();
else if(t==='plotMarket')plotMarket();
else if(t==='typesExplain')m.innerHTML=`<div class="eyebrow">Types of demand</div><h2>Organize the labels by the question they answer.</h2><div class="grid3"><div class="panel"><b>WHEN?</b><p><b>Ex-ante:</b> planned demand.<br><b>Ex-post:</b> actual realized demand.</p></div><div class="panel"><b>WHY / HOW?</b><p><b>Joint:</b> goods used together.<br><b>Derived:</b> input wanted because final output is wanted.<br><b>Composite:</b> one good, many uses.</p></div><div class="panel"><b>WHO?</b><p><b>Individual:</b> one buyer.<br><b>Market:</b> all buyers together.</p></div></div><div class="feedback show hint"><b>Structure first:</b> these are not ten random words. They classify demand by who, when, or why it exists.</div>`;
else if(t==='typeDefinitions')typeDefinitions();
else if(t==='typeMatch')typeMatch();
else if(t==='typeSort')typeSort();
else if(t==='picExplain')m.innerHTML=`<div class="eyebrow">Three relationships</div><h2>What variable are we studying?</h2><div class="grid3"><div class="panel">${def('Price demand','Demand related to the good’s <b>own price</b>.','Relationship between own price and quantity demanded.','🏷️')}</div><div class="panel">${def('Income demand','Demand related to <b>consumer income</b>.','Relationship between income and quantity demanded.','💰')}</div><div class="panel">${def('Cross demand','Demand for one good related to the <b>price of another good</b>.','Relationship between demand for one commodity and the price of another.','☕🫖')}</div></div>`;
else if(t==='picSort')picSort();
else if(t==='function')m.innerHTML=`<div class="eyebrow">Demand function</div><h2>A formula that is really a sentence.</h2>${def('Demand function','Quantity demanded can depend on several things at once.','The functional relationship between quantity demanded and its determinants.','⚙️')}<div class="definition"><div class="term">Qd = f(Px, Y, Pr, T, E, N...)</div><div>Px own price • Y income • Pr related-goods prices • T tastes • E expectations • N number of buyers</div></div><div class="feedback show hint">It means: <b>these variables can influence demand.</b> The symbols are labels, not a calculation.</div>`;
else if(t==='determinants')determinants();
else if(t==='predict')predictGame();
else if(t==='fix')fixGame();
else if(t==='board')boardGame();
else if(t==='boss')boss();
else m.innerHTML=`<div class="eyebrow">Mission complete</div><h1>Market Builder 🏗️</h1><p class="big">You defined demand, built individual and market demand, plotted curves, classified types and fixed bad reasoning.</p><div class="feedback show good">Next: why does the demand curve slope downward?</div>`;save()}

function scheduleExplain(){
 $('main').innerHTML=`<div class="eyebrow">From people to a table</div><h2>What is a demand schedule?</h2>${def('Demand schedule','A table showing how much is demanded at different prices.','A tabular statement showing different quantities of a commodity demanded at different prices during a given period.','📋')}<div class="grid2"><div class="panel"><b>Individual demand schedule</b><p>One consumer's price–quantity combinations.</p><table class="table"><tr><th>Price</th><th>Riya Qd</th></tr><tr><td>₹200</td><td>1</td></tr><tr><td>₹150</td><td>2</td></tr><tr><td>₹100</td><td>4</td></tr><tr><td>₹50</td><td>7</td></tr></table></div><div class="panel goodbg"><b>Market demand schedule</b><p>All consumers' quantities added at each price.</p><table class="table"><tr><th>Price</th><th>Market Qd</th></tr><tr><td>₹200</td><td>2</td></tr><tr><td>₹150</td><td>6</td></tr><tr><td>₹100</td><td>11</td></tr><tr><td>₹50</td><td>19</td></tr></table></div></div><div class="feedback show hint"><b>Next:</b> you will turn these same tables into graphs yourself.</div>`;
}
function typeDefinitions(){
 $('main').innerHTML=`<div class="eyebrow">Define before you match</div><h2>Know the rule behind each label.</h2><div class="grid2">
 <div class="panel">${def('Ex-ante demand','Demand that is planned or expected <b>before</b> the period occurs.','Expected or planned demand for a future period.','🔮')}</div>
 <div class="panel">${def('Ex-post demand','Demand that was <b>actually realized</b> after the period.','Actual demand realized during a past period.','🧾')}</div>
 <div class="panel">${def('Joint demand','Demand for goods that are generally <b>used together</b>.','Demand for complementary goods used jointly.','🚗⛽')}</div>
 <div class="panel">${def('Derived demand','Demand for an input because it is needed to produce another good or service.','Demand for a factor or input arising from demand for the final product.','🏗️')}</div>
 <div class="panel">${def('Composite demand','Demand for the <b>same commodity for several uses</b>.','Demand for a commodity having multiple uses.','⚡')}</div>
 </div><div class="feedback show hint">Examples are clues. The <b>definition is the rule</b> that should work even when the example changes.</div>`;
}
function determinants(){
 $('main').innerHTML=`<div class="eyebrow">What can influence demand?</div><h2>The demand function unpacked.</h2><div class="grid3">
 <div class="panel"><b>🏷️ Own price</b><p>Changes quantity demanded along the same curve.</p></div>
 <div class="panel"><b>💰 Income</b><p>Can increase or decrease demand depending on the type of good.</p></div>
 <div class="panel"><b>☕🫖 Related goods</b><p>Prices of substitutes and complements can shift demand.</p></div>
 <div class="panel"><b>😍 Tastes</b><p>Fashion, advertising and preferences can change willingness to buy.</p></div>
 <div class="panel"><b>🔮 Expectations</b><p>Expected future prices or income can affect current demand.</p></div>
 <div class="panel"><b>👥 Number of buyers</b><p>More consumers can raise market demand.</p></div>
 <div class="panel"><b>💳 Consumer credit</b><p>Easier borrowing can increase purchasing ability for some goods.</p></div>
 <div class="panel"><b>👀 Demonstration effect</b><p>People may imitate consumption they observe in others.</p></div>
 <div class="panel"><b>🌦️ Climate / season</b><p>Weather changes demand for goods such as umbrellas or coolers.</p></div>
 <div class="panel"><b>🏛️ Government policy</b><p>Taxes, restrictions or incentives can influence demand.</p></div>
 <div class="panel"><b>📊 Income distribution</b><p>Who receives income can affect the pattern of market demand.</p></div>
 <div class="panel"><b>🧑‍🤝‍🧑 Population composition</b><p>Age and demographic structure can change what a market wants.</p></div>
 </div><div class="feedback show hint">You do not need to treat these as disconnected bullets. They are all things that can change consumers' willingness or ability to buy.</div>`;
}
function machine(){
 $('main').innerHTML=`<div class="eyebrow">Interactive • Demand Machine</div><h2>Now manipulate the determinants.</h2><div class="grid2"><div class="panel"><label><b>Burger price</b> <span id="bp">₹200</span></label><input id="burger" class="range" type="range" min="100" max="300" step="25" value="200"><label><b>Monthly fun-money</b> <span id="inc">₹5,000</span></label><input id="income" class="range" type="range" min="3000" max="8000" step="500" value="5000"><label><b>Pizza price (substitute)</b> <span id="pp">₹250</span></label><input id="pizza" class="range" type="range" min="150" max="500" step="25" value="250"></div><div class="scene"><small>ILLUSTRATIVE BURGERS DEMANDED / MONTH</small><div class="score" id="qd">4</div><p id="story">Move one slider at a time and identify which determinant you changed.</p></div></div><div class="feedback show hint">The exact quantities are only illustrative. Learn the <b>direction and cause</b>, not the numbers.</div>`;
 const b=$('burger'),i=$('income'),p=$('pizza');
 function update(){const bv=+b.value,iv=+i.value,pv=+p.value;let q=4+(200-bv)/50+(iv-5000)/1500+(pv-250)/125;q=Math.max(0,Math.round(q));$('bp').textContent='₹'+bv;$('inc').textContent='₹'+iv.toLocaleString();$('pp').textContent='₹'+pv;$('qd').textContent=q}
 [b,i,p].forEach(x=>x.addEventListener('input',()=>{update();tone('click')}));update();
}

function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}
function sequenceGame(title,qs,key){
 let i=0,score=0;
 $('main').innerHTML=`<div class="eyebrow">Game</div><h2>${title}</h2><div id="g"></div><div id="fb" class="feedback"></div>`;
 function show(){
   const q=qs[i];
   const choices=shuffle(q.a.map((text,j)=>({text,correct:j===q.c})));
   $('g').innerHTML=`<div class="scene"><p class="big">${q.q}</p></div><div class="answers">${choices.map((x,j)=>`<button class="ans" data-x="${j}">${x.text}</button>`).join('')}</div>`;
   document.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{
     const ok=choices[+b.dataset.x].correct;
     if(ok)score++;
     fb(ok,ok?'Correct':'Not quite',q.why);
     if(!ok)miss();else tone('good');
     i++;
     if(i<qs.length)setTimeout(()=>{$('fb').className='feedback';show()},650);
     else setTimeout(()=>{
       $('g').innerHTML=`<div class="panel ${score>=Math.ceil(qs.length*.75)?'goodbg':'warnbg'}"><div class="score">${score}/${qs.length}</div><p>${score>=Math.ceil(qs.length*.75)?'You transferred the rule to new examples.':'Review the explanations and retry later.'}</p></div>`;
       reward(key,score*18)
     },450)
   })
 }
 show()
}
function isDemand(){sequenceGame('Demand or just wanting?',[{q:'You want a ₹60 dosa, have ₹200, and will buy it.',a:['Demand','Not demand'],c:0,why:'You are willing and able to buy it.'},{q:'You want a Lamborghini but cannot afford it.',a:['Demand','Not demand'],c:1,why:'Desire without ability to buy is not effective demand.'},{q:'You can afford bitter-gourd juice but refuse to buy it.',a:['Demand','Not demand'],c:1,why:'Ability without willingness is not demand.'},{q:'You plan to buy two ₹250 movie tickets tonight and can afford them.',a:['Demand','Not demand'],c:0,why:'Willingness, ability, quantity, price and time are present.'}],'isDemand')}
function buildDef(){const needed=['quantity','willing','able','price','period'],picked=[];$('main').innerHTML=`<div class="eyebrow">Game • Build the definition</div><h2>Choose the pieces a demand definition needs.</h2><div class="tileWrap">${[...needed,'happiness','production'].map(x=>`<button class="tile" data-t="${x}">${x}</button>`).join('')}</div><div id="slot" class="slot">Your pieces…</div><button class="btn primary" id="check">Check</button><div id="fb" class="feedback"></div>`;document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{if(b.classList.contains('used'))return;picked.push(b.dataset.t);b.classList.add('used');$('slot').innerHTML=picked.map(x=>`<span class="tag">${x}</span>`).join('');tone('click')});$('check').onclick=()=>{const ok=needed.every(x=>picked.includes(x))&&!picked.includes('happiness')&&!picked.includes('production');fb(ok,ok?'Definition built':'Something is missing or extra',ok?'Demand needs quantity, willingness, ability, price and a time period.':'Demand is not defined by happiness or production. Look for quantity + willing + able + price + period.');ok?reward('buildDef',60):miss()}}
function whoGame(){sequenceGame('Individual or market?',[{q:'At ₹150, Riya buys 2 coffees.',a:['Individual demand','Market demand'],c:0,why:'One named consumer = individual demand.'},{q:'At ₹100, 800 students together buy 2,400 coffees.',a:['Individual demand','Market demand'],c:1,why:'Many consumers combined = market demand.'},{q:'At ₹80, Dev buys 3 sandwiches.',a:['Individual demand','Market demand'],c:0,why:'One buyer = individual demand.'}],'who')}
function marketBuilder(){const rows=[{p:200,a:1,b:1,c:0,t:2},{p:150,a:2,b:3,c:1,t:6},{p:100,a:4,b:5,c:2,t:11},{p:50,a:7,b:8,c:4,t:19}];let i=0;$('main').innerHTML=`<div class="eyebrow">Game • Build the market</div><h2>Add buyers at the same price.</h2><div id="g"></div><div id="fb" class="feedback"></div>`;function show(){const r=rows[i];$('g').innerHTML=`<div class="grid3"><div class="panel"><b>Asha</b><div class="score">${r.a}</div></div><div class="panel"><b>Ravi</b><div class="score">${r.b}</div></div><div class="panel"><b>Dev</b><div class="score">${r.c}</div></div></div><div class="panel soft" style="margin-top:12px"><b>Price ₹${r.p}</b><p>Market quantity demanded?</p><input id="total" type="number" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:12px"><button id="check" class="btn primary" style="margin-top:10px">Add to market</button></div>`;$('check').onclick=()=>{const ok=Number($('total').value)===r.t;fb(ok,ok?'Correct total':'Check the addition',ok?`${r.a}+${r.b}+${r.c}=${r.t}. Market demand adds individual quantities at the same price.`:`Add ${r.a}, ${r.b} and ${r.c}. Do not add prices.`);if(ok){i++;tone('good');if(i<rows.length)setTimeout(()=>{$('fb').className='feedback';show()},600);else setTimeout(()=>{$('g').innerHTML=`<div class="panel goodbg"><h2>Market schedule built.</h2><table class="table"><tr><th>Price</th><th>Market Qd</th></tr>${rows.map(x=>`<tr><td>₹${x.p}</td><td>${x.t}</td></tr>`).join('')}</table></div>`;reward('marketBuilder',100)},400)}else miss()}}show()}
function graphGrid(ctx,w,h,margin,xTicks,yTicks,maxX,maxY,xlab,ylab){
 const plotW=w-margin-28,plotH=h-margin-28;
 ctx.font='12px system-ui';
 xTicks.forEach(v=>{
   const x=margin+(v/maxX)*plotW;
   ctx.strokeStyle=v===0?'#98a2b3':'#e4e7ec';ctx.lineWidth=1;
   ctx.beginPath();ctx.moveTo(x,18);ctx.lineTo(x,h-margin);ctx.stroke();
   ctx.fillStyle='#475467';ctx.textAlign='center';ctx.fillText(String(v),x,h-margin+20)
 });
 yTicks.forEach(v=>{
   const y=(h-margin)-(v/maxY)*plotH;
   ctx.strokeStyle=v===0?'#98a2b3':'#e4e7ec';ctx.lineWidth=1;
   ctx.beginPath();ctx.moveTo(margin,y);ctx.lineTo(w-28,y);ctx.stroke();
   ctx.fillStyle='#475467';ctx.textAlign='right';ctx.fillText(v===0?'0':'₹'+v,margin-8,y+4)
 });
 ctx.strokeStyle='#667085';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(margin,18);ctx.lineTo(margin,h-margin);ctx.lineTo(w-28,h-margin);ctx.stroke();
 ctx.fillStyle='#344054';ctx.font='bold 13px system-ui';ctx.textAlign='left';ctx.fillText(ylab,8,16);ctx.textAlign='right';ctx.fillText(xlab,w-28,h-12);ctx.textAlign='left'
}
function plotScreen(id,pts,maxQ,key,title,done){
 let i=0;
 const maxP=200,margin=64;
 const qTicks=maxQ<=8?[0,1,2,3,4,5,6,7,8]:[0,2,4,6,8,10,12,14,16,18,20];
 const pTicks=[0,50,100,150,200];
 $('main').innerHTML=`<div class="eyebrow">Game • Plotting</div><h2>${title}</h2>
 <div class="plotGrid">
   <div class="panel"><h3>Demand schedule</h3><table class="table"><tr><th>Price</th><th>Qd</th></tr>${pts.map(x=>`<tr><td>₹${x.p}</td><td>${x.q}</td></tr>`).join('')}</table><p style="font-size:14px">Keep the table visible: each row becomes one point on the graph.</p></div>
   <div><div class="chartwrap"><canvas id="${id}" width="800" height="360"></canvas></div><div class="tileWrap"><span class="tag">Y-axis = Price (₹)</span><span class="tag">X-axis = Quantity demanded</span></div></div>
 </div>
 <div id="fb" class="feedback show hint">Tap Q=${pts[0].q}, P=₹${pts[0].p}. Use the numbered ticks and grid lines.</div>`;
 const c=$(id),ctx=c.getContext('2d');
 function pos(pt){return {x:margin+(pt.q/maxQ)*(c.width-margin-28),y:(c.height-margin)-(pt.p/maxP)*(c.height-margin-28)}}
 function draw(){
   ctx.clearRect(0,0,c.width,c.height);
   graphGrid(ctx,c.width,c.height,margin,qTicks,pTicks,maxQ,maxP,'QUANTITY DEMANDED','PRICE (₹)');
   for(let j=0;j<i;j++){const a=pos(pts[j]);ctx.fillStyle='#5b5bd6';ctx.beginPath();ctx.arc(a.x,a.y,7,0,Math.PI*2);ctx.fill()}
   if(i===pts.length){
     ctx.strokeStyle='#5b5bd6';ctx.lineWidth=4;ctx.beginPath();
     pts.forEach((pt,j)=>{const a=pos(pt);j?ctx.lineTo(a.x,a.y):ctx.moveTo(a.x,a.y)});ctx.stroke();
     const last=pos(pts[pts.length-1]);ctx.fillStyle='#5b5bd6';ctx.font='bold 15px system-ui';ctx.fillText(id==='mplot'?'Dₘ':'D',last.x+10,last.y)
   }
 }
 draw();
 c.onclick=e=>{
   if(i>=pts.length)return;
   const r=c.getBoundingClientRect(),x=(e.clientX-r.left)*(c.width/r.width),y=(e.clientY-r.top)*(c.height/r.height),t=pts[i],tp=pos(t),ok=Math.hypot(x-tp.x,y-tp.y)<44;
   if(ok){
     i++;draw();
     if(i<pts.length){$('fb').className='feedback show good';$('fb').innerHTML=`✓ Correct. That table row became one point. Next: <b>Q=${pts[i].q}, P=₹${pts[i].p}</b>.`}
     else{$('fb').className='feedback show good';$('fb').innerHTML='<b>'+done+'</b><br>The table and graph contain the same price–quantity information in two forms.';reward(key,100)}
   }else{$('fb').className='feedback show bad';$('fb').innerHTML=`Find <b>${t.q}</b> on X and <b>₹${t.p}</b> on Y. Follow those grid lines until they meet.`;miss()}
 }
}
function plotIndividual(){plotScreen('plot',[{q:1,p:200},{q:2,p:150},{q:4,p:100},{q:7,p:50}],8,'plotI','Plot one buyer’s demand schedule.','You created an individual demand curve from a schedule.')}
function plotMarket(){plotScreen('mplot',[{q:2,p:200},{q:6,p:150},{q:11,p:100},{q:19,p:50}],20,'plotM','Plot the market totals you just built.','You created the market demand curve from horizontally summed quantities.')}
function typeMatch(){const pairs={"Ex-ante":"planned demand before the period","Ex-post":"actual realized demand after the period","Joint":"goods used together","Derived":"input wanted because final output is wanted","Composite":"one good with several uses"},terms=Object.keys(pairs),defs=[...terms].sort(()=>Math.random()-.5);let chosen=null,done=0;$('main').innerHTML=`<div class="eyebrow">Game • Match meanings</div><h2>Term → meaning</h2><div class="grid2"><div>${terms.map(x=>`<button class="ans" data-term="${x}">${x}</button>`).join('')}</div><div>${defs.map(x=>`<button class="ans" data-def="${x}">${pairs[x]}</button>`).join('')}</div></div><div id="fb" class="feedback show hint">Pick a term, then its meaning.</div>`;document.querySelectorAll('[data-term]').forEach(b=>b.onclick=()=>{chosen=b.dataset.term;tone('click')});document.querySelectorAll('[data-def]').forEach(b=>b.onclick=()=>{if(!chosen)return;const ok=b.dataset.def===chosen;fb(ok,ok?'Matched':'Not that meaning',ok?`${chosen}: ${pairs[chosen]}.`:`${chosen} means ${pairs[chosen]}.`);if(ok){b.disabled=true;document.querySelector(`[data-term="${chosen}"]`).disabled=true;chosen=null;done++;if(done===terms.length)reward('match',110)}else miss()})}
function typeSort(){sequenceGame('Sort new examples',[{q:'A forecast says 5,000 umbrellas will sell next month.',a:['Ex-ante','Ex-post','Joint','Derived','Composite'],c:0,why:'Forecast/planned future demand = ex-ante.'},{q:'Actual umbrella sales last month were 4,300.',a:['Ex-ante','Ex-post','Joint','Derived','Composite'],c:1,why:'Actual realized past demand = ex-post.'},{q:'Cars and petrol are used together.',a:['Ex-ante','Ex-post','Joint','Derived','Composite'],c:2,why:'Complementary goods used together = joint demand.'},{q:'More construction workers are hired because more houses are demanded.',a:['Ex-ante','Ex-post','Joint','Derived','Composite'],c:3,why:'Worker demand derives from demand for houses.'},{q:'Electricity is used by homes, factories and offices.',a:['Ex-ante','Ex-post','Joint','Derived','Composite'],c:4,why:'One commodity with multiple uses = composite demand.'}],'typeSort')}
function picSort(){sequenceGame('Price, income or cross demand?',[{q:'Burger’s own price falls and burger quantity demanded changes.',a:['Price demand','Income demand','Cross demand'],c:0,why:'Own-price relationship = price demand.'},{q:'Salary rises and demand for restaurant meals changes.',a:['Price demand','Income demand','Cross demand'],c:1,why:'Income is the changing variable.'},{q:'Coffee price rises and demand for tea changes.',a:['Price demand','Income demand','Cross demand'],c:2,why:'Tea demand is related to another good’s price.'}],'picSort')}
function predictGame(){sequenceGame('Predict before seeing the explanation',[{q:'Burger’s own price rises; other things stay the same.',a:['Quantity demanded falls','Demand shifts right','No change'],c:0,why:'Own-price change causes movement in quantity demanded, not a shift of demand.'},{q:'Pizza becomes more expensive; pizza and burgers are substitutes.',a:['Burger demand may rise','Burger demand must fall','No change'],c:0,why:'A related good’s price changed, so buyers may substitute toward burgers.'},{q:'Income rises and burgers are a normal good.',a:['Burger demand may rise','Only movement on same curve','Demand becomes zero'],c:0,why:'Income is a determinant; for a normal good, higher income can increase demand.'},{q:'A food-safety scandal makes burgers unpopular.',a:['Demand may shift left','Demand shifts right','Only price demand changes'],c:0,why:'Tastes changed, so the whole demand curve can shift.'}],'predict')}
function fixGame(){sequenceGame('Fix the bad economics',[
 {q:'“Market demand is the quantity demanded by the average consumer.”',a:[
   'Market demand is the sum of individual quantities demanded at each price.',
   'Market demand is the demand of the richest consumer.',
   'Market demand is found by averaging everyone’s prices.',
   'Market demand is whatever quantity firms choose to sell.'
 ],c:0,why:'Market demand is a total across consumers at a common price — not an average and not a supply decision.'},
 {q:'“Steel for making cars is joint demand.”',a:[
   'Steel demand is derived demand because steel is an input needed to produce cars.',
   'Steel and cars are joint demand because all related goods are jointly demanded.',
   'Steel is composite demand because cars have many uses.',
   'Steel is ex-post demand because steel is purchased before a car is sold.'
 ],c:0,why:'Steel is an input. Its demand exists because producers need it to make cars, so it is derived demand.'},
 {q:'“Wanting a yacht counts as demand even if I cannot pay.”',a:[
   'Demand requires willingness and ability to purchase.',
   'Desire alone is always economic demand.',
   'Demand only exists after the yacht is actually purchased.',
   'Ability to pay matters only for market demand, not individual demand.'
 ],c:0,why:'Economic demand requires both willingness and ability to buy.'},
 {q:'“To derive market demand, add everyone’s prices.”',a:[
   'Add individual quantities demanded at the same price.',
   'Add each consumer’s income.',
   'Average prices and quantities together.',
   'Add the prices of substitute goods.'
 ],c:0,why:'Horizontal summation holds price constant and adds quantities demanded across consumers.'},
 {q:'“Ex-ante demand is what consumers actually bought last month.”',a:[
   'Ex-ante is planned or expected demand; actual realized demand is ex-post.',
   'Ex-ante and ex-post mean exactly the same thing.',
   'Ex-ante is another name for market demand.',
   'Ex-post means only demand for complementary goods.'
 ],c:0,why:'The distinction is about timing: ex-ante is before; ex-post is after.'}
],'fix')}
function boardGame(){
 const steps=[
  {label:"Step 1",q:"Start at one particular market price.",opts:[
    ["Take the same price for every consumer.",true],["Add all consumers' prices together.",false],["Ignore price completely.",false]
  ]},
  {label:"Step 2",q:"What do you combine at that price?",opts:[
    ["Add the quantities demanded by all individual consumers.",true],["Add their incomes.",false],["Average their prices.",false]
  ]},
  {label:"Step 3",q:"How do you build the full schedule?",opts:[
    ["Repeat the same addition at each price.",true],["Use only one price.",false],["Change the number of consumers every row.",false]
  ]},
  {label:"Step 4",q:"How do you turn the schedule into the market demand curve?",opts:[
    ["Plot price against the total market quantity demanded.",true],["Plot consumer names against income.",false],["Add the individual demand curves vertically by price.",false]
  ]}
 ];
 let i=0,answer=[];
 $('main').innerHTML=`<div class="eyebrow">Board answer coach</div><h2>Derive market demand one sentence at a time.</h2><div id="coach"></div><div id="fb" class="feedback"></div>`;
 function show(){
   if(i>=steps.length){$('coach').innerHTML=`<div class="answerPreview"><h3>Your board answer</h3>${answer.map(x=>`<div class="answerLine">${x}</div>`).join('')}</div>`;fb(true,'Board-ready','At each common price, add individual quantities demanded; repeat for every price; then plot price against the resulting market totals.');reward('board',120);return}
   const s=steps[i],opts=shuffle([...s.opts]);
   $('coach').innerHTML=`<div class="panel soft"><div class="stepLabel">${s.label}</div><p class="big">${s.q}</p></div><div class="answers">${opts.map((o,j)=>`<button class="ans" data-j="${j}">${o[0]}</button>`).join('')}</div><div class="answerPreview"><h3>Answer so far</h3>${answer.length?answer.map(x=>`<div class="answerLine">${x}</div>`).join(''):`<p class="tiny">Your answer will build here.</p>`}</div>`;
   document.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{const o=opts[+b.dataset.j];if(o[1]){answer.push(o[0]);i++;tone('good');setTimeout(show,400)}else{fb(false,'Not this step','At one common price, market demand is built from quantities, not by adding prices.');miss()}})
 }
 show()
}
function boss(){sequenceGame('Market Builder Final',[{q:'Want a ₹10,000 phone but cannot afford it.',a:['Demand','Desire only','Market demand'],c:1,why:'Ability to pay is missing.'},{q:'At ₹100, A buys 2, B 3, C 4. Market Qd?',a:['7','9','12'],c:1,why:'2+3+4=9.'},{q:'Forecast demand for next month.',a:['Ex-ante','Ex-post','Composite'],c:0,why:'Forecast = planned future demand.'},{q:'Machines demanded because output demand rises.',a:['Joint','Derived','Composite'],c:1,why:'Input demand derives from final output demand.'},{q:'Water used for drinking, washing and industry.',a:['Composite','Joint','Ex-post'],c:0,why:'One good, many uses.'},{q:'Coffee price rises and tea demand changes.',a:['Cross demand','Income demand','Price demand'],c:0,why:'Tea demand is related to another good’s price.'},{q:'To form market demand, add...',a:['quantities at each price','prices','income levels'],c:0,why:'Horizontal summation adds quantities.'},{q:'Salary rises and restaurant meals are normal goods.',a:['Demand may rise','Only movement','Demand becomes zero'],c:0,why:'Income is a demand determinant.'}],'boss')}
$('next').onclick=()=>{if(state.i<screens.length-1){state.i++;render();window.scrollTo({top:0,behavior:'smooth'})}else location.href='mission.html?mission=demand-3'};$('back').onclick=()=>{if(state.i>0){state.i--;render()}else location.href='mission.html?mission=demand-3'};$("hint").onclick=showPageHelp;$('sound').onclick=()=>{state.sound=!state.sound;save();header()};setupMissionNavigation();render();
})();
