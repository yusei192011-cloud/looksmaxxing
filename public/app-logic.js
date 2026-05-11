'use strict';

// ── I18N ──────────────────────────────────────────────────
const LANGS = {
  ja:{
    tab_record:'トレーニング',tab_history:'記録',tab_progress:'進捗',tab_status:'ランク',
    grp_placeholder:'部位を選択',sec_group:'部位',sec_exercise:'種目',sec_weight:'重量',sec_rest:'休憩時間',
    ph_ex:'例: ベンチプレス',
    lbl_reps:'回数',lbl_sets:'セット数',u_reps:'回',u_sets:'セット',
    btn_start:'LET\'S GO',btn_log:'ログだけ保存',wpl_preset:'プリセット & 調整',
    f7d:'7日間',f30d:'30日間',f90d:'90日間',fall:'全期間',
    fall_ex:'全種目',sel_ex:'種目を選択',
    m_weight:'最大重量',m_volume:'ボリューム',
    wo_ttl:'ワークアウト',wo_set_lbl:'SET',wo_rest_lbl:'REST',
    wo_rest_done:"LET'S START TRAINING!!",btn_done:'DONE ✓',btn_next:'NEXT SET →',
    wo_complete:'COMPLETE!',
    dlg_ttl:'ワークアウトをリセット',dlg_body:'どうしますか？',
    dlg_save:'完了したセットを保存',dlg_disc:'破棄する',dlg_cancel:'キャンセル',
    empty:'記録がありません',today:'今日',yesterday:'昨日',dago:'日前',no_data:'データなし',
    tab_weight:'体重',
    sec_bodyweight:'体重',sec_targetweight:'目標体重',
    btn_weight_save:'体重を記録',weightSaved:'記録しました ✓',
    hf_all:'全て',hf_workout:'ワークアウト',hf_weight:'体重',m_group:'部位別',
  },
  en:{
    tab_record:'TRAIN',tab_history:'LOG',tab_progress:'STATS',tab_status:'RANK',
    grp_placeholder:'SELECT GROUP',sec_group:'MUSCLE GROUP',sec_exercise:'EXERCISE',sec_weight:'WEIGHT',sec_rest:'REST TIME',
    ph_ex:'e.g. Bench Press',
    lbl_reps:'REPS',lbl_sets:'SETS',u_reps:'reps',u_sets:'sets',
    btn_start:'LET\'S GO',btn_log:'Quick Log',wpl_preset:'PRESET & ADJUST',
    f7d:'7 days',f30d:'30 days',f90d:'90 days',fall:'All time',
    fall_ex:'All exercises',sel_ex:'Select exercise',
    m_weight:'Max Weight',m_volume:'Volume',
    wo_ttl:'WORKOUT',wo_set_lbl:'SET',wo_rest_lbl:'REST',
    wo_rest_done:"LET'S START TRAINING!!",btn_done:'DONE ✓',btn_next:'NEXT SET →',
    wo_complete:'COMPLETE!',
    dlg_ttl:'Reset Workout',dlg_body:'What would you like to do?',
    dlg_save:'Save completed sets',dlg_disc:'Discard',dlg_cancel:'Cancel',
    empty:'No records yet',today:'Today',yesterday:'Yesterday',dago:' days ago',no_data:'No data',
    tab_weight:'WEIGHT',
    sec_bodyweight:'BODY WEIGHT',sec_targetweight:'TARGET WEIGHT',
    btn_weight_save:'RECORD WEIGHT',weightSaved:'Saved ✓',
    hf_all:'ALL',hf_workout:'WORKOUT',hf_weight:'WEIGHT',m_group:'By Group',
  },
  ko:{
    tab_record:'트레이닝',tab_history:'기록',tab_progress:'진행',tab_status:'랭크',
    stat_total:'총 기록',stat_week:'이번 주',stat_streak:'연속',
    grp_placeholder:'부위 선택',sec_exercise:'운동',sec_weight:'중량',sec_rest:'휴식 시간',
    ph_ex:'예: 벤치프레스',
    lbl_reps:'횟수',lbl_sets:'세트',u_reps:'회',u_sets:'세트',
    btn_start:'LET\'S GO',btn_log:'빠른 저장',
    f7d:'7일',f30d:'30일',f90d:'90일',fall:'전체',
    fall_ex:'전체 운동',sel_ex:'운동 선택',
    m_weight:'최대 중량',m_volume:'볼륨',
    wo_ttl:'워크아웃',wo_set_lbl:'세트',wo_rest_lbl:'휴식',
    wo_rest_done:"LET'S START TRAINING!!",btn_done:'완료 ✓',btn_next:'다음 세트 →',
    wo_complete:'완료!',
    dlg_ttl:'운동 초기화',dlg_body:'어떻게 하시겠습니까?',
    dlg_save:'완료된 세트 저장',dlg_disc:'삭제',dlg_cancel:'취소',
    empty:'기록 없음',today:'오늘',yesterday:'어제',dago:'일 전',no_data:'데이터 없음',
    tab_weight:'WEIGHT',
    sec_bodyweight:'체중',sec_targetweight:'목표 체중',
    btn_weight_save:'체중 기록',weightSaved:'저장됨 ✓',
    hf_all:'전체',hf_workout:'운동',hf_weight:'체중',m_group:'부위별',
  },
  zh:{
    tab_record:'训练',tab_history:'记录',tab_progress:'进度',tab_status:'排名',
    stat_total:'总计',stat_week:'本周',stat_streak:'连续',
    grp_placeholder:'选择部位',sec_exercise:'动作',sec_weight:'重量',sec_rest:'休息时间',
    ph_ex:'例如: 卧推',
    lbl_reps:'次数',lbl_sets:'组数',u_reps:'次',u_sets:'组',
    btn_start:'LET\'S GO',btn_log:'快速记录',
    f7d:'7天',f30d:'30天',f90d:'90天',fall:'全部',
    fall_ex:'所有动作',sel_ex:'选择动作',
    m_weight:'最大重量',m_volume:'训练量',
    wo_ttl:'训练',wo_set_lbl:'组',wo_rest_lbl:'休息',
    wo_rest_done:"LET'S START TRAINING!!",btn_done:'完成 ✓',btn_next:'下一组 →',
    wo_complete:'完成!',
    dlg_ttl:'重置训练',dlg_body:'请选择操作',
    dlg_save:'保存已完成的组',dlg_disc:'放弃',dlg_cancel:'取消',
    empty:'暂无记录',today:'今天',yesterday:'昨天',dago:'天前',no_data:'无数据',
    tab_weight:'WEIGHT',
    sec_bodyweight:'体重',sec_targetweight:'目标体重',
    btn_weight_save:'记录体重',weightSaved:'已保存 ✓',
    hf_all:'全部',hf_workout:'训练',hf_weight:'体重',m_group:'部位',
  },
  es:{
    tab_record:'TRAIN',tab_history:'LOG',tab_progress:'PROGRESO',tab_status:'RANGO',
    stat_total:'TOTAL',stat_week:'ESTA SEMANA',stat_streak:'RACHA',
    grp_placeholder:'SELECCIONAR',sec_exercise:'EJERCICIO',sec_weight:'PESO',sec_rest:'DESCANSO',
    ph_ex:'Ej: Press de banca',
    lbl_reps:'REPS',lbl_sets:'SERIES',u_reps:'reps',u_sets:'series',
    btn_start:'LET\'S GO',btn_log:'Guardar rápido',
    f7d:'7 días',f30d:'30 días',f90d:'90 días',fall:'Todo',
    fall_ex:'Todos',sel_ex:'Seleccionar ejercicio',
    m_weight:'Peso máx.',m_volume:'Volumen',
    wo_ttl:'ENTRENAMIENTO',wo_set_lbl:'SERIE',wo_rest_lbl:'DESCANSO',
    wo_rest_done:"LET'S START TRAINING!!",btn_done:'HECHO ✓',btn_next:'SIGUIENTE →',
    wo_complete:'¡COMPLETADO!',
    dlg_ttl:'Reiniciar',dlg_body:'¿Qué deseas hacer?',
    dlg_save:'Guardar series completadas',dlg_disc:'Descartar',dlg_cancel:'Cancelar',
    empty:'Sin registros',today:'Hoy',yesterday:'Ayer',dago:' días atrás',no_data:'Sin datos',
    tab_weight:'PESO',
    sec_bodyweight:'PESO CORPORAL',sec_targetweight:'PESO OBJETIVO',
    btn_weight_save:'GUARDAR PESO',weightSaved:'Guardado ✓',
    hf_all:'TODO',hf_workout:'ENTRENO',hf_weight:'PESO',m_group:'Por grupo',
  },
};

