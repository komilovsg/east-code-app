const cssLevels = [
  {
    id: 'css-sel-1',
    type: 'css',
    difficulty: 'beginner',
    title_ru: '🎯 Миссия 1: Охота на цель',
    title_tj: '🎯 Миссия 1: Шикори ҳадаф',
    theory_ru: `**Селекторы CSS** — это способ «прицелиться» в нужный элемент HTML.

Самый простой — **селектор класса**. Точка перед именем означает «найди все элементы с этим классом»:

\`\`\`css
.target {
  background: red;
}
\`\`\`

Это правило найдёт все теги с \`class="target"\` и покрасит их фон в красный.`,
    theory_tj: `**Селекторҳои CSS** — ин роҳи «нишон гирифтани» элементи дурусти HTML аст.

Оддитарин он — **селектори синф**. Нуқта пеш аз ном маънои «ҳамаи элементҳоро бо ин синф ёб»-ро дорад:

\`\`\`css
.target {
  background: red;
}
\`\`\`

Ин қоида ҳамаи тегҳоро бо \`class="target"\` меёбад ва заминаи онҳоро сурх мекунад.`,
    desc_ru: 'Покрась фон блока .target красным цветом. Используй class-селектор.',
    desc_tj: 'Заминаи блоки .target-ро сурх кунед. Селектори классро истифода баред.',
    hint_ru: 'Добавь: .target { background: red; }',
    hint_tj: 'Илова кунед: .target { background: red; }',
    template: `.target {
  /* Напиши CSS здесь */
}`,
    html: `<div class="stage"><div class="target">🎯 Попади в меня!</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      return getComputedStyle(el).backgroundColor === 'rgb(255, 0, 0)'
    },
  },
  {
    id: 'css-box-1',
    type: 'css',
    difficulty: 'beginner',
    title_ru: '📦 Миссия 2: Создай пространство',
    title_tj: '📦 Миссия 2: Фазо эҷод кун',
    theory_ru: `**Box model (блочная модель)** — каждый HTML-элемент — это коробка с:
- **padding** — внутренний отступ (между контентом и границей)
- **border** — граница
- **margin** — внешний отступ (между элементами)

\`\`\`css
.box {
  padding: 20px;    /* 20px со всех сторон */
  margin: 10px;     /* 10px снаружи */
  border: 2px solid blue;
}
\`\`\``,
    theory_tj: `**Box model** — ҳар элементи HTML як қуттӣ аст бо:
- **padding** — фосилаи дохилӣ (байни мӯҳтаво ва ҳудуд)
- **border** — ҳудуд
- **margin** — фосилаи берунӣ (байни элементҳо)

\`\`\`css
.box {
  padding: 20px;
  margin: 10px;
  border: 2px solid blue;
}
\`\`\``,
    desc_ru: 'Добавь блоку .target padding: 20px и border: 2px solid #0078d4',
    desc_tj: 'Ба блоки .target padding: 20px ва border: 2px solid #0078d4 илова кунед',
    hint_ru: '.target { padding: 20px; border: 2px solid #0078d4; }',
    hint_tj: '.target { padding: 20px; border: 2px solid #0078d4; }',
    template: `.target {
  background: #1a3a5a;
  /* Добавь padding и border */
}`,
    html: `<div class="stage"><div class="target">📦 Добавь мне пространство!</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return parseInt(cs.paddingTop, 10) >= 20 && cs.borderTopWidth !== '0px'
    },
  },
  {
    id: 'css-pos-1',
    type: 'css',
    difficulty: 'beginner',
    title_ru: '⚡ Миссия 3: Центрируй силу',
    title_tj: '⚡ Миссия 3: Қувватро марказ кун',
    theory_ru: `**Центрирование по горизонтали** — классическая задача CSS.

Для блочных элементов с заданной шириной:
\`\`\`css
.target {
  width: 200px;
  margin: 0 auto; /* авто-отступы слева и справа = центр */
}
\`\`\`

Или через **Flexbox** на родителе:
\`\`\`css
.stage {
  display: flex;
  justify-content: center;
}
\`\`\``,
    theory_tj: `**Марказ кардан аз рӯи уфуқ** — вазифаи классикии CSS аст.

Барои элементҳои блокӣ бо васеии муайян:
\`\`\`css
.target {
  width: 200px;
  margin: 0 auto;
}
\`\`\`

Ё тавассути **Flexbox** дар волидайн:
\`\`\`css
.stage {
  display: flex;
  justify-content: center;
}
\`\`\``,
    desc_ru: 'Центрируй .target по горизонтали внутри .stage. Используй margin: 0 auto или flexbox.',
    desc_tj: '.target-ро дар дохили .stage аз рӯи уфуқ марказ кунед.',
    hint_ru: '.target { margin: 0 auto; } — или: .stage { display: flex; justify-content: center; }',
    hint_tj: '.target { margin: 0 auto; } — ё: .stage { display: flex; justify-content: center; }',
    template: `.stage { height: 120px; background: #1a1a2e; }
.target {
  width: 120px;
  height: 40px;
  background: linear-gradient(90deg,#6C63FF,#3BC4A5);
  color: white;
  text-align: center;
  line-height: 40px;
  /* Центрируй меня! */
}`,
    html: `<div class="stage"><div class="target">⚡</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!el || !stage) return false
      const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect()
      return Math.abs((sr.left + sr.width / 2) - (er.left + er.width / 2)) < 5
    },
  },
  {
    id: 'css-flex-1',
    type: 'css',
    difficulty: 'beginner',
    title_ru: '🧲 Миссия 4: Flexbox — притяжение центра',
    title_tj: '🧲 Миссия 4: Flexbox — ҷозибаи марказ',
    theory_ru: `**Flexbox** — мощная система расположения элементов.

Включи flex на родителе и управляй дочерними:
\`\`\`css
.container {
  display: flex;
  justify-content: center;  /* по горизонтали */
  align-items: center;      /* по вертикали */
  gap: 16px;                /* отступ между элементами */
}
\`\`\`

**justify-content:** flex-start | center | flex-end | space-between | space-around
**align-items:** flex-start | center | flex-end | stretch`,
    theory_tj: `**Flexbox** — системаи пурқувват барои ҷойгиркунии элементҳо.

Flex-ро дар волидайн фаъол кун:
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}
\`\`\``,
    desc_ru: 'Центрируй .target по вертикали и горизонтали внутри .stage используя flexbox.',
    desc_tj: '.target-ро аз рӯи ҳарду меҳвар дар .stage марказ кунед.',
    hint_ru: '.stage { display:flex; align-items:center; justify-content:center; }',
    hint_tj: '.stage { display:flex; align-items:center; justify-content:center; }',
    template: `.stage { display:flex; height:160px; background:#0d0d1a; }
.target {
  width:120px; height:40px;
  background: linear-gradient(135deg,#ff6b6b,#ffd93d);
  border-radius: 8px;
  /* Flex-свойства на родителе .stage */
}`,
    html: `<div class="stage"><div class="target">🧲 Центр!</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!stage || !el) return false
      if (!getComputedStyle(stage).display.includes('flex')) return false
      const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect()
      const dc = Math.hypot(sr.left+sr.width/2 - er.left-er.width/2, sr.top+sr.height/2 - er.top-er.height/2)
      return dc < 6
    },
  },
  {
    id: 'css-flex-2',
    type: 'css',
    difficulty: 'beginner',
    title_ru: '🃏 Миссия 5: Карточки в ряд',
    title_tj: '🃏 Миссия 5: Корточкаҳо дар саф',
    theory_ru: `**flex-wrap** позволяет переносить элементы на новую строку:
\`\`\`css
.row {
  display: flex;
  flex-wrap: wrap;   /* переносить при нехватке места */
  gap: 16px;         /* отступ между карточками */
}
\`\`\`
**gap** заменяет старый метод с margin.`,
    theory_tj: `**flex-wrap** ба элементҳо имкон медиҳад ба хати нав гузаранд:
\`\`\`css
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
\`\`\``,
    desc_ru: 'Размести .card в ряд с отступом gap: 16px и разреши перенос (flex-wrap).',
    desc_tj: '.card-ҳоро дар саф бо gap: 16px ва flex-wrap ҷойгир кунед.',
    hint_ru: '.stage { display:flex; flex-wrap:wrap; gap:16px; }',
    hint_tj: '.stage { display:flex; flex-wrap:wrap; gap:16px; }',
    template: `.stage { background:#0d0d1a; padding:16px; }
.card {
  width:140px; height:80px;
  background: linear-gradient(135deg,#6C63FF,#3BC4A5);
  border-radius:8px;
  display:flex; align-items:center; justify-content:center;
  color:white; font-weight:bold;
}`,
    html: `<div class="stage"><div class="card">1</div><div class="card">2</div><div class="card">3</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const cs = getComputedStyle(stage)
      return cs.display.includes('flex') && parseInt(cs.gap||'0',10) >= 8
    },
  },
  {
    id: 'css-grid-1',
    type: 'css',
    difficulty: 'medium',
    title_ru: '🗺️ Миссия 6: Grid — строй карту',
    title_tj: '🗺️ Миссия 6: Grid — харитаро созед',
    theory_ru: `**CSS Grid** — двумерная сетка для сложных макетов.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 равные колонки */
  gap: 12px;
}
\`\`\`

**place-items: center** центрирует содержимое каждой ячейки.

**auto-fill + minmax** — адаптивная сетка:
\`\`\`css
grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
\`\`\``,
    theory_tj: `**CSS Grid** — шабакаи дуабъадӣ барои макетҳои мураккаб.

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
\`\`\``,
    desc_ru: 'Сделай .stage grid с place-items: center. Контейнер должен центрировать .target.',
    desc_tj: '.stage-ро grid бо place-items: center кунед.',
    hint_ru: '.stage { display:grid; place-items:center; height:160px; }',
    hint_tj: '.stage { display:grid; place-items:center; height:160px; }',
    template: `.stage { display:grid; height:160px; background:#0d1a0d; }
.target {
  width:120px; height:40px;
  background: linear-gradient(90deg,#56ab2f,#a8e063);
  border-radius:6px; color:white; text-align:center; line-height:40px;
}`,
    html: `<div class="stage"><div class="target">🗺️ Grid!</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!stage || !el) return false
      if (!getComputedStyle(stage).display.includes('grid')) return false
      const sr = stage.getBoundingClientRect(), er = el.getBoundingClientRect()
      return Math.hypot(sr.left+sr.width/2-er.left-er.width/2, sr.top+sr.height/2-er.top-er.height/2) < 8
    },
  },
  {
    id: 'css-grid-2',
    type: 'css',
    difficulty: 'medium',
    title_ru: '🏙️ Миссия 7: Автосетка города',
    title_tj: '🏙️ Миссия 7: Шабакаи автоматии шаҳр',
    theory_ru: `**auto-fill + minmax** создаёт адаптивную сетку — колонки сами подстраиваются под ширину экрана:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}
