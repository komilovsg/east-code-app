import { useState, useEffect } from 'react'

const SLIDES = [
  {
    num: 1, badge: 'Теория',
    title: 'Что такое JavaScript',
    subtitle: 'Язык, который оживляет веб-страницы',
    content: 'theory',
    points: [
      'Находить элементы на странице',
      'Реагировать на действия пользователя (клики, ввод, наведение)',
      'Изменять HTML и CSS прямо в браузере',
      'Создавать интерактивность без перезагрузки страницы',
    ],
    highlight: 'HTML — скелет страницы. CSS — внешность. JavaScript — поведение.',
    demoId: 'slide1',
  },
  {
    num: 2, badge: 'Теория',
    title: 'getElementById()',
    subtitle: 'Находим элемент по уникальному id',
    content: 'code2',
    demoId: 'slide2',
  },
  {
    num: 3, badge: 'Теория',
    title: 'Что такое событие',
    subtitle: 'Действие пользователя = событие',
    content: 'events',
    demoId: 'slide3',
  },
  {
    num: 4, badge: 'Теория',
    title: 'addEventListener()',
    subtitle: 'Подписываемся на событие',
    content: 'code4',
    demoId: 'slide4',
  },
  {
    num: 5, badge: 'Теория',
    title: 'textContent',
    subtitle: 'Меняем текст элемента',
    content: 'code5',
    demoId: 'slide5',
  },
  {
    num: 6, badge: 'Теория',
    title: 'element.style',
    subtitle: 'Меняем CSS через JavaScript',
    content: 'code6',
    demoId: 'slide6',
  },
  {
    num: 7, badge: 'Теория',
    title: 'classList',
    subtitle: 'Управляем CSS-классами',
    content: 'classList',
    demoId: 'slide7',
  },
  {
    num: 8, badge: 'Теория',
    title: 'input.value',
    subtitle: 'Получаем то, что ввёл пользователь',
    content: 'inputval',
    demoId: 'slide8',
  },
  {
    num: 9, badge: 'Теория',
    title: 'Полный цикл',
    subtitle: 'Получить → обработать → показать',
    content: 'fullcycle',
    demoId: 'slide9',
  },
  {
    num: 10, badge: 'Теория',
    title: 'Мини-проект: счётчик',
    subtitle: 'Объединяем всё что знаем',
    content: 'counter',
    demoId: 'slide10',
  },
  {
    num: 11, badge: 'Задача 1',
    title: 'Найди элемент',
    subtitle: 'Используй getElementById чтобы получить кнопку',
    content: 'task',
    taskId: 11,
    taskDesc: 'На странице есть кнопка с id="myBtn". Используй getElementById, запиши элемент в переменную btn и выведи btn.tagName через console.log.',
    taskExpected: 'Ожидаемый вывод в консоли: BUTTON',
    taskHTML: '<button id="myBtn">Нажми меня</button>',
    taskPlaceholder: '// Напиши код здесь...\n// const btn = document.getElementById(...)\n// console.log(btn.tagName)',
    taskCheck: (logs) => logs.some(l => l.toUpperCase().includes('BUTTON')),
    taskVirtualEl: { myBtn: { tagName: 'BUTTON', textContent: 'Нажми меня', id: 'myBtn' } },
  },
  {
    num: 12, badge: 'Задача 2',
    title: 'Счётчик кликов',
    subtitle: 'addEventListener + переменная',
    content: 'task',
    taskId: 12,
    taskDesc: 'Повесь обработчик на кнопку с id="counterBtn". При каждом клике увеличивай переменную count и выводи её через console.log.',
    taskExpected: 'После 3 кликов в консоли должно быть: 1, 2, 3',
    taskHTML: '<button id="counterBtn">Кликни меня</button>',
    taskPlaceholder: '// let count = 0;\n// const btn = document.getElementById(...)\n// btn.addEventListener("click", function() {...})',
    taskCheck: (logs) => {
      const nums = logs.map(l => parseInt(l)).filter(n => !isNaN(n))
      return nums.includes(1) && nums.includes(2) && nums.includes(3)
    },
    taskVirtualEl: { counterBtn: { tagName: 'BUTTON', id: 'counterBtn', _listeners: [] } },
    taskSimulate: (els, logs) => {
      const btn = els.counterBtn
      btn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn())
      btn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn())
      btn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn())
    },
  },
  {
    num: 13, badge: 'Задача 3',
    title: 'Измени заголовок',
    subtitle: 'textContent в деле',
    content: 'task',
    taskId: 13,
    taskDesc: 'При клике на кнопку с id="changeBtn" измени текст заголовка id="pageTitle" на "JavaScript — это круто!".',
    taskExpected: 'Ожидаемый результат: заголовок меняет текст',
    taskHTML: '<h1 id="pageTitle">Старый заголовок</h1>\n<button id="changeBtn">Изменить</button>',
    taskPlaceholder: '// const title = document.getElementById(...)\n// const btn = document.getElementById(...)\n// btn.addEventListener("click", function() {...})',
    taskCheck: (logs, els) => els.pageTitle && (els.pageTitle.textContent.includes('JavaScript') || els.pageTitle.textContent.includes('круто')),
    taskVirtualEl: {
      pageTitle: { tagName: 'H1', textContent: 'Старый заголовок', id: 'pageTitle', _listeners: [] },
      changeBtn: { tagName: 'BUTTON', id: 'changeBtn', _listeners: [] },
    },
    taskSimulate: (els) => { els.changeBtn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn()) },
    taskResultText: (els) => els.pageTitle ? `pageTitle.textContent = "${els.pageTitle.textContent}"` : '',
  },
  {
    num: 14, badge: 'Задача 4',
    title: 'Смени цвет фона',
    subtitle: 'element.style в действии',
    content: 'task',
    taskId: 14,
    taskDesc: 'При клике на кнопку id="colorBtn" измени backgroundColor блока id="colorBox" на любой цвет.',
    taskExpected: 'Ожидаемый результат: блок меняет цвет фона',
    taskHTML: '<div id="colorBox">Я изменю цвет!</div>\n<button id="colorBtn">Сменить цвет</button>',
    taskPlaceholder: '// const box = document.getElementById(...)\n// const btn = document.getElementById(...)\n// btn.addEventListener("click", function() {\n//   box.style.backgroundColor = "...\"\n// })',
    taskCheck: (logs, els) => !!(els.colorBox && els.colorBox.style && els.colorBox.style.backgroundColor),
    taskVirtualEl: {
      colorBox: { tagName: 'DIV', style: {}, id: 'colorBox', _listeners: [] },
      colorBtn: { tagName: 'BUTTON', id: 'colorBtn', _listeners: [] },
    },
    taskSimulate: (els) => { els.colorBtn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn()) },
    taskResultColor: (els) => els.colorBox && els.colorBox.style ? els.colorBox.style.backgroundColor : null,
  },
  {
    num: 15, badge: 'Задача 5',
    title: 'Приветствие по имени',
    subtitle: 'Всё вместе: input → обработка → вывод',
    content: 'task',
    taskId: 15,
    taskDesc: 'При клике на кнопку id="greetBtn" прочитай значение из поля id="nameInput" и запиши в id="greetOutput" строку "Привет, Имя!"',
    taskExpected: 'Если ввести "Алиса" → greetOutput: Привет, Алиса!',
    taskHTML: '<input id="nameInput" placeholder="Имя">\n<button id="greetBtn">Поздороваться</button>\n<p id="greetOutput"></p>',
    taskPlaceholder: '// const input = document.getElementById(...)\n// const btn = document.getElementById(...)\n// const output = document.getElementById(...)\n// btn.addEventListener("click", function() {...})',
    taskCheck: (logs, els) => els.greetOutput && els.greetOutput.textContent.toLowerCase().includes('алиса'),
    taskVirtualEl: {
      nameInput:   { tagName: 'INPUT', value: 'Алиса', id: 'nameInput', _listeners: [] },
      greetBtn:    { tagName: 'BUTTON', id: 'greetBtn', _listeners: [] },
      greetOutput: { tagName: 'P', textContent: '', id: 'greetOutput', _listeners: [] },
    },
    taskSimulate: (els) => { els.greetBtn._listeners.filter(l=>l.evt==='click').forEach(l=>l.fn()) },
    taskResultText: (els) => els.greetOutput ? els.greetOutput.textContent : '',
  },
]