let lang = localStorage.getItem('lang') || 'ja';
function t(k){ return (LANGS[lang]||LANGS.en)[k] || LANGS.en[k] || k; }

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.getElementById('ex-inp').placeholder = t('ph_ex');
  document.getElementById('lang-btn').textContent = lang.toUpperCase() + ' ▾';
  document.querySelectorAll('.lang-opt').forEach(el => el.classList.toggle('on', el.dataset.l === lang));
  document.querySelectorAll('option[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  renderGrpBtns();
  updateStats();
  renderHistory();
  if(document.getElementById('tb-status').classList.contains('on')) renderStatus();
}
window.setLang = function(l){
  lang = l; localStorage.setItem('lang', l);
  document.getElementById('lang-dd').classList.remove('open');
  applyLang();
};
window.toggleLang = function(){ document.getElementById('lang-dd').classList.toggle('open'); };
document.addEventListener('click', e => {
  if(!e.target.closest('#lang-btn') && !e.target.closest('#lang-dd'))
    document.getElementById('lang-dd').classList.remove('open');
});

// ── STORAGE ───────────────────────────────────────────────
const KEY = 'workout_records_v2';
function loadRecs(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); } catch{ return []; } }
function saveRecs(r){ localStorage.setItem(KEY, JSON.stringify(r)); }

const WEIGHT_KEY = 'weight_records_v1';
const TARGET_W_KEY = 'target_weight_v1';
function loadWeightRecs(){ try{ return JSON.parse(localStorage.getItem(WEIGHT_KEY)||'[]'); } catch{ return []; } }
function saveWeightRecs(r){ localStorage.setItem(WEIGHT_KEY, JSON.stringify(r)); }
function loadTargetW(){ const v=parseFloat(localStorage.getItem(TARGET_W_KEY)); return isNaN(v)?65.0:v; }

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ── STATE ─────────────────────────────────────────────────
let curW = 60, curR = 10, curS = 3, curRest = 90, curMetric = 'weight';
let curGroup = '';
let curBodyW = 70.0, curTargetW = 65.0, weightChart = null;
let histType = 'all', histGroup = '', progSection = 'workout';

// ── WEIGHT CONTROLS ───────────────────────────────────────
const W_PRESETS = [5,10,15,20,25,30,35,40,50,60,70,80,90,100,110,120,140,160];
function initPresets(){
  document.getElementById('wpbtns').innerHTML = W_PRESETS.map(w =>
    `<button class="wpb${w===curW?' on':''}" onclick="setW(${w})">${w}</button>`
  ).join('');
}
window.setW = function setW(w){
  curW = Math.max(0, Math.round(w * 2) / 2);
  const v = curW % 1 === 0 ? String(curW) : curW.toFixed(1);
  document.getElementById('wval').textContent = v;
  document.getElementById('wpl-cur').textContent = v + 'kg';
  document.querySelectorAll('.wpb').forEach(b => b.classList.toggle('on', Number(b.textContent) === curW));
};
window.adjW = function(d){ window.setW(curW + d); };
window.togglePresets = function(){
  const btns = document.getElementById('wpbtns');
  const adj  = document.getElementById('wadj');
  const arrow = document.getElementById('wpl-arrow');
  const open = btns.style.display === 'flex';
  btns.style.display = open ? 'none' : 'flex';
  adj.style.display  = open ? 'none' : 'flex';
  arrow.style.transform = open ? '' : 'rotate(180deg)';
};

// ── AUDIO ─────────────────────────────────────────────────
let _audioCtx = null;
function getAudioCtx(){
  if(!_audioCtx) _audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  return _audioCtx;
}
function playTick(){
  try{
    const ac=getAudioCtx(), now=ac.currentTime;
    if(ac.state==='suspended') ac.resume();
    const osc=ac.createOscillator();
    const g=ac.createGain();
    osc.type='sine'; osc.frequency.value=3800;
    g.gain.setValueAtTime(0.08,now);
    g.gain.exponentialRampToValueAtTime(0.001,now+0.03);
    osc.connect(g); g.connect(ac.destination);
    osc.start(now); osc.stop(now+0.03);
  }catch(e){}
}

// ── DRUM PICKER ───────────────────────────────────────────
const PK_IH=44;
let _pkCfg=null;

window.openPicker = function openPicker(cfg){
  _pkCfg=cfg;
  document.getElementById('picker-ttl').textContent=cfg.title;
  const lblRow=document.getElementById('picker-lbl-row');
  if(cfg.drums.some(d=>d.label)){
    lblRow.innerHTML='';
    lblRow.style.display='flex';
    cfg.drums.forEach((drum,di)=>{
      if(di>0&&cfg.sep){
        const sp=document.createElement('div');
        sp.style.cssText='flex-shrink:0;width:20px';
        lblRow.appendChild(sp);
      }
      const lbl=document.createElement('div');
      lbl.className='picker-drum-lbl';
      lbl.textContent=drum.label||'';
      lblRow.appendChild(lbl);
    });
  } else {
    lblRow.style.display='none';
    lblRow.innerHTML='';
  }
  const wrap=document.getElementById('picker-drums');
  wrap.innerHTML='';
  cfg.drums.forEach((drum,di)=>{
    if(di>0 && cfg.sep){
      const sep=document.createElement('div');
      sep.className='picker-sep'; sep.textContent=cfg.sep;
      wrap.appendChild(sep);
    }
    const col=document.createElement('div'); col.className='picker-col';
    const drumEl=document.createElement('div'); drumEl.className='picker-drum'; drumEl.dataset.di=di;
    const list=document.createElement('div'); list.className='picker-list';
    const itemEls=drum.items.map(item=>{
      const el=document.createElement('div'); el.className='picker-item';
      el.textContent=item.label; list.appendChild(el); return el;
    });
    drumEl.appendChild(list); col.appendChild(drumEl);
    if(drum.suffix){ const s=document.createElement('div'); s.className='picker-sfx'; s.textContent=drum.suffix; col.appendChild(s); }
    wrap.appendChild(col);
    let lastIdx=drum.current;
    requestAnimationFrame(()=>{
      drumEl.scrollTop=drum.current*PK_IH;
      itemEls.forEach((el,i)=>el.classList.toggle('on',i===drum.current));
    });
    drumEl.addEventListener('scroll',()=>{
      const idx=Math.round(drumEl.scrollTop/PK_IH);
      if(idx>=0&&idx<drum.items.length){
        itemEls.forEach((el,i)=>el.classList.toggle('on',i===idx));
        if(idx!==lastIdx){ lastIdx=idx; playTick(); }
      }
    },{passive:true});
  });
  document.body.style.top=`-${window.scrollY}px`;
  document.body.style.overflow='hidden';
  document.body.style.position='fixed';
  document.body.style.width='100%';
  const ov=document.getElementById('picker-ov');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.classList.add('open'));
};
window.confirmPicker = function(){
  if(!_pkCfg) return;
  const vals=Array.from(document.querySelectorAll('.picker-drum')).map((el,di)=>{
    const idx=Math.round(el.scrollTop/PK_IH);
    const items=_pkCfg.drums[di].items;
    return items[Math.max(0,Math.min(idx,items.length-1))].value;
  });
  _pkCfg.onConfirm(vals);
  window.closePicker();
};
window.closePicker = function(){
  const scrollY=document.body.style.top;
  document.body.style.overflow='';
  document.body.style.position='';
  document.body.style.width='';
  document.body.style.top='';
  window.scrollTo(0,parseInt(scrollY||'0')*-1);
  const ov=document.getElementById('picker-ov');
  ov.classList.remove('open'); ov.style.display='none';
  const lblRow=document.getElementById('picker-lbl-row');
  lblRow.style.display='none'; lblRow.innerHTML='';
  _pkCfg=null;
};

window.editW = function(){
  const items=[];
  for(let v=0;v<=200;v+=0.5) items.push({label:v%1===0?String(v):v.toFixed(1),value:v});
  const idx=Math.max(0,items.findIndex(i=>i.value===curW));
  window.openPicker({title:t('sec_weight'),drums:[{items,current:idx,suffix:'kg'}],onConfirm:([v])=>window.setW(v)});
};

window.editN = function(type){
  const isR=type==='r', max=isR?100:20;
  const items=Array.from({length:max},(_,i)=>({label:String(i+1),value:i+1}));
  const cur=isR?curR:curS;
  window.openPicker({
    title:t(isR?'lbl_reps':'lbl_sets'),
    drums:[{items,current:cur-1,suffix:t(isR?'u_reps':'u_sets')}],
    onConfirm:([v])=>{
      if(isR){curR=v;document.getElementById('rval').textContent=v;}
      else{curS=v;document.getElementById('sval').textContent=v;}
    }
  });
};

// ── REPS / SETS ───────────────────────────────────────────
window.adjN = function(type, d){
  if(type==='r'){ curR = Math.max(1, Math.min(100, curR+d)); document.getElementById('rval').textContent = curR; }
  else          { curS = Math.max(1, Math.min(20,  curS+d)); document.getElementById('sval').textContent = curS; }
};

// ── SUB-TABS ──────────────────────────────────────────────
window.switchSub = function(which){
  ['workout','weight'].forEach(k => {
    document.getElementById('sub-'+k).classList.toggle('on', k===which);
    document.getElementById('stb-'+k).classList.toggle('on', k===which);
  });
};