\`\`\`

Колонок будет столько, сколько помещается при минимальной ширине 120px.`,
    theory_tj: `**auto-fill + minmax** шабакаи мутобиқро эҷод мекунад:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}
\`\`\``,
    desc_ru: 'Сделай .stage адаптивной grid-сеткой: auto-fill, minmax(120px,1fr), gap: 12px.',
    desc_tj: '.stage-ро шабакаи мутобиқ кунед: auto-fill, minmax(120px,1fr), gap: 12px.',
    hint_ru: '.stage { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:12px; }',
    hint_tj: '.stage { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:12px; }',
    template: `.stage { background:#1a0d1a; padding:12px; }
.cell {
  height:60px;
  background: linear-gradient(135deg,#8e44ad,#e91e63);
  border-radius:8px; display:flex; align-items:center; justify-content:center; color:white;
}`,
    html: `<div class="stage"><div class="cell">A</div><div class="cell">B</div><div class="cell">C</div><div class="cell">D</div><div class="cell">E</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const cs = getComputedStyle(stage)
      return cs.display.includes('grid') && parseInt(cs.gap||'0',10) >= 8
    },
  },
  {
    id: 'css-media-1',
    type: 'css',
    difficulty: 'medium',
    title_ru: '📱 Миссия 8: Мобильная адаптация',
    title_tj: '📱 Миссия 8: Мутобиқати мобилӣ',
    theory_ru: `**Media queries** адаптируют дизайн под разные экраны:

