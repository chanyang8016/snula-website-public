(function(){
 var out=[];
 var skip=function(e){return e.closest('#gnb')||e.closest('#quick_menu')||e.closest('footer')||e.closest('.btn_top_m');};
 [].forEach.call(document.querySelectorAll('body *'),function(e){
  if(skip(e)) return;
  var c=getComputedStyle(e), r=e.getBoundingClientRect();
  var w=parseFloat(c.borderLeftWidth)||0;
  if(w>=1.5 && c.borderLeftStyle!=='none' && r.height>=30 && r.width>40){
   out.push({kind:'border', t:e.tagName+'.'+((e.className&&e.className.baseVal!==undefined)?e.className.baseVal:(e.className||'')).toString().slice(0,40), w:c.borderLeftWidth, col:c.borderLeftColor, h:Math.round(r.height)});
  }
  var b=getComputedStyle(e,'::before');
  if(b.content&&b.content!=='none'&&b.position==='absolute'){
   var bw=parseFloat(b.width)||0, bh=parseFloat(b.height)||0;
   if(bw>0&&bw<=6&&bh>=30&&b.backgroundColor!=='rgba(0, 0, 0, 0)'){
    out.push({kind:'::before', t:e.tagName+'.'+((e.className||'')+'').slice(0,40), w:b.width, col:b.backgroundColor, h:Math.round(bh)});
   }}
 });
 var u={},res=[];
 out.forEach(function(o){var k=o.kind+'|'+o.t+'|'+o.w+'|'+o.col; if(!u[k]){u[k]=1;res.push(o);} });
 return {page:document.title, bars:res.slice(0,18)};
})()
