const levels = [
  {
    id: 'selectors-1',
    title: 'Селекторы: поменяй фон',
    description: 'Сделай фон целевого блока красным используя селектор .target',
    hint: 'Добавь правило .target { background: red; }',
    template: `.target { /* ваш код здесь */ }`,
    html: `<div class="stage"><div class="target">Целевой блок</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return cs.backgroundColor === 'rgb(255, 0, 0)'
    }
  },
  {
    id: 'box-1',
    title: 'Box model: padding',
    description: 'Добавь паддинг 20px к .target',
    hint: 'Используйте свойство padding',
    template: `.target { padding: 20px; background: lightgray }`,
    html: `<div class="stage"><div class="target">Проверь padding</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return parseInt(cs.paddingTop, 10) >= 20
    }
  },
  {
    id: 'position-1',
    title: 'Позиционирование: центр по горизонтали',
    description: 'Центрируй .target по горизонтали внутри .stage используя margin или flex',
    hint: 'Попробуйте margin: 0 auto или display:flex на родителе',
    template: `.stage { height: 120px; }
.target { width: 120px; height: 40px; background: #9ae; }
`,
    html: `<div class="stage"><div class="target">Центр</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!el || !stage) return false
      const stageRect = stage.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const stageCenter = stageRect.left + stageRect.width / 2
      const elCenter = elRect.left + elRect.width / 2
      return Math.abs(stageCenter - elCenter) < 5
    }
  },

  // flex/grid/media/animation basic
  {
    id: 'flex-1',
    title: 'Flex: центрирование по обеим осям',
    description: 'Сделай так, чтобы .stage использовал flex и центрировал .target по вертикали и горизонтали',
    hint: 'Используйте display:flex; align-items:center; justify-content:center;',
    template: `.stage { display:flex; height:160px }
.target { width:120px; height:40px; background:#ffd; }
`,
    html: `<div class="stage"><div class="target">Flex центр</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!stage || !el) return false
      const st = getComputedStyle(stage)
      if (!st.display.includes('flex')) return false
      const sRect = stage.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      const sCenterX = sRect.left + sRect.width / 2
      const sCenterY = sRect.top + sRect.height / 2
      const eCenterX = eRect.left + eRect.width / 2
      const eCenterY = eRect.top + eRect.height / 2
      return Math.hypot(sCenterX - eCenterX, sCenterY - eCenterY) < 6
    }
  },
  {
    id: 'grid-1',
    title: 'Grid: центрирование с place-items',
    description: 'Сделай .stage grid и выровняй .target по центру с помощью place-items',
    hint: 'display:grid; place-items:center;',
    template: `.stage { display:grid; height:160px }
.target { width:120px; height:40px; background:#efe; }
`,
    html: `<div class="stage"><div class="target">Grid центр</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      const el = root.querySelector('.target')
      if (!stage || !el) return false
      const st = getComputedStyle(stage)
      if (!st.display.includes('grid')) return false
      const sRect = stage.getBoundingClientRect()
      const eRect = el.getBoundingClientRect()
      const sCenterX = sRect.left + sRect.width / 2
      const sCenterY = sRect.top + sRect.height / 2
      const eCenterX = eRect.left + eRect.width / 2
      const eCenterY = eRect.top + eRect.height / 2
      return Math.hypot(sCenterX - eCenterX, sCenterY - eCenterY) < 6
    }
  },
  {
    id: 'media-1',
    title: 'Media: использовать медиазапрос',
    description: 'Добавь медиазапрос, в котором изменится стиль .target (например, font-size или background)',
    hint: 'Используйте @media (min-width: 600px) { .target { ... } }',
    template: `.target { background:#eee; padding:8px }

/* @media (min-width:600px) { .target { background: #f99 } } */
`,
    html: `<div class="stage"><div class="target">Media test</div></div>`,
    validator: (root) => {
      // Improved validation: check computed style at two widths and ensure it changes
      const el = root.querySelector('.target')
      if (!el) return false
      const preview = root
      const prevWidth = preview.style.width || ''
      try {
        preview.style.width = '400px'
        const small = getComputedStyle(el).backgroundColor + '|' + getComputedStyle(el).fontSize
        preview.style.width = '800px'
        const large = getComputedStyle(el).backgroundColor + '|' + getComputedStyle(el).fontSize
        return small !== large
      } finally {
        preview.style.width = prevWidth
      }
    }
  },
  {
    id: 'anim-1',
    title: 'Animation: добавь анимацию',
    description: 'Создай простую анимацию и примените её к .target (например, смена opacity или трансформация)',
    hint: 'Определите @keyframes и примените animation: имя duration и пр.',
    template: `.target { width:100px;height:40px;background:#cdf; animation: pulse 1s infinite }
@keyframes pulse { from { transform: scale(1) } to { transform: scale(1.05) } }
`,
    html: `<div class="stage"><div class="target">Анимация</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return cs.animationName && cs.animationName !== 'none'
    }
  },

  // Advanced levels
  {
    id: 'flex-2',
    title: 'Flex: ряд с gap и переносом',
    description: 'Размести 3 карточки в ряд с отступом gap и разреши перенос на следующую строку при нехватке места',
    hint: 'display:flex; gap:16px; flex-wrap:wrap; width/resize проверка',
    template: `.stage { display:flex; gap:16px; flex-wrap:wrap }
.card { width:140px; height:80px; background:#fde; }
`,
    html: `<div class="stage"><div class="card">1</div><div class="card">2</div><div class="card">3</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const st = getComputedStyle(stage)
      if (!st.display.includes('flex')) return false
      if (parseInt(st.gap || '0', 10) < 8) return false
      return true
    }
  },
  {
    id: 'grid-2',
    title: 'Grid: auto-placement и gap',
    description: 'Сделай grid с автоматическим размещением колонок и gap между элементами',
    hint: 'display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:12px',
    template: `.stage { display:grid; grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); gap:12px }
.cell { height:60px; background:#eef }
`,
    html: `<div class="stage"><div class="cell">A</div><div class="cell">B</div><div class="cell">C</div><div class="cell">D</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const st = getComputedStyle(stage)
      return st.display.includes('grid') && parseInt(st.gap || '0', 10) >= 8
    }
  },
  {
    id: 'media-2',
    title: 'Media: адаптивный макет',
    description: 'Создайте адаптивный макет: при ширине >=600px элементы располагаются в ряд, иначе — в колонку',
    hint: 'Используйте @media и измените flex-direction или display',
    template: `.stage { display:flex; flex-direction:column }
.item { height:40px; background:#f4f4f4; margin:4px 0 }

/* @media (min-width:600px) { .stage { flex-direction:row } } */
`,
    html: `<div class="stage"><div class="item">1</div><div class="item">2</div><div class="item">3</div></div>`,
    validator: (root) => {
      const stage = root.querySelector('.stage')
      if (!stage) return false
      const prev = stage.style.width || ''
      try {
        stage.style.width = '400px'
        const small = getComputedStyle(stage).flexDirection
        stage.style.width = '800px'
        const large = getComputedStyle(stage).flexDirection
        return small !== large
      } finally {
        stage.style.width = prev
      }
    }
  },
  {
    id: 'anim-2',
    title: 'Animation: сложная анимация',
    description: 'Создайте анимацию с несколькими ключевыми кадрами и используйте timing-function или animation-delay',
    hint: 'Определите @keyframes с несколькими шагами и настройте animation-duration/iteration/ timing',
    template: `.target { width:80px;height:40px;background:#cdf; animation: jiggle 1.2s ease-in-out infinite }
@keyframes jiggle { 0%{ transform:translateX(0) } 25%{ transform:translateX(-6px) } 75%{ transform:translateX(6px) } 100%{ transform:translateX(0) } }
`,
    html: `<div class="stage"><div class="target">Jiggle</div></div>`,
    validator: (root) => {
      const el = root.querySelector('.target')
      if (!el) return false
      const cs = getComputedStyle(el)
      return cs.animationName && cs.animationDuration && cs.animationName !== 'none'
    }
  }
]

export default levels
