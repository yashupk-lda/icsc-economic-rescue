const $=(id)=>document.getElementById(id);
const KEY="econ_demand_m6_v18";
const DEFAULT_STATE={i:0,xp:0,streak:0,sound:true,answered:{},rewarded:{},goods:[],favorite:null,personalEqual:null,board:[]};
let state=Object.assign({},DEFAULT_STATE,JSON.parse(localStorage.getItem(KEY)||"{}"));

const GOODS=[
  {id:"chicken",name:"Pepper chicken",short:"Pepper chicken",emoji:"🍗",unit:"plates",price:250},
  {id:"tennis",name:"Tennis lessons",short:"Tennis lessons",emoji:"🎾",unit:"lessons",price:500},
  {id:"games",name:"Video games",short:"Video games",emoji:"🎮",unit:"games",price:400},
  {id:"movies",name:"Movies",short:"Movies",emoji:"🎬",unit:"movies",price:200},
  {id:"beach",name:"Beach days",short:"Beach days",emoji:"🏖️",unit:"days",price:300}
];

const screens=[
  {t:"intro"},{t:"pickGoods"},{t:"rankGoods"},{t:"rankBundles"},{t:"ordinalReveal"},{t:"equalChoice"},{t:"plotPersonal"},{t:"indifferentMeaning"},
  {t:"trade"},{t:"mrsReveal"},{t:"diminishing"},{t:"convexity"},{t:"icMap"},{t:"slopeProperty"},{t:"intersection"},
  {t:"budgetIntro"},{t:"budgetBuilder"},{t:"budgetEquation"},{t:"budgetZones"},{t:"incomeShift"},{t:"priceRotate"},
  {t:"equilibriumGame"},{t:"tangency"},{t:"boardCoach"},{t:"boss"},{t:"finish"}
];
state.i=Math.max(0,Math.min(Number(state.i)||0,screens.length-1));

const PAGE_LABELS={
  intro:"Mission intro",pickGoods:"Pick your two things",rankGoods:"Rank your choices",rankBundles:"Rank bundles",ordinalReveal:"Ordinal utility",
  equalChoice:"Find equal satisfaction",plotPersonal:"Plot your curve",indifferentMeaning:"What 'indifferent' means",trade:"What would you trade?",mrsReveal:"MRS",
  diminishing:"Why MRS falls",convexity:"Convexity",icMap:"Indifference map",slopeProperty:"Why IC slopes down",intersection:"Why curves cannot cross",
  budgetIntro:"What can you afford?",budgetBuilder:"Build a budget line",budgetEquation:"Budget equation",budgetZones:"Inside/on/outside",incomeShift:"Income change",
  priceRotate:"Price change",equilibriumGame:"Find equilibrium",tangency:"Why tangency matters",boardCoach:"Board answer coach",boss:"Final Boss",finish:"Mission complete"
};

const PAGE_HELP={
  intro:"D4 and D5 used cardinal utility: satisfaction was represented with numbers. Here we stop pretending happiness needs an exact score. We only need to know which choice comes first, second, or feels equally good.",
  pickGoods:"Pick any two things you actually like. We will use the same pair through the whole mission so the graphs are about choices you can picture, not mysterious X and Y symbols.",
  rankGoods:"Ranking does not mean you must always choose your favourite. It only tells us which one you generally prefer when comparing the two by themselves.",
  rankBundles:"A bundle is just a combination. For example: 2 tennis lessons + 3 movies. Ordinal utility asks which bundle you prefer; it does not ask for a numerical happiness score.",
  ordinalReveal:"Ordinal means order or rank. If A is preferred to B, we can write A > B. If A and B feel equally satisfying, economists write A ~ B.",
  equalChoice:"There is no universal correct personal answer. The important idea is that different combinations can leave you equally satisfied. That is the raw material for an indifference curve.",
  plotPersonal:"Every point on the same indifference curve represents a different bundle that gives the same level of satisfaction. The textbook curve is a model of a typical preference pattern.",
  indifferentMeaning:"In economics, indifferent does not mean bored or uncaring. It means you would be equally satisfied with either bundle.",
  trade:"Move from one equal-satisfaction bundle to the next. Notice how gaining some of one good requires giving up some of the other. That sacrifice is the trade-off we are measuring.",
  mrsReveal:"MRS is a fancy name for a simple question: how much of Y are you willing to give up to get one more X while staying equally satisfied?",
  diminishing:"When X is scarce and Y is plentiful, another X can feel valuable, so you may give up a lot of Y. Later, when X is plentiful and Y is scarce, you protect Y more. So the amount of Y you are willing to give up falls.",
  convexity:"Convex describes the shape. Origin means the (0,0) corner of a graph. 'Convex to the origin' means the curve bows inward toward that corner. It happens because MRS usually diminishes.",
  icMap:"One indifference curve shows one satisfaction level. Several curves together form an indifference map. A curve farther northeast normally means more of at least one desirable good and therefore greater satisfaction.",
  slopeProperty:"If both are desirable goods, getting less X and less Y would normally make you worse off. To keep satisfaction unchanged, less of one must generally be compensated by more of the other. Hence the downward slope.",
  intersection:"If two indifference curves crossed, the crossing bundle would have to be equally satisfying as bundles on both curves. That creates a contradiction when one of those bundles clearly has more of both goods.",
  budgetIntro:"Preferences answer 'What do I want?' The budget line answers 'What can I afford?' Consumer choice needs both.",
  budgetBuilder:"Spend the entire budget in different ways. Each full-budget combination becomes a point. Joining those points creates the budget line.",
  budgetEquation:"PxX + PyY = M simply says spending on X plus spending on Y equals the available money. P means price, X and Y are quantities, and M means money income/budget.",
  budgetZones:"On the line: affordable and the whole budget is used. Inside: affordable but some budget remains. Outside: costs more than the budget.",
  incomeShift:"If income rises while both prices stay unchanged, you can afford more of both goods. The whole budget line shifts outward in a parallel way.",
  priceRotate:"If only one price changes, only that good's maximum affordable quantity changes. One intercept moves while the other stays fixed, so the line rotates.",
  equilibriumGame:"The consumer wants the highest indifference curve that is still reachable with the budget. A lower curve is affordable but not best; a higher curve may be desirable but unaffordable.",
  tangency:"At the touching point, your willingness to trade the goods (MRS) matches the trade-off imposed by market prices (Px/Py). If those slopes differed, you could rearrange spending and reach a better bundle.",
  boardCoach:"A strong board answer defines equilibrium, states the highest attainable IC idea, gives the tangency condition MRSxy = Px/Py, and mentions convexity / diminishing MRS as the stability condition.",
  boss:"Translate each question into the core contrast: preferences versus affordability, or personal trade-off versus market trade-off.",
  finish:"You should now be able to explain ordinal utility, indifference curves, MRS/DMRS, budget lines and ordinal consumer equilibrium without relying on memorized jargon."
};

