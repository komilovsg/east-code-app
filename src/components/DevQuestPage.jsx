import { useState, useEffect, useRef } from 'react'

// ─── SYNTAX HIGHLIGHTER ───────────────────────────────
const HL = raw => {
  let s = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  s = s.replace(/\b(const|let|var|function|return|if|else|for|while|do|async|await|new|typeof|null|undefined|true|false|class|this|switch|case|break|throw|try|catch|finally|import|export|default)\b/g,
    m=>`<b style="color:#C792EA">${m}</b>`)
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)/g,
    m=>`<span style="color:#C3E88D">${m}</span>`)
  s = s.replace(/\b(console|document|Math|Array|Object|JSON|Promise|fetch|window)\b/g,
    m=>`<span style="color:#82AAFF">${m}</span>`)
  s = s.replace(/(?<!\w)(\d+(?:\.\d+)?)(?!\w)/g,
    m=>`<span style="color:#F78C6C">${m}</span>`)
  s = s.replace(/(\/\/.+)/g, m=>`<i style="color:#546E7A">${m}</i>`)
  return s
}

// ─── DATA ─────────────────────────────────────────────
const BUG_Q = [
  { tag:'const vs let', code:'const score = 0;\nscore = 100;\nconsole.log(score);',
    q:'Что не так с этим кодом?',
    opts:['const нельзя переприсвоить — нужно let','score нельзя называть числом','Нет ошибки — выведет 100','console.log надо писать до присвоения'],
    ans:0, hint:'Какой тип объявления не позволяет изменить значение?',
    exp:'const объявляет константу. Попытка переприсвоить — TypeError. Если значение будет меняться, используй let.' },
  { tag:'property vs method', code:'const arr = [1, 2, 3];\nconst len = arr.length();\nconsole.log(len);',
    q:'Найди ошибку:',
    opts:['length — свойство, не метод. Убрать скобки!','Массив нельзя называть arr','Нет ошибки — выведет 3','Нельзя хранить число в const'],
    ans:0, hint:'Методы вызываются со скобками(), свойства — без.',
    exp:'arr.length — это свойство-число, не метод. arr.length() → TypeError: arr.length is not a function.' },
  { tag:'missing return', code:'function multiply(a, b) {\n  a * b;\n}\nconsole.log(multiply(3, 4));',
    q:'Код выведет undefined. Почему?',
    opts:['Нет return — функция возвращает undefined','Нельзя умножать внутри функции','Нет ошибки — выведет 12','console.log не работает с функциями'],
    ans:0, hint:'Что произойдёт, если функция ничего не возвращает явно?',
    exp:'Без return функция всегда возвращает undefined. Нужно: return a * b;' },
  { tag:'= vs ===', code:"let name = 'Alice';\nif (name = 'Bob') {\n  console.log('Hello Bob');\n}",
    q:"Код всегда выведет 'Hello Bob'. Баг есть?",
    opts:['Да! = присваивает, нужно === для сравнения','Нет бага, всё правильно','if не работает со строками','Нельзя менять let в условии'],
    ans:0, hint:'Вспомни разницу между = и === в JS.',
    exp:"name = 'Bob' — это присвоение, а не сравнение. 'Bob' truthy, поэтому if всегда выполняется. Нужно name === 'Bob'." },
  { tag:'infinite loop', code:'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  // что-то пропущено',
    q:'Этот код зависнет навсегда. Что пропущено?',
    opts:['i++ — счётчик никогда не растёт','break в конце цикла','return после console.log','while надо писать как for'],
    ans:0, hint:'Когда условие i < 5 станет ложным?',
    exp:'Без i++ переменная всегда 0, условие всегда true — бесконечный цикл. Всегда изменяй счётчик в цикле!' },
  { tag:'missing await', code:"async function getUser() {\n  const res = fetch('api/user');\n  const data = res.json();\n  return data;\n}",
    q:'Функция вернёт Promise вместо данных. Где ошибка?',
    opts:['Пропущено await перед fetch и res.json()','async функция не может использовать fetch','return надо убрать','json() не существует'],
    ans:0, hint:'async/await — это пара. Что добавляется перед каждым промисом?',
    exp:'fetch() возвращает Promise. Без await получаешь промис, а не данные. Нужно: await fetch(...) и await res.json().' },
  { tag:'typo в API', code:"const btn = document.querySelector('#ok');\nbtn.addEventListner('click', handler);",
    q:'Код бросит ошибку. Найди причину:',
    opts:['Опечатка: addEventListner → addEventListener','querySelector не работает с #id','handler нужно вызвать со скобками','Нет ошибки'],
    ans:0, hint:'Прочитай имя метода внимательно, по буквам.',
    exp:'addEventListner — опечатка! Правильно: addEventListener. JS чувствителен к написанию — такие ошибки очень частые.' },
  { tag:'reference type', code:'const a = [1, 2, 3];\nconst b = a;\nb.push(4);\nconsole.log(a);',
    q:'Что выведет console.log(a)?',
    opts:['[1,2,3,4] — массивы копируются по ссылке','[1,2,3] — b отдельная копия','Ошибка, const нельзя изменить','undefined'],
    ans:0, hint:'Как JS хранит массивы и объекты в памяти?',
    exp:'const b = a не копирует массив — b указывает на тот же объект. Изменение через b меняет a. Для копии: [...a] или a.slice().' },
]