// ─── CODE SNIPPET COMPONENT ───────────────────────────
function CodeSnip({ children }) {
  return (
    <pre style={{
      background:'#0d1117',border:'1px solid #30363d',borderRadius:8,
      padding:'14px 16px',fontFamily:"'Fira Code','JetBrains Mono','Consolas',monospace",
      fontSize:13,lineHeight:1.7,color:'#e6edf3',overflowX:'auto',margin:'12px 0',
    }}>
      <code dangerouslySetInnerHTML={{__html:children}}/>
    </pre>
  )
}

const kw  = s => `<span style="color:#ff7b72">${s}</span>`
const fn  = s => `<span style="color:#d2a8ff">${s}</span>`
const str = s => `<span style="color:#a5d6ff">${s}</span>`
const cm  = s => `<span style="color:#8b949e;font-style:italic">${s}</span>`
const ht  = s => `<span style="color:#7ee787">${s}</span>`
const ha  = s => `<span style="color:#a5d6ff">${s}</span>`

// ─── DEMOS ────────────────────────────────────────────
function Demo1() {
  const [out, setOut] = useState('Нажми кнопку...')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Живой пример</div>
      <h3 id="s1h" style={{marginBottom:12,color:'var(--bright)'}}>Привет, мир!</h3>
      <button style={demoBtn} onClick={()=>setOut('tagName: "H3", textContent: "Привет, мир!"')}>Запустить JS</button>
      <div style={consoleOut}>{out}</div>
    </div>
  )
}