\`\`\`css
/* Стили по умолчанию (мобильный) */
.container {
  flex-direction: column;
}

/* Для экранов шире 600px */
@media (min-width: 600px) {
  .container {
    flex-direction: row;
  }
}
\`\`\`

Принцип **mobile-first**: сначала пишем для маленьких экранов, потом расширяем.`,
    theory_tj: `**Media queries** дизайнро барои экранҳои гуногун мутобиқ мекунанд:

\`\`\`css
.container { flex-direction: column; }

@media (min-width: 600px) {
  .container { flex-direction: row; }
}
\`\`\``,
    desc_ru: 'Добавь @media запрос: при ширине ≥600px блоки .item должны идти в ряд (flex-direction: row).',
    desc_tj: '@media запрос илова кунед: вақте ки васеӣ ≥600px, блокҳои .item дар саф бошанд.',
    hint_ru: '@media (min-width:600px) { .stage { flex-direction: row; } }',
    hint_tj: '@media (min-width:600px) { .stage { flex-direction: row; } }',
    template: `.stage {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #0d0d1a;
  padding: 12px;
}
.item {
  height: 40px;
  background: linear-gradient(90deg,#f093fb,#f5576c);
  border-radius: 6px;
  display:flex; align-items:center; justify-content:center; color:white;
}
/* Добавь @media здесь */`,
    html: `<div class="stage"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const prev = stage.style.width||''
      try {
        stage.style.width='400px'; const s = getComputedStyle(stage).flexDirection
        stage.style.width='800px'; const l = getComputedStyle(stage).flexDirection
        return s !== l
      } finally { stage.style.width = prev }
    },
  },
  {
    id: 'css-media-2',
    type: 'css',
    difficulty: 'medium',
    title_ru: '🖥️ Миссия 9: Размер шрифта на экране',
    title_tj: '🖥️ Миссия 9: Андозаи хат дар экран',
    theory_ru: `Медиазапросы могут менять **любые** CSS свойства, включая размер шрифта:

