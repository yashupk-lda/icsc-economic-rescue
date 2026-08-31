
(function(){
 const unit=new URLSearchParams(location.search).get('unit')||'market',d=window.REVIEW_DATA[unit];
 if(!d){location.href='menu.html';return}
 document.title=`${d.title} Revision Hub — Economics Rescue`;
 document.getElementById('reviewTitle').textContent=d.title+' Revision Hub';document.getElementById('reviewSub').textContent=d.subtitle;
 document.getElementById('unitLink').href=unit==='market'?'market.html':unit==='cost'?'cost.html':'demand.html';
 document.getElementById('unitLink').textContent='← '+d.title+' map';
 const defs=d.definitions.map(x=>`<article class="definitionCard"><h3>${x[0]}</h3><p class="exam"><b>Board-ready:</b> ${x[1]}</p><p class="plain"><b>Plain English:</b> ${x[2]}</p><div class="keywordRow">${x[3].map(k=>`<span class="keyword">${k}</span>`).join('')}</div></article>`).join('');
 const summary=d.summary.map(x=>`<div class="summaryCard"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');
 const jargon=d.jargon.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td><b>${x[2]}</b></td></tr>`).join('');
 const mistakes=d.mistakes.map(x=>`<div class="mistake"><div class="wrongSide"><b>Weak / risky</b><br>${x[0]}</div><div class="rightSide"><b>Better</b><br>${x[1]}</div></div>`).join('');
 const challenges=d.challenges.map((x,i)=>`<article class="challengeCard"><div class="difficulty">Application ${i+1}</div><h3>${x[0]}</h3><details><summary>Show answer</summary><p>${x[1]}</p></details></article>`).join('');
 document.getElementById('summaryGrid').innerHTML=summary;document.getElementById('definitionGrid').innerHTML=defs;document.getElementById('jargonRows').innerHTML=jargon;document.getElementById('mistakeGrid').innerHTML=mistakes;document.getElementById('challengeList').innerHTML=challenges;
 const masterWrap=document.getElementById('masterWrap');if(unit!=='market'){document.querySelector('a[href="#master"]')?.remove();}
 if(unit==='market'&&d.master){masterWrap.innerHTML=`<div class="reviewSection" id="master"><div class="eyebrow">Master comparison</div><h2>Market structure comparison</h2><p>Sellers, buyers, product, price influence, entry conditions and firm demand/revenue curves.</p><div class="tableWrap"><table class="masterTable"><thead><tr><th>Market</th><th>Sellers</th><th>Buyers</th><th>Product</th><th>Price power</th><th>Entry</th><th>Firm revenue / demand</th><th>Mark magnet</th></tr></thead><tbody>${d.master.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="markBox"><b>Exam warning:</b> “Price maker” means a degree of control over price—not unlimited freedom to charge anything.</div></div>`}
 document.getElementById('bankLink').href='question-bank.html?unit='+unit;
})();