const OUTPUT_Q = [
  { tag:'typeof null', code:'console.log(typeof null);',
    q:'Что выведет код?',
    opts:['"null"','"object"','"undefined"','"NaN"'],
    ans:1, hint:'Это один из самых известных исторических багов JavaScript.',
    exp:"typeof null === 'object' — исторический баг JS. Нельзя исправить из-за обратной совместимости. Запомни как исключение!" },
  { tag:'string + number', code:'console.log("5" + 3);',
    q:'Что выведет код?',
    opts:['"8"','"53"','8','TypeError'],
    ans:1, hint:'Что делает + когда один операнд — строка?',
    exp:'Когда один операнд строка, + конкатенирует: "5" + 3 = "53". Для сложения: Number("5") + 3 = 8 или +"5" + 3.' },
  { tag:'string - number', code:'console.log("10" - 3);',
    q:'Что выведет код?',
    opts:['"103"','"10-3"','7','NaN'],
    ans:2, hint:'- в отличие от + не умеет конкатенировать строки.',
    exp:'Оператор - приводит оба операнда к числам. "10" → 10, затем 10 - 3 = 7. Только + умеет конкатенировать.' },
  { tag:'loose equality', code:'console.log(0 == false);',
    q:'Что выведет код?',
    opts:['false','true','TypeError','undefined'],
    ans:1, hint:'== приводит типы. false это 0 в числовом контексте.',
    exp:'== (нестрогое равенство) приводит типы: false → 0, и 0 == 0 → true. Всегда используй === чтобы избегать сюрпризов.' },
  { tag:'let undefined', code:'let x;\nconsole.log(x);',
    q:'Что выведет код?',
    opts:['null','0','undefined','ReferenceError'],
    ans:2, hint:'Что является значением переменной по умолчанию?',
    exp:'Объявленная переменная без значения = undefined. Это не ошибка — переменная существует, но не инициализирована.' },
  { tag:'Boolean coercion', code:'console.log(Boolean(""));',
    q:'Что выведет код?',
    opts:['true','false','""','undefined'],
    ans:1, hint:'Вспомни список falsy значений JavaScript.',
    exp:'Пустая строка — falsy. Другие falsy: 0, null, undefined, NaN, false. Всё остальное (в том числе "0", []) — truthy!' },
  { tag:'indexOf not found', code:"const arr = ['apple', 'banana'];\nconsole.log(arr.indexOf('mango'));",
    q:'Что выведет код?',
    opts:['null','undefined','-1','false'],
    ans:2, hint:'Что возвращает indexOf когда не находит элемент?',
    exp:"indexOf возвращает -1 если элемент не найден. Это соглашение: -1 = «не найдено». Для проверки наличия лучше используй includes()." },
  { tag:'arrow implicit return', code:'const double = x => x * 2;\nconsole.log(double(5));',
    q:'Что выведет код?',
    opts:['undefined','5','10','x * 2'],
    ans:2, hint:'Стрелочная функция без {} возвращает значение неявно.',
    exp:'x => x * 2 — неявный return. Без фигурных скобок стрелочная функция автоматически возвращает выражение. Результат: 10.' },
]

const FILL_Q = [
  { tag:'filter', code:'const nums = [1, 2, 3, 4, 5];\nconst evens = nums.___( n => n % 2 === 0 );',
    q:'Метод, оставляющий только чётные числа:',
    opts:['filter','map','find','forEach'],
    ans:0, hint:'Нужен метод который фильтрует элементы по условию.',
    exp:'filter возвращает новый массив с элементами, прошедшими проверку. Результат: [2, 4]. map трансформирует, find находит первый.' },
  { tag:'map', code:'const nums = [1, 2, 3];\nconst doubled = nums.___( n => n * 2 );',
    q:'Метод, создающий новый массив с удвоенными числами:',
    opts:['map','filter','reduce','forEach'],
    ans:0, hint:'Нужен метод который трансформирует каждый элемент.',
    exp:'map создаёт новый массив, применяя функцию к каждому элементу. Результат: [2, 4, 6]. forEach ничего не возвращает.' },
  { tag:'const', code:'___ PI = 3.14159; // значение не изменится',
    q:'Ключевое слово для константы:',
    opts:['const','let','var','static'],
    ans:0, hint:'Какое ключевое слово объявляет неизменяемое значение?',
    exp:'const для значений без переприсвоения. Соглашение: UPPER_CASE для констант. let — для изменяемых переменных.' },
  { tag:'===', code:'if (userAge ___ 18) {\n  grantAccess();\n}',
    q:'Правильный оператор строгого сравнения:',
    opts:['===','==','=','=>'],
    ans:0, hint:'Нужно сравнить без приведения типов, не присвоить.',
    exp:'=== строгое сравнение (без приведения). == может дать сюрпризы: \'18\' == 18 → true. = это присвоение, не сравнение!' },
  { tag:'=>', code:'const greet = name ___ `Hello, ${name}!`;',
    q:'Синтаксис стрелочной функции:',
    opts:['=>','->',':','return'],
    ans:0, hint:'Какой символ превращает функцию в стрелочную?',
    exp:'=> создаёт стрелочную функцию с неявным return. Короче чем function keyword. Широко используется в современном JS.' },
  { tag:'await', code:"async function load() {\n  const res = ___ fetch('/api/data');\n  return res.json();\n}",
    q:'Ключевое слово для ожидания Promise:',
    opts:['await','async','then','resolve'],
    ans:0, hint:'Как дождаться результата промиса внутри async-функции?',
    exp:'await останавливает async-функцию пока Promise не разрешится. Без await получишь промис-объект, а не данные.' },
  { tag:'querySelector', code:'const btn = document.___("#submit");',
    q:'DOM-метод для поиска по CSS-селектору:',
    opts:['querySelector','getElementById','getElement','findNode'],
    ans:0, hint:'Какой метод принимает CSS-селектор как аргумент?',
    exp:'querySelector принимает любой CSS-селектор: \'#id\', \'.class\', \'div\', \'[attr]\'. getElementById принимает только ID без #.' },
  { tag:'JSON.parse', code:'const user = JSON.___( \'{"name":"Alex"}\' );',
    q:'Метод превращающий JSON-строку в объект:',
    opts:['parse','stringify','decode','fromString'],
    ans:0, hint:'parse или stringify — который из строки делает объект?',
    exp:'JSON.parse(string) → объект. JSON.stringify(object) → строка. Запомни направление: parse ← строка → объект.' },
]