const JARGON={
  ordinal:"Ordinal = rank or order. You only need to know which option is preferred, not by how many 'utils'.",
  bundle:"Bundle = a combination of quantities of two goods.",
  indifferent:"Indifferent = equally satisfied with either bundle. It does not mean you do not care about either good.",
  marginal:"Marginal = one more / the next small change.",
  substitution:"Substitution = replacing some of one good with some of another.",
  mrs:"MRS = Marginal Rate of Substitution: how much Y you would give up for one more X while keeping satisfaction unchanged.",
  origin:"Origin = the (0,0) point at the bottom-left of the graph.",
  convex:"Convex to the origin = bowed inward toward the (0,0) corner.",
  tangent:"Tangent = touching at one point without crossing there; in this chapter it is where the budget line just touches the highest reachable IC.",
  constraint:"Constraint = a limit. A budget constraint is the spending limit created by income and prices."
};

function good(id){return GOODS.find(g=>g.id===id)||GOODS[0]}
function chosen(){const ids=state.goods.length===2?state.goods:["chicken","tennis"];return ids.map(good)}
function g1(){return chosen()[0]}
function g2(){return chosen()[1]}
function favGood(){return good(state.favorite||g1().id)}
function otherGood(){const [a,b]=chosen();return favGood().id===a.id?b:a}
function iconLine(g,n){return `<span class="bundleIcons" aria-label="${n} ${g.name}">${Array(Math.min(n,8)).fill(g.emoji).join("")}${n>8?` ×${n}`:""}</span>`}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function tone(kind){if(!state.sound)return;try{const C=new(window.AudioContext||window.webkitAudioContext)(),o=C.createOscillator(),gn=C.createGain();const m={click:[430,520,.05],good:[620,880,.10],bad:[220,170,.12],win:[523,1046,.24]}[kind]||[430,520,.05];o.connect(gn);gn.connect(C.destination);o.frequency.setValueAtTime(m[0],C.currentTime);o.frequency.exponentialRampToValueAtTime(m[1],C.currentTime+m[2]);gn.gain.setValueAtTime(.035,C.currentTime);gn.gain.exponentialRampToValueAtTime(.0001,C.currentTime+m[2]);o.start();o.stop(C.currentTime+m[2])}catch(e){}}
function burst(){const c=$("confetti");if(!c)return;c.innerHTML="";c.classList.remove("hidden");const cs=["#5b5bd6","#ffd166","#34d399","#60a5fa","#f472b6"];for(let i=0;i<28;i++){const d=document.createElement("div");d.className="piece";d.style.left=Math.random()*100+"vw";d.style.top=(-20-Math.random()*30)+"px";d.style.background=cs[Math.floor(Math.random()*cs.length)];c.appendChild(d)}setTimeout(()=>c.classList.add("hidden"),1300)}
function reward(n=35){if(!state.rewarded[state.i]){state.rewarded[state.i]=1;state.xp+=n;localStorage.setItem("econ_total_xp",String(Number(localStorage.getItem("econ_total_xp")||0)+n));burst()}state.streak++;tone("good");save();header()}
function miss(){state.streak=0;tone("bad");save();header()}
function header(){syncMissionNavigation();$("xp").textContent=state.xp;$("streak").textContent=state.streak;$("snd").textContent=state.sound?"ON":"OFF";$("fill").style.width=((state.i+1)/screens.length*100)+"%";$("back").disabled=state.i===0}
function currentScreenType(){return screens[state.i]?.t||""}
function setupMissionNavigation(){const sel=$("pageJump");if(!sel)return;sel.innerHTML=screens.map((s,idx)=>`<option value="${idx}">${idx+1}. ${PAGE_LABELS[s.t]||s.t}</option>`).join("");sel.value=String(state.i);sel.onchange=()=>{state.i=+sel.value;save();render();window.scrollTo({top:0,behavior:"smooth"})}}
function syncMissionNavigation(){const sel=$("pageJump");if(sel)sel.value=String(state.i)}
function showPageHelp(){const old=$("pageHelpBox");if(old)old.remove();const t=currentScreenType();const d=document.createElement("div");d.id="pageHelpBox";d.className="helpBox";d.innerHTML=`<h3>Try it in slower English</h3><p>${PAGE_HELP[t]||"Focus on the one comparison this page is asking you to make."}</p>`;$("main").appendChild(d);tone("click")}
function glossaryChip(word,label){return `<button class="jargonChip" type="button" data-jargon="${word}">${label||word} ?</button>`}
function bindJargon(){document.querySelectorAll("[data-jargon]").forEach(b=>b.onclick=()=>{const old=$("jargonPop");if(old)old.remove();const d=document.createElement("div");d.id="jargonPop";d.className="feedback show hint jargonPop";d.innerHTML=`<b>${b.textContent.replace(" ?","")}</b><br>${JARGON[b.dataset.jargon]||"This is an economics label for an idea you have already used."}`;b.insertAdjacentElement("afterend",d);tone("click")})}
function feedback(id,msg,ok=true){const f=$(id);if(!f)return;f.className=`feedback show ${ok?"good":"bad"}`;f.innerHTML=msg}
function selectCards(selector,handler){document.querySelectorAll(selector).forEach(b=>b.onclick=()=>handler(b))}
function miniGraph(points,{xLabel,yLabel,curves=[]}={}){
  const W=560,H=330,pad=52,maxX=Math.max(...points.map(p=>p.x),8),maxY=Math.max(...points.map(p=>p.y),8);
  const X=x=>pad+(x/maxX)*(W-pad*1.45),Y=y=>H-pad-(y/maxY)*(H-pad*1.55);
  const grid=Array.from({length:5},(_,i)=>{const x=pad+i*(W-pad*1.45)/4,y=pad+i*(H-pad*1.55)/4;return `<line x1="${x}" y1="${pad}" x2="${x}" y2="${H-pad}" class="chartGrid"/><line x1="${pad}" y1="${y}" x2="${W-pad*.45}" y2="${y}" class="chartGrid"/>`}).join("");
  const mainPath=points.map((p,i)=>`${i?"L":"M"}${X(p.x)},${Y(p.y)}`).join(" ");
  const extras=curves.map(c=>`<path d="${c.map((p,i)=>`${i?"L":"M"}${X(p.x)},${Y(p.y)}`).join(" ")}" class="chartCurve ghostCurve"/>`).join("");
  const dots=points.map((p,i)=>`<g><circle cx="${X(p.x)}" cy="${Y(p.y)}" r="6" class="chartDot"/><text x="${X(p.x)+9}" y="${Y(p.y)-8}" class="chartText">${p.label||String.fromCharCode(65+i)}</text></g>`).join("");
  return `<div class="chartCard"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Economics graph"><g>${grid}<line x1="${pad}" y1="${H-pad}" x2="${W-pad*.45}" y2="${H-pad}" class="chartAxis"/><line x1="${pad}" y1="${H-pad}" x2="${pad}" y2="${pad*.55}" class="chartAxis"/>${extras}<path d="${mainPath}" class="chartCurve"/>${dots}<text x="${W/2}" y="${H-8}" text-anchor="middle" class="chartLabel">${xLabel||g1().short}</text><text x="18" y="${H/2}" transform="rotate(-90 18 ${H/2})" text-anchor="middle" class="chartLabel">${yLabel||g2().short}</text><text x="${pad-14}" y="${H-pad+18}" class="chartText">0</text></g></svg></div>`
}
function budgetGraph({budget=2000,p1=g1().price,p2=g2().price,second=null}={}){
  const maxX=budget/p1,maxY=budget/p2,W=560,H=330,pad=52,X=x=>pad+(x/Math.max(maxX,(second?.maxX||0),1))*(W-pad*1.5),Y=y=>H-pad-(y/Math.max(maxY,(second?.maxY||0),1))*(H-pad*1.6);
  const line=`M${X(0)},${Y(maxY)} L${X(maxX)},${Y(0)}`;
  const line2=second?`<path d="M${X(0)},${Y(second.maxY)} L${X(second.maxX)},${Y(0)}" class="budgetLine secondLine"/>`:"";
  return `<div class="chartCard"><svg viewBox="0 0 ${W} ${H}"><line x1="${pad}" y1="${H-pad}" x2="${W-pad*.5}" y2="${H-pad}" class="chartAxis"/><line x1="${pad}" y1="${H-pad}" x2="${pad}" y2="${pad*.6}" class="chartAxis"/><path d="${line}" class="budgetLine"/>${line2}<text x="${X(maxX)-8}" y="${H-pad+22}" class="chartText">${maxX.toFixed(maxX%1?1:0)}</text><text x="${pad-28}" y="${Y(maxY)+5}" class="chartText">${maxY.toFixed(maxY%1?1:0)}</text><text x="${W/2}" y="${H-8}" text-anchor="middle" class="chartLabel">${g1().short}</text><text x="18" y="${H/2}" transform="rotate(-90 18 ${H/2})" text-anchor="middle" class="chartLabel">${g2().short}</text></svg></div>`
}
function optionButton(text,value,cls="choiceCard"){return `<button type="button" class="${cls}" data-value="${value}">${text}</button>`}