// ── MUSCLE GROUPS ─────────────────────────────────────────
const IC_BARBELL = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Crect x='0' y='2' width='7' height='20' rx='2' fill='white'/%3E%3Crect x='7' y='5' width='4' height='14' rx='1' fill='white'/%3E%3Crect x='11' y='9' width='18' height='6' rx='3' fill='white'/%3E%3Crect x='29' y='5' width='4' height='14' rx='1' fill='white'/%3E%3Crect x='33' y='2' width='7' height='20' rx='2' fill='white'/%3E%3C/svg%3E" style="width:24px;height:15px;display:block;margin:0 auto">`;
const IC_MOON = `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath d='M24 4 C12 4 4 13 4 24 C4 35 12 44 24 44 C17 40 12 33 12 24 C12 15 17 8 24 4Z' fill='white'/%3E%3C/svg%3E" style="width:22px;height:22px;display:block;margin:0 auto">`;
const GROUPS = [
  {id:'chest',    icon:'', name:{ja:'胸',    en:'Chest',     ko:'가슴', zh:'胸',  es:'Pecho'}},
  {id:'back',     icon:'', name:{ja:'背中',  en:'Back',      ko:'등',   zh:'背',  es:'Espalda'}},
  {id:'shoulder', icon:'', name:{ja:'肩',    en:'Shoulders', ko:'어깨', zh:'肩',  es:'Hombros'}},
  {id:'arms',     icon:'', name:{ja:'腕',    en:'Arms',      ko:'팔',   zh:'臂',  es:'Brazos'}},
  {id:'legs',     icon:'', name:{ja:'脚',    en:'Legs',      ko:'다리', zh:'腿',  es:'Piernas'}},
  {id:'abs',      icon:'', name:{ja:'腹',    en:'Abs',       ko:'복근', zh:'腹',  es:'Abs'}},
  {id:'other',    icon:'', name:{ja:'その他',en:'Other',     ko:'기타', zh:'其他',es:'Otro'}},
];
const GROUP_EX = {
  chest:   {ja:['ベンチプレス','ダンベルプレス','腕立て伏せ','インクラインベンチプレス','ダンベルフライ','チェストプレス（マシン）','ディップス'],    en:['Bench Press','Dumbbell Press','Push-up','Incline Bench Press','Dumbbell Fly','Chest Press (Machine)','Dips']},
  back:    {ja:['懸垂（チンニング）','ラットプルダウン','ダンベルロウ','デッドリフト','ベントオーバーロウ','シーテッドロウ'],      en:['Pull-up','Lat Pulldown','Dumbbell Row','Deadlift','Bent Over Row','Seated Row']},
  shoulder:{ja:['ショルダープレス','サイドレイズ','フロントレイズ','オーバーヘッドプレス','フェイスプル','アーノルドプレス'], en:['Shoulder Press','Side Raise','Front Raise','Overhead Press','Face Pull','Arnold Press']},
  arms:    {ja:['アームカール','ダンベルカール','トライセップス','フレンチプレス','ハンマーカール','プリーチャーカール','スカルクラッシャー'],en:['Arm Curl','Dumbbell Curl','Triceps','French Press','Hammer Curl','Preacher Curl','Skull Crusher']},
  legs:    {ja:['スクワット','レッグプレス','レッグカール','レッグエクステンション','ランジ','ブルガリアンスクワット','カーフレイズ'],en:['Squat','Leg Press','Leg Curl','Leg Extension','Lunge','Bulgarian Split Squat','Calf Raise']},
  abs:     {ja:['クランチ','プランク','レッグレイズ','腹筋ローラー','サイドベンド'],  en:['Crunch','Plank','Leg Raise','Ab Roller','Side Bend']},
  other:   {ja:[], en:[]},
};

function gName(id){
  const g = GROUPS.find(g=>g.id===id);
  return g ? (g.name[lang]||g.name.en) : id;
}

function renderGrpBtns(){
  const el = document.getElementById('grp-select');
  if(!el) return;
  el.innerHTML = `<option value="">${t('grp_placeholder')}</option>` +
    GROUPS.map(g => `<option value="${g.id}">${g.icon} ${gName(g.id)}</option>`).join('');
  el.value = curGroup || '';
  el.style.borderColor = curGroup ? 'var(--ac)' : '#2a2a2a';
}
window.setGroup = function(id){
  curGroup = id;
  document.getElementById('ex-inp').value = '';
  renderGrpBtns();
  setTimeout(showAC, 0);
};
function renderGrpChips(){
  const el = document.getElementById('hist-grp-select');
  if(!el) return;
  el.innerHTML = `<option value="">${t('fall_ex')}</option>` +
    GROUPS.map(g => `<option value="${g.id}">${g.icon} ${gName(g.id)}</option>`).join('');
  el.value = histGroup || '';
}
window.setHistGroup = function(g){
  histGroup = g;
  renderGrpChips();
  renderHistory();
};

// ── BODY WEIGHT ───────────────────────────────────────────
function setBodyW(v){
  curBodyW = Math.round(Math.max(20, Math.min(300, v)) * 10) / 10;
  const el = document.getElementById('bw-val');
  if(el) el.textContent = curBodyW.toFixed(1);
  renderWeightProgress();
}
window.adjBodyW = function(d){ setBodyW(curBodyW + d); };

window.editBodyW = function(){
  const ints = Array.from({length:281},(_,i)=>({label:String(i+20),value:i+20}));
  const decs = [0,1,2,3,4,5,6,7,8,9].map(v=>({label:String(v),value:v}));
  const intPart = Math.floor(curBodyW);
  const decPart = Math.round((curBodyW - intPart) * 10);
  window.openPicker({
    title:t('sec_bodyweight'),
    sep:'.',
    drums:[{items:ints,current:intPart-20},{items:decs,current:decPart}],
    onConfirm:([iv,dv])=>setBodyW(iv + dv/10)
  });
};

function setTargetW(v){
  curTargetW = Math.round(Math.max(20, Math.min(300, v)) * 10) / 10;
  localStorage.setItem(TARGET_W_KEY, String(curTargetW));
  const el = document.getElementById('tw-val');
  if(el) el.textContent = curTargetW.toFixed(1);
  renderWeightProgress();
}
window.adjTargetW = function(d){ setTargetW(curTargetW + d); };

window.editTargetW = function(){
  const ints = Array.from({length:281},(_,i)=>({label:String(i+20),value:i+20}));
  const decs = [0,1,2,3,4,5,6,7,8,9].map(v=>({label:String(v),value:v}));
  const intPart = Math.floor(curTargetW);
  const decPart = Math.round((curTargetW - intPart) * 10);
  window.openPicker({
    title:t('sec_targetweight'),
    sep:'.',
    drums:[{items:ints,current:intPart-20},{items:decs,current:decPart}],
    onConfirm:([iv,dv])=>setTargetW(iv + dv/10)
  });
};

function renderWeightProgress(){
  const el = document.getElementById('wt-progress');
  if(!el) return;
  const isJa = lang==='ja'||lang==='ko'||lang==='zh';
  const recs = loadWeightRecs();
  const latest = recs.length ? recs[recs.length-1].weight : curBodyW;
  const diff = latest - curTargetW;
  if(Math.abs(diff) < 0.05){
    el.innerHTML = `<div style="color:var(--green);font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;text-align:center">🎯 TARGET REACHED!</div>`;
    return;
  }
  const absDiff = Math.abs(diff).toFixed(1);
  const label = isJa
    ? (diff>0 ? `目標まであと -${absDiff}kg` : `目標超過 +${absDiff}kg`)
    : (diff>0 ? `-${absDiff}kg to goal` : `+${absDiff}kg over goal`);
  const pct = recs.length ? Math.max(0, Math.min(100, Math.round((1 - Math.abs(diff)/Math.max(1,Math.abs(recs[0].weight - curTargetW)))*100))) : 0;
  el.innerHTML = `
    <div style="color:#888;font-size:12px;margin-bottom:6px;text-align:center">${label}</div>
    <div style="height:6px;background:#1a1a1a;border-radius:3px;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#667eea,#764ba2);border-radius:3px;transition:width .3s"></div>
    </div>`;
}

window.saveBodyWeight = function(){
  const rec = { id:Date.now(), date:new Date().toISOString(), type:'weight', weight:curBodyW };
  const recs = loadWeightRecs(); recs.push(rec); saveWeightRecs(recs);
  const btn = document.querySelector('.btn-weight');
  const orig = t('btn_weight_save');
  btn.textContent = t('weightSaved');
  btn.style.background = 'var(--green)'; btn.style.color = '#000';
  setTimeout(()=>{ btn.textContent=orig; btn.style.background=''; btn.style.color=''; }, 1500);
  showToast(t('weightSaved'));
  renderWeightProgress();
};

// ── REST ──────────────────────────────────────────────────
function fmtRest(s){
  const m=Math.floor(s/60), sec=s%60;
  return m+':'+String(sec).padStart(2,'0');
}
function setRest(s){
  curRest=s;
  const el=document.getElementById('rest-val');
  if(el) el.textContent=fmtRest(s);
}
window.editRest = function(){
  const left5=Array.from({length:13},(_,i)=>({label:String(i*5),value:i*5}));
  const min1=Array.from({length:10},(_,i)=>({label:String(i),value:i}));
  const sec5=[0,5,10,15,20,25,30,35,40,45,50,55].map(v=>({label:String(v).padStart(2,'0'),value:v}));
  const roundedSec=Math.min(55,Math.round((curRest%60)/5)*5);
  const remainMins=Math.floor((curRest-roundedSec)/60);
  const leftMins=Math.min(60,Math.floor(remainMins/5)*5);
  const midMins=Math.min(9,remainMins-leftMins);
  window.openPicker({
    title:t('sec_rest'),
    drums:[
      {items:left5, current:leftMins/5,   label:'×5分'},
      {items:min1,  current:midMins,       label:'分'},
      {items:sec5,  current:roundedSec/5,  label:'秒'},
    ],
    onConfirm:([lv,mv,rv])=>setRest(lv*60+mv*60+rv)
  });
};