function Demo2() {
  const [out,setOut] = useState('Результат появится здесь')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Попробуй</div>
      <h3 style={{fontSize:'1rem',marginBottom:12,color:'var(--accent)'}}>Я — элемент с id="demoEl"</h3>
      <button style={demoBtn} onClick={()=>setOut('tagName: "H3" | id: "demoEl" | textContent: \'Я — элемент с id="demoEl"\'')}>Получить элемент</button>
      <div style={outBox}>{out}</div>
    </div>
  )
}

function Demo3() {
  const [out,setOut] = useState('Событие: ожидание...')
  const [outColor,setC] = useState('var(--green)')
  const set=(txt,col)=>{ setOut(txt); setC(col) }
  const [val,setVal] = useState('')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Пощупай события</div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:12}}>
        <button style={demoBtn} onClick={()=>set('Событие: click!','var(--green)')}>Кликни (click)</button>
        <input style={demoInput} placeholder="Пиши (input)"
          value={val} onChange={e=>{setVal(e.target.value);set(`Событие: input → "${e.target.value}"`, 'var(--accent)')}}/>
      </div>
      <div style={{...outBox,color:outColor}}>{out}</div>
    </div>
  )
}

function Demo4() {
  const [n,setN] = useState(0)
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>addEventListener в действии</div>
      <button style={demoBtn} onClick={()=>setN(x=>x+1)}>Нажми меня</button>
      <div style={consoleOut}>{n===0?'Жду клика...':`addEventListener сработал ${n} раз!`}</div>
    </div>
  )
}

function Demo5() {
  const [txt,setTxt] = useState('Старый текст')
  const [col,setCol] = useState('var(--bright)')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Попробуй</div>
      <h3 style={{fontSize:'1.2rem',marginBottom:12,color:col,transition:'color .3s'}}>{txt}</h3>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <button style={demoBtn} onClick={()=>{setTxt('Новый текст!');setCol('var(--green)')}}>Изменить текст</button>
        <button style={{...demoBtn,background:'transparent',borderColor:'var(--border)'}} onClick={()=>{setTxt('Старый текст');setCol('var(--bright)')}}>Сброс</button>
      </div>
    </div>
  )
}

function Demo6() {
  const [style,setStyle] = useState({})
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Играй со стилями</div>
      <h3 style={{fontSize:'1.3rem',marginBottom:14,transition:'all .3s',...style}}>Я изменю свой вид!</h3>
      <div style={{display:'flex',flexWrap:'wrap',gap:7,justifyContent:'center'}}>
        {[
          ['Красный',  ()=>setStyle({color:'#f78166'})],
          ['Большой',  ()=>setStyle({fontSize:'2.2rem'})],
          ['Фон',      ()=>setStyle({backgroundColor:'#e3b341',color:'#0d1117',padding:'6px 12px',borderRadius:'6px'})],
          ['Скрыть',   ()=>setStyle({display:'none'})],
          ['Сброс',    ()=>setStyle({})],
        ].map(([label,fn])=>(
          <button key={label} style={{...demoBtn,padding:'7px 12px',fontSize:13}} onClick={fn}>{label}</button>
        ))}
      </div>
    </div>
  )
}