const LEVELS = [
  { min:0,   name:'НОВИЧОК',  emoji:'🌱', col:'#00B85C', next:100  },
  { min:100, name:'СТАЖЁР',   emoji:'💻', col:'#2962FF', next:300  },
  { min:300, name:'ДЖУНИОР',  emoji:'⚡', col:'#FF8A00', next:600  },
  { min:600, name:'МИД',      emoji:'🚀', col:'#7B2FF2', next:9999 },
]
const getLevel = xp => { for(let i=LEVELS.length-1;i>=0;i--) if(xp>=LEVELS[i].min) return LEVELS[i]; return LEVELS[0] }
const shuffle = a => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b }

// ─── SCOPED CSS (injected once) ───────────────────────
const DQ_CSS = `
@keyframes dqSiIn{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
.dq-si{animation:dqSiIn .36s cubic-bezier(.2,.8,.3,1) both}
@keyframes dqCin{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.dq-ci{animation:dqCin .28s cubic-bezier(.2,1,.3,1) both}
@keyframes dqShk{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-7px)}80%{transform:translateX(7px)}}
.dq-shk{animation:dqShk .38s ease}
@keyframes dqBnc{0%,100%{transform:scale(1)}40%{transform:scale(1.04)}}
.dq-bnc{animation:dqBnc .32s ease}
@keyframes dqPopUp{0%{transform:translateY(0) scale(.4);opacity:0}28%{transform:translateY(-10px) scale(1.25);opacity:1}100%{transform:translateY(-50px) scale(.9);opacity:0}}
.dq-spop{position:absolute;z-index:20;font-family:'Russo One',sans-serif;pointer-events:none;white-space:nowrap;animation:dqPopUp 1.1s ease both}
@keyframes dqStmpIn{0%{transform:scale(4) rotate(-35deg);opacity:0}65%{transform:scale(.9) rotate(-11deg)}100%{transform:scale(1) rotate(-12deg);opacity:1}}
.dq-stamp{position:absolute;top:8px;right:10px;z-index:5;font-size:18px;letter-spacing:2px;padding:6px 11px;border:3px double currentColor;border-radius:8px;background:rgba(7,11,20,.88);animation:dqStmpIn .4s cubic-bezier(.15,1.5,.4,1) both;pointer-events:none;font-weight:900}
@keyframes dqTpls{0%,100%{opacity:1}50%{opacity:.4}}
.dq-turg{animation:dqTpls .55s ease infinite}
.dq-btn{font-weight:700;border:2px solid #00E5FF;border-radius:10px;box-shadow:3px 3px 0 #00E5FF22;cursor:pointer;transition:transform .07s,box-shadow .07s,background .15s;color:#fff;font-size:15px;letter-spacing:.3px;padding:13px 10px;width:100%;display:block;background:transparent;font-family:inherit}
.dq-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #00E5FF22}
.dq-btn:disabled{opacity:.35;cursor:not-allowed}
.dq-cbk{background:#0D1117;border:1.5px solid #1E2D4A;border-radius:10px;padding:13px 14px;font-family:'JetBrains Mono','Consolas',monospace;font-size:13px;line-height:1.7;color:#CDD3DE;white-space:pre;overflow-x:auto;position:relative}
.dq-blank{background:#7B2FF2;color:#fff;padding:1px 10px;border-radius:4px;font-weight:700;border:1.5px solid #A855F7}
@keyframes dqBfl{0%{bottom:0;opacity:.9}100%{bottom:108%;opacity:0}}
.dq-ptcl{position:absolute;border-radius:50%;pointer-events:none;animation:dqBfl linear forwards}
`

const PCOLS = ['#00E5FF','#7B2FF2','#00FF88','#FF4757','#FFD93D','#FF8A00']

function DQGrid() {
  return (
    <div style={{
      position:'absolute',inset:0,pointerEvents:'none',zIndex:0,overflow:'hidden',
      backgroundImage:'linear-gradient(rgba(0,229,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.05) 1px,transparent 1px)',
      backgroundSize:'40px 40px',
    }}>
      {Array.from({length:8},(_,i)=>(
        <div key={i} className="dq-ptcl" style={{
          width:4+(i*3)%10,height:4+(i*3)%10,
          background:PCOLS[i%PCOLS.length],
          left:`${(i*9.7+5)%90}%`,
          bottom:'-12px',opacity:.25,
          animationDuration:`${8+(i*2.8)%10}s`,
          animationDelay:`${-(i*1.7)%8}s`,
        }}/>
      ))}
    </div>
  )
}

