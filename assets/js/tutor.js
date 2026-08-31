(function(){
  const API='/api/tutor';
  const isMission=!!document.getElementById('main');
  const params=new URLSearchParams(location.search);
  const missionId=params.get('mission')||'';
  const meta=(window.MISSION_META||{})[missionId]||{};
  const HISTORY_KEY='econ_tutor_history_v1';
  const DAILY_KEY='econ_tutor_daily_v1';
  let mode='tutor';
  let busy=false;

  function esc(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]))}
  function today(){return new Date().toISOString().slice(0,10)}
  function daily(){try{const x=JSON.parse(localStorage.getItem(DAILY_KEY)||'{}');return x.date===today()?x:{date:today(),requests:0,input_tokens:0,output_tokens:0}}catch{return {date:today(),requests:0,input_tokens:0,output_tokens:0}}}
  function saveDaily(d){localStorage.setItem(DAILY_KEY,JSON.stringify(d)); updateUsage()}
  function history(){try{return JSON.parse(sessionStorage.getItem(HISTORY_KEY)||'[]').slice(-8)}catch{return []}}
  function saveHistory(h){sessionStorage.setItem(HISTORY_KEY,JSON.stringify(h.slice(-8)))}

  const wrap=document.createElement('div');
  wrap.innerHTML=`
    <button class="tutorFab" id="tutorFab" type="button" aria-label="Open Economics Tutor"><span>✦</span><b>Tutor</b></button>
    <div class="tutorScrim" id="tutorScrim"></div>
    <aside class="tutorDrawer" id="tutorDrawer" aria-hidden="true">
      <div class="tutorHead">
        <div><div class="tutorKicker">Economics Rescue</div><h2>AI Tutor</h2><div class="tutorContext" id="tutorContext">Current lesson</div></div>
        <button class="tutorClose" id="tutorClose" type="button" aria-label="Close tutor">×</button>
      </div>
      <div class="tutorTabs" role="tablist">
        <button class="tutorTab active" data-mode="tutor" type="button">Explain</button>
        <button class="tutorTab" data-mode="check" type="button">Check answer</button>
        <button class="tutorTab" data-mode="review" type="button">Review mistake</button>
      </div>
      <div class="tutorBody">
        <div class="tutorQuick" id="tutorQuick">
          <button type="button" data-quick="Explain this more simply.">Explain simply</button>
          <button type="button" data-quick="Give me another concrete example of this concept.">Another example</button>
          <button type="button" data-quick="Explain the maths or graph on this page step by step.">Maths / graph</button>
          <button type="button" data-quick="What should I write in an ISC exam answer for this concept? Include the important scoring terms.">Exam wording</button>
          <button type="button" data-quick="Quiz me with one challenging question about this concept. Do not reveal the answer until I respond.">Quiz me</button>
        </div>
        <div class="tutorCheckFields hidden" id="tutorCheckFields">
          <label>Question<textarea id="tutorQuestion" rows="3" placeholder="Paste or edit the question"></textarea></label>
          <label>Your answer<textarea id="tutorAnswer" rows="5" placeholder="Type the answer you want checked"></textarea></label>
          <label class="tutorMarks">Marks (optional)<input id="tutorMarks" type="number" min="1" max="20" placeholder="e.g. 3"></label>
        </div>
        <div class="tutorReviewFields hidden" id="tutorReviewFields">
          <label>Question<textarea id="reviewQuestion" rows="3" placeholder="Question you lost marks on"></textarea></label>
          <label>Your answer<textarea id="reviewAnswer" rows="4" placeholder="What you wrote"></textarea></label>
          <label>Teacher feedback / expected answer (optional)<textarea id="reviewExpected" rows="3" placeholder="Paste any marking notes or expected points"></textarea></label>
        </div>
        <div class="tutorChat" id="tutorChat"><div class="tutorWelcome"><b>Ask about this page.</b><span>I can explain the concept, check a written answer, or help work through a mistake.</span></div></div>
      </div>
      <div class="tutorComposer">
        <textarea id="tutorInput" rows="2" placeholder="Ask a question…"></textarea>
        <button id="tutorSend" type="button">Send</button>
      </div>
      <div class="tutorFoot"><span id="tutorUsage">0 AI requests today</span><button id="tutorClear" type="button">Clear chat</button></div>
    </aside>`;
  document.body.append(...wrap.children);

  const drawer=document.getElementById('tutorDrawer'), scrim=document.getElementById('tutorScrim'), fab=document.getElementById('tutorFab');
  const input=document.getElementById('tutorInput'), chat=document.getElementById('tutorChat'), send=document.getElementById('tutorSend');
  const quick=document.getElementById('tutorQuick'), checkFields=document.getElementById('tutorCheckFields'), reviewFields=document.getElementById('tutorReviewFields');

  function currentSlide(){
    if(!isMission) return {label:document.querySelector('h1')?.textContent?.trim()||document.title, text:document.body.innerText.slice(0,5000)};
    const main=document.getElementById('main');
    const jump=document.getElementById('pageJump');
    const clone=main.cloneNode(true);
    clone.querySelectorAll('.helpBox,.examLens,.lessonStage,.feedback').forEach(x=>x.remove());
    return {label:jump?.selectedOptions?.[0]?.textContent?.replace(/^\d+\.\s*/, '')||main.querySelector('h2,h1')?.textContent||'', text:clone.innerText.trim().slice(0,6000)};
  }
  function markMagnets(){return [...document.querySelectorAll('.examLens .keyword,.keywordRow .keyword')].map(x=>x.textContent.trim()).filter(Boolean).slice(0,10)}
  function questionFromPage(){
    const card=document.querySelector('#main .questionCard')||document.querySelector('.bankQuestion');
    if(!card)return '';
    const c=card.cloneNode(true); c.querySelectorAll('.answers,.feedback,.examLens,details').forEach(x=>x.remove());
    return c.innerText.trim().slice(0,1200);
  }
  function context(){
    const slide=currentSlide();
    return {mission_id:missionId, unit:meta.unit||'', mission_title:meta.title||'', slide_label:slide.label, lesson_text:slide.text, mark_magnets:markMagnets()};
  }
  function updateContext(){const c=context();document.getElementById('tutorContext').textContent=[c.unit,c.mission_title,c.slide_label].filter(Boolean).join(' • ')||'Practice';}
  function updateUsage(){const d=daily();document.getElementById('tutorUsage').textContent=`${d.requests} AI request${d.requests===1?'':'s'} today`;}
  function openTutor(prefill){drawer.classList.add('open');scrim.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('tutorOpen');updateContext(); if(prefill){input.value=prefill;input.focus()}else input.focus()}
  function closeTutor(){drawer.classList.remove('open');scrim.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('tutorOpen')}
  fab.onclick=()=>openTutor(); document.getElementById('tutorClose').onclick=closeTutor; scrim.onclick=closeTutor;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))closeTutor()});

  // Expand the existing "I don't get it" action into the tutor drawer.
  const hint=document.getElementById('hint');
  if(hint){hint.textContent="Ask tutor"; hint.addEventListener('click',()=>{setTimeout(()=>document.querySelector('.helpBox')?.remove(),0);openTutor('I don’t get this. Explain it more simply.');});}

  document.querySelectorAll('.tutorTab').forEach(b=>b.onclick=()=>{
    mode=b.dataset.mode; document.querySelectorAll('.tutorTab').forEach(x=>x.classList.toggle('active',x===b));
    quick.classList.toggle('hidden',mode!=='tutor'); checkFields.classList.toggle('hidden',mode!=='check'); reviewFields.classList.toggle('hidden',mode!=='review');
    if(mode==='check'){document.getElementById('tutorQuestion').value ||= questionFromPage(); input.placeholder='Optional note: what are you unsure about?';}
    if(mode!=='check') drawer.dataset.expected='';
    else if(mode==='review'){document.getElementById('reviewQuestion').value ||= questionFromPage(); input.placeholder='Optional: what do you want to understand?';}
    else input.placeholder='Ask a question…';
  });

  quick.addEventListener('click',e=>{const b=e.target.closest('[data-quick]');if(!b)return;input.value=b.dataset.quick;sendMessage()});
  function bubble(role,text){const el=document.createElement('div');el.className='tutorMsg '+role;el.innerHTML=`<div class="tutorMsgRole">${role==='user'?'You':'Tutor'}</div><div class="tutorMsgText">${esc(text).replace(/\n/g,'<br>')}</div>`;chat.appendChild(el);chat.scrollTop=chat.scrollHeight;return el}
  function loading(){const el=document.createElement('div');el.className='tutorMsg assistant pending';el.innerHTML='<div class="tutorMsgRole">Tutor</div><div class="tutorDots"><i></i><i></i><i></i></div>';chat.appendChild(el);chat.scrollTop=chat.scrollHeight;return el}

  async function sendMessage(){
    if(busy)return;
    let message=input.value.trim();
    const payload={mode,context:context(),history:history()};
    if(mode==='check'){
      payload.question=document.getElementById('tutorQuestion').value.trim();
      payload.student_answer=document.getElementById('tutorAnswer').value.trim();
      payload.marks=document.getElementById('tutorMarks').value||null;
      payload.expected=drawer.dataset.expected||'';
      payload.message=message;
      if(!payload.question||!payload.student_answer){bubble('assistant','Add both the question and your answer first.');return;}
      message=message||'Check my answer.';
    }else if(mode==='review'){
      payload.question=document.getElementById('reviewQuestion').value.trim();
      payload.student_answer=document.getElementById('reviewAnswer').value.trim();
      payload.expected=document.getElementById('reviewExpected').value.trim();
      payload.expected=drawer.dataset.expected||'';
      payload.message=message;
      if(!payload.question||!payload.student_answer){bubble('assistant','Add the question and what you wrote first.');return;}
      message=message||'Help me understand what went wrong and how to improve.';
    }else{
      if(!message)return; payload.message=message;
    }
    bubble('user',message); input.value=''; busy=true;send.disabled=true;const wait=loading();
    try{
      const r=await fetch(API,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
      const data=await r.json().catch(()=>({}));
      wait.remove();
      if(!r.ok)throw new Error(data.error||`Tutor request failed (${r.status})`);
      bubble('assistant',data.response||'I could not generate a response.');
      const h=history();h.push({role:'user',content:message},{role:'assistant',content:data.response||''});saveHistory(h);
      const d=daily();d.requests++; if(data.usage){d.input_tokens+=(data.usage.prompt_tokens||data.usage.input_tokens||0);d.output_tokens+=(data.usage.completion_tokens||data.usage.output_tokens||0)} saveDaily(d);
    }catch(err){wait.remove();bubble('assistant',err.message.includes('AI binding')?'The tutor is built, but Cloudflare still needs the Workers AI binding named AI. Add it in Pages → Settings → Bindings, then redeploy.':`I couldn't reach the tutor: ${err.message}`)}
    finally{busy=false;send.disabled=false;input.focus()}
  }
  send.onclick=sendMessage; input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}});
  document.getElementById('tutorClear').onclick=()=>{sessionStorage.removeItem(HISTORY_KEY);chat.innerHTML='<div class="tutorWelcome"><b>Chat cleared.</b><span>Ask about the current page whenever you need help.</span></div>'};

  // Keep tutor context synced as mission pages change.
  if(isMission){new MutationObserver(()=>updateContext()).observe(document.getElementById('main'),{childList:true,subtree:false});}
  updateContext();updateUsage();
})();