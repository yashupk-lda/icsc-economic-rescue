(function(){
 const id=new URLSearchParams(location.search).get('mission')||'';
 const fallback={
  'demand-1':['ceteris paribus','inverse relationship','price','quantity demanded'],
  'demand-2':['individual demand','market demand','horizontal summation','schedule'],
  'demand-3':['substitution effect','income effect','diminishing marginal utility','ceteris paribus'],
  'demand-4':['total utility','marginal utility','diminishing MU','consumer equilibrium'],
  'demand-5':['equi-marginal utility','MU per rupee','maximum satisfaction','allocation'],
  'demand-6':['indifference curve','MRS','budget line','consumer equilibrium'],
  'market-1':['buyers and sellers','nature of product','entry barriers','price influence'],
  'market-2':['large number of sellers','homogeneous product','price taker','prevailing market price'],
  'market-3':['single seller','no close substitutes','barriers to entry','degree of control over price'],
  'market-4':['large number of firms','product differentiation','close substitutes','selling costs'],
  'market-5':['few sellers','mutual interdependence','rival reaction','barriers to entry'],
  'market-6':['firm demand curve','AR','MR','price power'],
  'cost-1':['opportunity cost','next-best alternative','explicit cost','implicit cost'],
  'cost-2':['short run','fixed cost','variable cost','TC = TFC + TVC'],
  'cost-3':['cost per unit','AFC','AVC','AC','marginal cost'],
  'cost-4':['MC < AC','MC > AC','minimum point','U-shaped curve'],
  'cost-5':['long run','LAC','LMC','economies of scale','diseconomies of scale'],
  'cost-6':['total revenue','average revenue','marginal revenue','TR = P × Q'],
  'cost-7':['P = AR = MR','price taker','MR < AR','revenue curves'],
  'cost-8':['profit maximisation','TR − TC maximum','MR = MC','MC cuts MR from below']
 };
 const rules=[
  [/oligopoly|few giant|interdepend/i,['few sellers','mutual interdependence','rival reaction','strategic behaviour']],
  [/monopoly|only seller/i,['single seller','no close substitutes','barriers to entry','degree of control over price']],
  [/monopolistic|brand|differen/i,['large number of firms','product differentiation','close substitutes','selling costs']],
  [/perfect competition|price taker|set the price/i,['large number of sellers','homogeneous product','prevailing market price','price taker']],
  [/monopsony|one buyer/i,['single buyer','many sellers','buyer-side market power']],
  [/opportunity/i,['next-best alternative','sacrificed','scarcity','choice']],
  [/economic cost|implicit|explicit/i,['explicit cost','implicit cost','opportunity cost','economic cost']],
  [/social cost|external|private cost/i,['private cost','external cost','third party','social cost']],
  [/fixed|variable|total cost/i,['short run','TFC','TVC','TC = TFC + TVC']],
  [/marginal cost|\bMC\b/i,['addition to total cost','one more unit','ΔTC/ΔQ']],
  [/average cost|\bAFC\b|\bAVC\b/i,['cost per unit','AFC','AVC','AC']],
  [/long run|\bLAC\b|economies|scale/i,['all factors variable','LAC','economies of scale','diseconomies of scale']],
  [/producer.?s equilibrium|profit maxim|MR.?MC|equilibrium output/i,['profit maximisation','MR = MC','MC cuts MR from below','TR − TC maximum']],
  [/marginal revenue|\bMR\b/i,['addition to total revenue','one more unit','ΔTR/ΔQ']],
  [/average revenue|\bAR\b/i,['revenue per unit','TR/Q','AR = price']],
  [/law of demand|slopes down/i,['inverse relationship','price','quantity demanded','ceteris paribus']],
  [/shift|extension|contraction/i,['movement along curve','shift of curve','own price','non-price determinant']],
  [/utility|one more minute/i,['marginal utility','additional satisfaction','diminishing marginal utility']],
  [/indifference|\bMRS\b|bundle/i,['same satisfaction','MRS','diminishing MRS','convexity']],
  [/budget|equilibrium/i,['income constraint','price ratio','MRS = Px/Py','maximum satisfaction']]
 ];
 const main=document.getElementById('main');
 if(!main)return;
 let scheduled=false;
 function currentLabel(){const s=document.getElementById('pageJump');return s?.selectedOptions?.[0]?.textContent||main.querySelector('h2,h1')?.textContent||''}
 function keys(){const label=currentLabel();for(const [re,k] of rules)if(re.test(label))return k;return fallback[id]||['define precisely','apply the theory','use economic terminology']}
 function stage(){
   const label=currentLabel();
   let text='Concept';
   if(/definition|formal|ISC|vocabulary/i.test(label))text='Theory & definition';
   if(/graph|curve|plot/i.test(label))text='Graph lab';
   if(/board|transfer|boss|assertion|exam|practice/i.test(label))text='Exam practice';
   let el=main.querySelector(':scope > .lessonStage');
   const target=main.querySelector('.eyebrow');
   if(!target)return;
   if(!el){el=document.createElement('div');el.className='lessonStage';el.textContent=text;target.before(el);return;}
   if(el.textContent!==text)el.textContent=text;
 }
 function upgrade(){
   const fb=main.querySelector('#fb.feedback.show');
   if(!fb)return;
   const k=keys();
   const signature=k.join('|');
   let lens=fb.nextElementSibling;
   if(!lens?.classList?.contains('examLens')){
     lens=document.createElement('div');
     lens.className='examLens';
     fb.after(lens);
   }
   if(lens.dataset.signature===signature)return;
   lens.dataset.signature=signature;
   lens.innerHTML=`<div class="examLensTop"><div class="examLensTitle">🎯 Mark magnets</div><div class="examLensHint">Use these in a written answer</div></div><div class="keywordRow">${k.map(x=>`<span class="keyword">${x}</span>`).join('')}</div><div class="answerUpgrade"><b>Board upgrade:</b> State the feature and explain its economic consequence.</div>`;
 }
 function refresh(){scheduled=false;upgrade();stage()}
 function scheduleRefresh(){if(scheduled)return;scheduled=true;requestAnimationFrame(refresh)}
 const obs=new MutationObserver(mutations=>{
   // Ignore mutations made only inside the Exam Lens itself.
   const relevant=mutations.some(mu=>{
     const target=mu.target.nodeType===1?mu.target:mu.target.parentElement;
     return !target?.closest?.('.examLens,.lessonStage');
   });
   if(relevant)scheduleRefresh();
 });
 obs.observe(main,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
 document.addEventListener('click',e=>{if(e.target.closest('.ans,.q'))setTimeout(scheduleRefresh,40)});
 scheduleRefresh();
})();