function Demo7() {
  const [active,setActive] = useState(false)
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>toggle в действии</div>
      <div style={{
        width:72,height:72,margin:'0 auto 14px',borderRadius:8,transition:'all .3s',
        background:active?'var(--accent)':'var(--bg3)',border:'1px solid var(--border)',
      }}/>
      <button style={demoBtn} onClick={()=>setActive(v=>!v)}>Toggle "active"</button>
      <div style={outBox}>классы: {active?'active':'(пусто)'}</div>
    </div>
  )
}

function Demo8() {
  const [out,setOut] = useState('input.value = "..."')
  const [val,setVal] = useState('')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Введи что-нибудь</div>
      <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
        <input style={demoInput} placeholder="Твоё имя" value={val} onChange={e=>setVal(e.target.value)}/>
        <button style={demoBtn} onClick={()=>setOut(`input.value = "${val}"`)}>Показать</button>
      </div>
      <div style={outBox}>{out}</div>
    </div>
  )
}

function Demo9() {
  const [name,setName] = useState('')
  const [out,setOut]   = useState('Здесь появится приветствие')
  const [col,setCol]   = useState('var(--accent)')
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Полный цикл</div>
      <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap',marginBottom:14}}>
        <input style={demoInput} placeholder="Введи имя" value={name} onChange={e=>setName(e.target.value)}/>
        <button style={demoBtn} onClick={()=>{
          if(name){setOut(`Привет, ${name}!`);setCol('var(--green)');}
          else{setOut('Введи имя!');setCol('var(--coral)');}
        }}>Поздороваться</button>
      </div>
      <div style={{fontSize:'1.1rem',fontWeight:700,color:col,transition:'color .3s'}}>{out}</div>
    </div>
  )
}

function Demo10() {
  const [count,setCount] = useState(0)
  return (
    <div style={demoWrap}>
      <div style={demoLabel}>Счётчик</div>
      <div style={{fontSize:'3rem',fontWeight:900,color:count>9?'#f78166':'var(--accent)',margin:'8px 0',fontFamily:'monospace',transition:'color .3s'}}>{count}</div>
      <div style={{display:'flex',gap:8,justifyContent:'center'}}>
        <button style={demoBtn} onClick={()=>setCount(c=>c+1)}>+ Добавить</button>
        <button style={{...demoBtn,borderColor:'var(--border)',background:'transparent'}} onClick={()=>setCount(0)}>Сброс</button>
      </div>
    </div>
  )
}

const DEMOS = {
  slide1: Demo1, slide2: Demo2, slide3: Demo3, slide4: Demo4, slide5: Demo5,
  slide6: Demo6, slide7: Demo7, slide8: Demo8, slide9: Demo9, slide10: Demo10,
}