\`\`\`css
.title {
  font-size: 16px; /* мобильный */
}

@media (min-width: 768px) {
  .title {
    font-size: 28px; /* планшет/десктоп */
  }
}
\`\`\`

Это называется **отзывчивая типографика**.`,
    theory_tj: `Media query-ҳо метавонанд **ҳар** хосияти CSS-ро тағйир диҳанд:

\`\`\`css
.title { font-size: 16px; }

@media (min-width: 768px) {
  .title { font-size: 28px; }
}
\`\`\``,
    desc_ru: 'Добавь @media (min-width: 768px): размер шрифта .target должен быть 28px или больше на широком экране.',
    desc_tj: '@media (min-width: 768px) илова кунед: андозаи хати .target дар экрани васеъ 28px ё бузургтар бошад.',
    hint_ru: '@media (min-width: 768px) { .target { font-size: 28px; } }',
    hint_tj: '@media (min-width: 768px) { .target { font-size: 28px; } }',
    template: `.target {
  background: #1a0a2e;
  padding: 20px;
  font-size: 16px;
  color: #a78bfa;
  border-radius: 8px;
}
/* Добавь @media */`,
    html: `<div class="stage"><div class="target">🖥️ Текст меняет размер!</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const prev = el.style.width||''
      try {
        el.style.width='400px'; const s = getComputedStyle(el).fontSize
        el.style.width='900px'; const l = getComputedStyle(el).fontSize
        return parseInt(l,10) >= 28 && s !== l
      } finally { el.style.width = prev }
    },
  },
  {
    id: 'css-anim-1',
    type: 'css',
    difficulty: 'medium',
    title_ru: '✨ Миссия 10: Оживи элемент',
    title_tj: '✨ Миссия 10: Элементро зинда кун',
    theory_ru: `**CSS Animations** оживляют интерфейс:

\`\`\`css
/* 1. Описываем анимацию */
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 2. Применяем к элементу */
.target {
  animation: pulse 1s infinite;
}
\`\`\`

**animation:** имя | длительность | timing-function | iteration-count`,
    theory_tj: `**CSS Animations** интерфейсро зинда мекунанд:

\`\`\`css
@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.target {
  animation: pulse 1s infinite;
}
\`\`\``,
    desc_ru: 'Создай анимацию @keyframes и примени её к .target с animation.',
    desc_tj: 'Анимацияи @keyframes эҷод кунед ва онро бо animation ба .target татбиқ кунед.',
    hint_ru: '@keyframes glow { from { box-shadow:0 0 5px #6C63FF } to { box-shadow:0 0 25px #6C63FF } }\n.target { animation: glow 1s alternate infinite; }',
    hint_tj: '@keyframes glow { from { box-shadow:0 0 5px #6C63FF } to { box-shadow:0 0 25px #6C63FF } }\n.target { animation: glow 1s alternate infinite; }',
    template: `.target {
  width: 100px; height: 100px;
  background: linear-gradient(135deg, #6C63FF, #3BC4A5);
  border-radius: 50%;
  margin: 30px auto;
  /* Добавь animation */
}
/* Добавь @keyframes */`,
    html: `<div class="stage"><div class="target"></div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return cs.animationName && cs.animationName !== 'none'
    },
  },
  {
    id: 'css-anim-2',
    type: 'css',
    difficulty: 'advanced',
    title_ru: '🌟 Миссия 11: Сложная анимация',
    title_tj: '🌟 Миссия 11: Анимацияи мураккаб',
    theory_ru: `Несколько ключевых кадров создают сложное движение:

\`\`\`css
@keyframes bounce {
  0%   { transform: translateY(0) scale(1); }
  40%  { transform: translateY(-30px) scale(0.9); }
  60%  { transform: translateY(-20px) scale(1.1); }
  100% { transform: translateY(0) scale(1); }
}

.ball {
  animation: bounce 1.5s cubic-bezier(.36,.07,.19,.97) infinite;
}
\`\`\`

**animation-delay** задержит анимацию (эффект каскада).`,
    theory_tj: `Чанд кадри калидӣ ҳаракати мураккабро эҷод мекунанд:

\`\`\`css
@keyframes bounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
\`\`\``,
    desc_ru: 'Создай анимацию с минимум 3 ключевыми кадрами и примени с animation-duration и animation-iteration-count.',
    desc_tj: 'Анимация бо ҳадди ақал 3 кадри калидӣ эҷод кунед.',
    hint_ru: '@keyframes jiggle { 0%{transform:rotate(0)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} 100%{transform:rotate(0)} }\n.target { animation: jiggle 0.8s ease-in-out infinite; }',
    hint_tj: '@keyframes jiggle { 0%{transform:rotate(0)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} 100%{transform:rotate(0)} }\n.target { animation: jiggle 0.8s ease-in-out infinite; }',
    template: `.target {
  width:80px; height:80px;
  background: linear-gradient(135deg,#ff6b6b,#ffd93d);
  border-radius:12px;
  margin:30px auto;
  display:flex; align-items:center; justify-content:center;
  font-size:32px;
}
/* Создай @keyframes с 3+ кадрами */`,
    html: `<div class="stage"><div class="target">🌟</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return cs.animationName && cs.animationName !== 'none' && cs.animationDuration !== '0s'
    },
  },
  {
    id: 'css-pseudo-1',
    type: 'css',
    difficulty: 'advanced',
    title_ru: '🔮 Миссия 12: Псевдокласс :hover',
    title_tj: '🔮 Миссия 12: Псевдокласси :hover',
    theory_ru: `**Псевдоклассы** меняют стиль при определённом состоянии:

