
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
  [/marginal cost|MC/i,['addition to total cost','one more unit','ΔTC/ΔQ']],
  [/average cost|AFC|AVC/i,['cost per unit','AFC','AVC','AC']],
  [/long run|LAC|economies|scale/i,['all factors variable','LAC','economies of scale','diseconomies of scale']],
  [/producer.?s equilibrium|profit maxim|MR.?MC|equilibrium output/i,['profit maximisation','MR = MC','MC cuts MR from below','TR − TC maximum']],
  [/marginal revenue|MR/i,['addition to total revenue','one more unit','ΔTR/ΔQ']],
  [/average revenue|AR/i,['revenue per unit','TR/Q','AR = price']],
  [/law of demand|slopes down/i,['inverse relationship','price','quantity demanded','ceteris paribus']],
  [/shift|extension|contraction/i,['movement along curve','shift of curve','own price','non-price determinant']],
  [/utility|one more minute/i,['marginal utility','additional satisfaction','diminishing marginal utility']],
  [/indifference|MRS|bundle/i,['same satisfaction','MRS','diminishing MRS','convexity']],
  [/budget|equilibrium/i,['income constraint','price ratio','MRS = Px/Py','maximum satisfaction']]
 ];
 function currentLabel(){const s=document.getElementById('pageJump');return s?.selectedOptions?.[0]?.textContent||document.querySelector('#main h2,#main h1')?.textContent||''}
 function keys(){const label=currentLabel();for(const [re,k] of rules)if(re.test(label))return k;return fallback[id]||['define precisely','apply the theory','use economic terminology']}

 function stage(){const label=currentLabel();let text='Concept';if(/definition|formal|ISC|vocabulary/i.test(label))text='Theory & definition';if(/graph|curve|plot/i.test(label))text='Graph lab';if(/board|transfer|boss|assertion|exam|practice/i.test(label))text='Exam practice';const main=document.getElementById('main');if(!main)return;main.querySelector('.lessonStage')?.remove();const target=main.querySelector('.eyebrow');if(target){const el=document.createElement('div');el.className='lessonStage';el.textContent=text;target.before(el)}}
 function upgrade(){const fb=document.querySelector('#fb.feedback.show');if(!fb)return;let lens=fb.nextElementSibling;if(lens?.classList?.contains('examLens'))lens.remove();const k=keys();lens=document.createElement('div');lens.className='examLens';lens.innerHTML=`<div class="examLensTop"><div class="examLensTitle">🎯 Mark magnets</div><div class="examLensHint">Use these in a written answer</div></div><div class="keywordRow">${k.map(x=>`<span class="keyword">${x}</span>`).join('')}</div><div class="answerUpgrade"><b>Board upgrade:</b> Do not stop at the label. State the feature and explain its economic consequence.</div>`;fb.after(lens)}
 const obs=new MutationObserver(()=>{upgrade();stage()});obs.observe(document.getElementById('main'),{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
 document.addEventListener('click',e=>{if(e.target.closest('.ans,.q'))setTimeout(()=>{upgrade();stage()},40)});setTimeout(stage,120);
})();