// ─── BREATH GAME ──────────────────────────────────────
const BREATH_PHASES = [
  {name:'ВДОХ',  dur:4, scale:1.5, color:'#6366F1', text:'Медленно вдыхай...'},
  {name:'ДЕРЖИ', dur:4, scale:1.5, color:'#8B5CF6', text:'Удержи дыхание...'},
  {name:'ВЫДОХ', dur:6, scale:.65, color:'#2DD4BF', text:'Медленно выдыхай...'},
  {name:'ПАУЗА', dur:2, scale:.65, color:'#06B6D4', text:'Небольшая пауза...'},
]
const TOTAL_CYC = 4

function BreathGame({ onEnd }) {
  const [started,setS] = useState(false)
  const [pIdx,setPI]   = useState(0)
  const [pTime,setPT]  = useState(4)
  const [cyc,setC]     = useState(0)
  const [done,setD]    = useState(false)
  const [bscale,setBS] = useState(.65)
  const tmr = useRef(null)
  const ph  = BREATH_PHASES[pIdx]

  useEffect(()=>{ setBS(ph.scale) },[pIdx])
  useEffect(()=>{
    if(!started||done) return
    tmr.current = setInterval(()=>{
      setPT(t=>{
        if(t<=1){
          const np=(pIdx+1)%4
          if(np===0){const nc=cyc+1;setC(nc);if(nc>=TOTAL_CYC){setD(true);clearInterval(tmr.current);return 0;}}
          setPI(np);return BREATH_PHASES[np].dur
        }
        return t-1
      })
    },1000)
    return()=>clearInterval(tmr.current)
  },[started,pIdx,cyc,done])

  const pct=((cyc/TOTAL_CYC)*100)+((1/TOTAL_CYC)*(1-pTime/ph.dur)*100)
  const txDur=ph.name==='ДЕРЖИ'||ph.name==='ПАУЗА'?.3:ph.dur*.88

  return (
    <div className="dq-si" style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',
      background:'linear-gradient(160deg,#0C0E3F,#1E1B4B 55%,#0D2D4E)',
      padding:'18px 14px 28px',position:'relative',overflow:'hidden',
    }}>
      {Array.from({length:14},(_,i)=>(
        <div key={i} style={{position:'fixed',width:1.5+(i%3)*.5,height:1.5+(i%3)*.5,borderRadius:'50%',background:'#fff',
          left:`${(i*5.3+2)%95}%`,top:`${(i*6.7+4)%88}%`,opacity:.1+(i%4)*.04,pointerEvents:'none'}}/>
      ))}
      <div style={{textAlign:'center',marginBottom:8,zIndex:1}}>
        <div style={{fontSize:20,color:'#fff',fontWeight:700,textShadow:`0 0 22px ${ph.color}BB`}}>🫁 ПЕРЕЗАГРУЗКА</div>
        <div style={{color:'rgba(255,255,255,.45)',fontSize:12,marginTop:4}}>Бокс-дыхание · снимает тревогу и усталость</div>
      </div>
      {!started&&!done&&(
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:16,zIndex:1,textAlign:'center'}}>
          <div style={{background:'rgba(255,255,255,.07)',border:'1.5px solid rgba(255,255,255,.15)',borderRadius:18,padding:'20px 16px',maxWidth:340,color:'#fff'}}>
            <div style={{fontSize:40,marginBottom:8}}>🌊</div>
            <p style={{fontSize:13,lineHeight:1.6,color:'rgba(255,255,255,.8)',marginBottom:14}}>
              Технику бокс-дыхания используют хирурги и пилоты для концентрации. 4 цикла = 64 секунды.
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:7}}>
              {BREATH_PHASES.map((p,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,.08)',borderRadius:9,padding:'8px',fontSize:12}}>
                  <div style={{fontWeight:900,color:p.color}}>{p.name}</div>
                  <div style={{color:'rgba(255,255,255,.6)'}}>{p.dur} сек</div>
                </div>
              ))}
            </div>
          </div>
          <button className="dq-btn" style={{maxWidth:320,background:'#6366F1',borderColor:'rgba(255,255,255,.2)',fontSize:16}} onClick={()=>setS(true)}>Начать</button>
          <button style={{background:'none',border:'none',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:13,fontFamily:'inherit'}} onClick={()=>onEnd(0)}>← меню</button>
        </div>
      )}
      {started&&!done&&(
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:18,zIndex:1}}>
          <div style={{display:'flex',gap:9}}>
            {Array.from({length:TOTAL_CYC},(_,i)=>(
              <div key={i} style={{width:12,height:12,borderRadius:'50%',
                background:i<cyc?ph.color:'rgba(255,255,255,.18)',
                border:i===cyc?`2px solid ${ph.color}`:'2px solid transparent',transition:'background .5s'}}/>
            ))}
          </div>
          <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {[2.1,1.7,1.4].map((m,i)=>(
              <div key={i} style={{position:'absolute',width:150*m,height:150*m,borderRadius:'50%',
                background:`${ph.color}${['08','10','18'][i]}`,
                transform:`scale(${bscale})`,transition:`transform ${txDur}s ease-in-out`}}/>
            ))}
            <div style={{
              width:150,height:150,borderRadius:'50%',
              background:`radial-gradient(circle,${ph.color}DD 30%,${ph.color}55)`,
              border:`2.5px solid ${ph.color}`,boxShadow:`0 0 50px ${ph.color}44`,
              transform:`scale(${bscale})`,transition:`transform ${txDur}s ease-in-out,background 1.2s,box-shadow 1.2s`,
              display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#fff',
            }}>
              <div style={{fontSize:16,fontWeight:700,lineHeight:1}}>{ph.name}</div>
              <div style={{fontSize:32,fontWeight:900,marginTop:2}}>{pTime}</div>
            </div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{color:'rgba(255,255,255,.85)',fontSize:15,fontWeight:500}}>{ph.text}</div>
            <div style={{color:'rgba(255,255,255,.4)',fontSize:12,marginTop:4}}>Цикл {cyc+1} из {TOTAL_CYC}</div>
          </div>
          <div style={{width:'100%',maxWidth:240,height:6,background:'rgba(255,255,255,.13)',borderRadius:999,overflow:'hidden'}}>
            <div style={{height:'100%',width:`${pct}%`,background:ph.color,transition:'width .5s linear,background 1s'}}/>
          </div>
        </div>
      )}
      {done&&(
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:16,zIndex:1,textAlign:'center'}}>
          <div style={{fontSize:52}}>✨</div>
          <div style={{fontSize:24,color:'#fff',fontWeight:700}}>Перезагрузка завершена!</div>
          <p style={{color:'rgba(255,255,255,.7)',fontSize:14,maxWidth:260,lineHeight:1.6}}>Мозг готов к новым задачам. Возвращайся к коду!</p>
          <div style={{background:'rgba(99,102,241,.25)',border:'2px solid #6366F1',borderRadius:12,padding:'12px 22px',color:'#fff'}}>
            <div style={{fontSize:28,fontWeight:900}}>+40 XP</div>
            <div style={{fontSize:11,opacity:.7,letterSpacing:2}}>ЗА ОСОЗНАННОСТЬ</div>
          </div>
          <button className="dq-btn" style={{maxWidth:300,background:'#6366F1',borderColor:'rgba(255,255,255,.2)',fontSize:15}} onClick={()=>onEnd(40)}>← В меню</button>
        </div>
      )}
    </div>
  )
}

