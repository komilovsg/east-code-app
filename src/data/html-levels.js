const htmlLevels = [
  {
    id: 'html-doc-1',
    type: 'html',
    difficulty: 'beginner',
    title_ru: '🌐 Миссия 1: Первый HTML-документ',
    title_tj: '🌐 Миссия 1: Аввалин ҳуҷҷати HTML',
    theory_ru: `**HTML** — язык разметки веб-страниц. Каждый сайт в интернете начинается с HTML.

Структура HTML-документа:
\`\`\`html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Заголовок вкладки</title>
  </head>
  <body>
    <!-- Видимый контент здесь -->
    <h1>Привет, мир!</h1>
  </body>
</html>
\`\`\`

- **DOCTYPE** — говорит браузеру «это HTML5»
- **head** — невидимая часть (мета-информация)
- **body** — видимая часть страницы`,
    theory_tj: `**HTML** — забони белгузории саҳифаҳои веб. Ҳар сайт дар интернет аз HTML оғоз мешавад.

Сохтори ҳуҷҷати HTML:
\`\`\`html
<!DOCTYPE html>
<html lang="tg">
  <head>
    <meta charset="UTF-8">
    <title>Сарлавҳа</title>
  </head>
  <body>
    <h1>Салом, ҷаҳон!</h1>
  </body>
</html>
\`\`\``,
    desc_ru: 'Добавь тег <h1> внутри <body> с текстом "Привет, мир!"',
    desc_tj: 'Дар дохили <body> тег <h1> бо матни "Салом, ҷаҳон!" илова кунед',
    hint_ru: '<body>\n  <h1>Привет, мир!</h1>\n</body>',
    hint_tj: '<body>\n  <h1>Салом, ҷаҳон!</h1>\n</body>',
    template: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Моя страница</title>
  </head>
  <body>
    <!-- Добавь h1 здесь -->
  </body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const h1 = doc.querySelector('h1')
        return h1 && h1.textContent.trim().length > 0
      } catch { return false }
    },
  },
  {
    id: 'html-headings-1',
    type: 'html',
    difficulty: 'beginner',
    title_ru: '📝 Миссия 2: Заголовки страницы',
    title_tj: '📝 Миссия 2: Сарлавҳаҳои саҳифа',
    theory_ru: `**Заголовки** создают иерархию контента. В HTML есть 6 уровней:

\`\`\`html
<h1>Самый важный заголовок</h1>
<h2>Подзаголовок</h2>
<h3>Раздел</h3>
<h4>Подраздел</h4>
<h5>Менее важный</h5>
<h6>Наименее важный</h6>
\`\`\`

**Правило:** на странице должен быть **один h1** — главный заголовок. Он важен для SEO (поисковики).`,
    theory_tj: `**Сарлавҳаҳо** иерархияи мӯҳтаворо эҷод мекунанд. Дар HTML 6 сатҳ мавҷуд аст:

\`\`\`html
<h1>Муҳимтарин сарлавҳа</h1>
<h2>Зерсарлавҳа</h2>
<h3>Бахш</h3>
\`\`\``,
    desc_ru: 'Создай страницу с заголовками h1 (название сайта), h2 (раздел) и h3 (подраздел).',
    desc_tj: 'Саҳифаеро бо сарлавҳаҳои h1, h2 ва h3 созед.',
    hint_ru: '<h1>Мой сайт</h1>\n<h2>О нас</h2>\n<h3>Наша команда</h3>',
    hint_tj: '<h1>Сайти ман</h1>\n<h2>Дар бораи мо</h2>\n<h3>Дастаи мо</h3>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Добавь h1, h2 и h3 -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('h1') && doc.querySelector('h2') && doc.querySelector('h3')
      } catch { return false }
    },
  },
  {
    id: 'html-text-1',
    type: 'html',
    difficulty: 'beginner',
    title_ru: '📖 Миссия 3: Текст и абзацы',
    title_tj: '📖 Миссия 3: Матн ва банд',
    theory_ru: `**Параграф** \`<p>\` — основной блок текста.

\`\`\`html
<p>Это обычный текст в абзаце.</p>

<p>Можно <strong>выделить жирным</strong> или
   <em>курсивом</em> части текста.</p>

<p>Разрыв строки:<br>Следующая строка.</p>
\`\`\`

- **\`<strong>\`** — важный текст (жирный)
- **\`<em>\`** — выделенный текст (курсив)
- **\`<br>\`** — перенос строки`,
    theory_tj: `**Банд** \`<p>\` — блоки асосии матн аст.

\`\`\`html
<p>Ин матни оддии банд аст.</p>
<p>Метавон <strong>ғафс</strong> ё <em>курсив</em> кард.</p>
<p>Шикасти хат:<br>Хати навбатӣ.</p>
\`\`\``,
    desc_ru: 'Добавь два параграфа <p> с текстом, в одном из них используй <strong> для выделения слова.',
    desc_tj: 'Ду банди <p> илова кунед, дар яке аз онҳо <strong> барои ҷудо кардани калима истифода баред.',
    hint_ru: '<p>Первый абзац с <strong>важным</strong> словом.</p>\n<p>Второй абзац текста.</p>',
    hint_tj: '<p>Банди аввал бо калимаи <strong>муҳим</strong>.</p>\n<p>Банди дуюм.</p>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Добавь два тега p, в одном используй strong -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const ps = doc.querySelectorAll('p')
        const strong = doc.querySelector('strong')
        return ps.length >= 2 && strong
      } catch { return false }
    },
  },
  {
    id: 'html-links-1',
    type: 'html',
    difficulty: 'beginner',
    title_ru: '🔗 Миссия 4: Ссылки — паутина интернета',
    title_tj: '🔗 Миссия 4: Ҳаволаҳо — тори интернет',
    theory_ru: `**Ссылки** \`<a>\` связывают страницы — именно они сделали интернет «сетью».

\`\`\`html
<!-- Внешняя ссылка -->
<a href="https://google.com" target="_blank">
  Открыть Google
</a>

<!-- Внутренняя ссылка -->
<a href="about.html">О нас</a>

<!-- Ссылка-якорь -->
<a href="#section">Перейти к разделу</a>
\`\`\`

**target="_blank"** открывает в новой вкладке.`,
    theory_tj: `**Ҳаволаҳо** \`<a>\` саҳифаҳоро мепайванданд.

\`\`\`html
<a href="https://google.com" target="_blank">
  Google-ро кушоед
</a>
<a href="about.html">Дар бораи мо</a>
\`\`\``,
    desc_ru: 'Создай ссылку <a href="https://alif.tj" target="_blank"> с текстом "Alif Academy".',
    desc_tj: 'Ҳавола <a href="https://alif.tj" target="_blank"> бо матни "Alif Academy" созед.',
    hint_ru: '<a href="https://alif.tj" target="_blank">Alif Academy</a>',
    hint_tj: '<a href="https://alif.tj" target="_blank">Alif Academy</a>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h1>Мои ссылки</h1>
  <!-- Добавь ссылку на alif.tj -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const a = doc.querySelector('a[href]')
        return a && a.href.length > 0
      } catch { return false }
    },
  },
  {
    id: 'html-img-1',
    type: 'html',
    difficulty: 'beginner',
    title_ru: '🖼️ Миссия 5: Изображения',
    title_tj: '🖼️ Миссия 5: Тасвирҳо',
    theory_ru: `**Тег \`<img>\`** вставляет изображение. Это самозакрывающийся тег.

\`\`\`html
<img
  src="https://picsum.photos/300/200"
  alt="Описание картинки"
  width="300"
  height="200"
>
\`\`\`

- **src** — URL изображения
- **alt** — текст для скринридеров и если картинка не загрузилась
- **width/height** — размеры

**Alt — обязательный** атрибут для доступности сайта!`,
    theory_tj: `**Тег \`<img>\`** тасвирро ворид мекунад.

\`\`\`html
<img
  src="https://picsum.photos/300/200"
  alt="Тавсифи расм"
  width="300"
>
\`\`\`

- **src** — URL-и тасвир
- **alt** — матн барои дастрасӣ`,
    desc_ru: 'Добавь изображение <img> с src="https://picsum.photos/200/150" и атрибутом alt.',
    desc_tj: 'Тасвири <img> бо src="https://picsum.photos/200/150" ва атрибути alt илова кунед.',
    hint_ru: '<img src="https://picsum.photos/200/150" alt="Красивое фото" width="200">',
    hint_tj: '<img src="https://picsum.photos/200/150" alt="Акс" width="200">',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h1>Мои фото</h1>
  <!-- Добавь img с src и alt -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const img = doc.querySelector('img')
        return img && img.getAttribute('src') && img.getAttribute('alt') !== null
      } catch { return false }
    },
  },
  {
    id: 'html-lists-1',
    type: 'html',
    difficulty: 'medium',
    title_ru: '📋 Миссия 6: Списки — систематизируй данные',
    title_tj: '📋 Миссия 6: Рӯйхатҳо — маълумотро систематизатсия кун',
    theory_ru: `**Два типа списков:**

\`\`\`html
<!-- Ненумерованный список (маркированный) -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Нумерованный список -->
<ol>
  <li>Изучи HTML</li>
  <li>Изучи CSS</li>
  <li>Изучи JavaScript</li>
</ol>
\`\`\`

**ul** = unordered list, **ol** = ordered list, **li** = list item`,
    theory_tj: `**Ду намуди рӯйхат:**

\`\`\`html
<!-- Рӯйхати нишонадор -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<!-- Рӯйхати рақамдор -->
<ol>
  <li>HTML-ро омӯзед</li>
  <li>CSS-ро омӯзед</li>
</ol>
\`\`\``,
    desc_ru: 'Создай ul-список из 3 технологий (HTML, CSS, JS) и ol-список из 2 шагов обучения.',
    desc_tj: 'Рӯйхати ul аз 3 технология (HTML, CSS, JS) ва рӯйхати ol аз 2 қадами омӯзиш созед.',
    hint_ru: '<ul><li>HTML</li><li>CSS</li><li>JS</li></ul>\n<ol><li>Шаг 1</li><li>Шаг 2</li></ol>',
    hint_tj: '<ul><li>HTML</li><li>CSS</li><li>JS</li></ul>\n<ol><li>Қадами 1</li><li>Қадами 2</li></ol>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Технологии</h2>
  <!-- Добавь ul список -->

  <h2>Шаги обучения</h2>
  <!-- Добавь ol список -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const ul = doc.querySelector('ul')
        const ol = doc.querySelector('ol')
        const lis = doc.querySelectorAll('li')
        return ul && ol && lis.length >= 4
      } catch { return false }
    },
  },
  {
    id: 'html-table-1',
    type: 'html',
    difficulty: 'medium',
    title_ru: '📊 Миссия 7: Таблицы данных',
    title_tj: '📊 Миссия 7: Ҷадвалҳои маълумот',
    theory_ru: `**Таблицы** структурируют данные в строки и колонки:

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Алишер</td>
      <td>22</td>
    </tr>
  </tbody>
</table>
\`\`\`

- **tr** — table row (строка)
- **th** — table header (заголовок колонки, жирный)
- **td** — table data (ячейка данных)`,
    theory_tj: `**Ҷадвалҳо** маълумотро дар сатрҳо ва сутунҳо сохтор медиҳанд:

\`\`\`html
<table>
  <thead><tr><th>Ном</th><th>Синну сол</th></tr></thead>
  <tbody><tr><td>Алишер</td><td>22</td></tr></tbody>
</table>
\`\`\``,
    desc_ru: 'Создай таблицу с thead (2 заголовка) и tbody (2 строки данных).',
    desc_tj: 'Ҷадвале бо thead (2 сарлавҳа) ва tbody (2 сатри маълумот) созед.',
    hint_ru: '<table><thead><tr><th>Имя</th><th>Оценка</th></tr></thead><tbody><tr><td>Алишер</td><td>95</td></tr><tr><td>Малика</td><td>90</td></tr></tbody></table>',
    hint_tj: '<table><thead><tr><th>Ном</th><th>Баҳо</th></tr></thead><tbody><tr><td>Алишер</td><td>95</td></tr><tr><td>Малика</td><td>90</td></tr></tbody></table>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Оценки студентов</h2>
  <!-- Создай таблицу -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('table') &&
               doc.querySelector('thead') &&
               doc.querySelector('tbody') &&
               doc.querySelectorAll('tr').length >= 3 &&
               doc.querySelectorAll('th').length >= 2
      } catch { return false }
    },
  },
  {
    id: 'html-form-1',
    type: 'html',
    difficulty: 'medium',
    title_ru: '📝 Миссия 8: Формы — диалог с пользователем',
    title_tj: '📝 Миссия 8: Формаҳо — муколама бо корбар',
    theory_ru: `**Формы** собирают данные от пользователей.

\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name" placeholder="Введите имя">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <button type="submit">Отправить</button>
</form>
\`\`\`

**Важно:** \`for\` в label должен совпадать с \`id\` у input — это доступность!`,
    theory_tj: `**Формаҳо** маълумотро аз корбарон ҷамъ мекунанд.

\`\`\`html
<form>
  <label for="name">Ном:</label>
  <input type="text" id="name" name="name">
  <button type="submit">Фиристодан</button>
</form>
\`\`\``,
    desc_ru: 'Создай форму с полем для имени (input type="text") и кнопкой submit. Используй label.',
    desc_tj: 'Форма бо майдони ном (input type="text") ва тугмаи submit созед. label истифода баред.',
    hint_ru: '<form><label for="n">Имя:</label><input type="text" id="n" name="name"><button type="submit">Отправить</button></form>',
    hint_tj: '<form><label for="n">Ном:</label><input type="text" id="n" name="name"><button type="submit">Фиристодан</button></form>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Регистрация</h2>
  <!-- Создай form с input и button -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('form') &&
               doc.querySelector('input') &&
               doc.querySelector('button, input[type="submit"]') &&
               doc.querySelector('label')
      } catch { return false }
    },
  },
  {
    id: 'html-form-2',
    type: 'html',
    difficulty: 'medium',
    title_ru: '🎛️ Миссия 9: Виды полей формы',
    title_tj: '🎛️ Миссия 9: Намудҳои майдонҳои форма',
    theory_ru: `В HTML много типов полей:

\`\`\`html
<!-- Текст -->
<input type="text" placeholder="Ваше имя">

<!-- Пароль -->
<input type="password" placeholder="Пароль">

<!-- Число -->
<input type="number" min="1" max="100">

<!-- Выпадающий список -->
<select name="city">
  <option value="dushanbe">Душанбе</option>
  <option value="khujand">Худжанд</option>
</select>

<!-- Текстовая область -->
<textarea rows="4" placeholder="Ваше сообщение"></textarea>

<!-- Чекбокс -->
<input type="checkbox" id="agree">
<label for="agree">Согласен с условиями</label>
\`\`\``,
    theory_tj: `Дар HTML намудҳои зиёди майдонҳо мавҷуданд:

\`\`\`html
<input type="text">
<input type="password">
<select><option>Душанбе</option></select>
<textarea></textarea>
<input type="checkbox">
\`\`\``,
    desc_ru: 'Создай форму с: input[type=text], select с 2 вариантами и textarea.',
    desc_tj: 'Форма бо: input[type=text], select бо 2 вариант ва textarea созед.',
    hint_ru: '<form>\n  <input type="text" placeholder="Имя">\n  <select><option>HTML</option><option>CSS</option></select>\n  <textarea placeholder="Комментарий"></textarea>\n</form>',
    hint_tj: '<form>\n  <input type="text">\n  <select><option>HTML</option><option>CSS</option></select>\n  <textarea></textarea>\n</form>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Опрос</h2>
  <!-- Добавь input, select и textarea -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('input') &&
               doc.querySelector('select') &&
               doc.querySelector('textarea')
      } catch { return false }
    },
  },
  {
    id: 'html-semantic-1',
    type: 'html',
    difficulty: 'medium',
    title_ru: '🏗️ Миссия 10: Семантическая разметка',
    title_tj: '🏗️ Миссия 10: Белгузории семантикӣ',
    theory_ru: `**Семантические теги** описывают роль контента (поисковики любят их!):

\`\`\`html
<header>
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
  </nav>
</header>

<main>
  <article>
    <h2>Статья</h2>
    <p>Текст статьи...</p>
  </article>
  <aside>Боковое меню</aside>
</main>

<footer>
  <p>© 2025 Alif Academy</p>
</footer>
\`\`\``,
    theory_tj: `**Тегҳои семантикӣ** нақши мӯҳтаворо тавсиф мекунанд:

\`\`\`html
<header>навигатсия</header>
<main>мӯҳтавои асосӣ</main>
<footer>поён</footer>
\`\`\``,
    desc_ru: 'Создай страницу с тегами: header (с nav), main (с article) и footer.',
    desc_tj: 'Саҳифа бо тегҳо: header (бо nav), main (бо article) ва footer созед.',
    hint_ru: '<header><nav><a href="/">Главная</a></nav></header>\n<main><article><h2>Привет</h2></article></main>\n<footer>© 2025</footer>',
    hint_tj: '<header><nav><a href="/">Асосӣ</a></nav></header>\n<main><article><h2>Салом</h2></article></main>\n<footer>© 2025</footer>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Добавь header > nav, main > article, и footer -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('header') &&
               doc.querySelector('nav') &&
               doc.querySelector('main') &&
               doc.querySelector('footer')
      } catch { return false }
    },
  },
  {
    id: 'html-div-span-1',
    type: 'html',
    difficulty: 'medium',
    title_ru: '📦 Миссия 11: div и span — контейнеры',
    title_tj: '📦 Миссия 11: div ва span — контейнерҳо',
    theory_ru: `**div** и **span** — универсальные контейнеры без семантики:

\`\`\`html
<!-- div — блочный контейнер -->
<div class="card">
  <h3>Заголовок</h3>
  <p>Контент карточки</p>
</div>

<!-- span — строчный контейнер (внутри текста) -->
<p>Нажмите <span class="highlight">здесь</span></p>
\`\`\`

**div** — для блоков (новая строка)
**span** — для частей текста (в строке)`,
    theory_tj: `**div** ва **span** — контейнерҳои универсалӣ бе семантика:

\`\`\`html
<div class="card">
  <h3>Сарлавҳа</h3>
  <p>Мӯҳтаво</p>
</div>

<p>Ин <span class="bold">матни муҳим</span> аст.</p>
\`\`\``,
    desc_ru: 'Создай div с class="card" содержащий h3 и p. Внутри p добавь span с class="highlight".',
    desc_tj: 'div бо class="card" созед, дар дохил h3 ва p бошад. Дар дохили p span бо class="highlight" илова кунед.',
    hint_ru: '<div class="card"><h3>Карточка</h3><p>Это <span class="highlight">важный</span> текст.</p></div>',
    hint_tj: '<div class="card"><h3>Корточка</h3><p>Ин <span class="highlight">муҳим</span> аст.</p></div>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Создай div.card с h3, p и span.highlight внутри p -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('div.card') &&
               doc.querySelector('div.card h3') &&
               doc.querySelector('div.card p') &&
               doc.querySelector('span.highlight')
      } catch { return false }
    },
  },
  {
    id: 'html-attrs-1',
    type: 'html',
    difficulty: 'advanced',
    title_ru: '🔧 Миссия 12: Атрибуты id и class',
    title_tj: '🔧 Миссия 12: Атрибутҳои id ва class',
    theory_ru: `**id** и **class** — главные атрибуты для CSS и JavaScript.

\`\`\`html
<!-- id — уникальный, один на страницу -->
<div id="main-hero">...</div>

<!-- class — для группы элементов -->
<div class="card featured">...</div>
<div class="card">...</div>

<!-- Несколько классов через пробел -->
<button class="btn btn-primary btn-large">
  Кнопка
</button>
\`\`\`

**id** начинается с # в CSS, **class** — с точки.`,
    theory_tj: `**id** ва **class** — атрибутҳои асосӣ барои CSS ва JavaScript.

\`\`\`html
<div id="hero">...</div>  <!-- беназир -->
<div class="card">...</div>  <!-- гурӯҳ -->
<div class="card active">...</div>  <!-- чанд класс -->
\`\`\``,
    desc_ru: 'Создай: div с id="hero", два div с class="card", один из них добавь class="featured".',
    desc_tj: 'Созед: div бо id="hero", ду div бо class="card", яке аз онҳо class="featured" дошта бошад.',
    hint_ru: '<div id="hero"><h1>Главный блок</h1></div>\n<div class="card featured">Карточка 1</div>\n<div class="card">Карточка 2</div>',
    hint_tj: '<div id="hero"><h1>Блоки асосӣ</h1></div>\n<div class="card featured">Корточка 1</div>\n<div class="card">Корточка 2</div>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- id="hero", class="card", class="card featured" -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('#hero') &&
               doc.querySelectorAll('.card').length >= 2 &&
               doc.querySelector('.card.featured')
      } catch { return false }
    },
  },
  {
    id: 'html-meta-1',
    type: 'html',
    difficulty: 'advanced',
    title_ru: '🤖 Миссия 13: Meta теги — для поисковиков',
    title_tj: '🤖 Миссия 13: Тегҳои Meta — барои ҷустуҷӯгарон',
    theory_ru: `**Meta теги** в \`<head>\` — невидимы пользователю, но важны для SEO:

\`\`\`html
<head>
  <meta charset="UTF-8">
  <!-- ↑ Кодировка: всегда нужна! -->

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- ↑ Адаптивность для мобильных -->

  <meta name="description" content="Лучший курс по HTML">
  <!-- ↑ Описание для Google -->

  <meta name="keywords" content="HTML, CSS, веб-разработка">

  <title>Заголовок вкладки</title>
</head>
\`\`\``,
    theory_tj: `**Тегҳои Meta** дар \`<head>\` — барои корбар ноаён аст, аммо барои SEO муҳим аст:

\`\`\`html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Курси беҳтарини HTML">
  <title>Сарлавҳа</title>
</head>
\`\`\``,
    desc_ru: 'Добавь в head: meta charset, meta viewport, meta description с текстом и title.',
    desc_tj: 'Ба head илова кунед: meta charset, meta viewport, meta description ва title.',
    hint_ru: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Мой сайт">\n  <title>Мой сайт</title>\n</head>',
    hint_tj: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Сайти ман">\n  <title>Сайти ман</title>\n</head>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- Добавь: charset, viewport, description, title -->
</head>
<body>
  <h1>Привет!</h1>
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        const charset = doc.querySelector('meta[charset]')
        const viewport = doc.querySelector('meta[name="viewport"]')
        const description = doc.querySelector('meta[name="description"]')
        const title = doc.querySelector('title')
        return charset && viewport && description && title
      } catch { return false }
    },
  },
  {
    id: 'html-data-attrs-1',
    type: 'html',
    difficulty: 'advanced',
    title_ru: '🔧 Миссия 14: Data-атрибуты (data-*)',
    title_tj: '🔧 Миссия 14: Data-атрибутҳо (data-*)',
    theory_ru: `**Data-атрибуты** позволяют хранить произвольные данные прямо в HTML-элементах.

\`\`\`html
<div data-user-id="42" data-role="admin">
  Профиль администратора
</div>
\`\`\`

Доступ через JavaScript:
\`\`\`js
const el = document.querySelector('[data-user-id]')
console.log(el.dataset.userId)  // "42"
console.log(el.dataset.role)    // "admin"
\`\`\`

- Атрибут \`data-user-id\` → \`dataset.userId\` (camelCase)
- Используются для передачи данных между HTML и JS без лишних классов`,
    theory_tj: `**Data-атрибутҳо** имкон медиҳанд маълумоти худсарона мустақиман дар элементҳои HTML нигоҳ дошта шаванд.

\`\`\`html
<div data-user-id="42" data-role="admin">
  Профили маъмур
</div>
\`\`\`

Дастрасӣ тавассути JavaScript:
\`\`\`js
const el = document.querySelector('[data-user-id]')
console.log(el.dataset.userId)  // "42"
console.log(el.dataset.role)    // "admin"
\`\`\`

- Атрибути \`data-user-id\` → \`dataset.userId\` (camelCase)
- Барои интиқоли маълумот байни HTML ва JS истифода мешавад`,
    desc_ru: 'Создай div с data-id="100" data-name="Алишер" и data-role="student"',
    desc_tj: 'div бо data-id="100" data-name="Алишер" ва data-role="student" созед',
    hint_ru: '<div data-id="100" data-name="Алишер" data-role="student">Профиль</div>',
    hint_tj: '<div data-id="100" data-name="Алишер" data-role="student">Профил</div>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Создай div с data-id, data-name и data-role -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('[data-id]') && doc.querySelector('[data-name]') && doc.querySelector('[data-role]')
      } catch { return false }
    },
  },
  {
    id: 'html-audio-video-1',
    type: 'html',
    difficulty: 'advanced',
    title_ru: '🎬 Миссия 15: Медиа: аудио и видео',
    title_tj: '🎬 Миссия 15: Медиа: аудио ва видео',
    theory_ru: `HTML5 добавил нативные теги для медиа — без Flash!

\`\`\`html
<!-- Видео -->
<video controls width="400">
  <source src="movie.mp4" type="video/mp4">
  Ваш браузер не поддерживает видео.
</video>

<!-- Аудио -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Ваш браузер не поддерживает аудио.
</audio>
\`\`\`

- **controls** — показывает кнопки управления (play, pause, громкость)
- **\`<source>\`** — источник файла (можно несколько форматов)
- **autoplay** — автовоспроизведение (используй осторожно!)`,
    theory_tj: `HTML5 тегҳои нативӣ барои медиа илова кард — бе Flash!

\`\`\`html
<!-- Видео -->
<video controls width="400">
  <source src="movie.mp4" type="video/mp4">
  Браузери шумо видеоро дастгирӣ намекунад.
</video>

<!-- Аудио -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Браузери шумо аудиоро дастгирӣ намекунад.
</audio>
\`\`\`

- **controls** — тугмаҳои идоракуниро нишон медиҳад
- **\`<source>\`** — манбаи файл`,
    desc_ru: 'Добавь тег <video> с атрибутами controls и width="400", и внутри него <source> с любым src.',
    desc_tj: 'Тег <video> бо атрибутҳои controls ва width="400" илова кунед, дар дохилаш <source> бо ягон src.',
    hint_ru: '<video controls width="400">\n  <source src="video.mp4" type="video/mp4">\n</video>',
    hint_tj: '<video controls width="400">\n  <source src="video.mp4" type="video/mp4">\n</video>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Мои видео</h2>
  <!-- Добавь video с controls, width и source внутри -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('video') && doc.querySelector('video[controls]')
      } catch { return false }
    },
  },
  {
    id: 'html-aria-1',
    type: 'html',
    difficulty: 'advanced',
    title_ru: '♿ Миссия 16: ARIA — доступность',
    title_tj: '♿ Миссия 16: ARIA — дастрасӣ',
    theory_ru: `**ARIA** (Accessible Rich Internet Applications) — атрибуты для скринридеров и людей с ограниченными возможностями.

\`\`\`html
<!-- aria-label — текстовое описание элемента -->
<button aria-label="Закрыть меню">✕</button>

<!-- role — явная роль элемента -->
<nav role="navigation">...</nav>
<div role="main">...</div>

<!-- aria-describedby — ссылка на описание -->
<input id="email" aria-describedby="email-hint">
<span id="email-hint">Введите действующий email</span>
\`\`\`

**Зачем?** Скринридеры зачитывают aria-label вслух. Это делает сайт доступным для незрячих пользователей.`,
    theory_tj: `**ARIA** — атрибутҳо барои скринридерҳо ва одамони маъюб.

\`\`\`html
<!-- aria-label — тавсифи матнии элемент -->
<button aria-label="Бастани меню">✕</button>

<!-- role — нақши возеҳи элемент -->
<nav role="navigation">...</nav>

<!-- aria-describedby — истинод ба тавсиф -->
<input id="email" aria-describedby="email-hint">
<span id="email-hint">Email-и амалкунандаро ворид кунед</span>
\`\`\`

**Чаро?** Скринридерҳо aria-label-ро баланд мехонанд. Ин сайтро барои корбарони нобино дастрас мекунад.`,
    desc_ru: 'Добавь кнопке <button> атрибут aria-label="Закрыть меню" и nav элементу role="navigation".',
    desc_tj: 'Ба тугмаи <button> атрибути aria-label="Закрыть меню" ва ба элементи nav атрибути role="navigation" илова кунед.',
    hint_ru: '<nav role="navigation"><a href="/">Главная</a></nav>\n<button aria-label="Закрыть меню">✕</button>',
    hint_tj: '<nav role="navigation"><a href="/">Асосӣ</a></nav>\n<button aria-label="Закрыть меню">✕</button>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <!-- Добавь nav с role="navigation" и button с aria-label -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('[aria-label]') && (doc.querySelector('[role]') || doc.querySelector('nav'))
      } catch { return false }
    },
  },
  {
    id: 'html-og-meta-1',
    type: 'html',
    difficulty: 'super',
    title_ru: '📱 Миссия 17: Open Graph мета-теги',
    title_tj: '📱 Миссия 17: Мета-тегҳои Open Graph',
    theory_ru: `**Open Graph** — протокол Meta (Facebook) для красивых превью в соцсетях.

\`\`\`html
<head>
  <meta property="og:title" content="Мой сайт — Alif Academy">
  <meta property="og:description" content="Лучший курс по веб-разработке">
  <meta property="og:image" content="https://alif.tj/og-image.jpg">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://alif.tj">
</head>
\`\`\`

Когда ты делишься ссылкой в Telegram или Instagram — именно OG-теги формируют превью с картинкой и описанием.`,
    theory_tj: `**Open Graph** — протоколи Meta (Facebook) барои пешнамоиши зебо дар шабакаҳои иҷтимоӣ.

\`\`\`html
<head>
  <meta property="og:title" content="Сайти ман — Alif Academy">
  <meta property="og:description" content="Беҳтарин курси веб-дизайн">
  <meta property="og:image" content="https://alif.tj/og-image.jpg">
  <meta property="og:type" content="website">
</head>
\`\`\`

Вақте ки шумо дар Telegram ё Instagram истинод мефиристед — маҳз тегҳои OG пешнамоишро бо акс ва тавсиф ташкил мекунанд.`,
    desc_ru: 'Добавь в head: og:title, og:description и og:type мета-теги с атрибутом property.',
    desc_tj: 'Ба head мета-тегҳои og:title, og:description ва og:type бо атрибути property илова кунед.',
    hint_ru: '<head>\n  <meta charset="UTF-8">\n  <meta property="og:title" content="Мой сайт">\n  <meta property="og:description" content="Описание сайта">\n  <meta property="og:type" content="website">\n</head>',
    hint_tj: '<head>\n  <meta charset="UTF-8">\n  <meta property="og:title" content="Сайти ман">\n  <meta property="og:description" content="Тавсифи сайт">\n  <meta property="og:type" content="website">\n</head>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <!-- Добавь og:title, og:description и og:type -->
</head>
<body>
  <h1>Мой сайт</h1>
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('meta[property="og:title"]') && doc.querySelector('meta[property="og:description"]')
      } catch { return false }
    },
  },
  {
    id: 'html-canvas-1',
    type: 'html',
    difficulty: 'super',
    title_ru: '🎨 Миссия 18: Canvas — рисуй кодом',
    title_tj: '🎨 Миссия 18: Canvas — бо код расм кашед',
    theory_ru: `**Canvas** — HTML-элемент для рисования через JavaScript.

\`\`\`html
<canvas id="myCanvas" width="300" height="200"></canvas>

<script>
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  // Рисуем закрашенный квадрат
  ctx.fillStyle = 'blue'
  ctx.fillRect(50, 50, 100, 100)

  // Рисуем контур
  ctx.strokeStyle = 'red'
  ctx.strokeRect(10, 10, 80, 80)
\`\`\`

- **getContext('2d')** — получаем 2D-контекст для рисования
- **fillRect(x, y, width, height)** — закрашенный прямоугольник
- **strokeRect** — только контур`,
    theory_tj: `**Canvas** — элементи HTML барои расм кашидан тавассути JavaScript.

\`\`\`html
<canvas id="myCanvas" width="300" height="200"></canvas>

<script>
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  // Мураббаи пуррашударо мекашем
  ctx.fillStyle = 'blue'
  ctx.fillRect(50, 50, 100, 100)
\`\`\`

- **getContext('2d')** — контексти 2D барои расм кашидан
- **fillRect(x, y, width, height)** — росткунҷаи пуррашуда`,
    desc_ru: 'Добавь <canvas id="myCanvas" width="300" height="200"> и нарисуй квадрат через JavaScript в script теге.',
    desc_tj: '<canvas id="myCanvas" width="300" height="200"> илова кунед ва тавассути JavaScript дар тegi script мураббаъ кашед.',
    hint_ru: '<canvas id="myCanvas" width="300" height="200"></canvas>\n<script>\n  const canvas = document.getElementById("myCanvas")\n  const ctx = canvas.getContext("2d")\n  ctx.fillStyle = "blue"\n  ctx.fillRect(50, 50, 100, 100)\n</script>',
    hint_tj: '<canvas id="myCanvas" width="300" height="200"></canvas>\n<script>\n  const canvas = document.getElementById("myCanvas")\n  const ctx = canvas.getContext("2d")\n  ctx.fillStyle = "blue"\n  ctx.fillRect(50, 50, 100, 100)\n</script>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"></head>
<body>
  <h2>Мой холст</h2>
  <!-- Добавь canvas и script с рисованием -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('canvas') && doc.querySelector('canvas[width]')
      } catch { return false }
    },
  },
  {
    id: 'html-full-landing-1',
    type: 'html',
    difficulty: 'super',
    title_ru: '🏆 Миссия 19: Лендинг страница',
    title_tj: '🏆 Миссия 19: Саҳифаи лендинг',
    theory_ru: `**Лендинг** (landing page) — одностраничный сайт для продвижения продукта или услуги.

Классическая структура:
\`\`\`html
<header>
  <nav>...</nav>
</header>
<main>
  <section class="hero">
    <h1>Заголовок</h1>
    <p>Описание</p>
    <button>Действие</button>
  </section>
  <section class="features">
    <article>Фича 1</article>
    <article>Фича 2</article>
    <article>Фича 3</article>
  </section>
</main>
<footer>...</footer>
\`\`\`

Используй семантические теги — это хорошая практика для SEO и доступности.`,
    theory_tj: `**Лендинг** — сайти як саҳифаӣ барои пешбурди маҳсул ё хидмат.

Сохтори классикӣ:
\`\`\`html
<header>
  <nav>...</nav>
</header>
<main>
  <section class="hero">
    <h1>Сарлавҳа</h1>
    <p>Тавсиф</p>
    <button>Амал</button>
  </section>
  <section class="features">
    <article>Хусусият 1</article>
    <article>Хусусият 2</article>
    <article>Хусусият 3</article>
  </section>
</main>
<footer>...</footer>
\`\`\``,
    desc_ru: 'Создай лендинг: header>nav, main>(section.hero>h1+p+button, section.features>3 article), footer.',
    desc_tj: 'Лендинг созед: header>nav, main>(section.hero>h1+p+button, section.features>3 article), footer.',
    hint_ru: '<header><nav><a href="#">Главная</a></nav></header>\n<main>\n  <section class="hero">\n    <h1>Добро пожаловать</h1>\n    <p>Лучший курс по HTML</p>\n    <button>Начать</button>\n  </section>\n  <section class="features">\n    <article>Фича 1</article>\n    <article>Фича 2</article>\n    <article>Фича 3</article>\n  </section>\n</main>\n<footer>© 2025</footer>',
    hint_tj: '<header><nav><a href="#">Асосӣ</a></nav></header>\n<main>\n  <section class="hero">\n    <h1>Хуш омадед</h1>\n    <p>Беҳтарин курси HTML</p>\n    <button>Оғоз кардан</button>\n  </section>\n  <section class="features">\n    <article>Хусусият 1</article>\n    <article>Хусусият 2</article>\n    <article>Хусусият 3</article>\n  </section>\n</main>\n<footer>© 2025</footer>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><title>Лендинг</title></head>
<body>
  <!-- header > nav -->
  <!-- main > section.hero > h1 + p + button -->
  <!-- main > section.features > 3x article -->
  <!-- footer -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('.hero') &&
               doc.querySelector('.features') &&
               doc.querySelectorAll('.features article').length >= 3
      } catch { return false }
    },
  },
  {
    id: 'html-practice-1',
    type: 'html',
    difficulty: 'super',
    title_ru: '🏆 Финальная миссия: Страница профиля',
    title_tj: '🏆 Миссияи ниҳоӣ: Саҳифаи профил',
    theory_ru: `**Финальный уровень HTML!** Применим всё изученное:
- Семантическая разметка
- Заголовки и текст
- Списки и ссылки
- Формы
- Атрибуты

Создай настоящую страницу профиля студента.`,
    theory_tj: `**Сатҳи ниҳоии HTML!** Ҳамаи омӯхтаро татбиқ мекунем:
- Белгузории семантикӣ
- Сарлавҳаҳо ва матн
- Рӯйхатҳо ва ҳаволаҳо
- Формаҳо
- Атрибутҳо`,
    desc_ru: 'Создай страницу профиля студента с: header (nav), main (h1 с именем, p с описанием, ul навыков), footer.',
    desc_tj: 'Саҳифаи профили донишҷӯ бо: header (nav), main (h1 бо ном, p бо тавсиф, ul маҳоратҳо), footer созед.',
    hint_ru: '<header><nav><a href="#">Главная</a></nav></header>\n<main>\n  <h1>Алишер Комилов</h1>\n  <p>Студент Alif Academy</p>\n  <h2>Навыки</h2>\n  <ul><li>HTML</li><li>CSS</li><li>JS</li></ul>\n</main>\n<footer>© 2025</footer>',
    hint_tj: '<header><nav><a href="#">Асосӣ</a></nav></header>\n<main>\n  <h1>Алишер Комилов</h1>\n  <p>Донишҷӯи Alif Academy</p>\n  <h2>Маҳоратҳо</h2>\n  <ul><li>HTML</li><li>CSS</li></ul>\n</main>\n<footer>© 2025</footer>',
    template: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Профиль студента</title>
</head>
<body>
  <!-- Создай полную страницу профиля -->
</body>
</html>`,
    validator: (iframe) => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document
        return doc.querySelector('header') &&
               doc.querySelector('nav') &&
               doc.querySelector('main') &&
               doc.querySelector('h1') &&
               doc.querySelector('ul') &&
               doc.querySelector('footer')
      } catch { return false }
    },
  },
]

export default htmlLevels