// ─── TASK RUNNER ──────────────────────────────────────
function TaskSlide({ slide, onSolved }) {
  const [code,setCode]       = useState('')
  const [lines,setLines]     = useState([])
  const [success,setSuccess] = useState(false)
  const [resultColor,setRC]  = useState(null)
  const [resultText,setRT]   = useState('')

  const run = () => {
    if(!code.trim()){setLines([{t:'info',s:'Напиши код и нажми Run!'}]);return}
    setLines([])
    setSuccess(false)
    setRC(null)
    setRT('')

    // Deep-clone virtual elements per slide
    const raw = slide.taskVirtualEl
    const els = {}
    for(const [key,val] of Object.entries(raw)){
      els[key] = {...val, style:{...(val.style||{})}, _listeners:[...(val._listeners||[])]}
      els[key].addEventListener = function(evt,fn){ els[key]._listeners.push({evt,fn}) }
    }

    const logs = []
    const vDoc = { getElementById: (id) => els[id] || null }
    const vConsole = { log: (...args) => args.forEach(a=>logs.push(String(a))) }

    try {
      const fn = new Function('document','console', code)
      fn(vDoc, vConsole)

      if(slide.taskSimulate) slide.taskSimulate(els, logs)

      const outLines = logs.map(l=>({t:'normal',s:l}))
      if(outLines.length) setLines(outLines)
      else setLines([{t:'info',s:'Код запущен. Вывода нет — используй console.log()'}])

      const ok = slide.taskCheck(logs, els)

      if(slide.taskResultColor) { const c=slide.taskResultColor(els); if(c) setRC(c) }
      if(slide.taskResultText)  { const tx=slide.taskResultText(els); if(tx) setRT(tx) }

      if(ok){ setSuccess(true); onSolved(slide.taskId) }
    } catch(err) {
      setLines([{t:'error',s:`Ошибка: ${err.message}`}])
    }
  }

  return (
    <div>
      {/* task description */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 18px',marginBottom:14}}>
        <div style={{fontSize:12,color:'#e3b341',textTransform:'uppercase',letterSpacing:.6,fontWeight:700,marginBottom:8}}>Задание</div>
        <p style={{fontSize:14,color:'var(--text)',marginBottom:8,lineHeight:1.6}}>{slide.taskDesc}</p>
        <div style={{fontFamily:'monospace',fontSize:12,background:'var(--bg)',border:'1px solid var(--border)',
          padding:'7px 11px',borderRadius:6,color:'var(--muted)'}}>{slide.taskExpected}</div>
      </div>

      {/* HTML preview */}
      <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:8,
        padding:'12px 16px',marginBottom:12,fontFamily:'monospace',fontSize:12,color:'var(--muted)',lineHeight:1.7}}>
        <div style={{fontSize:11,color:'var(--muted)',marginBottom:6,textTransform:'uppercase',letterSpacing:.6}}>HTML на странице</div>
        <pre style={{margin:0,whiteSpace:'pre-wrap',color:'#7ee787'}}>{slide.taskHTML}</pre>
      </div>

      {/* editor */}
      <div style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden',marginBottom:12}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 13px',
          background:'var(--bg2)',borderBottom:'1px solid var(--border)'}}>
          <span style={{fontSize:12,color:'var(--muted)',fontFamily:'monospace'}}>script.js</span>
          <button onClick={run} style={{
            background:'var(--green)',color:'#0d1117',border:'none',borderRadius:6,
            padding:'5px 14px',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit',
          }}>▶ Run</button>
        </div>
        <textarea
          value={code}
          onChange={e=>setCode(e.target.value)}
          placeholder={slide.taskPlaceholder}
          spellCheck={false}
          style={{
            width:'100%',minHeight:120,background:'var(--bg)',color:'var(--text)',
            fontFamily:"'Fira Code','Consolas',monospace",fontSize:13,lineHeight:1.7,
            padding:'14px 16px',border:'none',outline:'none',resize:'vertical',
          }}
        />
      </div>

      {/* output */}
      <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'13px 16px'}}>
        <div style={{fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.6,marginBottom:8}}>Консоль</div>
        {resultColor&&(
          <div style={{width:'100%',height:48,borderRadius:8,background:resultColor,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:13,color:'#0d1117',fontWeight:700,marginBottom:8,transition:'background .3s'}}>
            backgroundColor = "{resultColor}"
          </div>
        )}
        {resultText&&<div style={{fontSize:13,color:'var(--accent)',marginBottom:8,fontWeight:600}}>{resultText}</div>}
        {lines.map((l,i)=>(
          <div key={i} style={{
            display:'flex',gap:7,alignItems:'flex-start',padding:'3px 0',
            color:l.t==='error'?'#f78166':l.t==='info'?'var(--accent)':'var(--green)',
            fontFamily:'monospace',fontSize:13,
          }}>
            <span style={{color:'var(--muted)',flexShrink:0}}>›</span>
            <span>{l.s}</span>
          </div>
        ))}
        {lines.length===0&&!resultColor&&!resultText&&(
          <span style={{color:'var(--muted)',fontStyle:'italic',fontSize:12}}>Нажми Run чтобы запустить код</span>
        )}
        {success&&(
          <div style={{display:'flex',alignItems:'center',gap:8,marginTop:10,padding:'9px 13px',
            background:'rgba(63,185,80,.1)',border:'1px solid rgba(63,185,80,.3)',borderRadius:7,
            color:'var(--green)',fontWeight:700,fontSize:14}}>
            ✓ Отлично! Правильно!
          </div>
        )}
      </div>
    </div>
  )
}