// ── AUTOCOMPLETE ──────────────────────────────────────────
function exList(){
  const isJa = lang==='ja'||lang==='ko'||lang==='zh';
  const key = isJa ? 'ja' : 'en';
  let base;
  if(curGroup && curGroup!=='other'){
    base = GROUP_EX[curGroup]?.[key] || [];
  } else if(!curGroup){
    base = Object.values(GROUP_EX).flatMap(g => g[key]||[]);
  } else {
    base = [];
  }
  const past = [...new Set(loadRecs()
    .filter(r => !curGroup || (r.group||'other')===curGroup)
    .map(r => r.exercise)
  )];
  return [...new Set([...base, ...past])];
}

let acT = null;
function _toggleClearBtn(){
  const v = document.getElementById('ex-inp').value;
  document.getElementById('ex-clear').style.display = v ? 'block' : 'none';
}
window.clearExInp = function(){
  document.getElementById('ex-inp').value = '';
  document.getElementById('ex-clear').style.display = 'none';
  showAC();
  document.getElementById('ex-inp').focus();
};
window.acInput = function(){ clearTimeout(acT); _toggleClearBtn(); acT = setTimeout(showAC, 60); };
window.acFocus = function(){ _toggleClearBtn(); showAC(); };
window.acBlur = function(){
  setTimeout(()=>{
    document.getElementById('ac-list').classList.remove('open');
    document.getElementById('ex-clear').style.display = 'none';
  }, 160);
};
function showAC(){
  const inp = document.getElementById('ex-inp');
  const list = document.getElementById('ac-list');
  const v = inp.value.trim().toLowerCase();
  const items = v ? exList().filter(p => p.toLowerCase().includes(v)) : exList();
  if(!items.length){ list.classList.remove('open'); return; }
  list.innerHTML = items.map(p =>
    `<div class="ac-item" onmousedown="pickEx('${esc(p)}')">${esc(p)}</div>`
  ).join('');
  list.classList.add('open');
}
window.pickEx = function(n){
  const inp = document.getElementById('ex-inp');
  inp.value = n;
  document.getElementById('ac-list').classList.remove('open');
  inp.blur();
};

// ── TOAST ─────────────────────────────────────────────────
let _toastTm = null;
function showToast(msg, ms){
  ms = ms || 3000;
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTm);
  _toastTm = setTimeout(()=> el.classList.remove('show'), ms);
}
const TRAIN_MSGS = [
  '💪 ナイス！その1回が未来の自分を作る！',
  '🔥 記録しました！継続は力なり！',
  '👊 いい追い込みだ！明日も頑張ろう！',
  '⚡ 記録完了！着実に成長してるぞ！',
  '🏆 お疲れ様！今日もやりきった！',
];
function sleepMsg(mins){
  const h = mins / 60;
  if(h < 5) return '💤 記録しました！睡眠が少し短いかも…明日はもう少し早めに寝てみよう！';
  if(h < 6) return '🌙 記録しました！あと少し！7時間を目指してみよう💪';
  if(h < 7) return '🌙 記録しました！いい感じ！もう少しで理想の7時間👍';
  return '😴 記録しました！素晴らしい！この調子で継続しよう🔥';
}
function trainMsg(){ return TRAIN_MSGS[Math.floor(Math.random()*TRAIN_MSGS.length)]; }

// ── RANK ──────────────────────────────────────────────────
const RANK_IMGS=['','rank1_bronze.png','rank2_silver.png','rank3_gold.png','rank4_platinum.png','rank5_master.png'];
const RANK_DEFS=[
  {level:1,name:'LR1',nameEn:'LR1',color:'#cd7f32',req:'1〜7日',reqEn:'1-7 days'},
  {level:2,name:'LR2',nameEn:'LR2',color:'#c0c0c0',req:'8〜30日',reqEn:'8-30 days'},
  {level:3,name:'LR3',nameEn:'LR3',color:'#ffd700',req:'31〜90日',reqEn:'31-90 days'},
  {level:4,name:'LR4',nameEn:'LR4',color:'#00e5ff',req:'91〜180日',reqEn:'91-180 days'},
  {level:5,name:'LR5',nameEn:'LR5',color:'#b44aff',req:'181日〜',reqEn:'181+ days'},
];
const RANK_FROM=[0,1,8,31,91,181];

function getRank(records){
  const uniqueDays=new Set(
    records.filter(r=>r.type!=='sleep').map(r=>new Date(r.date).toLocaleDateString())
  ).size;
  if(uniqueDays>=181) return{level:5,name:'LR5',nameEn:'LR5',color:'#b44aff',days:uniqueDays,next:null};
  if(uniqueDays>=91)  return{level:4,name:'LR4',nameEn:'LR4',color:'#00e5ff',days:uniqueDays,next:181};
  if(uniqueDays>=31)  return{level:3,name:'LR3',nameEn:'LR3',color:'#ffd700',days:uniqueDays,next:91};
  if(uniqueDays>=8)   return{level:2,name:'LR2',nameEn:'LR2',color:'#c0c0c0',days:uniqueDays,next:31};
  if(uniqueDays>=1)   return{level:1,name:'LR1',nameEn:'LR1',color:'#cd7f32',days:uniqueDays,next:8};
  return{level:0,name:'なし',nameEn:'NONE',color:'#555',days:0,next:1};
}

function updateStats(){
  const rank=getRank(loadRecs());
  const el=document.getElementById('rank-lbl');
  const isJa=lang==='ja'||lang==='ko'||lang==='zh';
  if(rank.level===0){
    el.style.cssText='';
    el.innerHTML=`<span style="color:#555;font-size:11px">${isJa?'トレーニングを始めよう':'Start training!'}</span>`;
  } else {
    const name=isJa?rank.name:rank.nameEn;
    const dLabel=isJa?rank.days+'日':rank.days+'d';
    el.style.cssText='';
    el.innerHTML=`<img src="${RANK_IMGS[rank.level]}" style="width:36px;height:36px;object-fit:contain;flex-shrink:0"><span style="background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700;font-size:15px">${name}</span><span style="color:#888;font-size:11px;margin-left:8px">${dLabel}</span>`;
  }
}

window.openRankModal = function(){
  const rank=getRank(loadRecs());
  const isJa=lang==='ja'||lang==='ko'||lang==='zh';
  const iconEl=document.getElementById('rank-icon-lg');
  if(rank.level>0){ iconEl.src=RANK_IMGS[rank.level]; iconEl.style.display=''; }
  else iconEl.style.display='none';
  const nameEl=document.getElementById('rank-name-lg');
  nameEl.textContent=isJa?rank.name:rank.nameEn;
  nameEl.style.color=rank.color;
  document.getElementById('rank-days-lg').textContent=
    isJa?`${rank.days}日のトレーニング`:`${rank.days} training days`;
  const prog=document.getElementById('rank-progress');
  if(rank.next!==null){
    const from=RANK_FROM[rank.level];
    const pct=Math.min(100,Math.round((rank.days-from)/(rank.next-from)*100));
    const nextDef=RANK_DEFS.find(r=>r.level===rank.level+1);
    const fromLabel=isJa?rank.name:rank.nameEn;
    const toLabel=nextDef?(isJa?nextDef.name:nextDef.nameEn):'';
    const remaining=rank.next-rank.days;
    prog.innerHTML=`
      <div class="rank-prog-header"><span>${fromLabel}(${RANK_FROM[rank.level]}${isJa?'日':'d'})</span><span>${toLabel}(${rank.next}${isJa?'日':'d'})</span></div>
      <div class="rank-prog-bar"><div class="rank-prog-fill" style="width:${pct}%;background:${rank.color}"></div></div>
      <div class="rank-prog-sub"><span>${isJa?'現在: ':'Now: '}${rank.days}${isJa?'日':'d'}</span><span>${isJa?`次まであと${remaining}日`:`${remaining}d to next`}</span></div>`;
  } else {
    prog.innerHTML=`<div style="text-align:center;font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:3px;color:${rank.color};padding:10px 0">${isJa?'MAX RANK ACHIEVED 🏆':'MAX RANK ACHIEVED 🏆'}</div>`;
  }
  document.getElementById('rank-list-ttl').textContent=isJa?'全ランク':'ALL RANKS';
  document.getElementById('rank-list').innerHTML=RANK_DEFS.map(rd=>{
    const isCur=rd.level===rank.level, isDone=rd.level<rank.level;
    const imgStyle=isDone||isCur?'':'filter:grayscale(1);opacity:.4';
    return `<div class="rank-row${isCur?' cur':''}" style="${isCur?`border-color:${rd.color}`:''}">
      <div class="img-clip"><img class="rank-img-sm" src="${RANK_IMGS[rd.level]}" alt="" style="${imgStyle}"></div>
      <div style="flex:1;min-width:0">
        <div class="rank-row-name" style="color:${isCur||isDone?rd.color:'#3a3a3a'}">${isJa?rd.name:rd.nameEn}</div>
        <div class="rank-row-req">${isJa?rd.req:rd.reqEn}</div>
      </div>
      ${isCur?`<span class="rank-row-badge" style="color:${rd.color}">NOW</span>`:''}
      ${isDone?`<span class="rank-row-badge" style="color:#4ade80">✓</span>`:''}
    </div>`;
  }).join('');
  document.body.style.top=`-${window.scrollY}px`;
  document.body.style.overflow='hidden';
  document.body.style.position='fixed';
  document.body.style.width='100%';
  const ov=document.getElementById('rank-ov');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.classList.add('open'));
};
window.closeRankModal = function(){
  const scrollY=document.body.style.top;
  document.body.style.overflow='';
  document.body.style.position='';
  document.body.style.width='';
  document.body.style.top='';
  window.scrollTo(0,parseInt(scrollY||'0')*-1);
  const ov=document.getElementById('rank-ov');
  ov.classList.remove('open'); ov.style.display='none';
};

