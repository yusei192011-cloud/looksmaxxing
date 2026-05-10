import { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    const s = document.createElement('script')
    s.src = import.meta.env.BASE_URL + 'app-logic.js'
    s.async = false
    document.body.appendChild(s)
    return () => { document.body.removeChild(s) }
  }, [])

  return (
    <>
      <div id="flash"></div>

      {/* HEADER */}
      <div id="hdr">
        <div id="hdr-title">
          <div id="wo-dot"></div>
          LOOKSMAXXING
        </div>
        <div id="rank-lbl" onClick={() => window.openRankModal && window.openRankModal()}></div>
        <button id="lang-btn" onClick={() => window.toggleLang && window.toggleLang()}>JA ▾</button>
      </div>
      <div id="lang-dd">
        <div className="lang-opt" data-l="ja" onClick={() => window.setLang && window.setLang('ja')}>日本語</div>
        <div className="lang-opt" data-l="en" onClick={() => window.setLang && window.setLang('en')}>English</div>
        <div className="lang-opt" data-l="ko" onClick={() => window.setLang && window.setLang('ko')}>한국어</div>
        <div className="lang-opt" data-l="zh" onClick={() => window.setLang && window.setLang('zh')}>中文</div>
        <div className="lang-opt" data-l="es" onClick={() => window.setLang && window.setLang('es')}>Español</div>
      </div>

      {/* TABS */}
      <div id="tabs">
        <button className="tb on" id="tb-record" onClick={() => window.switchTab && window.switchTab('record')} data-i18n="tab_record"></button>
        <button className="tb" id="tb-history" onClick={() => window.switchTab && window.switchTab('history')} data-i18n="tab_history"></button>
        <button className="tb" id="tb-progress" onClick={() => window.switchTab && window.switchTab('progress')} data-i18n="tab_progress"></button>
        <button className="tb" id="tb-status" onClick={() => window.switchTab && window.switchTab('status')} data-i18n="tab_status"></button>
      </div>

      {/* RECORD PANE */}
      <div id="pane-record" className="pane on">
        <div className="subtabs">
          <button className="stb on" id="stb-workout" onClick={() => window.switchSub && window.switchSub('workout')} data-i18n="tab_record"></button>
          <button className="stb sl" id="stb-sleep" onClick={() => window.switchSub && window.switchSub('sleep')} data-i18n="tab_sleep"></button>
        </div>

        {/* WORKOUT sub-pane */}
        <div id="sub-workout" className="subpane on">
          <div className="sec">
            <select id="grp-select" onChange={(e) => window.setGroup && window.setGroup(e.target.value)}></select>
            <div className="sec-ttl" data-i18n="sec_exercise" style={{marginTop:'10px'}}></div>
            <div className="ac-wrap">
              <input type="text" id="ex-inp" className="inp" autoComplete="off"
                style={{paddingRight:'38px'}}
                onInput={() => window.acInput && window.acInput()}
                onFocus={() => window.acFocus && window.acFocus()}
                onBlur={() => window.acBlur && window.acBlur()} />
              <button className="ex-clear" id="ex-clear"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => window.clearExInp && window.clearExInp()}>✕</button>
              <div id="ac-list" className="ac-list"></div>
            </div>
          </div>

          <div className="sec">
            <div className="sec-ttl" data-i18n="sec_weight"></div>
            <div id="wbox">
              <div className="wdisp">
                <button className="ncb" style={{width:'48px',height:'48px',fontSize:'22px',fontWeight:'700',borderRadius:'12px'}} onClick={() => window.adjW && window.adjW(-0.5)}>−</button>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div className="wval" id="wval" onClick={() => window.editW && window.editW()}>60</div>
                  <span className="val-hint">タップで選択</span>
                </div>
                <span className="wunit">kg</span>
                <button className="ncb" style={{width:'48px',height:'48px',fontSize:'22px',fontWeight:'700',borderRadius:'12px'}} onClick={() => window.adjW && window.adjW(0.5)}>+</button>
              </div>
              <div className="wpresets" id="wpresets">
                <button className="wpl-toggle" onClick={() => window.togglePresets && window.togglePresets()}>
                  <span className="wpl-toggle-lbl" data-i18n="wpl_preset">PRESET & ADJUST</span>
                  <span className="wpl-cur" id="wpl-cur">60kg</span>
                  <span className="wpl-arrow" id="wpl-arrow">▾</span>
                </button>
                <div className="wpbtns" id="wpbtns"></div>
                <div className="wadj" id="wadj">
                  <button className="ab m" onClick={() => window.adjW && window.adjW(-5)}>−5</button>
                  <button className="ab m" onClick={() => window.adjW && window.adjW(-2.5)}>−2.5</button>
                  <button className="ab m" onClick={() => window.adjW && window.adjW(-1)}>−1</button>
                  <button className="ab p" onClick={() => window.adjW && window.adjW(1)}>+1</button>
                  <button className="ab p" onClick={() => window.adjW && window.adjW(2.5)}>+2.5</button>
                  <button className="ab p" onClick={() => window.adjW && window.adjW(5)}>+5</button>
                </div>
              </div>
            </div>
          </div>

          <div className="sec">
            <div className="rs-row">
              <div className="nc">
                <div className="nc-l" data-i18n="lbl_reps"></div>
                <div className="nc-row">
                  <button className="ncb" onClick={() => window.adjN && window.adjN('r',-1)}>−</button>
                  <div><div className="ncv" id="rval" onClick={() => window.editN && window.editN('r')}>10</div><div className="ncu" data-i18n="u_reps"></div><span className="val-hint">タップで選択</span></div>
                  <button className="ncb" onClick={() => window.adjN && window.adjN('r',1)}>+</button>
                </div>
              </div>
              <div className="nc">
                <div className="nc-l" data-i18n="lbl_sets"></div>
                <div className="nc-row">
                  <button className="ncb" onClick={() => window.adjN && window.adjN('s',-1)}>−</button>
                  <div><div className="ncv" id="sval" onClick={() => window.editN && window.editN('s')}>3</div><div className="ncu" data-i18n="u_sets"></div><span className="val-hint">タップで選択</span></div>
                  <button className="ncb" onClick={() => window.adjN && window.adjN('s',1)}>+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="sec" style={{padding:'8px 16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:'11px',letterSpacing:'2px',color:'#999',fontWeight:'600',whiteSpace:'nowrap',flexShrink:'0'}} data-i18n="sec_rest"></span>
              <div style={{textAlign:'right'}}>
                <div id="rest-val" className="rest-val" onClick={() => window.editRest && window.editRest()}>1:30</div>
                <span className="val-hint">タップで選択</span>
              </div>
            </div>
          </div>

          <div className="sec" style={{paddingTop:'10px',paddingBottom:'6px',borderBottom:'none'}}>
            <button className="btn btn-start" onClick={() => window.startWorkout && window.startWorkout()}>
              <span data-i18n="btn_start"></span>
            </button>
            <button className="btn btn-log" onClick={() => window.quickLog && window.quickLog()} data-i18n="btn_log"></button>
          </div>
        </div>

        {/* SLEEP sub-pane */}
        <div id="sub-sleep" className="subpane">
          <div className="sec">
            <div className="sec-ttl" data-i18n="sec_bedtime"></div>
            <div className="tbox">
              <div className="tdisp">
                <button className="ncb" style={{width:'38px',height:'38px',fontSize:'20px',fontWeight:'600'}} onClick={() => window.adjTime && window.adjTime('bed',-15)}>−</button>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div className="tval" id="bed-val" onClick={() => window.editTime && window.editTime('bed')}>23:00</div>
                  <span className="val-hint">タップで選択</span>
                </div>
                <button className="ncb" style={{width:'38px',height:'38px',fontSize:'20px',fontWeight:'600'}} onClick={() => window.adjTime && window.adjTime('bed',15)}>+</button>
              </div>
              <div className="tpreset" id="bed-presets"></div>
            </div>
          </div>

          <div className="sec">
            <div className="sec-ttl" data-i18n="sec_wakeup"></div>
            <div className="tbox">
              <div className="tdisp">
                <button className="ncb" style={{width:'38px',height:'38px',fontSize:'20px',fontWeight:'600'}} onClick={() => window.adjTime && window.adjTime('wake',-15)}>−</button>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                  <div className="tval" id="wake-val" onClick={() => window.editTime && window.editTime('wake')}>07:00</div>
                  <span className="val-hint">タップで選択</span>
                </div>
                <button className="ncb" style={{width:'38px',height:'38px',fontSize:'20px',fontWeight:'600'}} onClick={() => window.adjTime && window.adjTime('wake',15)}>+</button>
              </div>
              <div className="tpreset" id="wake-presets"></div>
            </div>
          </div>

          <div className="sec">
            <div className="dur-box">
              <div className="dur-v" id="dur-val">8:00</div>
              <div className="dur-l" data-i18n="sec_duration"></div>
            </div>
          </div>

          <div className="sec">
            <div className="sec-ttl" data-i18n="sec_quality"></div>
            <div className="ql-row">
              <button className="qlb" onClick={() => window.setQuality && window.setQuality(1)}><span className="ql-em">😫</span><span className="ql-num">1</span></button>
              <button className="qlb" onClick={() => window.setQuality && window.setQuality(2)}><span className="ql-em">😞</span><span className="ql-num">2</span></button>
              <button className="qlb" onClick={() => window.setQuality && window.setQuality(3)}><span className="ql-em">😐</span><span className="ql-num">3</span></button>
              <button className="qlb" onClick={() => window.setQuality && window.setQuality(4)}><span className="ql-em">😊</span><span className="ql-num">4</span></button>
              <button className="qlb" onClick={() => window.setQuality && window.setQuality(5)}><span className="ql-em">😁</span><span className="ql-num">5</span></button>
            </div>
          </div>

          <div className="sec">
            <div className="sec-ttl" data-i18n="sec_memo"></div>
            <input type="text" id="sl-memo" className="inp" autoComplete="off" />
          </div>

          <div className="sec" style={{borderBottom:'none'}}>
            <button className="btn btn-sleep" onClick={() => window.saveSleep && window.saveSleep()} data-i18n="btn_sleep_save"></button>
          </div>
        </div>
      </div>

      {/* HISTORY PANE */}
      <div id="pane-history" className="pane">
        <div className="sec">
          <div className="htype-row">
            <button className="htb on" id="htb-all" onClick={() => window.setHistType && window.setHistType('all')} data-i18n="hf_all"></button>
            <button className="htb" id="htb-workout" onClick={() => window.setHistType && window.setHistType('workout')} data-i18n="hf_workout"></button>
            <button className="htb sl" id="htb-sleep" onClick={() => window.setHistType && window.setHistType('sleep')} data-i18n="hf_sleep"></button>
          </div>
          <div id="grp-chips-wrap" style={{display:'none',marginTop:'8px'}}>
            <select id="hist-grp-select" onChange={(e) => window.setHistGroup && window.setHistGroup(e.target.value)}></select>
          </div>
          <select className="fsel" id="fp" onChange={() => window.renderHistory && window.renderHistory()}>
            <option value="7" data-i18n="f7d"></option>
            <option value="30" data-i18n="f30d"></option>
            <option value="90" data-i18n="f90d"></option>
            <option value="all" data-i18n="fall"></option>
          </select>
        </div>
        <div className="sec" style={{borderBottom:'none',paddingTop:'8px'}} id="hist-list"></div>
      </div>

      {/* PROGRESS PANE */}
      <div id="pane-progress" className="pane">
        <div className="sec">
          <div className="prog-tabs">
            <button className="ptb on" id="ptb-workout" onClick={() => window.switchProg && window.switchProg('workout')} data-i18n="hf_workout"></button>
            <button className="ptb sl" id="ptb-sleep" onClick={() => window.switchProg && window.switchProg('sleep')} data-i18n="hf_sleep"></button>
          </div>
          <div id="prog-workout">
            <select className="fsel" id="pex" onChange={() => window.renderChart && window.renderChart()}>
              <option value="" data-i18n="sel_ex"></option>
            </select>
            <div className="mbtns">
              <button className="mb on" id="mb-weight" onClick={() => window.setMetric && window.setMetric('weight')} data-i18n="m_weight"></button>
              <button className="mb" id="mb-volume" onClick={() => window.setMetric && window.setMetric('volume')} data-i18n="m_volume"></button>
              <button className="mb" id="mb-1rm" onClick={() => window.setMetric && window.setMetric('1rm')}>1RM</button>
              <button className="mb" id="mb-group" onClick={() => window.setMetric && window.setMetric('group')} data-i18n="m_group"></button>
            </div>
          </div>
          <div id="prog-sleep" style={{display:'none'}}></div>
        </div>
        <div className="sec" style={{borderBottom:'none'}}>
          <div id="chart-workout-wrap">
            <div className="chart-yl" id="cyl"></div>
            <div className="chart-wrap"><canvas id="pchart"></canvas></div>
          </div>
          <div id="chart-sleep-wrap" style={{display:'none'}}>
            <div className="chart-yl">HOURS</div>
            <div className="chart-wrap"><canvas id="schart"></canvas></div>
          </div>
        </div>
      </div>

      {/* STATUS PANE */}
      <div id="pane-status" className="pane">
        <div id="status-content"></div>
      </div>

      {/* WORKOUT OVERLAY */}
      <div id="wo">
        <div className="woh">
          <div className="woh-ttl" data-i18n="wo_ttl"></div>
          <div className="woh-ctrls">
            <button className="woc" id="pause-btn" onClick={() => window.togglePause && window.togglePause()}>⏸</button>
            <button className="woc" id="reset-btn" onClick={() => window.showResetDlg && window.showResetDlg()}>↺</button>
          </div>
        </div>

        <div className="wo-setinfo">
          <div className="wo-setlbl-sm" id="wo-setlbl-sm">SET 1 / 3</div>
          <div className="wo-dots" id="wo-dots"></div>
          <div className="wo-exname" id="wo-exname"></div>
          <div className="wo-winfo" id="wo-winfo"></div>
        </div>

        <div id="wo-main">
          <div id="wo-body-bg">
            <div className="muscle-container">
              <img src="muscle_body.png" className="muscle-img" id="wo-muscle-img" alt="" draggable="false" />
            </div>
          </div>
          <div className="wo-phase" id="ph-active"></div>
          <div className="wo-phase" id="ph-rest">
            <div className="timer-wrap">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle id="t-bg" cx="100" cy="100" r="88"/>
                <circle id="t-arc" cx="100" cy="100" r="88" strokeDasharray="552.92" strokeDashoffset="0"/>
              </svg>
              <div className="timer-over">
                <div id="t-disp">1:30</div>
                <div className="t-rl" data-i18n="wo_rest_lbl"></div>
              </div>
            </div>
          </div>
          <div className="wo-phase" id="ph-wait" style={{gap:'12px'}}>
            <span className="wo-fire"></span>
            <div className="wo-done-txt" data-i18n="wo_rest_done"></div>
          </div>
          <div className="wo-phase" id="ph-complete" style={{textAlign:'center',gap:'0'}}>
            <div className="co-ic"></div>
            <div className="co-ttl" data-i18n="wo_complete"></div>
            <div className="co-det" id="co-det"></div>
          </div>
        </div>

        <div id="wo-action">
          <button className="btn btn-done" id="btn-done" onClick={() => window.onDone && window.onDone()} data-i18n="btn_done"></button>
          <button className="btn btn-next" id="btn-next" onClick={() => window.onNext && window.onNext()} style={{display:'none'}} data-i18n="btn_next"></button>
          <button className="btn btn-sec" id="btn-close" onClick={() => window.closeWo && window.closeWo()}
            style={{display:'none',fontFamily:"'Bebas Neue',sans-serif",letterSpacing:'2px',fontSize:'18px'}}>CLOSE</button>
        </div>
      </div>

      {/* RESET DIALOG */}
      <div className="dlg-ov" id="reset-dlg">
        <div className="dlg">
          <div className="dlg-ttl" data-i18n="dlg_ttl"></div>
          <div className="dlg-body" data-i18n="dlg_body"></div>
          <div className="dlg-acts">
            <button className="dbtn dbtn-save" onClick={() => window.resetAct && window.resetAct('save')} data-i18n="dlg_save"></button>
            <button className="dbtn dbtn-disc" onClick={() => window.resetAct && window.resetAct('discard')} data-i18n="dlg_disc"></button>
            <button className="dbtn dbtn-cancel" onClick={() => window.resetAct && window.resetAct('cancel')} data-i18n="dlg_cancel"></button>
          </div>
        </div>
      </div>

      <div id="toast"></div>

      {/* RANK MODAL */}
      <div id="rank-ov">
        <div id="rank-sh">
          <button className="rank-close-btn" onClick={() => window.closeRankModal && window.closeRankModal()}>✕</button>
          <div className="rank-hero">
            <div className="img-clip"><img className="rank-img-lg" id="rank-icon-lg" src="" alt="" /></div>
            <div className="rank-name-lg" id="rank-name-lg"></div>
            <div className="rank-days-lg" id="rank-days-lg"></div>
          </div>
          <div className="rank-mid">
            <div id="rank-progress"></div>
          </div>
          <div className="rank-bottom">
            <div className="rank-section-ttl" id="rank-list-ttl">ALL RANKS</div>
            <div id="rank-list"></div>
          </div>
        </div>
      </div>

      {/* RANK UP OVERLAY */}
      <div id="rankup-ov" onClick={() => window.hideRankUp && window.hideRankUp()}>
        <div id="rankup-particles"></div>
        <div className="rankup-label" id="rankup-label">RANK UP!</div>
        <div className="img-clip"><img className="rankup-trophy" id="rankup-trophy" src="" alt="" /></div>
        <div className="rankup-texts" id="rankup-texts">
          <div className="rankup-name" id="rankup-name"></div>
          <div className="rankup-msg" id="rankup-msg"></div>
        </div>
        <div className="rankup-hint">TAP TO CLOSE</div>
      </div>

      {/* DRUM PICKER OVERLAY */}
      <div id="picker-ov">
        <div id="picker-sh">
          <div id="picker-hdr">
            <span id="picker-ttl"></span>
            <button className="picker-x" onClick={() => window.closePicker && window.closePicker()}>✕</button>
          </div>
          <div id="picker-lbl-row"></div>
          <div id="picker-stage">
            <div id="picker-drums"></div>
            <div className="pk-grad top"></div>
            <div className="pk-grad bot"></div>
            <div className="pk-sel"></div>
          </div>
          <button id="picker-ok" onClick={() => window.confirmPicker && window.confirmPicker()}>決定</button>
        </div>
      </div>
    </>
  )
}