// ─── SLIDE CONTENT ────────────────────────────────────
function SlideContent({ slide, onSolved }) {
  const Demo = DEMOS[slide.demoId]

  if(slide.content === 'task') return <TaskSlide slide={slide} onSolved={onSolved}/>

  return (
    <div>
      {slide.content==='theory'&&(
        <>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'18px 20px',marginBottom:14}}>
            <div style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.6,fontWeight:700,marginBottom:12}}>JavaScript позволяет</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8}}>
              {slide.points.map((p,i)=>(
                <li key={i} style={{display:'flex',gap:10,fontSize:14,lineHeight:1.5}}>
                  <span style={{color:'var(--accent)',flexShrink:0}}>▸</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div style={{borderLeft:'3px solid var(--accent)',padding:'10px 14px',
            background:'rgba(88,166,255,.06)',borderRadius:'0 8px 8px 0',marginBottom:14,fontSize:14}}>
            {slide.highlight}
          </div>
          {Demo&&<Demo/>}
          <CodeSnip>{`${kw('const')} title = document.${fn('getElementById')}(${str('"title"')});\nconsole.${fn('log')}(title); ${cm('// видим элемент в консоли')}`}</CodeSnip>
        </>
      )}

      {slide.content==='code2'&&(
        <>
          <div style={{borderLeft:'3px solid var(--accent)',padding:'10px 14px',background:'rgba(88,166,255,.06)',borderRadius:'0 8px 8px 0',marginBottom:14,fontSize:14}}>
            Каждый HTML-элемент может иметь атрибут <code style={{color:'var(--accent2)',background:'var(--bg3)',padding:'1px 5px',borderRadius:3}}>id</code>. Он должен быть <strong>уникальным</strong> на странице.
          </div>
          <CodeSnip>{`${ht('&lt;h1')} ${ha('id')}=${str('"myTitle"')}${ht('&gt;')}Заголовок${ht('&lt;/h1&gt;')}\n${ht('&lt;p')}  ${ha('id')}=${str('"myText"')}${ht('&gt;')}Текст${ht('&lt;/p&gt;')}`}</CodeSnip>
          <CodeSnip>{`${cm('// Получаем элемент — это объект со свойствами')}\n${kw('const')} title = document.${fn('getElementById')}(${str('"myTitle"')});\nconsole.${fn('log')}(title.tagName);     ${cm('// "H1"')}\nconsole.${fn('log')}(title.textContent); ${cm('// "Заголовок"')}`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='events'&&(
        <>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 18px',marginBottom:14}}>
            <div style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.6,fontWeight:700,marginBottom:10}}>Популярные события</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
              {['click','input','change','submit','mouseover','keydown','focus','blur'].map(t=>(
                <span key={t} style={{background:'rgba(88,166,255,.1)',border:'1px solid rgba(88,166,255,.3)',
                  color:'var(--accent)',padding:'4px 12px',borderRadius:20,fontSize:13,fontFamily:'monospace'}}>{t}</span>
              ))}
            </div>
          </div>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='code4'&&(
        <>
          <CodeSnip>{`element.${fn('addEventListener')}(${str('"событие"')}, ${kw('function')}() {\n  ${cm('// этот код запустится когда событие произойдёт')}\n});`}</CodeSnip>
          <CodeSnip>{`${kw('const')} btn = document.${fn('getElementById')}(${str('"myBtn"')});\n\nbtn.${fn('addEventListener')}(${str('"click"')}, ${kw('function')}() {\n  console.${fn('log')}(${str('"Кнопка нажата!"')});\n});`}</CodeSnip>
          <div style={{borderLeft:'3px solid var(--accent)',padding:'10px 14px',background:'rgba(88,166,255,.06)',borderRadius:'0 8px 8px 0',marginBottom:14,fontSize:14}}>
            Можно вешать <strong>несколько обработчиков</strong> на один элемент.
          </div>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='code5'&&(
        <>
          <CodeSnip>{`${cm('// Читаем текст')}\n${kw('const')} text = title.textContent;\n\n${cm('// Меняем текст')}\ntitle.textContent = ${str('"Новый текст"')};`}</CodeSnip>
          <CodeSnip>{`${kw('const')} title = document.${fn('getElementById')}(${str('"title"')});\n${kw('const')} btn   = document.${fn('getElementById')}(${str('"btn"')});\n\nbtn.${fn('addEventListener')}(${str('"click"')}, ${kw('function')}() {\n  title.textContent = ${str('"Я изменился!"')};\n});`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='code6'&&(
        <>
          <CodeSnip>{`${cm('// Доступ: element.style.свойство = "значение"')}\ntitle.style.color           = ${str('"red"')};\ntitle.style.fontSize        = ${str('"40px"')};\ntitle.style.backgroundColor = ${str('"yellow"')};\ntitle.style.display         = ${str('"none"')}; ${cm('// скрыть')}`}</CodeSnip>
          <div style={{borderLeft:'3px solid #e3b341',padding:'10px 14px',background:'rgba(227,179,65,.06)',borderRadius:'0 8px 8px 0',marginBottom:14,fontSize:14}}>
            CSS-свойства пишутся в camelCase: <code style={{color:'var(--accent2)'}}>background-color</code> → <code style={{color:'var(--accent2)'}}>backgroundColor</code>
          </div>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='classList'&&(
        <>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 18px',marginBottom:14}}>
            <div style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.6,fontWeight:700,marginBottom:10}}>Методы classList</div>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:7}}>
              {[
                ['element.classList.add("active")', '— добавить класс'],
                ['element.classList.remove("active")', '— удалить класс'],
                ['element.classList.toggle("active")', '— переключить'],
                ['element.classList.contains("active")', '— проверить'],
              ].map(([c,d],i)=>(
                <li key={i} style={{display:'flex',gap:8,fontSize:13,lineHeight:1.5,flexWrap:'wrap'}}>
                  <code style={{color:'var(--accent2)',background:'var(--bg3)',padding:'1px 6px',borderRadius:4}}>{c}</code>
                  <span style={{color:'var(--muted)'}}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <CodeSnip>{`${cm('// toggle удобен для кнопки "включить/выключить"')}\nbtn.${fn('addEventListener')}(${str('"click"')}, ${kw('function')}() {\n  menu.classList.${fn('toggle')}(${str('"open"')});\n});`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='inputval'&&(
        <>
          <CodeSnip>{`${kw('const')} input = document.${fn('getElementById')}(${str('"nameInput"')});\n\n${cm('// Читаем то, что написал пользователь')}\n${kw('const')} value = input.value;\nconsole.${fn('log')}(value);\n\n${cm('// Очистить поле')}\ninput.value = ${str('""')};`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='fullcycle'&&(
        <>
          <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',padding:'12px 16px',
            background:'var(--bg)',border:'1px solid var(--border)',borderRadius:10,marginBottom:14}}>
            {['Получить элементы','→','Повесить событие','→','Прочитать input.value','→','Изменить страницу'].map((s,i)=>(
              <span key={i} style={s==='→'?{color:'#e3b341',fontSize:14}:{
                fontSize:12,fontWeight:600,padding:'4px 10px',borderRadius:6,
                background:'var(--bg2)',border:'1px solid var(--border)',color:'var(--text)'}}>
                {s}
              </span>
            ))}
          </div>
          <CodeSnip>{`${kw('const')} input = document.${fn('getElementById')}(${str('"nameInput"')});\n${kw('const')} btn   = document.${fn('getElementById')}(${str('"greetBtn"')});\n${kw('const')} title = document.${fn('getElementById')}(${str('"greeting"')});\n\nbtn.${fn('addEventListener')}(${str('"click"')}, ${kw('function')}() {\n  ${kw('const')} name = input.value;\n  title.textContent = ${str('"Привет, "')} + name + ${str('"!"')};\n});`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}

      {slide.content==='counter'&&(
        <>
          <CodeSnip>{`${kw('let')} count = 0; ${cm('// переменная — хранит состояние')}\n\n${kw('const')} display = document.${fn('getElementById')}(${str('"count"')});\n${kw('const')} btn     = document.${fn('getElementById')}(${str('"plusBtn"')});\n\nbtn.${fn('addEventListener')}(${str('"click"')}, ${kw('function')}() {\n  count++;                     ${cm('// увеличить на 1')}\n  display.textContent = count; ${cm('// показать')}\n});`}</CodeSnip>
          {Demo&&<Demo/>}
        </>
      )}
    </div>
  )
}

// ─── SHARED STYLES ────────────────────────────────────
const demoWrap = {
  background:'var(--bg3)',border:'2px dashed var(--border)',borderRadius:10,
  padding:'20px',marginTop:14,textAlign:'center',
}
const demoLabel = {
  fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:.8,marginBottom:12,
}
const demoBtn = {
  background:'var(--accent)',color:'#0d1117',border:'none',padding:'9px 18px',
  borderRadius:7,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit',
  transition:'opacity .15s',margin:'3px',
}
const demoInput = {
  padding:'9px 13px',border:'1px solid var(--border)',borderRadius:7,
  background:'var(--bg)',color:'var(--text)',fontSize:13,fontFamily:'inherit',
  outline:'none',width:180,
}
const outBox = {
  marginTop:10,padding:'9px 12px',background:'var(--bg)',border:'1px solid var(--border)',
  borderRadius:6,fontFamily:'monospace',fontSize:12,color:'var(--green)',
  minHeight:34,display:'flex',alignItems:'center',justifyContent:'center',
}
const consoleOut = {
  marginTop:10,padding:'9px 12px',background:'#0a0e14',border:'1px solid var(--border)',
  borderRadius:6,fontFamily:'monospace',fontSize:12,color:'#a5d6ff',
  minHeight:34,display:'flex',alignItems:'center',justifyContent:'flex-start',gap:8,
}

// ─── MAIN PAGE ────────────────────────────────────────
export default function LessonPage({ onBack }) {
  const [current,setCurrent] = useState(1)
  const [solved,setSolved]   = useState(new Set())
  const TOTAL = SLIDES.length
  const slide = SLIDES[current - 1]

  const onSolved = (id) => setSolved(s => new Set([...s, id]))

  useEffect(() => { window.scrollTo({ top:0, behavior:'smooth' }) }, [current])

  const changeSlide = dir => {
    const next = current + dir
    if(next < 1 || next > TOTAL) return
    setCurrent(next)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',background:'var(--bg)'}}>
      {/* topbar */}
      <div style={{
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'10px 16px',borderBottom:'1px solid var(--border)',
        background:'var(--bg2)',position:'sticky',top:0,zIndex:100,flexShrink:0,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={onBack} style={{background:'none',border:'1px solid var(--border)',
            color:'var(--muted)',padding:'5px 11px',borderRadius:7,cursor:'pointer',fontSize:12,fontFamily:'inherit'}}>
            ← EastCode
          </button>
          <span style={{fontSize:12,color:'var(--accent)',fontFamily:'monospace',fontWeight:700}}>js-dom-lesson.js</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:100,height:3,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
            <div style={{height:'100%',background:'var(--accent)',borderRadius:2,transition:'width .3s',width:`${(current/TOTAL)*100}%`}}/>
          </div>
          <span style={{fontSize:12,color:'var(--muted)',fontFamily:'monospace'}}>{current} / {TOTAL}</span>
        </div>
      </div>

      {/* content */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',padding:'20px 14px 100px'}}>
        <div style={{width:'100%',maxWidth:820}}>
          {/* slide header */}
          <div style={{marginBottom:24}}>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:4,fontFamily:'monospace'}}>{String(current).padStart(2,'0')} / {TOTAL}</div>
            <span style={{
              display:'inline-flex',alignItems:'center',fontSize:11,fontWeight:700,
              textTransform:'uppercase',letterSpacing:.8,padding:'3px 10px',borderRadius:20,marginBottom:10,
              ...(slide.badge.startsWith('Задача')
                ? {background:'rgba(63,185,80,.12)',color:'var(--green)',border:'1px solid rgba(63,185,80,.25)'}
                : {background:'rgba(88,166,255,.12)',color:'var(--accent)',border:'1px solid rgba(88,166,255,.25)'}),
            }}>{slide.badge}</span>
            <h1 style={{fontSize:'clamp(1.4rem,4vw,2rem)',fontWeight:700,color:'var(--bright)',lineHeight:1.2}}>{slide.title}</h1>
            <p style={{fontSize:14,color:'var(--muted)',marginTop:5}}>{slide.subtitle}</p>
          </div>

          {/* slide body */}
          <SlideContent slide={slide} onSolved={onSolved}/>
        </div>
      </div>

      {/* bottom nav */}
      <div style={{
        position:'fixed',bottom:0,left:0,right:0,
        background:'var(--bg2)',borderTop:'1px solid var(--border)',
        padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:100,
      }}>
        <button onClick={()=>changeSlide(-1)} disabled={current===1} style={{
          display:'flex',alignItems:'center',gap:7,padding:'9px 18px',
          background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,
          color:'var(--text)',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit',
          opacity:current===1?.3:1,
        }}>← Назад</button>

        <div style={{display:'flex',gap:5,flexWrap:'wrap',justifyContent:'center',maxWidth:220}}>
          {SLIDES.map(s=>(
            <div key={s.num} onClick={()=>setCurrent(s.num)} style={{
              width:8,height:8,borderRadius:'50%',cursor:'pointer',transition:'all .2s',
              background: s.num===current?'var(--accent)':solved.has(s.taskId)?'var(--green)':'var(--border)',
              transform: s.num===current?'scale(1.4)':'scale(1)',
            }}/>
          ))}
        </div>

        <button onClick={()=>changeSlide(1)} disabled={current===TOTAL} style={{
          display:'flex',alignItems:'center',gap:7,padding:'9px 18px',
          background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,
          color:'var(--text)',fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'inherit',
          opacity:current===TOTAL?.3:1,
        }}>Вперёд →</button>
      </div>
    </div>
  )
}