// ─── LEARN GAME ENGINE ────────────────────────────────
function LearnGame({ qs, title, icon, accent, gameBg, onEnd }) {
  const [order]      = useState(()=>shuffle(qs.map((_,i)=>i)))
  const [idx,setI]   = useState(0)
  const [phase,setP] = useState('q')
  const [picked,setPk]  = useState(null)
  const [score,setSc]   = useState(0)
  const [streak,setSt]  = useState(0)
  const [best,setBest]  = useState(0)
  const [tl,setTL]      = useState(20)
  const [timedOut,setTO]= useState(false)
  const [hintsLeft,setHL]= useState(2)
  const [hintOn,setHO]  = useState(false)
  const [cardAnim,setCA]= useState('dq-ci')
  const [panAnim,setPA] = useState('')
  const [pops,setPops]  = useState([])
  const tmr   = useRef(null)
  const popId = useRef(0)

  const q = qs[order[idx]]

  const tcol = tl>10?'#00E5FF':tl>5?'#FF8A00':'#FF4757'

  const addPop=(txt,col='#00E5FF')=>{
    const id=++popId.current
    setPops(p=>[...p,{id,txt,col,x:20+Math.random()*50}])
    setTimeout(()=>setPops(p=>p.filter(x=>x.id!==id)),1100)
  }

  useEffect(()=>{
    if(phase!=='q') return
    clearInterval(tmr.current)
    tmr.current=setInterval(()=>setTL(t=>{
      if(t<=1){clearInterval(tmr.current);setTO(true);setPk(-1);setSt(0);setP('explain');return 0;}
      return t-1
    }),1000)
    return()=>clearInterval(tmr.current)
  },[phase,idx])

  const pick = i => {
    if(phase!=='q') return
    clearInterval(tmr.current)
    setPk(i)
    if(i===q.ans){
      const spd=tl>14?3:tl>8?1:0
      const pts=(hintOn?7:10)+spd
      setSc(s=>s+pts); addPop(`+${pts} XP`,'#00E5FF')
      setSt(s=>{const n=s+1;setBest(b=>Math.max(b,n));return n;})
      setPA('dq-bnc')
    } else {
      setSt(0); setPA('dq-shk')
    }
    setTimeout(()=>setPA(''),400)
    setHO(false); setP('explain')
  }

  const useHint=()=>{
    if(hintsLeft<=0||phase!=='q'||hintOn) return
    setHL(h=>h-1); addPop('-5 XP подсказка','#FF8A00'); setHO(true)
  }

  const next=()=>{
    if(idx+1>=qs.length){setP('done');return;}
    setCA('');
    setTimeout(()=>{setI(i=>i+1);setP('q');setPk(null);setTO(false);setHO(false);setTL(20);setCA('dq-ci');},60)
  }

  const renderCodeBlock=()=>{
    if(q.code && q.code.includes('___')){
      const parts=q.code.split('___')
      return (
        <div className="dq-cbk">
          <span dangerouslySetInnerHTML={{__html:HL(parts[0])}}/>
          <span className="dq-blank"> ___ </span>
          <span dangerouslySetInnerHTML={{__html:HL(parts[1]||'')}}/>
        </div>
      )
    }
    return <div className="dq-cbk" dangerouslySetInnerHTML={{__html:HL(q.code)}}/>
  }

  if(phase==='done'){
    const total=qs.length*15
    const pct=Math.round((score/total)*100)
    const grade=pct>=80?'🏆 Отлично!':pct>=60?'⚡ Хорошо!':pct>=40?'💡 Неплохо':'📚 Повтори'
    return (
      <div className="dq-si" style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:gameBg,padding:'20px 13px 28px',position:'relative',overflow:'hidden'}}>
        <DQGrid/>
        <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:16,zIndex:1,textAlign:'center'}}>
          <div style={{fontSize:50}}>{grade.split(' ')[0]}</div>
          <div style={{fontSize:22,color:'#E0E6F0',fontWeight:700}}>{grade.split(' ').slice(1).join(' ')}</div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center'}}>
            <div style={{background:`${accent}22`,border:`2px solid ${accent}`,borderRadius:11,padding:'11px 16px',color:'#fff'}}>
              <div style={{fontSize:26,fontWeight:900}}>{score}</div>
              <div style={{fontSize:10,opacity:.7,letterSpacing:1.5}}>XP НАБРАНО</div>
            </div>
            <div style={{background:'rgba(255,138,0,.2)',border:'2px solid #FF8A00',borderRadius:11,padding:'11px 16px',color:'#fff'}}>
              <div style={{fontSize:26,fontWeight:900}}>🔥{best}</div>
              <div style={{fontSize:10,opacity:.7,letterSpacing:1.5}}>СЕРИЯ</div>
            </div>
            <div style={{background:'rgba(0,229,255,.12)',border:'2px solid #00E5FF',borderRadius:11,padding:'11px 16px',color:'#fff'}}>
              <div style={{fontSize:26,fontWeight:900}}>{pct}%</div>
              <div style={{fontSize:10,opacity:.7,letterSpacing:1.5}}>ТОЧНОСТЬ</div>
            </div>
          </div>
          <button className="dq-btn" style={{maxWidth:300,background:accent,borderColor:accent,fontSize:15}} onClick={()=>onEnd(score)}>
            ← Назад в меню
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',background:gameBg,padding:'13px 13px 22px',position:'relative',overflow:'hidden'}}>
      <DQGrid/>
      {pops.map(p=>(
        <div key={p.id} className="dq-spop" style={{color:p.col,right:`${p.x}%`,top:52,fontSize:17}}>{p.txt}</div>
      ))}
      {/* top bar */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10,zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:7}}>
          <span style={{fontSize:17}}>{icon}</span>
          <span style={{background:`${accent}22`,border:`1.5px solid ${accent}55`,color:accent,padding:'3px 10px',borderRadius:8,fontSize:12,fontWeight:700}}>{title}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {streak>=2&&<span style={{color:'#FF8A00',fontWeight:900,fontSize:13}}>🔥{streak}</span>}
          <span style={{background:`${accent}22`,border:`1.5px solid ${accent}`,color:accent,padding:'3px 10px',borderRadius:8,fontSize:14,fontWeight:900}}>{score} XP</span>
        </div>
      </div>
      {/* progress dots */}
      <div style={{display:'flex',gap:5,marginBottom:9,zIndex:1}}>
        {qs.map((_,i)=>(
          <div key={i} style={{height:4,flex:1,borderRadius:999,
            background:i<idx?'#00E5FF':i===idx?`${accent}BB`:'rgba(255,255,255,.12)',transition:'background .3s'}}/>
        ))}
      </div>
      {/* timer */}
      <div style={{height:10,background:'rgba(255,255,255,.08)',borderRadius:999,overflow:'hidden',border:'1px solid rgba(255,255,255,.1)',marginBottom:10,zIndex:1}}>
        <div className={tl<=5?'dq-turg':''} style={{height:'100%',width:`${(tl/20)*100}%`,background:tcol,
          boxShadow:`0 0 8px ${tcol}`,transition:'width 1s linear,background .3s',borderRadius:999}}/>
      </div>
      {/* main card */}
      <div className={`${cardAnim} ${panAnim}`} key={idx} style={{
        background:'#0D1421',border:`1.5px solid ${phase==='explain'?(picked===q.ans?'#00E5FF':'#FF4757'):'#1E2D4A'}`,
        borderRadius:14,padding:'18px 14px 16px',zIndex:1,position:'relative',
        boxShadow:phase==='explain'&&picked===q.ans?'0 0 20px #00E5FF22':'none',
        flex:phase==='q'?1:'none',transition:'border-color .3s,box-shadow .3s',
      }}>
        {phase==='explain'&&(
          <div className="dq-stamp" style={{color:picked===q.ans?'#00E5FF':'#FF4757'}}>
            {timedOut?'⏰ ВРЕМЯ':picked===q.ans?'ВЕРНО ✓':'МИМО ✗'}
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div style={{background:`${accent}18`,border:`1px solid ${accent}33`,color:accent,
            fontSize:10,fontWeight:900,letterSpacing:1.5,padding:'3px 9px',borderRadius:999,textTransform:'uppercase'}}>
            {q.tag}
          </div>
          <div style={{color:'rgba(255,255,255,.3)',fontSize:11}}>{idx+1}/{qs.length}</div>
        </div>
        {renderCodeBlock()}
        <div style={{color:'rgba(255,255,255,.75)',fontSize:14,fontWeight:600,margin:'12px 0 4px',lineHeight:1.4}}>{q.q}</div>
        {hintOn&&(
          <div style={{margin:'8px 0 0',padding:'8px 11px',background:'rgba(255,138,0,.15)',border:'1.5px solid #FF8A00',
            borderRadius:9,fontSize:13,color:'rgba(255,255,255,.85)'}}>💡 {q.hint}</div>
        )}
      </div>
      {/* options */}
      {phase==='q'&&(
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:10,zIndex:1}}>
          {q.opts.map((opt,i)=>(
            <button key={i} className="dq-btn" style={{
              textAlign:'left',fontSize:14,padding:'11px 13px',
              background:`${accent}09`,borderColor:'#1E2D4A',color:'rgba(255,255,255,.85)',
            }} onClick={()=>pick(i)}>
              <span style={{color:accent,fontWeight:900,marginRight:8}}>{['A','B','C','D'][i]}.</span>{opt}
            </button>
          ))}
          <button className="dq-btn" style={{
            fontSize:13,padding:'9px',
            background:hintsLeft>0&&!hintOn?'rgba(255,138,0,.12)':'rgba(255,255,255,.05)',
            borderColor:hintsLeft>0&&!hintOn?'#FF8A00':'#1E2D4A',
            color:hintsLeft>0&&!hintOn?'#FF8A00':'rgba(255,255,255,.3)',
          }} onClick={useHint} disabled={hintsLeft<=0||hintOn}>
            💡 Подсказка (-5 XP) · осталось: {hintsLeft}
          </button>
        </div>
      )}
      {/* explanation */}
      {phase==='explain'&&(
        <div className="dq-ci" style={{background:'#0D1421',border:'1.5px solid #1E2D4A',borderRadius:14,padding:'14px 14px 16px',marginTop:10,zIndex:1}}>
          <div style={{marginBottom:10}}>
            {q.opts.map((opt,i)=>{
              const isCorrect=i===q.ans, isWrong=i===picked&&picked!==q.ans
              if(!isCorrect&&!isWrong) return null
              return (
                <div key={i} style={{padding:'8px 12px',borderRadius:8,marginBottom:4,
                  background:isCorrect?'rgba(0,229,255,.12)':'rgba(255,71,87,.12)',
                  border:`1.5px solid ${isCorrect?'#00E5FF':'#FF4757'}`,
                  color:isCorrect?'#00E5FF':'#FF4757',fontSize:13,fontWeight:700}}>
                  {isCorrect?'✓':'✗'} {opt}
                </div>
              )
            })}
          </div>
          <div style={{background:'rgba(0,229,255,.07)',border:'1.5px dashed rgba(0,229,255,.25)',
            borderRadius:9,padding:'10px 12px',fontSize:13,color:'rgba(255,255,255,.8)',lineHeight:1.55,marginBottom:13}}>
            <span style={{color:accent,fontWeight:900}}>// </span>{q.exp}
          </div>
          <button className="dq-btn" style={{background:accent,borderColor:accent,boxShadow:`0 0 16px ${accent}44`,fontSize:15}} onClick={next}>
            {idx+1>=qs.length?'📊 Результаты':'Следующий вопрос →'}
          </button>
        </div>
      )}
    </div>
  )
}

