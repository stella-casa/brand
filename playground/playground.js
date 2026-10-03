(() => {
  const data=JSON.parse(document.querySelector('#playground-data').textContent);
  const logos=data.logos;
  const palettes=data.palettes;
  const types=data.types;
  const illustrations=data.illustrations;
  const $=selector=>document.querySelector(selector);
  const controls={logo:$('#logo-select'),palette:$('#palette-select'),type:$('#type-select'),ill:$('#ill-select')};
  const defaults={logo:'01',palette:'C00',type:'T00',ill:'I00'};
  const fields={
    ink:['--ink','--color-ink'],paper:['--paper','--color-paper'],accent:['--accent','--color-accent'],second:['--second','--color-second']
  };
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const imagePath=name=>name;

  function options(){
    controls.logo.innerHTML=logos.map(l=>`<option value="${escape(l.number)}">${escape(l.number)} / ${escape(l.name)}</option>`).join('');
    controls.palette.innerHTML=palettes.map(c=>`<option value="${escape(c.id)}">${escape(c.id)} / ${escape(c.name)}</option>`).join('');
    controls.type.innerHTML=types.map(t=>`<option value="${escape(t.id)}">${escape(t.id)} / ${escape(t.name)}</option>`).join('');
    controls.ill.innerHTML=illustrations.map(i=>`<option value="${escape(i.id)}">${escape(i.id)} / ${escape(i.name)}</option>`).join('');
  }
  function logoBy(value){return logos.find(l=>l.number===value)||logos[0]}
  function paletteBy(value){return palettes.find(c=>c.id===value)||palettes[0]}
  function typeBy(value){return types.find(t=>t.id===value)||types[0]}
  function illBy(value){return illustrations.find(i=>i.id===value)||illustrations[0]}
  function current(){return {logo:controls.logo.value,palette:controls.palette.value,type:controls.type.value,ill:controls.ill.value}}
  function setFromUrl(){
    const params=new URLSearchParams(location.search);
    const state={logo:params.get('logo')||defaults.logo,palette:params.get('palette')||defaults.palette,type:params.get('type')||defaults.type,ill:params.get('ill')||defaults.ill};
    if(!logos.some(x=>x.number===state.logo))state.logo=defaults.logo;
    if(!palettes.some(x=>x.id===state.palette))state.palette=defaults.palette;
    if(!types.some(x=>x.id===state.type))state.type=defaults.type;
    if(!illustrations.some(x=>x.id===state.ill))state.ill=defaults.ill;
    document.body.classList.toggle('landing-mode',params.get('view')==='landing');
    for(const [key,value] of Object.entries(state))controls[key==='logo'?'logo':key==='palette'?'palette':key==='type'?'type':'ill'].value=value;
  }
  function renderGallery(){
    $('#illustration-gallery').innerHTML=illustrations.map(i=>`<button class="ill-card" type="button" data-id="${escape(i.id)}" aria-pressed="false" aria-label="Scegli ${escape(i.name)}"><img src="${imagePath(i.image)}" alt="" loading="lazy"><span class="ill-meta"><span>${escape(i.id)} / ${escape(i.character)}</span><h3>${escape(i.name)}</h3><p>${escape(i.description)}</p><small><b>Accento</b> ${escape(i.accent)}</small><small><b>Da tenere fermo</b> ${escape(i.rules)}</small></span></button>`).join('');
    $('#logo-gallery').innerHTML=logos.map(l=>`<a class="logo-choice" href="${imagePath(l.image)}" target="_blank" rel="noopener"><img src="${imagePath(l.image)}" width="1536" height="1024" alt="Tavola completa / ${escape(l.name)}" loading="lazy"><span class="logo-meta"><strong>${escape(l.number)} / ${escape(l.name)}</strong><span>${escape(l.description)}</span></span></a>`).join('');
  }
  function render(){
    const selected=current(),logo=logoBy(selected.logo),color=paletteBy(selected.palette),type=typeBy(selected.type),illustration=illBy(selected.ill);
    const live=$('#live'),root=live.style;
    for(const [name,[token]] of Object.entries(fields))root.setProperty(token,color.colors[{ink:0,paper:1,accent:2,second:3}[name]]);
    root.setProperty('--heading',`"${type.display}"`);root.setProperty('--body',`"${type.body}"`);root.setProperty('--ui',`"${type.ui}"`);
    root.setProperty('--head-weight',String(type.weight));root.setProperty('--variations',type.settings||'normal');
    root.setProperty('--mark-mask',`url("data:image/png;base64,${logo.maskData}")`);root.setProperty('--mark-ratio',logo.markRatio);root.setProperty('--mark-ink',color.colors[0]);root.setProperty('--mark-paper',color.colors[1]);
    root.setProperty('--symbol-mask',`url("data:image/png;base64,${logo.symbolData}")`);root.setProperty('--symbol-ratio',logo.symbolRatio);root.setProperty('--symbol-ink',color.colors[0]);root.setProperty('--symbol-ground',color.colors[2]);
    const colorImage=illustration.colorImages[color.id]||illustration.image;
    for(const id of ['site-image','blog-image','social-image','facebook-image','welcome-image']){$('#'+id).src=imagePath(colorImage);$('#'+id).alt=`${illustration.name} / ${color.id} / ${illustration.description}`;}
    document.querySelectorAll('#instagram-feed .feed-tile img').forEach(img=>{img.src=imagePath(colorImage);img.alt=`${illustration.name} / ${color.id}`;});
    $('#landing-method-image').src=imagePath(colorImage);
    $('#landing-method-image').alt=`${illustration.name} ricolorata con ${color.id}, usata per spiegare il metodo`;
    document.querySelectorAll('.ill-card').forEach(button=>{const item=illBy(button.dataset.id);const image=button.querySelector('img');image.src=imagePath(item.colorImages[color.id]||item.image);image.alt=`${item.name} / ${color.id}`;});
    $('#logo-original').href=imagePath(logo.image);$('#logo-original').textContent=`Apri la tavola ${logo.number} / ${logo.name} ↗`;
    $('#logo-crop').setAttribute('aria-label',`Segno e lettering ${logo.number} / ${logo.name} ricolorati in ${color.names[0]} ${color.colors[0]}; apri la tavola per vedere il colore esplorato originale`);
    const summary=`${logo.number} ${logo.name} / ${color.id} ${color.name} / ${type.id} ${type.name} / ${illustration.id} ${illustration.name}`;
    $('#selection-summary').textContent=summary;$('#selection-summary-mobile').textContent=summary;
    $('#live-codes').textContent=`${color.id}　${type.id}　${illustration.id}`;
    $('#palette-character').textContent=`${color.id} / ${color.name} · ${color.character}`;
    $('#palette-description').textContent=`${color.description} ${color.physical}`;
    $('#swatches').innerHTML=color.colors.map((hex,i)=>`<div class="swatch" style="background:${hex};color:${i===1?'#29262d':'#fff'}"><span>${escape(color.names[i])}</span><b>${escape(['Inchiostro','Carta','Accento','Secondario'][i])}</b><span class="hex">${escape(hex)}</span></div>`).join('');
    $('#logo-stamp>span').textContent=`${logo.number} / ${logo.name} · inchiostro ${color.colors[0]} · carta ${color.colors[1]}`;
    for(const id of ['site-mark','blog-mark','welcome-mark']){$('#'+id).setAttribute('aria-label',`Logo ${logo.number} / ${logo.name}`);}
    $('#social-avatar').setAttribute('aria-label',`Simbolo ${logo.number} / ${logo.name}, in ${color.names[0]} su fondo ${color.names[2]}`);
    document.querySelectorAll('.ill-card').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.id===illustration.id)));
    const query=new URLSearchParams(selected);if(document.body.classList.contains('landing-mode'))query.set('view','landing');history.replaceState(null,'',`${location.pathname}?${query.toString()}${location.hash}`);
  }
  options();renderGallery();setFromUrl();render();
  Object.values(controls).forEach(select=>select.addEventListener('change',render));
  $('#illustration-gallery').addEventListener('click',event=>{const button=event.target.closest('.ill-card');if(!button)return;controls.ill.value=button.dataset.id;render();$('#componi').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
  $('#reset').addEventListener('click',()=>{for(const [key,value] of Object.entries(defaults))controls[key].value=value;render();$('#copy-status').textContent='Punto di partenza ripristinato.';});
  $('#copy').addEventListener('click',async()=>{const status=$('#copy-status');try{await navigator.clipboard.writeText(location.href);status.textContent='Indirizzo copiato: puoi condividere questa combinazione.';}catch{status.textContent='Copia l’indirizzo dalla barra del browser per condividere la combinazione.';}});
  $('#landing-view-link').addEventListener('click',event=>{event.preventDefault();document.body.classList.add('landing-mode');const query=new URLSearchParams(current());query.set('view','landing');history.pushState(null,'',`${location.pathname}?${query.toString()}`);render();$('#landing-top').scrollIntoView({behavior:'auto',block:'start'});});
  $('#landing-exit').addEventListener('click',event=>{event.preventDefault();document.body.classList.remove('landing-mode');const query=new URLSearchParams(current());history.pushState(null,'',`${location.pathname}?${query.toString()}`);render();$('#componi').scrollIntoView({behavior:'auto',block:'start'});});
  addEventListener('popstate',()=>{document.body.classList.toggle('landing-mode',new URLSearchParams(location.search).get('view')==='landing');render();});
  $('#owner-demo-form').addEventListener('submit',event=>{event.preventDefault();const values=Object.fromEntries(new FormData(event.currentTarget).entries());const clean=Object.entries(values).filter(([,value])=>String(value).trim()).map(([key,value])=>`${key}: ${String(value).trim()}`);$('#owner-form-output').textContent=clean.length?`Riepilogo locale, non inviato:\n${clean.join('\n')}`:'Aggiungi i campi richiesti per vedere il riepilogo. Nessun dato viene salvato.';});
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});history.replaceState(null,'',`${location.pathname}${location.search}${link.getAttribute('href')}`);}}));
})();