// ── RANK UP ───────────────────────────────────────────────
let _rankupTimer=null;
function showRankUp(rank){
  const isJa=lang==='ja'||lang==='ko'||lang==='zh';
  document.getElementById('rankup-trophy').src=RANK_IMGS[rank.level];
  const lbl=document.getElementById('rankup-label');
  lbl.textContent='RANK UP!'; lbl.style.color=rank.color;
  const nm=document.getElementById('rankup-name');
  nm.textContent=isJa?rank.name:rank.nameEn; nm.style.color=rank.color;
  const remaining=rank.next?rank.next-rank.days:0;
  document.getElementById('rankup-msg').textContent=rank.next
    ?(isJa?`🎉 おめでとう！次のランクまであと${remaining}日！`:`🎉 Congrats! ${remaining} days to next rank!`)
    :(isJa?`🏆 おめでとう！最高ランク到達！`:'🏆 Congrats! Max rank achieved!');
  [lbl,'rankup-trophy','rankup-texts'].forEach(id=>{
    const el=typeof id==='string'?document.getElementById(id):id;
    el.style.animation='none'; void el.offsetWidth; el.style.animation='';
  });
  const pc=document.getElementById('rankup-particles'); pc.innerHTML='';
  for(let i=0;i<24;i++){
    const sp=document.createElement('div'); sp.className='sp';
    const sz=4+Math.random()*8;
    sp.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${-sz}px;background:${rank.color};animation-duration:${2+Math.random()*3}s;animation-delay:${Math.random()*2}s;opacity:${.4+Math.random()*.6}`;
    pc.appendChild(sp);
  }
  const ov=document.getElementById('rankup-ov');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.classList.add('open'));
  clearTimeout(_rankupTimer);
  _rankupTimer=setTimeout(window.hideRankUp,3000);
}
window.hideRankUp = function(){
  clearTimeout(_rankupTimer);
  const ov=document.getElementById('rankup-ov');
  ov.classList.remove('open'); ov.style.display='none';
  document.getElementById('rankup-particles').innerHTML='';
};

// ── QUICK LOG ─────────────────────────────────────────────
window.quickLog = function(){
  const ex = document.getElementById('ex-inp').value.trim();
  if(!ex){ document.getElementById('ex-inp').focus(); return; }
  const recs = loadRecs();
  recs.push({
    id:Date.now(), date:new Date().toISOString(),
    exercise:ex, weight:curW, reps:curR, sets:curS,
    volume:curW*curR*curS, est1rm:Math.round(curW*(1+curR/30)),
    group:curGroup||'other'
  });
  const prevLevel=getRank(loadRecs()).level;
  saveRecs(recs); updateStats(); renderHistory();
  const newRank=getRank(loadRecs());
  if(newRank.level>prevLevel) setTimeout(()=>showRankUp(newRank),500);
  const b = document.querySelector('.btn-log');
  const orig = t('btn_log');
  b.textContent = '✓ SAVED'; b.style.color = 'var(--green)';
  setTimeout(()=>{ b.textContent = orig; b.style.color = ''; }, 1500);
  showToast(lang==='ja' ? trainMsg() : '✓ Saved!');
};

// ── WORKOUT STATE ─────────────────────────────────────────
let WS = null;

window.startWorkout = function(){
  const ex = document.getElementById('ex-inp').value.trim();
  if(!ex){
    const inp = document.getElementById('ex-inp');
    inp.focus(); inp.style.borderColor = 'var(--danger)';
    setTimeout(()=>{ inp.style.borderColor=''; }, 1500);
    return;
  }
  WS = { exercise:ex, weight:curW, reps:curR, sets:curS, restSecs:curRest,
          curSet:1, phase:'active', completedSets:[], paused:false, group:curGroup||'other' };
  openWo();
  window.addEventListener('beforeunload', onUnload);
};

function openWo(){
  document.getElementById('wo').classList.add('on');
  document.getElementById('wo-dot').classList.add('on');
  document.querySelectorAll('.tb').forEach(b => b.disabled = true);
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.documentElement.style.overflow = 'hidden';
  refreshWoUI();
}

window.closeWo = function(){
  clearTimer();
  document.getElementById('wo').classList.remove('on');
  document.getElementById('wo-dot').classList.remove('on');
  document.querySelectorAll('.tb').forEach(b => b.disabled = false);
  document.getElementById('reset-btn').style.display = '';
  const scrollY = document.body.style.top;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  document.documentElement.style.overflow = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
  window.removeEventListener('beforeunload', onUnload);
  WS = null;
  updateStats(); renderHistory();
};

function onUnload(e){ e.preventDefault(); e.returnValue = ''; }

const MUSCLE_IMGS = ['chest','shoulder','arms','abs','legs','back'];
const TRICEPS_EX  = ['トライセップス','フレンチプレス','スカルクラッシャー','Triceps','French Press','Skull Crusher'];
function setWoMuscle(group, exercise){
  const img = document.getElementById('wo-muscle-img');
  if(!img) return;
  if(group === 'arms' && TRICEPS_EX.includes(exercise)){
    img.src = 'muscle_arms2.png';
    return;
  }
  const name = MUSCLE_IMGS.includes(group) ? group : 'body';
  img.src = `muscle_${name}.png`;
}

function refreshWoUI(){
  if(!WS) return;
  const {exercise, weight, reps, sets, curSet, phase} = WS;
  const lblEl = document.getElementById('wo-setlbl-sm');
  const dotsEl = document.getElementById('wo-dots');
  if(lblEl) lblEl.textContent = `SET ${curSet} / ${sets}`;
  if(dotsEl){
    dotsEl.innerHTML = '';
    for(let i=1;i<=sets;i++){
      const d = document.createElement('div');
      d.className = 'wo-dot' + (i <= curSet ? ' done' : '');
      dotsEl.appendChild(d);
    }
  }
  document.getElementById('wo-exname').textContent = exercise;
  document.getElementById('wo-winfo').textContent = `${weight}kg × ${reps}reps`;
  setWoMuscle(WS.group, WS.exercise);
  ['ph-active','ph-rest','ph-wait','ph-complete'].forEach(id =>
    document.getElementById(id).classList.remove('on'));
  const doneBtn  = document.getElementById('btn-done');
  const nextBtn  = document.getElementById('btn-next');
  const closeBtn = document.getElementById('btn-close');
  doneBtn.style.display  = 'none';
  nextBtn.style.display  = 'none';
  closeBtn.style.display = 'none';
  const pauseBtn = document.getElementById('pause-btn');
  pauseBtn.disabled = true;
  if(phase === 'active'){
    document.getElementById('ph-active').classList.add('on');
    doneBtn.style.display = '';
    doneBtn.textContent = t('btn_done');
  } else if(phase === 'rest'){
    document.getElementById('ph-rest').classList.add('on');
    pauseBtn.disabled = false;
  } else if(phase === 'wait'){
    document.getElementById('ph-wait').classList.add('on');
    nextBtn.style.display = '';
    nextBtn.textContent = t('btn_next');
  } else if(phase === 'complete'){
    document.getElementById('ph-complete').classList.add('on');
    document.getElementById('co-det').textContent =
      `${exercise}  ${weight}kg × ${reps}reps × ${sets}sets`;
    closeBtn.style.display = '';
    document.getElementById('reset-btn').style.display = 'none';
  }
}

window.onDone = function(){
  if(!WS || WS.phase !== 'active') return;
  const _ctx = getAudioCtx(); if(_ctx.state === 'suspended') _ctx.resume();
  WS.completedSets.push({ set:WS.curSet, weight:WS.weight, reps:WS.reps });
  if(WS.curSet >= WS.sets){
    clearTimer();
    saveWoRecord();
    WS.phase = 'complete';
    refreshWoUI();
    showToast(lang==='ja' ? trainMsg() : '✓ Saved!');
    setTimeout(window.closeWo, 3500);
    return;
  }
  WS.phase = 'rest';
  refreshWoUI();
  startTimer();
};

window.onNext = function(){
  if(!WS || WS.phase !== 'wait') return;
  const _ctx = getAudioCtx(); if(_ctx.state === 'suspended') _ctx.resume();
  WS.curSet++;
  WS.phase = 'active';
  clearTimer();
  document.getElementById('pause-btn').textContent = '⏸';
  refreshWoUI();
};

// ── TIMER ─────────────────────────────────────────────────
const CIRC = 552.92;
let timerAnimId = null, timerRem = 0, timerTotal = 0;
let timerStartTime = 0, _timerLastCountdown = -1, _lastDisplayedSec = -1;

function startTimer(){
  clearTimer();
  timerTotal = WS.restSecs;
  timerRem = timerTotal;
  timerStartTime = Date.now();
  _timerLastCountdown = -1;
  _lastDisplayedSec = -1;
  WS.paused = false;
  document.getElementById('pause-btn').textContent = '⏸';
  renderTimer();
  startTimerAnim();
}

function startTimerAnim(){
  function tick(){
    if(!WS || WS.paused) return;
    timerRem = Math.max(0, timerTotal - (Date.now() - timerStartTime) / 1000);
    const arc = document.getElementById('t-arc');
    if(arc){
      const frac = timerTotal > 0 ? timerRem / timerTotal : 0;
      arc.setAttribute('stroke-dashoffset', String(CIRC * (frac - 1)));
      arc.setAttribute('class', timerRem <= 0 ? 'done' : timerRem <= 10 ? 'warn' : '');
    }
    const sec = Math.ceil(timerRem);
    if(sec !== _lastDisplayedSec){
      _lastDisplayedSec = sec;
      const disp = document.getElementById('t-disp');
      if(disp){
        const s0 = Math.max(0, sec);
        disp.textContent = Math.floor(s0/60) + ':' + (s0%60 < 10 ? '0' : '') + (s0%60);
        disp.className = timerRem <= 0 ? 'done' : timerRem <= 10 ? 'warn' : '';
      }
      if(timerRem > 0 && sec <= 5 && sec !== _timerLastCountdown){
        _timerLastCountdown = sec;
        playCountdown(sec);
      }
    }
    if(timerRem <= 0){ timerAnimId = null; timerDone(); return; }
    timerAnimId = requestAnimationFrame(tick);
  }
  timerAnimId = requestAnimationFrame(tick);
}

function clearTimer(){
  if(timerAnimId !== null){ cancelAnimationFrame(timerAnimId); timerAnimId = null; }
}

function renderTimer(){
  const disp = document.getElementById('t-disp');
  const arc  = document.getElementById('t-arc');
  if(!disp || !arc) return;
  const secInt = Math.max(0, Math.ceil(timerRem));
  disp.textContent = Math.floor(secInt/60) + ':' + (secInt%60 < 10 ? '0' : '') + (secInt%60);
  const frac = timerTotal > 0 ? timerRem / timerTotal : 0;
  arc.setAttribute('stroke-dashoffset', String(CIRC * (frac - 1)));
  const cls = timerRem <= 0 ? 'done' : timerRem <= 10 ? 'warn' : '';
  disp.className = cls;
  arc.setAttribute('class', cls);
}

function timerDone(){
  playAlarm();
  notifyTimerDone();
  flashScreen();
  if(WS){ WS.phase = 'wait'; refreshWoUI(); }
  renderTimer();
}

window.togglePause = function(){
  if(!WS || WS.phase !== 'rest') return;
  WS.paused = !WS.paused;
  if(WS.paused){
    timerRem = Math.max(0, timerTotal - (Date.now() - timerStartTime) / 1000);
    clearTimer();
  } else {
    timerStartTime = Date.now() - (timerTotal - timerRem) * 1000;
    startTimerAnim();
  }
  document.getElementById('pause-btn').textContent = WS.paused ? '▶' : '⏸';
};

// ── ALARM ─────────────────────────────────────────────────
function beep(freq, dur, vol, type='sine'){
  try{
    const c = getAudioCtx();
    if(c.state === 'suspended') c.resume();
    const o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination);
    o.frequency.value = freq; o.type = type;
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.start(c.currentTime); o.stop(c.currentTime + dur);
  } catch(e){}
}
function playCountdown(rem){
  if(rem === 1){
    beep(880, .3, .4, 'sine');
  } else {
    beep(523, .12, .25, 'sine');
  }
  if(navigator.vibrate) navigator.vibrate(rem === 1 ? 80 : 30);
}

async function playAlarm(){
  const ctx = getAudioCtx();
  if(ctx.state === 'suspended') await ctx.resume();
  for(let i = 0; i < 3; i++){
    setTimeout(()=>{
      try{
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; o.type = 'sine';
        g.gain.value = 0.3;
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.3);
      } catch(e){}
    }, i * 400);
  }
  if(navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
}
function notifyTimerDone(){
  if('Notification' in window && Notification.permission === 'granted'){
    new Notification('LOOKSMAXXING', {
      body: '休憩終了！次のセットを始めよう！',
      icon: '',
      tag: 'timer-done',
      requireInteraction: true
    });
  }
}
let _fc = 0;
function flashScreen(){
  const el = document.getElementById('flash');
  _fc = 0;
  (function f(){
    el.style.opacity = _fc % 2 === 0 ? '0.55' : '0';
    _fc++;
    if(_fc < 6) setTimeout(f, 110);
    else el.style.opacity = '0';
  })();
}

// ── RESET DIALOG ──────────────────────────────────────────
window.showResetDlg = function(){
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.getElementById('reset-dlg').classList.add('open');
};
function hideResetDlg(){ document.getElementById('reset-dlg').classList.remove('open'); }
window.resetAct = function(act){
  hideResetDlg();
  if(act === 'cancel') return;
  clearTimer();
  if(act === 'save' && WS && WS.completedSets.length > 0) saveWoRecord(true);
  window.closeWo();
};

// ── SAVE RECORD ───────────────────────────────────────────
function saveWoRecord(partial = false){
  if(!WS) return;
  const setsN = partial ? WS.completedSets.length : WS.sets;
  if(setsN === 0) return;
  const prevLevel=getRank(loadRecs()).level;
  const recs = loadRecs();
  recs.push({
    id: Date.now(), date: new Date().toISOString(),
    exercise: WS.exercise, weight: WS.weight, reps: WS.reps, sets: setsN,
    volume: WS.weight * WS.reps * setsN,
    est1rm: Math.round(WS.weight * (1 + WS.reps / 30)),
    group: WS.group || 'other'
  });
  saveRecs(recs);
  const newRank=getRank(loadRecs());
  if(newRank.level>prevLevel) setTimeout(()=>showRankUp(newRank),600);
}

// ── STATUS ────────────────────────────────────────────────
function renderStatus(){
  const rank=getRank(loadRecs());
  const isJa=lang==='ja'||lang==='ko'||lang==='zh';
  const el=document.getElementById('status-content');
  let heroHtml;
  if(rank.level===0){
    heroHtml=`<div class="status-hero">
      <div class="status-no-rank-ic"><img src="muscle_body.png" alt="" style="width:80px;height:80px;object-fit:contain;opacity:0.6"></div>
      <div class="status-no-rank-msg">${isJa?'トレーニングを始めよう！':'Start Training!'}</div>
    </div>`;
  } else {
    heroHtml=`<div class="status-hero">
      <div class="img-clip"><img class="status-rank-img" src="${RANK_IMGS[rank.level]}" alt=""></div>
      <div class="status-rank-name" style="color:${rank.color}">${isJa?rank.name:rank.nameEn}</div>
      <div class="status-rank-days">${rank.days}${isJa?'日達成':' days achieved'}</div>
    </div>`;
  }
  let progHtml;
  if(rank.next!==null){
    const from=RANK_FROM[rank.level];
    const pct=Math.min(100,Math.round((rank.days-from)/(rank.next-from)*100));
    const nextDef=RANK_DEFS.find(r=>r.level===rank.level+1);
    const nextLabel=nextDef?(isJa?nextDef.name:nextDef.nameEn):'';
    progHtml=`<div class="status-prog-wrap">
      <div class="status-prog-bar"><div class="status-prog-fill" style="width:${pct}%;background:${rank.color}"></div></div>
      <div class="status-prog-meta">
        <span>${rank.days}${isJa?'日':'d'} / ${rank.next}${isJa?'日':'d'}</span>
        <span style="color:${rank.color}">${isJa?`次: ${rank.next}日 (${nextLabel})`:`Next: ${rank.next}d (${nextLabel})`}</span>
      </div>
    </div>`;
  } else {
    progHtml=`<div class="status-prog-wrap"><div class="status-max-rank" style="color:${rank.color}">MAX RANK 🏆</div></div>`;
  }
  const listHtml=RANK_DEFS.map(rd=>{
    const isCur=rd.level===rank.level, isDone=rd.level<rank.level;
    const imgStyle=isDone||isCur?'':'filter:grayscale(1);opacity:.4';
    return `<div class="status-rank-row${isCur?' cur':''}" style="${isCur?`border-color:${rd.color}`:''}">
      <img src="${RANK_IMGS[rd.level]}" alt="" style="width:48px;height:48px;object-fit:contain;flex-shrink:0;${imgStyle}">
      <div style="flex:1;min-width:0">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;color:${isCur||isDone?rd.color:'#3a3a3a'}">${isJa?rd.name:rd.nameEn}</div>
        <div style="font-size:11px;color:#555;margin-top:2px">${isJa?rd.req:rd.reqEn}</div>
      </div>
      ${isCur?`<span style="font-size:12px;font-weight:700;letter-spacing:1px;color:${rd.color};flex-shrink:0">NOW</span>`:''}
      ${isDone?`<span style="font-size:12px;font-weight:700;color:#4ade80;flex-shrink:0">✓</span>`:''}
    </div>`;
  }).join('');
  el.innerHTML=`<div class="status-inner">${heroHtml}${progHtml}<div class="status-list-ttl">${isJa?'全ランク':'ALL RANKS'}</div><div class="status-rank-list">${listHtml}</div></div>`;
}

// ── TABS ──────────────────────────────────────────────────
window.switchTab = function(id){
  document.querySelectorAll('.tb').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('on'));
  document.getElementById(`tb-${id}`).classList.add('on');
  document.getElementById(`pane-${id}`).classList.add('on');
  if(id === 'history') renderHistory();
  if(id === 'progress'){
    if(progSection === 'workout'){ initPexList(); renderChart(); }
    else renderWeightChart();
  }
  if(id === 'status') renderStatus();
};

// ── PROGRESS TABS ─────────────────────────────────────────
window.switchProg = function(which){
  progSection = which;
  ['workout','weight'].forEach(k => {
    document.getElementById('ptb-'+k).classList.toggle('on', k===which);
    document.getElementById('prog-'+k).style.display    = k===which ? '' : 'none';
    document.getElementById('chart-'+k+'-wrap').style.display = k===which ? '' : 'none';
  });
  if(which==='workout'){ initPexList(); renderChart(); }
  else renderWeightChart();
};

// ── HISTORY ───────────────────────────────────────────────
window.setHistType = function(type){
  histType = type;
  histGroup = '';
  ['all','workout','weight'].forEach(k => {
    const el = document.getElementById('htb-'+k);
    if(el) el.classList.toggle('on', k===type);
  });
  const wrap = document.getElementById('grp-chips-wrap');
  if(wrap) wrap.style.display = type==='workout' ? '' : 'none';
  if(type==='workout') renderGrpChips();
  renderHistory();
};

function renderHistory(){
  const wRecs = loadRecs().map(r => ({...r, _type:'workout'}));
  const bRecs = loadWeightRecs().map(r => ({...r, _type:'weight'}));
  let all;
  if(histType==='workout') all = wRecs;
  else if(histType==='weight') all = bRecs;
  else all = [...wRecs, ...bRecs];
  if(histGroup && histType==='workout') all = all.filter(r => (r.group||'other')===histGroup);
  all.sort((a,b) => new Date(b.date) - new Date(a.date));
  const period = document.getElementById('fp').value;
  const cut = period==='all' ? null : Date.now() - Number(period)*864e5;
  const filtered = all.filter(r => !cut || new Date(r.date).getTime() >= cut);
  const list = document.getElementById('hist-list');
  if(!filtered.length){
    const ic = histType==='weight'
      ? `<img src="muscle_body.png" alt="" style="width:60px;height:60px;object-fit:contain;opacity:0.5">`
      : `<img src="muscle_body.png" alt="" style="width:60px;height:60px;object-fit:contain;opacity:0.5">`;
    list.innerHTML = `<div class="empty"><div class="empty-ic">${ic}</div>${esc(t('empty'))}</div>`;
    return;
  }
  list.innerHTML = filtered.map(r => {
    if(r._type==='weight'){
      return `
    <div class="rc" style="border-color:rgba(102,126,234,.25);border-left:3px solid #667eea">
      <div class="ri" style="background:rgba(102,126,234,.15)">⚖️</div>
      <div class="rinfo">
        <div class="rex" style="color:#667eea">${esc(String(r.weight))} kg</div>
      </div>
      <div>
        <div class="rdate">${esc(fmtDate(r.date))}</div>
      </div>
    </div>`;
    }
    const grp = r.group||'other';
    const grpG = GROUPS.find(g=>g.id===grp);
    const grpLabel = grpG && grp!=='other' ? `<div style="font-size:12px;color:#777;margin-top:1px">${grpG.icon} ${esc(gName(grp))}</div>` : '';
    return `
    <div class="rc" style="border-left:3px solid #667eea">
      <div class="ri">${IC_BARBELL}</div>
      <div class="rinfo">
        <div class="rex">${esc(r.exercise)}</div>
        ${grpLabel}
        <div class="rdet">${esc(String(r.weight))}kg × ${esc(String(r.reps))}reps × ${esc(String(r.sets))}sets</div>
      </div>
      <div>
        <div class="rmt">${esc(String(r.weight))}kg</div>
        <div class="rdate">${esc(fmtDate(r.date))}</div>
      </div>
    </div>`;
  }).join('');
}

function fmtDate(iso){
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 864e5);
  if(diff === 0) return t('today');
  if(diff === 1) return t('yesterday');
  if(diff < 7) return diff + t('dago');
  return `${d.getMonth()+1}/${d.getDate()}`;
}

// ── CHART ─────────────────────────────────────────────────
let chart = null;
function initPexList(){
  const recs = loadRecs();
  const sel = document.getElementById('pex');
  const prev = sel.value;
  const exByGroup = {};
  GROUPS.forEach(g => exByGroup[g.id] = new Set());
  recs.forEach(r => {
    const g = r.group||'other';
    if(exByGroup[g]) exByGroup[g].add(r.exercise);
  });
  let html = `<option value="">${t('sel_ex')}</option>`;
  GROUPS.forEach(g => {
    const exs = [...exByGroup[g.id]];
    if(!exs.length) return;
    html += `<optgroup label="${esc(gName(g.id))}">`;
    html += exs.map(e=>`<option value="${esc(e)}"${e===prev?' selected':''}>${esc(e)}</option>`).join('');
    html += '</optgroup>';
  });
  sel.innerHTML = html;
}
window.setMetric = function(m){
  curMetric = m;
  ['weight','volume','1rm','group'].forEach(k => {
    const el = document.getElementById(`mb-${k}`);
    if(el) el.classList.toggle('on', k===m);
  });
  const pexEl = document.getElementById('pex');
  if(pexEl) pexEl.style.display = m==='group' ? 'none' : '';
  renderChart();
};
function renderChart(){
  if(curMetric==='group'){
    document.getElementById('cyl').textContent = 'Volume (kg·reps)';
    const recs = loadRecs();
    const vols = {};
    GROUPS.forEach(g => vols[g.id]=0);
    recs.forEach(r => { const g=r.group||'other'; vols[g]=(vols[g]||0)+(r.volume||r.weight*r.reps*r.sets); });
    const ctx = document.getElementById('pchart').getContext('2d');
    if(chart) chart.destroy();
    chart = new Chart(ctx, {
      type:'bar',
      data:{ labels:GROUPS.map(g=>gName(g.id)), datasets:[{
        data:GROUPS.map(g=>vols[g.id]),
        backgroundColor:'rgba(102,126,234,.15)', borderColor:'#667eea',
        borderWidth:1, borderRadius:4,
      }]},
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{
          x:{ ticks:{color:'#555',font:{size:10}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
          y:{ ticks:{color:'#555',font:{size:11}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
        }
      }
    });
    return;
  }
  initPexList();
  const ex = document.getElementById('pex').value;
  if(!ex){ if(chart){ chart.destroy(); chart=null; } return; }
  const recs = loadRecs()
    .filter(r => r.exercise === ex)
    .sort((a,b) => new Date(a.date) - new Date(b.date));
  const labels = recs.map(r =>{ const d=new Date(r.date); return `${d.getMonth()+1}/${d.getDate()}`; });
  let data, yl;
  if(curMetric==='weight'){ data=recs.map(r=>r.weight); yl='kg'; }
  else if(curMetric==='volume'){ data=recs.map(r=>r.volume||r.weight*r.reps*r.sets); yl='kg·reps'; }
  else { data=recs.map(r=>r.est1rm||Math.round(r.weight*(1+r.reps/30))); yl='kg (est.1RM)'; }
  document.getElementById('cyl').textContent = yl;
  const ctx = document.getElementById('pchart').getContext('2d');
  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[{
      data, borderColor:'#667eea', backgroundColor:'rgba(102,126,234,.08)',
      pointBackgroundColor:'#fff', pointRadius:4, pointHoverRadius:6,
      borderWidth:2, tension:.3, fill:true,
    }]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ ticks:{color:'#555',font:{size:11}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
        y:{ ticks:{color:'#555',font:{size:11}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
      }
    }
  });
}

function renderWeightChart(){
  const recs = loadWeightRecs()
    .sort((a,b) => new Date(a.date) - new Date(b.date))
    .slice(-30);
  if(weightChart){ weightChart.destroy(); weightChart=null; }
  const wrap = document.getElementById('chart-weight-wrap');
  if(!recs.length){
    wrap.innerHTML = `<div class="empty"><div class="empty-ic"><img src="muscle_body.png" alt="" style="width:60px;height:60px;object-fit:contain;opacity:0.5"></div>${esc(t('empty'))}</div>`;
    return;
  }
  if(!document.getElementById('wchart')){
    wrap.innerHTML = '<div class="chart-yl">kg</div><div class="chart-wrap"><canvas id="wchart"></canvas></div>';
  }
  const labels = recs.map(r =>{ const d=new Date(r.date); return `${d.getMonth()+1}/${d.getDate()}`; });
  const data   = recs.map(r => r.weight);
  const ctx    = document.getElementById('wchart').getContext('2d');
  weightChart = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[{
      data, borderColor:'#667eea', backgroundColor:'rgba(102,126,234,.08)',
      pointBackgroundColor:'#fff', pointRadius:4, pointHoverRadius:6,
      borderWidth:2, tension:.3, fill:true,
    }]},
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      scales:{
        x:{ ticks:{color:'#555',font:{size:11}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
        y:{ ticks:{color:'#555',font:{size:11}}, grid:{color:'rgba(255,255,255,.04)'}, border:{color:'#242424'} },
      }
    }
  });
}

// ── SERVICE WORKER ────────────────────────────────────────
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js')
    .then(reg => reg.update())
    .catch(()=>{});
}

// ── AUTOCOMPLETE CLOSE ────────────────────────────────────
document.addEventListener('click', function(e){
  const wrap = document.querySelector('.ac-wrap');
  const list = document.getElementById('ac-list');
  if(list && wrap && !wrap.contains(e.target)) list.classList.remove('open');
});

// ── DOUBLE-TAP ZOOM PREVENTION ────────────────────────────
let _tsX = 0, _tsY = 0;
document.addEventListener('touchstart', function(e){
  _tsX = e.touches[0].clientX;
  _tsY = e.touches[0].clientY;
}, {passive:true});
document.addEventListener('touchend', function(e){
  const dx = e.changedTouches[0].clientX - _tsX;
  const dy = e.changedTouches[0].clientY - _tsY;
  if(Math.hypot(dx, dy) >= 10) return;
  const tgt = e.target.closest('button,.ncb,.ab,.wpb,.rpb,.tpb,.qlb');
  if(tgt){
    e.preventDefault();
    if(!tgt._lpActive) tgt.click();
  }
}, {passive:false});

// ── LONG PRESS ─────────────────────────────────────────────
function makeLongPress(el, fn){
  if(!el) return;
  let timer=null, iv=null;
  el._lpActive=false; el._lpWas=false;
  function start(e){
    clearAll();
    const tc = e.touches ? e.touches[0] : e;
    el._lpSX = tc.clientX; el._lpSY = tc.clientY;
    timer=setTimeout(()=>{
      el._lpActive=true;
      if(navigator.vibrate) navigator.vibrate(20);
      fn();
      const t0=Date.now();
      function loop(){
        const elapsed=Date.now()-t0;
        const delay=Math.max(40, 150/(1+elapsed/800));
        iv=setTimeout(()=>{ fn(); loop(); }, delay);
      }
      loop();
    },400);
  }
  function move(e){
    const tc = e.touches[0];
    const dx = tc.clientX - (el._lpSX||0);
    const dy = tc.clientY - (el._lpSY||0);
    if(Math.hypot(dx, dy) >= 10) clearAll();
  }
  function stop(e){
    if(el._lpActive){ e.stopPropagation(); el._lpWas=true; }
    clearAll();
  }
  function clearAll(){
    clearTimeout(timer); timer=null;
    clearTimeout(iv); iv=null;
    el._lpActive=false;
  }
  el.addEventListener('click',function(e){
    if(el._lpWas){ el._lpWas=false; e.preventDefault(); e.stopImmediatePropagation(); }
  });
  el.addEventListener('touchstart',start,{passive:true});
  el.addEventListener('touchmove',move,{passive:true});
  el.addEventListener('touchend',stop,{passive:false});
  el.addEventListener('touchcancel',clearAll,{passive:true});
  el.addEventListener('mousedown',start);
  el.addEventListener('mouseup',stop);
  el.addEventListener('mouseleave',clearAll);
}

function initLongPress(){
  function byLP(v){ return document.querySelector(`[data-lp="${v}"]`); }
  makeLongPress(byLP('adjW(-0.5)'),        ()=>window.adjW(-0.5));
  makeLongPress(byLP('adjW(0.5)'),         ()=>window.adjW(0.5));
  makeLongPress(byLP('adjW(-5)'),          ()=>window.adjW(-5));
  makeLongPress(byLP('adjW(-2.5)'),        ()=>window.adjW(-2.5));
  makeLongPress(byLP('adjW(-1)'),          ()=>window.adjW(-1));
  makeLongPress(byLP('adjW(1)'),           ()=>window.adjW(1));
  makeLongPress(byLP('adjW(2.5)'),         ()=>window.adjW(2.5));
  makeLongPress(byLP('adjW(5)'),           ()=>window.adjW(5));
  makeLongPress(byLP("adjN('r',-1)"),      ()=>window.adjN('r',-1));
  makeLongPress(byLP("adjN('r',1)"),       ()=>window.adjN('r',1));
  makeLongPress(byLP("adjN('s',-1)"),      ()=>window.adjN('s',-1));
  makeLongPress(byLP("adjN('s',1)"),       ()=>window.adjN('s',1));
  makeLongPress(byLP('adjBodyW(-0.1)'),  ()=>window.adjBodyW(-0.1));
  makeLongPress(byLP('adjBodyW(0.1)'),   ()=>window.adjBodyW(0.1));
  makeLongPress(byLP('adjTargetW(-0.1)'),()=>window.adjTargetW(-0.1));
  makeLongPress(byLP('adjTargetW(0.1)'), ()=>window.adjTargetW(0.1));
}

// ── INIT ──────────────────────────────────────────────────
(function init(){
  initPresets();
  renderGrpBtns();
  applyLang();
  updateStats();
  initLongPress();
  try {
    curTargetW = loadTargetW();
    const recs = loadWeightRecs();
    if(recs.length > 0) curBodyW = recs[recs.length-1].weight;
    const bwEl = document.getElementById('bw-val');
    const twEl = document.getElementById('tw-val');
    if(bwEl) bwEl.textContent = curBodyW.toFixed(1);
    if(twEl) twEl.textContent = curTargetW.toFixed(1);
    renderWeightProgress();
  } catch(e) { console.error('weight init', e); }

  document.addEventListener('visibilitychange', function(){
    if(document.hidden || !WS || WS.phase !== 'rest' || WS.paused) return;
    timerRem = Math.max(0, timerTotal - (Date.now() - timerStartTime) / 1000);
    if(timerRem <= 0){
      clearTimer();
      playAlarm(); notifyTimerDone();
      if(WS){ WS.phase='wait'; refreshWoUI(); }
    } else {
      clearTimer();
      startTimerAnim();
    }
  });

  if('Notification' in window && Notification.permission === 'default'){
    document.addEventListener('click', function reqNotif(){
      Notification.requestPermission();
      document.removeEventListener('click', reqNotif);
    }, {once:true});
  }

  document.getElementById('picker-ov').addEventListener('touchmove',function(e){
    if(!e.target.closest('.picker-drum')) e.preventDefault();
  },{passive:false});

  document.getElementById('wo').addEventListener('touchmove',function(e){
    e.stopPropagation();
  },{passive:false});

  document.addEventListener('touchstart', function initAudio(){
    const ctx = getAudioCtx();
    if(ctx.state === 'suspended') ctx.resume();
    const o = ctx.createOscillator(), g = ctx.createGain();
    g.gain.value = 0;
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.01);
    document.removeEventListener('touchstart', initAudio);
  }, {once:true});

  let _activePkDrum=null, _lastPkTouchY=0;
  const stage=document.getElementById('picker-stage');
  stage.addEventListener('touchstart',function(e){
    if(e.target.closest('.picker-drum')) return;
    const drums=Array.from(this.querySelectorAll('.picker-drum'));
    if(!drums.length) return;
    if(drums.length===1){
      _activePkDrum=drums[0];
    } else {
      const tx=e.touches[0].clientX;
      _activePkDrum=drums.reduce((best,d)=>{
        const r=d.getBoundingClientRect(), br=best.getBoundingClientRect();
        return Math.abs(tx-(r.left+r.width/2))<Math.abs(tx-(br.left+br.width/2))?d:best;
      });
    }
    _lastPkTouchY=e.touches[0].clientY;
    e.preventDefault();
  },{passive:false});
  stage.addEventListener('touchmove',function(e){
    if(!_activePkDrum) return;
    const dy=_lastPkTouchY-e.touches[0].clientY;
    _activePkDrum.scrollTop+=dy;
    _lastPkTouchY=e.touches[0].clientY;
    e.preventDefault();
  },{passive:false});
  stage.addEventListener('touchend',function(){
    _activePkDrum=null;
  },{passive:true});

  document.addEventListener('touchstart', function(e){
    if(e.touches.length > 1) e.preventDefault();
  },{passive:false});
  document.addEventListener('gesturestart', function(e){
    e.preventDefault();
  },{passive:false});
})();