const BG_BUG    = 'linear-gradient(160deg,#1A0808 0%,#0D1117 55%,#0A0E1A 100%)'
const BG_OUTPUT = 'linear-gradient(160deg,#060B2A 0%,#0D1117 55%,#0A1A0E 100%)'
const BG_FILL   = 'linear-gradient(160deg,#060B14 0%,#0D1117 55%,#0A1A14 100%)'

const BugGame    = ({onEnd})=> <LearnGame qs={BUG_Q}    title="ДЕЛО О БАГЕ" icon="🔍" accent="#FF4757" gameBg={BG_BUG}    onEnd={onEnd}/>
const OutputGame = ({onEnd})=> <LearnGame qs={OUTPUT_Q} title="ОРАКУЛ КОДА" icon="💭" accent="#2962FF" gameBg={BG_OUTPUT} onEnd={onEnd}/>
const FillGame   = ({onEnd})=> <LearnGame qs={FILL_Q}   title="ЗАПОЛНИ КОД" icon="🧩" accent="#00B85C" gameBg={BG_FILL}   onEnd={onEnd}/>

// ─── HOME SCREEN ──────────────────────────────────────
const GAME_DEFS = [
  {id:'bug',    icon:'🔍', title:'Дело о баге',  sub:'Найди ошибку в JS',      col:'#FF4757', pts:'до 120 XP'},
  {id:'output', icon:'💭', title:'Оракул кода',  sub:'Предскажи вывод',        col:'#2962FF', pts:'до 120 XP'},
  {id:'fill',   icon:'🧩', title:'Заполни код',  sub:'Выбери метод/оператор',  col:'#00B85C', pts:'до 120 XP'},
  {id:'breath', icon:'🫁', title:'Перезагрузка', sub:'Дыхание между сессиями', col:'#7B2FF2', pts:'+40 XP'},
]