function render(){
  header();const t=currentScreenType(),m=$("main"),A=g1(),B=g2();
  if(t==="intro"){
    m.innerHTML=`<div class="eyebrow">Mission 6 • Choose Your Bundle</div><h1>What do I want — and what can I afford?</h1><p class="big">This time, you are going to build the choice model yourself.</p><div class="grid2"><div class="definition"><b>D4–D5:</b><p>We used numbers such as MU = 40 and compared benefit per rupee.</p></div><div class="definition"><b>D6:</b><p>No happiness score needed. We only ask which combination you prefer.</p></div></div><div class="callout"><b>Mission rule:</b> understand the idea first. We will reveal the economics jargon only after it makes sense.</div>`;
  }
  else if(t==="pickGoods"){
    m.innerHTML=`<div class="eyebrow">Step 1 • Make it yours</div><h2>Pick any TWO things you genuinely like.</h2><p>We will use your pair through the whole mission.</p><div class="pickGrid">${GOODS.map(g=>`<button class="personalPick ${state.goods.includes(g.id)?"selected":""}" data-good="${g.id}"><span>${g.emoji}</span><b>${g.name}</b></button>`).join("")}</div><div id="pickFb" class="feedback ${state.goods.length===2?"show good":""}">${state.goods.length===2?`Nice. Your mission will use <b>${A.emoji} ${A.name}</b> and <b>${B.emoji} ${B.name}</b>.`:"Pick two."}</div>`;
    selectCards(".personalPick",b=>{const id=b.dataset.good;const idx=state.goods.indexOf(id);if(idx>=0)state.goods.splice(idx,1);else if(state.goods.length<2)state.goods.push(id);else{feedback("pickFb","You only need two. Tap one selected choice to remove it first.",false);return}save();render();if(state.goods.length===2&&!state.rewarded[state.i])reward(20)});
  }
  else if(t==="rankGoods"){
    m.innerHTML=`<div class="eyebrow">Step 2 • Rank</div><h2>If you had to pick one, which do you generally prefer?</h2><p>There is no correct answer. This is <i>your</i> preference.</p><div class="grid2">${chosen().map(g=>`<button class="choiceCard preferenceCard ${state.favorite===g.id?"selected":""}" data-fav="${g.id}"><div class="bigIcon">${g.emoji}</div><b>${g.name}</b></button>`).join("")}</div><div id="rankFb" class="feedback ${state.favorite?"show good":""}">${state.favorite?`You ranked <b>${favGood().name}</b> above <b>${otherGood().name}</b>. Notice: we still have not used any happiness number.`:""}</div>`;
    selectCards("[data-fav]",b=>{state.favorite=b.dataset.fav;save();feedback("rankFb",`You ranked <b>${favGood().name}</b> above <b>${otherGood().name}</b>. Notice: we still have not used any happiness number.`);reward(20);render()});
  }
  else if(t==="rankBundles"){
    const X=favGood(),Y=otherGood();
    m.innerHTML=`<div class="eyebrow">Step 3 • Combinations</div><h2>Now rank bundles instead of single goods.</h2><p>${glossaryChip("bundle","Bundle")} simply means a combination.</p><div class="grid3"><button class="choiceCard bundleChoice" data-bundle="A"><b>Bundle A</b><div class="bundleDisplay">${iconLine(X,3)}<span>+</span>${iconLine(Y,1)}</div></button><button class="choiceCard bundleChoice" data-bundle="B"><b>Bundle B</b><div class="bundleDisplay">${iconLine(X,2)}<span>+</span>${iconLine(Y,3)}</div></button><button class="choiceCard bundleChoice" data-bundle="same"><b>About the same</b><div class="bigIcon">⚖️</div></button></div><div id="bundleFb" class="feedback"></div>`;
    selectCards(".bundleChoice",b=>{const v=b.dataset.bundle;document.querySelectorAll(".bundleChoice").forEach(x=>x.classList.toggle("selected",x===b));feedback("bundleFb",v==="same"?"That means these two bundles feel equally satisfying to you. Excellent — that idea will create an indifference curve.":`You prefer Bundle ${v}. That is enough information for ordinal analysis; we do not need to ask whether it gives 20, 50 or 100 happiness points.`);reward(20)});bindJargon();
  }
  else if(t==="ordinalReveal"){
    m.innerHTML=`<div class="eyebrow">Reveal</div><h2>You just used ${glossaryChip("ordinal","ordinal utility")}</h2><div class="definition"><p><b>Ordinal utility</b> means satisfaction is expressed through <b>ranking</b> rather than exact numerical measurement.</p></div><div class="compare"><div class="panel"><small>CARDINAL</small><div class="equation">A = 80 utils</div><p>Tries to measure satisfaction numerically.</p></div><div class="panel"><small>ORDINAL</small><div class="equation">A &gt; B</div><p>Only says A is preferred to B.</p></div></div><div class="board"><b>ISC-ready wording:</b> Under ordinal utility analysis, the consumer can rank different bundles of goods according to preference without measuring utility in absolute numerical units.</div>`;bindJargon();
  }
  else if(t==="equalChoice"){
    const X=favGood(),Y=otherGood();
    m.innerHTML=`<div class="eyebrow">Step 4 • Equal satisfaction</div><h2>How much ${Y.name.toLowerCase()} would compensate for less ${X.name.toLowerCase()}?</h2><div class="scene"><p>Start here:</p><div class="bundleDisplay bigBundle">${iconLine(X,4)}<span>+</span>${iconLine(Y,1)}</div><p>Now you lose one ${X.unit.slice(0,-1)||"unit"}. Which replacement bundle feels closest to <b>equally good</b>?</p></div><div class="answers">${[2,3,4].map(n=>optionButton(`${iconLine(X,3)} + ${iconLine(Y,n)}`,n,"ans personalEqualBtn")).join("")}</div><div id="equalFb" class="feedback"></div>`;
    selectCards(".personalEqualBtn",b=>{state.personalEqual=Number(b.dataset.value);save();document.querySelectorAll(".personalEqualBtn").forEach(x=>x.classList.toggle("selected",x===b));feedback("equalFb",`There is no universal right answer here. You chose <b>3 ${X.unit} + ${state.personalEqual} ${Y.unit}</b> as roughly equal to the starting bundle. Economists would say you are <b>indifferent</b> between those two bundles.`);reward(25)});
  }
  else if(t==="plotPersonal"){
    const X=favGood(),Y=otherGood(),n=state.personalEqual||3;
    const personal=[{x:1,y:7,label:"A"},{x:3,y:n,label:"B"},{x:4,y:1,label:"C"}];
    m.innerHTML=`<div class="eyebrow">Step 5 • Plot the choices</div><h2>Equal-satisfaction bundles become points.</h2><p>Your personal answer gives us one point. For the textbook pattern, we add a few typical equal-satisfaction combinations and connect them.</p>${miniGraph(personal,{xLabel:X.name,yLabel:Y.name})}<div class="definition"><p>An <b>indifference curve</b> joins combinations of two goods that give the consumer the <b>same level of satisfaction</b>.</p></div><div class="callout">The exact curve is a model — people do not have to carry graph paper around in real life. The graph helps us reason about trade-offs.</div>`;
  }
  else if(t==="indifferentMeaning"){
    m.innerHTML=`<div class="eyebrow">Vocabulary trap</div><h2>${glossaryChip("indifferent","Indifferent")} does NOT mean “I don't care.”</h2><div class="grid2"><div class="panel badTint"><div class="bigIcon">😐</div><b>Everyday meaning</b><p>“Meh. Whatever.”</p></div><div class="panel goodTint"><div class="bigIcon">⚖️</div><b>Economics meaning</b><p>“I would be equally satisfied with either bundle.”</p></div></div><div class="board"><b>Same indifference curve = same satisfaction.</b></div>`;bindJargon();
  }
  else if(t==="trade"){
    const X=favGood(),Y=otherGood();const rows=[{x:1,y:8,loss:"—"},{x:2,y:5,loss:"3"},{x:3,y:3,loss:"2"},{x:4,y:2,loss:"1"}];
    m.innerHTML=`<div class="eyebrow">Step 6 • What would you trade?</div><h2>Move along the same satisfaction level.</h2><div class="plotGrid"><div class="tableWrap"><table class="table"><thead><tr><th>${X.emoji} ${X.name}</th><th>${Y.emoji} ${Y.name}</th><th>${Y.name} given up for +1 ${X.name}</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r.x}</td><td>${r.y}</td><td>${r.loss}</td></tr>`).join("")}</tbody></table></div>${miniGraph(rows.map((r,i)=>({x:r.x,y:r.y,label:String.fromCharCode(65+i)})),{xLabel:X.name,yLabel:Y.name})}</div><div class="questionCard"><b>Look at A → B.</b><p>You gain 1 ${X.name.toLowerCase()} and give up how many ${Y.name.toLowerCase()}?</p><div class="miniAnswers">${[1,2,3].map(v=>optionButton(String(v),v,"ans tradeAns")).join("")}</div><div id="tradeFb" class="feedback"></div></div>`;
    selectCards(".tradeAns",b=>{const ok=Number(b.dataset.value)===3;if(ok){feedback("tradeFb",`Correct. You gave up <b>3</b> ${Y.unit} to get 1 more ${X.unit.slice(0,-1)||X.name}. That is the trade-off.`);reward(25)}else{feedback("tradeFb","Compare the Y column: it falls from 8 to 5. How much was given up?",false);miss()}});
  }
  else if(t==="mrsReveal"){
    const X=favGood(),Y=otherGood();
    m.innerHTML=`<div class="eyebrow">Name the idea</div><h2>That trade-off has a terrifying name for a very normal idea.</h2><div class="definition heroDefinition"><span class="giantTerm">MRS</span><div><b>Marginal Rate of Substitution</b><p>How much of ${Y.name} you are willing to give up for one more ${X.name}, while staying equally satisfied.</p></div></div><div class="grid3"><div class="term"><small>${glossaryChip("marginal","MARGINAL")}</small><b>the next small change</b></div><div class="term"><small>RATE</small><b>how much for how much</b></div><div class="term"><small>${glossaryChip("substitution","SUBSTITUTION")}</small><b>trading one thing for another</b></div></div><div class="equation">MRS<sub>XY</sub> = amount of Y sacrificed for one more X</div>`;bindJargon();
  }
  else if(t==="diminishing"){
    const X=favGood(),Y=otherGood();
    m.innerHTML=`<div class="eyebrow">Step 7 • Why the trade falls</div><h2>Would you keep sacrificing the same amount forever?</h2><div class="tradeStory"><div class="panel"><div class="bundleDisplay">${iconLine(X,1)} ${iconLine(Y,8)}</div><p>You have very little ${X.name.toLowerCase()} and lots of ${Y.name.toLowerCase()}.</p><b>Another ${X.name.toLowerCase()} feels valuable.</b><p>You might give up 3 ${Y.unit}.</p></div><div class="arrowBig">→</div><div class="panel"><div class="bundleDisplay">${iconLine(X,4)} ${iconLine(Y,2)}</div><p>Now ${X.name.toLowerCase()} is plentiful and ${Y.name.toLowerCase()} is scarce.</p><b>You protect ${Y.name.toLowerCase()} more.</b><p>You might give up only 1.</p></div></div><div class="definition"><b>Diminishing MRS</b><p>As the consumer gets more and more of X, the amount of Y they are willing to sacrifice for another unit of X generally falls.</p></div>`;
  }
  else if(t==="convexity"){
    const pts=[{x:1,y:8},{x:2,y:5},{x:3,y:3},{x:4,y:2}];
    m.innerHTML=`<div class="eyebrow">Jargon decoder</div><h2>So what on earth does “${glossaryChip("convex","convex to the origin")}” mean?</h2>${miniGraph(pts,{})}<div class="grid2"><div class="definition"><b>${glossaryChip("origin","Origin")}</b><p>The bottom-left point where X = 0 and Y = 0.</p></div><div class="definition"><b>Convex</b><p>The curve <b>bows inward</b> toward that corner instead of being a straight line.</p></div></div><div class="callout"><b>Why does it bend?</b> Because the trade-off changed 3 → 2 → 1. Falling MRS creates the bowed shape.</div>`;bindJargon();
  }
  else if(t==="icMap"){
    const base=[{x:1,y:7},{x:2,y:4.7},{x:3,y:3},{x:4,y:2}],low=[{x:.7,y:5},{x:1.5,y:3.3},{x:2.4,y:2},{x:3.2,y:1.2}],high=[{x:1.6,y:8},{x:2.8,y:6},{x:4.2,y:4.3},{x:5.4,y:3.2}];
    m.innerHTML=`<div class="eyebrow">Step 8 • More than one curve</div><h2>Same curve = same satisfaction. Higher curve = higher satisfaction.</h2>${miniGraph(base,{curves:[low,high]})}<div class="definition"><b>Indifference map</b><p>A set of indifference curves showing different levels of satisfaction.</p></div><div class="feedback show hint">Assuming both things are desirable goods, a bundle with more of at least one good and no less of the other is preferred. So curves farther northeast represent higher satisfaction.</div>`;
  }
  else if(t==="slopeProperty"){
    m.innerHTML=`<div class="eyebrow">Property check</div><h2>Why is a normal indifference curve downward sloping?</h2><div class="answers">${[
      ["If I lose some X, I usually need more Y to remain equally satisfied.",1],["If I lose X, I should also lose Y to remain equally satisfied.",0],["Because prices always fall from left to right.",0]
    ].map(([txt,v])=>optionButton(txt,v,"ans slopeAns")).join("")}</div><div id="slopeFb" class="feedback"></div>`;
    selectCards(".slopeAns",b=>{if(Number(b.dataset.value)===1){feedback("slopeFb","Exactly. Staying on the same satisfaction level usually requires a trade: less of one desirable good must be compensated by more of the other.");reward(25)}else{feedback("slopeFb","Not quite. An indifference curve is about satisfaction, not a price trend. Ask: if one desirable thing falls, what must happen to the other to keep me equally satisfied?",false);miss()}});
  }
  else if(t==="intersection"){
    m.innerHTML=`<div class="eyebrow">Logic puzzle</div><h2>Can two indifference curves cross?</h2><div class="intersectionDemo"><svg viewBox="0 0 520 300"><line x1="55" y1="245" x2="485" y2="245" class="chartAxis"/><line x1="55" y1="245" x2="55" y2="30" class="chartAxis"/><path d="M80 220 C170 120 300 105 455 72" class="chartCurve"/><path d="M88 190 C190 155 290 112 445 48" class="chartCurve secondLine"/><circle cx="258" cy="119" r="7" class="chartDot"/><text x="270" y="112" class="chartText">A: crossing point</text></svg></div><div class="logicSteps"><button class="choiceCard logicChoice" data-value="yes">Yes — curves can cross.</button><button class="choiceCard logicChoice" data-value="no">No — crossing creates a contradiction.</button></div><div id="interFb" class="feedback"></div>`;
    selectCards(".logicChoice",b=>{if(b.dataset.value==="no"){feedback("interFb","Correct. If A is indifferent to B on one curve and A is indifferent to C on the other, then B and C should be equally satisfying. But if C clearly contains more of both desirable goods than B, that cannot be true. So indifference curves cannot intersect.");reward(30)}else{feedback("interFb","Try the equality logic: if A ~ B and A ~ C, then B and C must be equally satisfying. A crossing can make that impossible.",false);miss()}});
  }
  else if(t==="budgetIntro"){
    m.innerHTML=`<div class="eyebrow">Part 2 • Reality arrives</div><h1>Great. You know what you want.</h1><div class="bigTransition">But can you afford it? 💸</div><div class="compare"><div class="panel"><small>PREFERENCES</small><h3>Indifference curves</h3><p>What combinations you like.</p></div><div class="panel"><small>${glossaryChip("constraint","CONSTRAINT")}</small><h3>Budget line</h3><p>What combinations income and prices allow.</p></div></div><div class="callout"><b>Consumer choice = preferences + constraint.</b></div>`;bindJargon();
  }
  else if(t==="budgetBuilder"){
    const budget=2000,pA=A.price,pB=B.price,maxA=Math.floor(budget/pA),maxB=Math.floor(budget/pB);const combos=[];for(let x=0;x<=maxA;x++){const rem=budget-x*pA;if(rem>=0&&rem%pB===0)combos.push({x,y:rem/pB})}
    m.innerHTML=`<div class="eyebrow">Step 9 • Build the budget line</div><h2>You have ₹${budget.toLocaleString()}.</h2><div class="priceStrip"><span>${A.emoji} ${A.name}: <b>₹${pA}</b></span><span>${B.emoji} ${B.name}: <b>₹${pB}</b></span></div><p>These combinations use the full budget:</p><div class="bundleRows">${combos.slice(0,7).map(c=>`<div class="bundleRow"><b>${c.x} ${A.unit}</b><span>+</span><b>${c.y} ${B.unit}</b><span>= ₹${budget}</span></div>`).join("")||`<div class="bundleRow">Prices do not create many exact integer combinations, so the graph can still include fractional quantities.</div>`}</div>${budgetGraph({budget,p1:pA,p2:pB})}<div class="definition"><b>Budget line</b><p>All combinations of two goods that exactly use the consumer's money income at the given prices.</p></div>`;
  }
  else if(t==="budgetEquation"){
    m.innerHTML=`<div class="eyebrow">Translate the picture</div><h2>The formula only says “money spent = money available.”</h2><div class="equation">P<sub>x</sub>X + P<sub>y</sub>Y = M</div><div class="grid3"><div class="term"><small>P<sub>x</sub>X</small><b>spending on X</b></div><div class="term"><small>P<sub>y</sub>Y</small><b>spending on Y</b></div><div class="term"><small>M</small><b>money income / budget</b></div></div><div class="questionCard"><b>With ₹2,000, if X costs ₹500 and Y costs ₹250, does 2X + 4Y use the full budget?</b><div class="miniAnswers">${optionButton("Yes",1,"ans eqAns")}${optionButton("No",0,"ans eqAns")}</div><div id="eqFb" class="feedback"></div></div>`;
    selectCards(".eqAns",b=>{if(Number(b.dataset.value)===1){feedback("eqFb","Yes. (2 × ₹500) + (4 × ₹250) = ₹1,000 + ₹1,000 = ₹2,000.");reward(25)}else{feedback("eqFb","Calculate each part: 2 × ₹500 = ₹1,000 and 4 × ₹250 = ₹1,000.",false);miss()}});
  }
  else if(t==="budgetZones"){
    m.innerHTML=`<div class="eyebrow">Step 10 • Read the budget graph</div><h2>Where can a bundle sit?</h2><div class="budgetZoneVisual"><div class="zone outside">OUTSIDE<br><small>too expensive</small></div><div class="zone on">ON THE LINE<br><small>affordable, full budget</small></div><div class="zone inside">INSIDE<br><small>affordable, money left</small></div></div><div class="answers">${[
      ["A bundle outside the line",0],["A bundle on the line",1],["A bundle inside the line",2]
    ].map(([x,v])=>optionButton(x,v,"ans zoneAns")).join("")}</div><p><b>Question:</b> which one is unaffordable?</p><div id="zoneFb" class="feedback"></div>`;
    selectCards(".zoneAns",b=>{if(Number(b.dataset.value)===0){feedback("zoneFb","Correct. Outside means its total cost exceeds the budget.");reward(20)}else{feedback("zoneFb","Inside and on the line are both affordable. Outside the line costs more than the available budget.",false);miss()}});
  }
  else if(t==="incomeShift"){
    const oldB=2000,newB=3000;
    m.innerHTML=`<div class="eyebrow">Step 11 • Income changes</div><h2>Someone gives you another ₹1,000.</h2><p>Prices stay the same. What happens to the budget line?</p>${budgetGraph({budget:oldB,second:{maxX:newB/A.price,maxY:newB/B.price}})}<div class="answers">${optionButton("It shifts outward because I can afford more of both goods.",1,"ans incomeAns")}${optionButton("It rotates because only one good changed.",0,"ans incomeAns")}</div><div id="incomeFb" class="feedback"></div>`;
    selectCards(".incomeAns",b=>{if(Number(b.dataset.value)===1){feedback("incomeFb","Yes. When income changes and both prices stay unchanged, both intercepts change. The budget line shifts in a parallel direction.");reward(25)}else{feedback("incomeFb","Rotation is the clue for a change in one price. An income change affects purchasing power for both goods.",false);miss()}});
  }
  else if(t==="priceRotate"){
    const budget=2000,newP=A.price/2;
    m.innerHTML=`<div class="eyebrow">Step 12 • One price changes</div><h2>${A.emoji} ${A.name} goes on sale.</h2><p>Your budget and the price of ${B.name.toLowerCase()} stay unchanged.</p>${budgetGraph({budget,second:{maxX:budget/newP,maxY:budget/B.price}})}<div class="callout"><b>Only the ${A.name} intercept moves.</b> Your maximum affordable ${B.name.toLowerCase()} does not change, so the line <b>rotates</b>.</div><div class="definition"><b>Memory hook:</b><p>Income change → shift. One price change → rotation.</p></div>`;
  }
  else if(t==="equilibriumGame"){
    m.innerHTML=`<div class="eyebrow">Final idea • Put both halves together</div><h2>Choose the best bundle you can actually reach.</h2><div class="equilibriumVisual"><div class="eqCurves"><div class="ic ic3">IC₃ <span>😍 but outside budget</span></div><div class="ic ic2">IC₂ <span>🎯 highest reachable</span></div><div class="ic ic1">IC₁ <span>🙂 affordable, but you can do better</span></div><div class="budgetDiag">Budget line</div></div></div><div class="grid3"><button class="choiceCard eqChoice" data-eq="low"><b>Point L</b><p>Affordable, lower IC</p></button><button class="choiceCard eqChoice" data-eq="touch"><b>Point E</b><p>Budget just touches highest reachable IC</p></button><button class="choiceCard eqChoice" data-eq="high"><b>Point H</b><p>Higher IC, outside budget</p></button></div><div id="eqGameFb" class="feedback"></div>`;
    selectCards(".eqChoice",b=>{const v=b.dataset.eq;if(v==="touch"){feedback("eqGameFb","🎯 Exactly. E gives the highest satisfaction level the consumer can actually afford. This is consumer equilibrium.");reward(35)}else if(v==="low"){feedback("eqGameFb","Affordable, yes — but not best. If a higher indifference curve is still reachable, the consumer can improve satisfaction.",false);miss()}else{feedback("eqGameFb","Desirable, but impossible with the current budget. Equilibrium must be attainable.",false);miss()}});
  }
  else if(t==="tangency"){
    m.innerHTML=`<div class="eyebrow">Why the touching point matters</div><h2>${glossaryChip("tangent","Tangency")} matches two trade-offs.</h2><div class="compare"><div class="panel"><small>YOUR TRADE-OFF</small><div class="equation">MRS<sub>xy</sub></div><p>How much Y you are willing to give up for more X.</p></div><div class="panel"><small>MARKET TRADE-OFF</small><div class="equation">P<sub>x</sub> / P<sub>y</sub></div><p>How much Y the market makes you give up through relative prices.</p></div></div><div class="heroEquation">MRS<sub>xy</sub> = P<sub>x</sub> / P<sub>y</sub></div><div class="callout">If these are not equal, you can usually rearrange the bundle and move to a higher satisfaction level. At equilibrium they match, and the IC is convex to the origin.</div>`;bindJargon();
  }
  else if(t==="boardCoach"){
    const steps=[
      {q:"Start with the meaning.",a:"Consumer equilibrium under ordinal utility is the position where the consumer obtains the maximum possible satisfaction from given income and prices."},
      {q:"Describe it on the graph.",a:"It occurs on the highest attainable indifference curve that the consumer can reach with the budget line."},
      {q:"State the main condition.",a:"At the equilibrium point, MRSxy = Px/Py; the slope of the indifference curve equals the slope of the budget line."},
      {q:"State the stability condition.",a:"The indifference curve must be convex to the origin, reflecting diminishing marginal rate of substitution."}
    ];
    state.board=Array.isArray(state.board)?state.board:[];
    const idx=Math.min(state.board.length,steps.length-1),done=state.board.length>=steps.length,cur=steps[idx];
    const distract=[
      "Consumer equilibrium is where total utility must become zero.",
      "The consumer always chooses equal quantities of both goods.",
      "Equilibrium occurs at any point inside the budget line."
    ];
    const opts=done?[]:[cur.a,...distract.slice(0,2)].sort(()=>Math.random()-.5);
    m.innerHTML=`<div class="eyebrow">ISC answer coach</div><h2>Build the answer one sentence at a time.</h2><div class="answerPreview"><h3>Your answer so far</h3>${state.board.length?state.board.map(x=>`<div class="answerLine">${x}</div>`).join(""):"<p class=\"mini\">Choose the best opening sentence.</p>"}</div>${done?`<div class="feedback show good"><b>Complete board answer built.</b> Notice the order: meaning → graph idea → equality condition → convexity condition.</div>`:`<div class="questionCard"><b>${cur.q}</b><div class="answers">${opts.map(x=>`<button class="ans coachAns" data-correct="${x===cur.a?1:0}" data-text="${encodeURIComponent(x)}">${x}</button>`).join("")}</div><div id="coachFb" class="feedback"></div></div>`}`;
    if(!done)selectCards(".coachAns",b=>{if(Number(b.dataset.correct)===1){state.board.push(decodeURIComponent(b.dataset.text));save();feedback("coachFb","Correct — that sentence belongs next.");reward(15);setTimeout(render,550)}else{feedback("coachFb","That sentence either uses the wrong theory or does not answer this step. Build the logic in order rather than dumping memorized phrases.",false);miss()}});
  }
  else if(t==="boss"){
    const qs=[
      {q:"A student says, ‘Ordinal utility means Bundle A gives 70 utils and Bundle B gives 50.’ What is wrong?",a:["Ordinal utility ranks bundles; it does not require numerical utility scores.","Nothing is wrong.","Ordinal utility only works when prices are equal."],c:0,h:"Ordinal = ranking, not exact numerical measurement."},
      {q:"Why does a typical indifference curve become convex to the origin?",a:["Because MRS diminishes as the bundle changes.","Because income always falls.","Because both prices must be equal."],c:0,h:"The willingness to sacrifice Y for another X usually falls."},
      {q:"Income rises while both prices stay unchanged. What happens to the budget line?",a:["It shifts outward in parallel.","It rotates around the Y-intercept.","It becomes an indifference curve."],c:0,h:"Income affects purchasing power for both goods."},
      {q:"At ordinal consumer equilibrium, what matches?",a:["MRSxy and Px/Py","TU and zero","The quantities of X and Y"],c:0,h:"Personal trade-off equals the market price trade-off."}
    ];
    const bq=qs[Number(state.bossIndex)||0];const done=(Number(state.bossIndex)||0)>=qs.length;
    if(done){m.innerHTML=`<div class="eyebrow">Final Boss defeated</div><h1>You can now reason through consumer choice.</h1><div class="feedback show good">You separated preference from affordability and connected MRS to the price ratio.</div><button class="btn primary" id="resetBoss">Play boss again</button>`;setTimeout(()=>{$("resetBoss").onclick=()=>{state.bossIndex=0;save();render()}},0)}
    else{m.innerHTML=`<div class="eyebrow">Final Boss • ${Number(state.bossIndex||0)+1}/${qs.length}</div><h2>${bq.q}</h2><div class="answers">${bq.a.map((x,i)=>`<button class="ans bossAns" data-i="${i}">${x}</button>`).join("")}</div><div id="bossFb" class="feedback"></div>`;selectCards(".bossAns",b=>{if(Number(b.dataset.i)===bq.c){feedback("bossFb","✓ Correct. "+bq.h);reward(25);state.bossIndex=(Number(state.bossIndex)||0)+1;save();setTimeout(render,650)}else{feedback("bossFb","Not quite. "+bq.h,false);miss()}})}
  }
  else {
    m.innerHTML=`<div class="eyebrow">Demand unit complete</div><h1>Consumer Choice Unlocked 🏆</h1><p class="big">You built the entire ordinal utility model from ordinary choices.</p><div class="grid2"><div class="definition"><b>Preferences</b><p>Ordinal ranking → indifference curves → MRS → diminishing MRS.</p></div><div class="definition"><b>Constraint</b><p>Income + prices → budget line → highest attainable IC.</p></div></div><div class="heroEquation">Consumer equilibrium: MRS<sub>xy</sub> = P<sub>x</sub>/P<sub>y</sub></div><div class="feedback show good">All six Demand missions complete. Next stop: Demand Final Boss / Elasticity.</div>`;
  }
  bindJargon();save();
}

$("next").addEventListener("click",()=>{if(state.i<screens.length-1){state.i++;save();render();window.scrollTo({top:0,behavior:"smooth"})}else{window.location.href="demand.html"}});
$("back").addEventListener("click",()=>{if(state.i>0){state.i--;save();render();window.scrollTo({top:0,behavior:"smooth"})}else{window.location.href="mission.html?mission=demand-5"}});
$("hint").addEventListener("click",showPageHelp);
$("sound").addEventListener("click",()=>{state.sound=!state.sound;save();header()});
setupMissionNavigation();render();