\`\`\`css
.btn:hover {
  background: #6C63FF;  /* при наведении мышью */
  transform: translateY(-2px);
}

.input:focus {
  border-color: #6C63FF; /* при фокусе */
}

.item:nth-child(2) {
  color: red; /* второй элемент */
}
\`\`\``,
    theory_tj: `**Псевдоклассҳо** услубро дар ҳолати муайян тағйир медиҳанд:

\`\`\`css
.btn:hover { background: #6C63FF; }
.input:focus { border-color: #6C63FF; }
.item:nth-child(2) { color: red; }
\`\`\``,
    desc_ru: 'Добавь .target:hover с изменением background и transform: scale(1.1).',
    desc_tj: '.target:hover бо тағйири background ва transform: scale(1.1) илова кунед.',
    hint_ru: '.target:hover { background: #6C63FF; transform: scale(1.1); }',
    hint_tj: '.target:hover { background: #6C63FF; transform: scale(1.1); }',
    template: `.target {
  padding: 16px 32px;
  background: #252526;
  border: 2px solid #6C63FF;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  color: #ccc;
}
/* Добавь :hover */`,
    html: `<div class="stage" style="padding:40px;text-align:center"><div class="target">🔮 Наведи курсор!</div></div>`,
    validator: (root) => {
      const styleEl = root.querySelector('#injected-style')
      if (!styleEl) return false
      return styleEl.textContent.includes(':hover')
    },
  },
  {
    id: 'css-vars-1',
    type: 'css',
    difficulty: 'advanced',
    title_ru: '🎨 Миссия 13: CSS переменные',
    title_tj: '🎨 Миссия 13: Тағйирёбандаҳои CSS',
    theory_ru: `**CSS Custom Properties (переменные)** хранят значения для повторного использования:

\`\`\`css
:root {
  --primary: #6C63FF;
  --radius: 8px;
}

.btn {
  background: var(--primary);    /* использовать */
  border-radius: var(--radius);
}
\`\`\`

Изменение переменной в :root обновляет все места использования.`,
    theory_tj: `**CSS Custom Properties (тағйирёбандаҳо)** арзишҳоро барои истифодаи такрорӣ нигоҳ медоранд:

\`\`\`css
:root {
  --primary: #6C63FF;
}

.btn {
  background: var(--primary);
}
\`\`\``,
    desc_ru: 'Определи CSS-переменную --brand-color в :root и используй её в .target через var().',
    desc_tj: 'Тағйирёбандаи --brand-color дар :root муайян кунед ва дар .target тавассути var() истифода баред.',
    hint_ru: ':root { --brand-color: #6C63FF; } .target { background: var(--brand-color); }',
    hint_tj: ':root { --brand-color: #6C63FF; } .target { background: var(--brand-color); }',
    template: `/* Определи :root с переменной */

.target {
  padding: 20px 40px;
  border-radius: 8px;
  color: white;
  text-align: center;
  /* Используй var() */
}`,
    html: `<div class="stage" style="padding:40px;text-align:center"><div class="target">🎨 Покрась меня переменной!</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      const st = root.querySelector('#injected-style')
      if (!el || !st) return false
      return st.textContent.includes('--') && st.textContent.includes('var(')
    },
  },
  {
    id: 'css-transition-1',
    type: 'css',
    difficulty: 'advanced',
    title_ru: '🌊 Миссия 14: Плавные переходы',
    title_tj: '🌊 Миссия 14: Гузаришҳои ҳамвор',
    theory_ru: `**Transition** делает изменения стилей плавными:

\`\`\`css
.btn {
  background: blue;
  transition: background 0.3s ease, transform 0.2s ease;
}

.btn:hover {
  background: purple;
  transform: scale(1.05);
}
\`\`\`

**transition:** property | duration | timing-function | delay

Timing functions: **ease**, ease-in, ease-out, ease-in-out, linear`,
    theory_tj: `**Transition** тағйироти услубҳоро ҳамвор мекунад:

\`\`\`css
.btn {
  background: blue;
  transition: background 0.3s ease;
}

.btn:hover {
  background: purple;
}
\`\`\``,
    desc_ru: 'Добавь transition: all 0.3s ease к .target и стиль :hover (меняй background или transform).',
    desc_tj: 'transition: all 0.3s ease ба .target илова кунед ва :hover бо тағйири background ё transform.',
    hint_ru: '.target { transition: all 0.3s ease; } .target:hover { transform: scale(1.1); background: #6C63FF; }',
    hint_tj: '.target { transition: all 0.3s ease; } .target:hover { transform: scale(1.1); background: #6C63FF; }',
    template: `.target {
  padding: 16px 32px;
  background: #3BC4A5;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  display: inline-block;
  /* Добавь transition */
}
/* Добавь :hover */`,
    html: `<div class="stage" style="padding:40px;text-align:center"><div class="target">🌊 Наведи мышь!</div></div>`,
    validator: (root) => {
      const st = root.querySelector('#injected-style')
      if (!st) return false
      return st.textContent.includes('transition') && st.textContent.includes(':hover')
    },
  },
  {
    id: 'css-pseudo-el-1',
    type: 'css',
    difficulty: 'advanced',
    title_ru: '✨ Миссия 15: Псевдоэлементы ::before и ::after',
    title_tj: '✨ Миссия 15: Псевдоэлементҳои ::before ва ::after',
    theory_ru: `**Псевдоэлементы** ::before и ::after создают виртуальные дочерние элементы без изменения HTML:

\`\`\`css
.card::before {
  content: "★";   /* обязательно! */
  color: gold;
  font-size: 20px;
}

.card::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: #6C63FF;
}
\`\`\`

Без **content** псевдоэлемент не отображается. Значение может быть пустой строкой \`""\`.`,
    theory_tj: `**Псевдоэлементҳои** ::before ва ::after фарзандони виртуалиро бе тағйири HTML эҷод мекунанд:

\`\`\`css
.card::before {
  content: "★";
  color: gold;
}

.card::after {
  content: "";
  display: block;
  height: 2px;
  background: #6C63FF;
}
\`\`\`

Бе **content** псевдоэлемент намоён намешавад.`,
    desc_ru: 'Добавь ::before к .target с content:"★" и color: gold',
    desc_tj: '::before ба .target бо content:"★" ва color: gold илова кунед',
    hint_ru: '.target::before { content: "★"; color: gold; font-size: 20px; margin-right: 8px; }',
    hint_tj: '.target::before { content: "★"; color: gold; font-size: 20px; margin-right: 8px; }',
    template: `.target { position:relative; padding:12px 40px; background:#252526; border-radius:8px; color:#ccc; display:inline-block; }
/* Добавь ::before */`,
    html: `<div class="stage" style="padding:40px;text-align:center"><div class="target">Украси меня!</div></div>`,
    validator: (root) => {
      const st = root.querySelector('#injected-style')
      return st && st.textContent.includes('::before') && st.textContent.includes('content')
    },
  },
  {
    id: 'css-transform-1',
    type: 'css',
    difficulty: 'super',
    title_ru: '🌀 Миссия 16: CSS Трансформации',
    title_tj: '🌀 Миссия 16: CSS Трансформатсияҳо',
    theory_ru: `**transform** изменяет форму и положение элемента без влияния на поток документа:

\`\`\`css
.box {
  transform: rotate(45deg);       /* поворот */
  transform: scale(1.5);          /* масштаб */
  transform: translateX(50px);    /* сдвиг по X */
  transform: translateY(-20px);   /* сдвиг по Y */
  transform: skew(10deg, 5deg);   /* наклон */
}
\`\`\`

Можно комбинировать:
\`\`\`css
transform: rotate(45deg) scale(1.2) translateX(10px);
\`\`\``,
    theory_tj: `**transform** шакл ва мавқеи элементро бе таъсир ба ҷараёни ҳуҷҷат тағйир медиҳад:

\`\`\`css
.box {
  transform: rotate(45deg);
  transform: scale(1.5);
  transform: translateX(50px);
  transform: skew(10deg, 5deg);
}
\`\`\`

Якҷоя истифода бурдан мумкин аст:
\`\`\`css
transform: rotate(45deg) scale(1.2);
\`\`\``,
    desc_ru: 'Поверни .target на 45 градусов используя transform: rotate(45deg)',
    desc_tj: '.target-ро бо истифодаи transform: rotate(45deg) 45 дараҷа бигардонед',
    hint_ru: '.target { transform: rotate(45deg); }',
    hint_tj: '.target { transform: rotate(45deg); }',
    template: `.target { width:80px;height:80px;background:linear-gradient(135deg,#6C63FF,#3BC4A5);margin:40px auto;display:flex;align-items:center;justify-content:center;font-size:32px; }
/* Добавь transform */`,
    html: `<div class="stage" style="padding:20px;background:#0d0d1a;text-align:center"><div class="target">🌀</div></div>`,
    validator: (root) => {
      const st = root.querySelector('#injected-style')
      if (!st) return false
      return st.textContent.includes('rotate') || st.textContent.includes('transform')
        ? (() => {
            const el = root.querySelector('.target')
            if (!el) return false
            const cs = getComputedStyle(el)
            return cs.transform && cs.transform !== 'none' && cs.transform !== 'matrix(1, 0, 0, 1, 0, 0)'
          })()
        : false
    },
  },
  {
    id: 'css-zindex-1',
    type: 'css',
    difficulty: 'super',
    title_ru: '🏔️ Миссия 17: Z-index — слои',
    title_tj: '🏔️ Миссия 17: Z-index — қабатҳо',
    theory_ru: `**z-index** управляет порядком наложения элементов по оси Z (глубина):

\`\`\`css
.card1 {
  position: relative; /* z-index работает только с position! */
  z-index: 1;
}

.card2 {
  position: relative;
  z-index: 10; /* перекрывает card1 */
}
\`\`\`

Без **position** (relative/absolute/fixed/sticky) z-index не работает.
Чем больше число — тем выше элемент.`,
    theory_tj: `**z-index** тартиби рӯйпӯши элементҳоро аз рӯи меҳвари Z идора мекунад:

\`\`\`css
.card1 {
  position: relative;
  z-index: 1;
}

.card2 {
  position: relative;
  z-index: 10; /* card1-ро мепӯшад */
}
\`\`\`

Бе **position** z-index кор намекунад. Рақами калонтар = баландтар.`,
    desc_ru: 'Сделай .card2 поверх .card1 используя z-index. .card1 position:relative; z-index:1, .card2 z-index:10',
    desc_tj: '.card2-ро болои .card1 кунед. .card1 position:relative; z-index:1, .card2 z-index:10',
    hint_ru: '.card2 { position:relative; z-index: 10; }',
    hint_tj: '.card2 { position:relative; z-index: 10; }',
    template: `.card1 { position:absolute;width:150px;height:100px;background:#e74c3c;border-radius:8px;top:0;left:0;display:flex;align-items:center;justify-content:center;color:white;z-index:5; }
.card2 { position:absolute;width:150px;height:100px;background:#3498db;border-radius:8px;top:30px;left:60px;display:flex;align-items:center;justify-content:center;color:white; }
/* Сделай card2 поверх card1 */`,
    html: `<div class="stage" style="position:relative;height:160px;background:#1a1a2e;margin:10px"><div class="card1">Card 1</div><div class="card2">Card 2 (сверху)</div></div>`,
    validator: (root) => {
      const card1 = root.querySelector('.card1')
      const card2 = root.querySelector('.card2')
      if (!card1 || !card2) return false
      const z1 = parseInt(getComputedStyle(card1).zIndex, 10) || 0
      const z2 = parseInt(getComputedStyle(card2).zIndex, 10) || 0
      return z2 > z1
    },
  },
  {
    id: 'css-grid-areas-1',
    type: 'css',
    difficulty: 'super',
    title_ru: '🗺️ Миссия 18: Grid Template Areas',
    title_tj: '🗺️ Миссия 18: Grid Template Areas',
    theory_ru: `**grid-template-areas** позволяет именовать зоны сетки и назначать элементы по имени:

\`\`\`css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

Точки \`.\` обозначают пустые ячейки.`,
    theory_tj: `**grid-template-areas** ба минтақаҳои шабака ном медиҳад:

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
\`\`\`

Нуқтаҳо \`.\` ячейкаҳои холиро нишон медиҳанд.`,
    desc_ru: 'Создай grid макет с именованными областями: header, sidebar, main, footer',
    desc_tj: 'Макети grid бо минтақаҳои номдор эҷод кунед: header, sidebar, main, footer',
    hint_ru: 'Используй grid-template-areas и grid-area на каждом дочернем элементе.',
    hint_tj: 'grid-template-areas ва grid-area дар ҳар элементи фарзандӣ истифода баред.',
    template: `.layout { display:grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap:8px;
  height:300px;
}
.header { grid-area:header; background:#6C63FF; border-radius:6px; }
.sidebar { grid-area:sidebar; background:#3BC4A5; border-radius:6px; }
.main { grid-area:main; background:#252526; border-radius:6px; }
.footer { grid-area:footer; background:#555; border-radius:6px; }`,
    html: `<div class="stage" style="padding:16px;background:#1a1a2e"><div class="layout"><div class="header"></div><div class="sidebar"></div><div class="main"></div><div class="footer"></div></div></div>`,
    validator: (root) => {
      const st = root.querySelector('#injected-style')
      if (!st) return false
      return st.textContent.includes('grid-template-areas') || (() => {
        const layout = root.querySelector('.layout')
        if (!layout) return false
        return getComputedStyle(layout).display.includes('grid')
      })()
    },
  },
  {
    id: 'css-glass-1',
    type: 'css',
    difficulty: 'super',
    title_ru: '💎 Миссия 19: Glassmorphism эффект',
    title_tj: '💎 Миссия 19: Эффекти Glassmorphism',
    theory_ru: `**Glassmorphism** — популярный дизайн-тренд: «стеклянные» карточки с размытием фона:

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.1);  /* полупрозрачный фон */
  backdrop-filter: blur(12px);            /* размытие за элементом */
  -webkit-backdrop-filter: blur(12px);   /* Safari */
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
}
\`\`\`

**backdrop-filter** применяет фильтры к тому, что находится позади элемента.`,
    theory_tj: `**Glassmorphism** — тренди маъмул: корточкаҳои «шишагӣ» бо парешонии замина:

\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 16px;
}
\`\`\`

**backdrop-filter** филтрҳоро ба он чизе татбиқ мекунад, ки дар паси элемент ҷойгир аст.`,
    desc_ru: 'Создай стеклянный эффект на .card: backdrop-filter, rgba background, border с прозрачностью',
    desc_tj: 'Эффекти шишагиро дар .card эҷод кунед: backdrop-filter, заминаи rgba, border бо шаффофият',
    hint_ru: '.card { background:rgba(255,255,255,0.1); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.2); border-radius:16px; }',
    hint_tj: '.card { background:rgba(255,255,255,0.1); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.2); border-radius:16px; }',
    template: `.stage-bg {
  background: linear-gradient(135deg,#6C63FF,#3BC4A5);
  padding: 60px 40px;
  display: flex;
  justify-content: center;
}
.card {
  padding: 32px 40px;
  color: white;
  text-align: center;
  /* Добавь glassmorphism */
}`,
    html: `<div class="stage" style="background:#0d0d1a;padding:0"><div class="stage-bg"><div class="card"><h3 style="margin:0 0 8px">💎 Glass Card</h3><p style="margin:0;opacity:.8">Стеклянный эффект</p></div></div></div>`,
    validator: (root) => {
      const st = root.querySelector('#injected-style')
      if (!st) return false
      return st.textContent.includes('backdrop-filter')
    },
  },
  {
    id: 'css-practice-1',
    type: 'css',
    difficulty: 'super',
    title_ru: '🏆 Финальная миссия: Профильная карточка',
    title_tj: '🏆 Миссияи ниҳоӣ: Корточкаи профил',
    theory_ru: `**Финальный уровень CSS!** Применим всё изученное:
- Flexbox/Grid для макета
- CSS переменные
- Анимации
- Псевдоклассы
- Адаптивность

Создай красивую профильную карточку.`,
    theory_tj: `**Сатҳи ниҳоии CSS!** Ҳамаи омӯхтаро татбиқ мекунем:
- Flexbox/Grid барои макет
- CSS тағйирёбандаҳо
- Аниматсияҳо
- Псевдоклассҳо
- Мутобиқат`,
    desc_ru: 'Создай стили для профильной карточки: центрирование, скруглённый аватар, красивые отступы.',
    desc_tj: 'Услубҳоро барои корточкаи профил созед: марказ кардан, аватари мудаввар, фосилаҳои зебо.',
    hint_ru: '.card { display:flex; flex-direction:column; align-items:center; padding:24px; background:#252526; border-radius:16px; }\n.avatar { width:80px;height:80px;border-radius:50%;object-fit:cover; }',
    hint_tj: '.card { display:flex; flex-direction:column; align-items:center; padding:24px; background:#252526; border-radius:16px; }\n.avatar { width:80px;height:80px;border-radius:50%; }',
    template: `.card {
  /* Сделай красивую карточку */
}
.avatar {
  /* Скруглённый аватар */
}
.name { }
.role { }`,
    html: `<div class="stage" style="padding:40px;display:flex;justify-content:center;background:#1e1e1e">
  <div class="card">
    <div class="avatar" style="width:80px;height:80px;background:linear-gradient(135deg,#6C63FF,#3BC4A5);font-size:36px;display:flex;align-items:center;justify-content:center">👨‍💻</div>
    <div class="name" style="color:white;font-size:18px;font-weight:700;margin-top:12px">Алишер</div>
    <div class="role" style="color:#858585;font-size:13px;margin-top:4px">Frontend Developer</div>
  </div>
</div>`,
    validator: (root) => {
      const card = root.querySelector('.card')
      const avatar = root.querySelector('.avatar')
      if (!card || !avatar) return false
      const cs = getComputedStyle(card)
      const hasFlex = cs.display.includes('flex')
      const hasPadding = parseInt(cs.paddingTop,10) >= 12
      return hasFlex && hasPadding
    },
  },
]

export default cssLevels