function DQHome({ onGo, xp, played, onBack }) {
  const lv     = getLevel(xp)
  const nextLv = LEVELS.find(l=>l.min>lv.min)||lv
  const xpInRange  = xp - lv.min
  const rangeSize  = nextLv.min - lv.min
  const pct = lv.min===nextLv.min ? 100 : Math.min(100,(xpInRange/rangeSize)*100)

  return (
    <div className="dq-si" style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',
      background:'#070B14',padding:'14px 13px 26px',position:'relative',overflow:'hidden',
    }}>
      <DQGrid/>
      {/* back button */}
      <div style={{zIndex:1,marginBottom:6}}>
        <button onClick={onBack} style={{background:'none',border:'1px solid rgba(255,255,255,.15)',color:'rgba(255,255,255,.5)',
          padding:'6px 12px',borderRadius:7,cursor:'pointer',fontSize:12,fontFamily:'inherit',transition:'all .15s'}}
          onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.5)'}>
          ← EastCode
        </button>
      </div>
      {/* header */}
      <div style={{textAlign:'center',zIndex:1,marginBottom:12}}>
        <div style={{
          fontSize:'clamp(26px,7vw,40px)',lineHeight:.95,fontWeight:900,
          background:'linear-gradient(135deg,#00E5FF,#7B2FF2)',
          WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
          filter:'drop-shadow(0 0 18px rgba(0,229,255,.35))',
        }}>{'</DEV QUEST>'}</div>
        <div style={{color:'rgba(255,255,255,.4)',fontSize:11,letterSpacing:3,marginTop:5,textTransform:'uppercase'}}>
          путь джуниор фронтенд разработчика
        </div>
      </div>
      {/* XP bar */}
      <div style={{background:'#0D1421',border:'1.5px solid #1E2D4A',borderRadius:12,padding:'12px 14px',marginBottom:13,zIndex:1}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:20}}>{lv.emoji}</span>
            <div>
              <div style={{color:lv.col,fontSize:13,fontWeight:700,letterSpacing:1}}>{lv.name}</div>
              <div style={{color:'rgba(255,255,255,.4)',fontSize:11}}>{xp} XP</div>
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{color:'rgba(255,255,255,.4)',fontSize:11}}>след. уровень</div>
            <div style={{color:'rgba(255,255,255,.7)',fontSize:12,fontWeight:700}}>
              {lv.min===nextLv.min?'MAX':nextLv.name+' '+nextLv.emoji}
            </div>
          </div>
        </div>
        <div style={{height:9,background:'#1A2235',borderRadius:999,overflow:'hidden'}}>
          <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${lv.col},${lv.col}BB)`,
            boxShadow:`0 0 10px ${lv.col}88`,transition:'width .6s cubic-bezier(.4,0,.2,1)',borderRadius:999}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:5}}>
          {['🐛 JS логика','💭 Типы','🧩 Методы','🌐 DOM'].map((t,i)=>(
            <div key={i} style={{fontSize:10,color:'rgba(255,255,255,.35)',
              borderBottom:`2px solid ${xp>i*80?'#00E5FF':'rgba(255,255,255,.15)'}`,paddingBottom:2,transition:'border-color .5s'}}>{t}</div>
          ))}
        </div>
      </div>
      {/* game cards */}
      <div style={{flex:1,zIndex:1,display:'grid',gridTemplateColumns:'1fr 1fr',gridTemplateRows:'1fr 1fr',gap:10,minHeight:240}}>
        {GAME_DEFS.map((g,i)=>(
          <div key={g.id} className="dq-ci" style={{
            background:`linear-gradient(135deg, ${g.col}18, ${g.col}08)`,
            border:`1.5px solid ${played.has(g.id)?g.col:'#1E2D4A'}`,
            boxShadow:played.has(g.id)?`0 0 18px ${g.col}33`:'none',
            borderRadius:13,padding:'13px 11px',cursor:'pointer',position:'relative',overflow:'hidden',
            display:'flex',flexDirection:'column',justifyContent:'space-between',
            animationDelay:`${i*.07}s`,transition:'transform .08s,box-shadow .08s,border-color .3s',
          }}
          onMouseDown={e=>{e.currentTarget.style.transform='translate(2px,2px)'}}
          onMouseUp={e=>{e.currentTarget.style.transform=''}}
          onTouchStart={e=>{e.currentTarget.style.transform='translate(2px,2px)'}}
          onTouchEnd={e=>{e.currentTarget.style.transform=''}}
          onClick={()=>onGo(g.id)}>
            {played.has(g.id)&&(
              <div style={{position:'absolute',top:6,right:7,background:g.col,color:'#fff',
                fontSize:9,fontWeight:900,letterSpacing:.8,padding:'2px 7px',borderRadius:999,border:'1.5px solid rgba(255,255,255,.3)'}}>✓ ГОТОВО</div>
            )}
            <div>
              <div style={{fontSize:26,marginBottom:5}}>{g.icon}</div>
              <div style={{color:'#E0E6F0',fontSize:'clamp(13px,3.5vw,16px)',fontWeight:700,lineHeight:1.1}}>{g.title}</div>
              <div style={{color:'rgba(255,255,255,.5)',fontSize:11,marginTop:4,fontWeight:500}}>{g.sub}</div>
            </div>
            <div style={{background:`${g.col}22`,border:`1px solid ${g.col}55`,borderRadius:7,padding:'3px 8px',
              fontSize:11,fontWeight:900,color:g.col,display:'inline-block',marginTop:7}}>{g.pts}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center',marginTop:11,fontSize:11,color:'rgba(255,255,255,.3)',letterSpacing:1,zIndex:1}}>
        {'// выбери задание — прокачай навык'}
      </div>
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────
export default function DevQuestPage({ onBack }) {
  const [screen,setS] = useState('home')
  const [xp,setXP]    = useState(()=>{ try{return parseInt(localStorage.getItem('devquest-xp')||'0',10)}catch{return 0} })
  const [played,setP] = useState(new Set())

  useEffect(()=>{ localStorage.setItem('devquest-xp', String(xp)) },[xp])

  const finish=(id,pts)=>{ setXP(x=>x+pts); setP(p=>new Set([...p,id])); setS('home') }

  return (
    <>
      <style>{DQ_CSS}</style>
      {screen==='home'   && <DQHome   onGo={setS} xp={xp} played={played} onBack={onBack}/>}
      {screen==='bug'    && <BugGame    onEnd={pts=>finish('bug',pts)}/>}
      {screen==='output' && <OutputGame onEnd={pts=>finish('output',pts)}/>}
      {screen==='fill'   && <FillGame   onEnd={pts=>finish('fill',pts)}/>}
      {screen==='breath' && <BreathGame onEnd={pts=>finish('breath',pts)}/>}
    </>
  )
}
