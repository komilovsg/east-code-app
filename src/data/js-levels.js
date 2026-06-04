const jsLevels = [
  {
    id: 'js-vars-1',
    type: 'js',
    difficulty: 'beginner',
    title_ru: '🗃️ Миссия 1: Переменные — хранилища данных',
    title_tj: '🗃️ Миссия 1: Тағйирёбандаҳо — анборҳои маълумот',
    theory_ru: `**Переменные** хранят данные. В JS три способа объявить:

\`\`\`javascript
let name = "Алишер";     // можно изменить
const age = 22;           // нельзя изменить
var city = "Душанбе";    // устаревший способ

// Изменение let-переменной:
name = "Малика";

// Вывод в консоль:
console.log(name); // "Малика"
console.log(age);  // 22
\`\`\`

**Правило:** используй **const** по умолчанию, **let** если нужно изменить.`,
    theory_tj: `**Тағйирёбандаҳо** маълумотро нигоҳ медоранд. Дар JS се роҳи эълон кардан мавҷуд аст:

\`\`\`javascript
let name = "Алишер";    // метавон тағйир дод
const age = 22;          // тағйир додан мумкин нест
var city = "Душанбе";   // усули кӯҳна

console.log(name); // "Алишер"
\`\`\``,
    desc_ru: 'Создай переменную name со своим именем и выведи её через console.log().',
    desc_tj: 'Тағйирёбандаи name бо номи худ созед ва онро тавассути console.log() хориҷ кунед.',
    hint_ru: 'const name = "Алишер";\nconsole.log(name);',
    hint_tj: 'const name = "Алишер";\nconsole.log(name);',
    template: `// Создай переменную name и выведи её
`,
    html: `<div class="stage"><h3 id="output">Открой консоль →</h3></div>`,
    validator: (root, logs) => logs.length > 0 && logs[0].trim().length > 0,
  },
  {
    id: 'js-types-1',
    type: 'js',
    difficulty: 'beginner',
    title_ru: '🔢 Миссия 2: Типы данных',
    title_tj: '🔢 Миссия 2: Намудҳои маълумот',
    theory_ru: `JavaScript имеет несколько базовых типов:

\`\`\`javascript
// Строка (String)
const name = "Алишер";
const greeting = \`Привет, \${name}!\`; // шаблонная строка

// Число (Number)
const age = 22;
const pi = 3.14;

// Булево (Boolean)
const isStudent = true;
const isTeacher = false;

// Null — намеренно пустое значение
const nothing = null;

// Undefined — не присвоено
let notDefined;
\`\`\``,
    theory_tj: `JavaScript чанд намуди асосии маълумот дорад:

\`\`\`javascript
const name = "Алишер";          // Сатр
const age = 22;                   // Рақам
const isStudent = true;           // Булевӣ
const nothing = null;             // Null
\`\`\``,
    desc_ru: 'Создай 3 переменные разных типов (string, number, boolean) и выведи все через console.log.',
    desc_tj: '3 тағйирёбандаи намудҳои гуногун (string, number, boolean) созед ва ҳамаро тавассути console.log хориҷ кунед.',
    hint_ru: 'const name = "Алишер";\nconst age = 22;\nconst isStudent = true;\nconsole.log(name, age, isStudent);',
    hint_tj: 'const name = "Алишер";\nconst age = 22;\nconst isStudent = true;\nconsole.log(name, age, isStudent);',
    template: `// Создай 3 переменных разных типов
// и выведи их через console.log
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.length >= 1,
  },
  {
    id: 'js-ops-1',
    type: 'js',
    difficulty: 'beginner',
    title_ru: '➕ Миссия 3: Арифметические операторы',
    title_tj: '➕ Миссия 3: Амалиётҳои арифметикӣ',
    theory_ru: `JavaScript поддерживает стандартные математические операции:

\`\`\`javascript
const a = 10, b = 3;

console.log(a + b);  // 13 — сложение
console.log(a - b);  // 7  — вычитание
console.log(a * b);  // 30 — умножение
console.log(a / b);  // 3.33... — деление
console.log(a % b);  // 1  — остаток от деления
console.log(a ** b); // 1000 — возведение в степень

// Удобные сокращения:
let x = 5;
x += 3;  // x = x + 3 = 8
x++;     // x = x + 1 = 9
\`\`\``,
    theory_tj: `JavaScript амалиётҳои стандартии риёзиро дастгирӣ мекунад:

\`\`\`javascript
const a = 10, b = 3;
console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a % b);  // 1
\`\`\``,
    desc_ru: 'Вычисли площадь прямоугольника (ширина: 8, высота: 5) и выведи результат.',
    desc_tj: 'Майдони росткунҷаро ҳисоб кунед (васеӣ: 8, баландӣ: 5) ва натиҷаро хориҷ кунед.',
    hint_ru: 'const width = 8;\nconst height = 5;\nconst area = width * height;\nconsole.log("Площадь:", area);',
    hint_tj: 'const width = 8;\nconst height = 5;\nconst area = width * height;\nconsole.log("Майдон:", area);',
    template: `// Посчитай площадь прямоугольника
// Ширина = 8, Высота = 5
// console.log("Площадь:", area)
`,
    html: `<div class="stage"><p id="result">Вычисляем...</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes('40')),
  },
  {
    id: 'js-if-1',
    type: 'js',
    difficulty: 'beginner',
    title_ru: '🚦 Миссия 4: Условия if/else',
    title_tj: '🚦 Миссия 4: Шартҳои if/else',
    theory_ru: `**Условия** выбирают путь выполнения кода:

\`\`\`javascript
const score = 75;

if (score >= 90) {
  console.log("Отлично! 🏆");
} else if (score >= 70) {
  console.log("Хорошо! 👍");
} else if (score >= 50) {
  console.log("Удовлетворительно");
} else {
  console.log("Нужно подтянуться");
}

// Тернарный оператор (краткий if/else):
const status = score >= 70 ? "Сдал ✅" : "Не сдал ❌";
\`\`\``,
    theory_tj: `**Шартҳо** роҳи иҷроии кодро интихоб мекунанд:

\`\`\`javascript
const score = 75;

if (score >= 90) {
  console.log("Аъло! 🏆");
} else if (score >= 70) {
  console.log("Хуб! 👍");
} else {
  console.log("Бояд беҳтар кард");
}
\`\`\``,
    desc_ru: 'Напиши код: если переменная age >= 18, выведи "Взрослый", иначе "Несовершеннолетний".',
    desc_tj: 'Код нависед: агар тағйирёбандаи age >= 18 бошад, "Калонсол" чоп кунед, вагарна "Ноболиғ".',
    hint_ru: 'const age = 20;\nif (age >= 18) {\n  console.log("Взрослый");\n} else {\n  console.log("Несовершеннолетний");\n}',
    hint_tj: 'const age = 20;\nif (age >= 18) {\n  console.log("Калонсол");\n} else {\n  console.log("Ноболиғ");\n}',
    template: `// Установи возраст и проверь условие
const age = 20;
// Напиши if/else
`,
    html: `<div class="stage"><p id="status">Статус: ?</p></div>`,
    validator: (root, logs) => logs.some(l => /Взрослый|Adult|совершеннолетн|Калонсол/i.test(l)),
  },
  {
    id: 'js-loop-for-1',
    type: 'js',
    difficulty: 'beginner',
    title_ru: '🔄 Миссия 5: Цикл for — повтори действие',
    title_tj: '🔄 Миссия 5: Давраи for — амалро такрор кун',
    theory_ru: `**Цикл for** выполняет код заданное количество раз:

\`\`\`javascript
// Синтаксис: for (начало; условие; шаг)
for (let i = 1; i <= 5; i++) {
  console.log("Повторение #" + i);
}
// Выведет: Повторение #1, #2, #3, #4, #5

// Сумма чисел от 1 до 10:
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("Сумма:", sum); // 55
\`\`\``,
    theory_tj: `**Давраи for** кодро якчанд маротиба иҷро мекунад:

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  console.log("Такрор №" + i);
}

let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log("Ҷамъ:", sum); // 55
\`\`\``,
    desc_ru: 'Используй цикл for чтобы вывести числа от 1 до 5 в консоль.',
    desc_tj: 'Давраи for-ро истифода кунед то рақамҳоро аз 1 то 5 дар консол нишон диҳед.',
    hint_ru: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
    hint_tj: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
    template: `// Выведи числа от 1 до 5 с помощью for
`,
    html: `<div class="stage"><ul id="list"></ul></div>`,
    validator: (root, logs) => {
      const nums = logs.map(l => parseInt(l, 10)).filter(n => !isNaN(n))
      return nums.includes(1) && nums.includes(5) && nums.length >= 5
    },
  },
  {
    id: 'js-func-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '⚙️ Миссия 6: Функции — блоки кода',
    title_tj: '⚙️ Миссия 6: Функсияҳо — блокҳои код',
    theory_ru: `**Функции** — переиспользуемые блоки кода:

\`\`\`javascript
// Объявление функции
function greet(name) {
  return "Привет, " + name + "!";
}

// Вызов функции
console.log(greet("Алишер")); // "Привет, Алишер!"
console.log(greet("Малика")); // "Привет, Малика!"

// Стрелочная функция (краткий синтаксис):
const double = (n) => n * 2;
console.log(double(5)); // 10
\`\`\``,
    theory_tj: `**Функсияҳо** — блокҳои кодии дубора истифодашаванда:

\`\`\`javascript
function greet(name) {
  return "Салом, " + name + "!";
}

console.log(greet("Алишер")); // "Салом, Алишер!"

const double = (n) => n * 2;
console.log(double(5)); // 10
\`\`\``,
    desc_ru: 'Напиши функцию add(a, b) которая возвращает сумму двух чисел. Вызови её с add(3, 7) и выведи результат.',
    desc_tj: 'Функсияи add(a, b) нависед, ки ҷамъи ду рақамро бармегардонад. Онро бо add(3, 7) фаро хонед.',
    hint_ru: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 7)); // 10',
    hint_tj: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 7)); // 10',
    template: `// Напиши функцию add(a, b) и вызови её
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.trim() === '10' || l.includes('10')),
  },
  {
    id: 'js-array-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '📚 Миссия 7: Массивы — списки данных',
    title_tj: '📚 Миссия 7: Массивҳо — рӯйхатҳои маълумот',
    theory_ru: `**Массивы** хранят списки значений:

\`\`\`javascript
// Создание массива
const fruits = ["яблоко", "банан", "манго"];

// Доступ по индексу (с нуля!)
console.log(fruits[0]); // "яблоко"
console.log(fruits[2]); // "манго"

// Длина
console.log(fruits.length); // 3

// Добавить в конец
fruits.push("апельсин");

// Удалить из конца
fruits.pop();

// Перебор
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\``,
    theory_tj: `**Массивҳо** рӯйхати арзишҳоро нигоҳ медоранд:

\`\`\`javascript
const fruits = ["себ", "банан", "манго"];
console.log(fruits[0]); // "себ"
console.log(fruits.length); // 3
fruits.push("афлесун");
\`\`\``,
    desc_ru: 'Создай массив из 3 имён, добавь 4-е имя через push(), выведи длину массива.',
    desc_tj: 'Массиви 3 ном созед, номи 4-умро тавассути push() илова кунед, дарозии массивро хориҷ кунед.',
    hint_ru: 'const names = ["Алишер", "Малика", "Зафар"];\nnames.push("Ситора");\nconsole.log(names.length); // 4',
    hint_tj: 'const names = ["Алишер", "Малика", "Зафар"];\nnames.push("Ситора");\nconsole.log(names.length); // 4',
    template: `// Создай массив имён, добавь имя, выведи длину
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.trim() === '4' || parseInt(l, 10) === 4),
  },
  {
    id: 'js-array-methods-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '🛠️ Миссия 8: Методы массивов',
    title_tj: '🛠️ Миссия 8: Усулҳои массивҳо',
    theory_ru: `Мощные методы для работы с массивами:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// map — преобразовать каждый элемент
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — отфильтровать по условию
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce — свести к одному значению
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// find — найти первый подходящий
const first = numbers.find(n => n > 3);
// 4
\`\`\``,
    theory_tj: `Усулҳои пурқуввати кор бо массивҳо:

\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);   // [2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0); // [2,4]
const sum = numbers.reduce((a, n) => a + n, 0); // 15
\`\`\``,
    desc_ru: 'Дан массив [1,2,3,4,5]. Используй filter() чтобы получить только чётные числа и выведи их.',
    desc_tj: 'Массиви [1,2,3,4,5] дода шудааст. filter()-ро истифода кунед то ададҳои ҷуфтро гиред.',
    hint_ru: 'const nums = [1,2,3,4,5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens); // [2, 4]',
    hint_tj: 'const nums = [1,2,3,4,5];\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens);',
    template: `const nums = [1, 2, 3, 4, 5];
// Используй filter() для чётных чисел
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes('2') && l.includes('4')),
  },
  {
    id: 'js-obj-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '🏛️ Миссия 9: Объекты — структуры данных',
    title_tj: '🏛️ Миссия 9: Объектҳо — сохторҳои маълумот',
    theory_ru: `**Объект** хранит данные в парах ключ-значение:

\`\`\`javascript
const student = {
  name: "Алишер",
  age: 22,
  city: "Душанбе",
  skills: ["HTML", "CSS"],
  isActive: true
};

// Доступ к свойствам:
console.log(student.name);       // "Алишер"
console.log(student["age"]);     // 22

// Изменение:
student.age = 23;

// Добавление нового свойства:
student.score = 95;

// Перебор:
for (const key in student) {
  console.log(key + ":", student[key]);
}
\`\`\``,
    theory_tj: `**Объект** маълумотро дар ҷуфти калид-арзиш нигоҳ медорад:

\`\`\`javascript
const student = {
  name: "Алишер",
  age: 22,
  city: "Душанбе"
};

console.log(student.name);  // "Алишер"
student.age = 23;
\`\`\``,
    desc_ru: 'Создай объект student с полями name, age, city. Выведи его поле name через console.log.',
    desc_tj: 'Объекти student бо майдонҳои name, age, city созед. Майдони name-ро тавассути console.log хориҷ кунед.',
    hint_ru: 'const student = { name: "Алишер", age: 22, city: "Душанбе" };\nconsole.log(student.name);',
    hint_tj: 'const student = { name: "Алишер", age: 22, city: "Душанбе" };\nconsole.log(student.name);',
    template: `// Создай объект student и выведи его name
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.length > 0 && logs[0].trim().length > 0,
  },
  {
    id: 'js-dom-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '🎮 Миссия 10: DOM — управляй страницей',
    title_tj: '🎮 Миссия 10: DOM — саҳифаро идора кун',
    theory_ru: `**DOM (Document Object Model)** — это программный интерфейс HTML-страницы. JavaScript может изменять любой элемент!

\`\`\`javascript
// Найти элемент по id
const el = document.getElementById("title");

// Найти по CSS-селектору
const btn = document.querySelector(".btn");
const all = document.querySelectorAll(".item");

// Изменить текст
el.textContent = "Новый текст";

// Изменить HTML
el.innerHTML = "<strong>Жирный текст</strong>";

// Изменить стиль
el.style.color = "red";
el.style.fontSize = "24px";

// Добавить/убрать класс
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("visible");
\`\`\``,
    theory_tj: `**DOM** — интерфейси барномавии саҳифаи HTML аст.

\`\`\`javascript
const el = document.getElementById("title");
el.textContent = "Матни нав";
el.style.color = "red";
el.classList.add("active");
\`\`\``,
    desc_ru: 'Найди элемент с id="message" и измени его textContent на "Привет от JavaScript!".',
    desc_tj: 'Элементро бо id="message" ёбед ва textContent-ашро ба "Салом аз JavaScript!" тағйир диҳед.',
    hint_ru: 'const el = document.getElementById("message");\nel.textContent = "Привет от JavaScript!";',
    hint_tj: 'const el = document.getElementById("message");\nel.textContent = "Салом аз JavaScript!";',
    template: `// Найди #message и измени его текст
`,
    html: `<div class="stage"><h2 id="message">Измени меня!</h2></div>`,
    validator: (root) => {
      const el = root.querySelector('#message')
      return el && el.textContent !== 'Измени меня!' && el.textContent.trim().length > 0
    },
  },
  {
    id: 'js-dom-style-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '🎨 Миссия 11: Изменяй стили через JS',
    title_tj: '🎨 Миссия 11: Услубҳоро тавассути JS тағйир диҳ',
    theory_ru: `JavaScript может динамически изменять **любые** CSS-стили:

\`\`\`javascript
const box = document.querySelector(".box");

box.style.backgroundColor = "#6C63FF";
box.style.color = "white";
box.style.padding = "20px";
box.style.borderRadius = "12px";
box.style.fontSize = "18px";
box.style.transform = "rotate(5deg)";

// Переключение классов — лучший подход:
box.classList.add("highlighted");
box.classList.toggle("dark-mode");
\`\`\``,
    theory_tj: `JavaScript метавонад **ҳар** услуби CSS-ро динамикӣ тағйир диҳад:

\`\`\`javascript
const box = document.querySelector(".box");
box.style.backgroundColor = "#6C63FF";
box.style.color = "white";
box.style.padding = "20px";
\`\`\``,
    desc_ru: 'Найди .box и измени его backgroundColor на "#6C63FF" и color на "white".',
    desc_tj: '.box-ро ёбед ва backgroundColor-ашро ба "#6C63FF" ва color-ро ба "white" тағйир диҳед.',
    hint_ru: 'const box = document.querySelector(".box");\nbox.style.backgroundColor = "#6C63FF";\nbox.style.color = "white";',
    hint_tj: 'const box = document.querySelector(".box");\nbox.style.backgroundColor = "#6C63FF";\nbox.style.color = "white";',
    template: `// Найди .box и измени его цвета
`,
    html: `<div class="stage" style="padding:20px"><div class="box" style="padding:20px;border-radius:8px;background:#333;color:#ccc;text-align:center;font-size:16px">Покрась меня! 🎨</div></div>`,
    validator: (root) => {
      const box = root.querySelector('.box')
      if (!box) return false
      const cs = getComputedStyle(box)
      return cs.backgroundColor !== 'rgb(51, 51, 51)' || cs.color !== 'rgb(204, 204, 204)'
    },
  },
  {
    id: 'js-events-1',
    type: 'js',
    difficulty: 'medium',
    title_ru: '🖱️ Миссия 12: События — кнопка оживает',
    title_tj: '🖱️ Миссия 12: Рӯйдодҳо — тугма зинда мешавад',
    theory_ru: `**События** позволяют реагировать на действия пользователя:

\`\`\`javascript
const btn = document.querySelector("#myBtn");

// Обработчик события
btn.addEventListener("click", function() {
  console.log("Кнопка нажата!");
  btn.textContent = "Нажато ✓";
  btn.style.background = "#3BC4A5";
});

// Стрелочная функция:
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
});

// Другие события:
// "mouseover" — навели мышь
// "keydown"   — нажали клавишу
// "input"     — ввод в поле
// "submit"    — отправка формы
\`\`\``,
    theory_tj: `**Рӯйдодҳо** ба амалҳои корбар вокунш нишон медиҳанд:

\`\`\`javascript
const btn = document.querySelector("#myBtn");

btn.addEventListener("click", () => {
  console.log("Тугма пахш шуд!");
  btn.textContent = "Пахш шуд ✓";
});
\`\`\``,
    desc_ru: 'Добавь обработчик click на кнопку #myBtn. При клике измени её текст на "Нажато! ✓".',
    desc_tj: 'Ба тугмаи #myBtn коркарди click илова кунед. Ҳангоми пахш кардан матнашро ба "Пахш шуд! ✓" тағйир диҳед.',
    hint_ru: 'const btn = document.getElementById("myBtn");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Нажато! ✓";\n});',
    hint_tj: 'const btn = document.getElementById("myBtn");\nbtn.addEventListener("click", () => {\n  btn.textContent = "Пахш шуд! ✓";\n});',
    template: `// Добавь addEventListener к #myBtn
`,
    html: `<div class="stage" style="padding:30px;text-align:center"><button id="myBtn" style="padding:12px 28px;background:#6C63FF;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer">🖱️ Нажми меня!</button></div>`,
    validator: (root) => {
      const btn = root.querySelector('#myBtn')
      if (!btn) return false
      btn.click()
      return btn.textContent !== '🖱️ Нажми меня!'
    },
  },
  {
    id: 'js-dom-create-1',
    type: 'js',
    difficulty: 'advanced',
    title_ru: '🏗️ Миссия 13: Создавай DOM-элементы',
    title_tj: '🏗️ Миссия 13: DOM-элементҳо эҷод кун',
    theory_ru: `JavaScript может **создавать новые** HTML-элементы:

\`\`\`javascript
// Создать элемент
const li = document.createElement("li");
li.textContent = "Новый пункт";
li.className = "item";
li.style.color = "blue";

// Добавить в DOM
const list = document.getElementById("myList");
list.appendChild(li);

// Более современный способ:
list.insertAdjacentHTML("beforeend", "<li>Ещё пункт</li>");

// Удалить элемент:
const old = document.querySelector(".old");
old.remove();
\`\`\``,
    theory_tj: `JavaScript метавонад элементҳои HTML-и **нав** эҷод кунад:

\`\`\`javascript
const li = document.createElement("li");
li.textContent = "Пункти нав";

const list = document.getElementById("myList");
list.appendChild(li);
\`\`\``,
    desc_ru: 'Создай 3 элемента <li> через createElement и добавь их в #myList.',
    desc_tj: '3 элементи <li> тавассути createElement созед ва онҳоро ба #myList илова кунед.',
    hint_ru: 'const list = document.getElementById("myList");\nfor (let i = 1; i <= 3; i++) {\n  const li = document.createElement("li");\n  li.textContent = "Пункт " + i;\n  list.appendChild(li);\n}',
    hint_tj: 'const list = document.getElementById("myList");\nfor (let i = 1; i <= 3; i++) {\n  const li = document.createElement("li");\n  li.textContent = "Банд " + i;\n  list.appendChild(li);\n}',
    template: `// Создай 3 li и добавь в #myList
`,
    html: `<div class="stage" style="padding:20px"><ul id="myList" style="color:#ccc;list-style-position:inside"></ul></div>`,
    validator: (root) => {
      const list = root.querySelector('#myList')
      return list && list.querySelectorAll('li').length >= 3
    },
  },
  {
    id: 'js-template-literals-1',
    type: 'js',
    difficulty: 'advanced',
    title_ru: '🔤 Миссия 14: Шаблонные строки',
    title_tj: '🔤 Миссия 14: Сатрҳои шаблонӣ',
    theory_ru: `**Template literals** (обратные кавычки) — удобный способ работы со строками:

\`\`\`javascript
const name = "Алишер";
const age = 22;
const city = "Душанбе";

// Старый способ:
console.log("Привет, " + name + "! Тебе " + age + " лет.");

// Template literal (лучше!):
console.log(\`Привет, \${name}! Тебе \${age} лет. Город: \${city}\`);

// Многострочные строки:
const card = \`
  Имя: \${name}
  Возраст: \${age}
  Город: \${city}
\`;

// Выражения внутри:
console.log(\`2 + 2 = \${2 + 2}\`);
\`\`\``,
    theory_tj: `**Template literals** — усули қулай кор бо сатрҳо:

\`\`\`javascript
const name = "Алишер";
const age = 22;

console.log(\`Салом, \${name}! Ба ту \${age} сол.\`);
console.log(\`2 + 2 = \${2 + 2}\`);
\`\`\``,
    desc_ru: 'Создай переменные name и score, используй template literal для вывода "Имя: {name}, Баллы: {score}".',
    desc_tj: 'Тағйирёбандаҳои name ва score созед, template literal-ро барои хориҷ кардани "Ном: {name}, Холҳо: {score}" истифода баред.',
    hint_ru: 'const name = "Алишер";\nconst score = 95;\nconsole.log(`Имя: ${name}, Баллы: ${score}`);',
    hint_tj: 'const name = "Алишер";\nconst score = 95;\nconsole.log(`Ном: ${name}, Холҳо: ${score}`);',
    template: `// Используй template literals
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes(':') && l.length > 5),
  },
  {
    id: 'js-localstorage-1',
    type: 'js',
    difficulty: 'advanced',
    title_ru: '💾 Миссия 15: localStorage — сохрани данные',
    title_tj: '💾 Миссия 15: localStorage — маълумотро захира кун',
    theory_ru: `**localStorage** хранит данные в браузере между сессиями:

\`\`\`javascript
// Сохранить
localStorage.setItem("username", "Алишер");
localStorage.setItem("score", "95");

// Прочитать
const name = localStorage.getItem("username");
console.log(name); // "Алишер"

// Удалить
localStorage.removeItem("score");

// Очистить всё
localStorage.clear();

// Хранение объектов (через JSON):
const user = { name: "Алишер", age: 22 };
localStorage.setItem("user", JSON.stringify(user));

const loaded = JSON.parse(localStorage.getItem("user"));
console.log(loaded.name); // "Алишер"
\`\`\``,
    theory_tj: `**localStorage** маълумотро дар браузер байни сессияҳо нигоҳ медорад:

\`\`\`javascript
localStorage.setItem("username", "Алишер");
const name = localStorage.getItem("username");
console.log(name); // "Алишер"
localStorage.removeItem("username");
\`\`\``,
    desc_ru: 'Сохрани своё имя в localStorage под ключом "myName", прочитай и выведи через console.log.',
    desc_tj: 'Номи худро дар localStorage бо калиди "myName" захира кунед, хонед ва тавассути console.log хориҷ кунед.',
    hint_ru: 'localStorage.setItem("myName", "Алишер");\nconst name = localStorage.getItem("myName");\nconsole.log(name);',
    hint_tj: 'localStorage.setItem("myName", "Алишер");\nconst name = localStorage.getItem("myName");\nconsole.log(name);',
    template: `// Сохрани имя в localStorage и выведи его
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.length > 0 && logs[0].trim().length > 0,
  },
  {
    id: 'js-destructuring-1',
    type: 'js',
    difficulty: 'advanced',
    title_ru: '📦 Миссия 16: Деструктуризация',
    title_tj: '📦 Миссия 16: Деструктуризатсия',
    theory_ru: `**Деструктуризация** позволяет извлекать значения из массивов и объектов:

\`\`\`javascript
// Деструктуризация массива
const [first, second] = [1, 2];
console.log(first);  // 1
console.log(second); // 2

// Деструктуризация объекта
const { name, age } = { name: "Алишер", age: 22 };
console.log(name); // "Алишер"
console.log(age);  // 22

// Переименование:
const { name: userName } = { name: "Малика" };
console.log(userName); // "Малика"

// Дефолтное значение:
const { score = 0 } = { name: "Зафар" };
console.log(score); // 0
\`\`\``,
    theory_tj: `**Деструктуризатсия** имкон медиҳад арзишҳоро аз массивҳо ва объектҳо гирем:

\`\`\`javascript
const [first, second] = [1, 2];
console.log(first);  // 1

const { name, age } = { name: "Алишер", age: 22 };
console.log(name); // "Алишер"

// Номи нав: const { name: userName } = user
// Пешфарз: const { score = 0 } = user
\`\`\``,
    desc_ru: 'Деструктурируй объект {name:"Алишер", city:"Душанбе", score:95} в переменные. Выведи name и score.',
    desc_tj: 'Объекти {name:"Алишер", city:"Душанбе", score:95}-ро деструктуризатсия кунед. name ва score-ро хориҷ кунед.',
    hint_ru: 'const { name, city, score } = { name:"Алишер", city:"Душанбе", score:95 };\nconsole.log(name, score);',
    hint_tj: 'const { name, city, score } = { name:"Алишер", city:"Душанбе", score:95 };\nconsole.log(name, score);',
    template: `// Деструктурируй объект
const user = { name:"Алишер", city:"Душанбе", score:95 };
// const { ... } = user
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes('Алишер') && l.includes('95')),
  },
  {
    id: 'js-spread-1',
    type: 'js',
    difficulty: 'advanced',
    title_ru: '🌊 Миссия 17: Spread и Rest операторы',
    title_tj: '🌊 Миссия 17: Амалиётҳои Spread ва Rest',
    theory_ru: `**Spread (...)** разворачивает массив/объект, **Rest** собирает аргументы:

\`\`\`javascript
// Spread — объединение массивов
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Spread — копирование объекта
const user = { name: "Алишер", age: 22 };
const updated = { ...user, city: "Душанбе" };
console.log(updated); // { name: "Алишер", age: 22, city: "Душанбе" }

// Rest — сбор аргументов функции
function sum(...nums) {
  return nums.reduce((a, n) => a + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
\`\`\``,
    theory_tj: `**Spread (...)** массив/объектро мекушояд, **Rest** аргументҳоро ҷамъ мекунад:

\`\`\`javascript
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b];
console.log(merged); // [1, 2, 3, 4, 5, 6]

function sum(...nums) {
  return nums.reduce((a, n) => a + n, 0);
}
console.log(sum(1, 2, 3)); // 6
\`\`\``,
    desc_ru: 'Объедини два массива [1,2,3] и [4,5,6] используя spread operator (...). Выведи результат.',
    desc_tj: 'Ду массиви [1,2,3] ва [4,5,6]-ро бо истифодаи spread operator (...) якҷоя кунед. Натиҷаро хориҷ кунед.',
    hint_ru: 'const a = [1,2,3];\nconst b = [4,5,6];\nconst merged = [...a, ...b];\nconsole.log(merged);',
    hint_tj: 'const a = [1,2,3];\nconst b = [4,5,6];\nconst merged = [...a, ...b];\nconsole.log(merged);',
    template: `// Объедини два массива с помощью spread
const a = [1, 2, 3];
const b = [4, 5, 6];
// const merged = ...
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes('1') && l.includes('6')),
  },
  {
    id: 'js-fetch-1',
    type: 'js',
    difficulty: 'super',
    title_ru: '🌐 Миссия 18: Fetch API — запросы к серверу',
    title_tj: '🌐 Миссия 18: Fetch API — дархостҳо ба сервер',
    theory_ru: `**Fetch API** позволяет делать HTTP-запросы к серверу:

\`\`\`javascript
// Базовый fetch с async/await
async function getData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}

// Получить пользователя
async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();
  console.log(user.name);  // "Leanne Graham"
  console.log(user.email); // "Sincere@april.biz"
}

// Обработка ошибок:
async function safeGet(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Ошибка: " + res.status);
    return await res.json();
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
}

getData();
getUser();
\`\`\``,
    theory_tj: `**Fetch API** имкон медиҳад дархостҳои HTTP ба сервер фиристем:

\`\`\`javascript
async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await res.json();
  console.log(user.name);
}

getUser();
\`\`\``,
    desc_ru: 'Напиши async функцию которая делает fetch к "https://jsonplaceholder.typicode.com/users/1" и выводит user.name в консоль.',
    desc_tj: 'Функсияи async нависед, ки ба "https://jsonplaceholder.typicode.com/users/1" fetch мекунад ва user.name-ро дар консол нишон медиҳад.',
    hint_ru: 'async function getUser() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await res.json();\n  console.log(user.name);\n}\ngetUser();',
    hint_tj: 'async function getUser() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await res.json();\n  console.log(user.name);\n}\ngetUser();',
    template: `// Напиши async функцию с fetch
async function getUser() {
  // const res = await fetch(...)
  // const user = await res.json()
  // console.log(user.name)
}
getUser();
`,
    html: `<div class="stage"><p id="result">Загрузка данных...</p></div>`,
    validator: (root, logs) => true,
  },
  {
    id: 'js-class-1',
    type: 'js',
    difficulty: 'super',
    title_ru: '🏛️ Миссия 19: Классы (ООП)',
    title_tj: '🏛️ Миссия 19: Синфҳо (ООП)',
    theory_ru: `**Классы** — шаблоны для создания объектов (ООП):

\`\`\`javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    console.log(\`\${this.name} говорит \${this.sound}\`);
  }

  describe() {
    return \`Я \${this.name}\`;
  }
}

// Создание экземпляра
const dog = new Animal("Собака", "Гав!");
dog.speak(); // "Собака говорит Гав!"

// Наследование
class Dog extends Animal {
  fetch() {
    console.log(\`\${this.name} приносит мяч!\`);
  }
}

const rex = new Dog("Рекс", "Вуф!");
rex.speak();
rex.fetch();
\`\`\``,
    theory_tj: `**Синфҳо** — шаблонҳо барои эҷоди объектҳо (ООП):

\`\`\`javascript
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }
  speak() {
    console.log(\`\${this.name} мегӯяд \${this.sound}\`);
  }
}

const dog = new Animal("Саг", "Ҳаф!");
dog.speak();
\`\`\``,
    desc_ru: 'Создай класс Animal с constructor(name, sound), методом speak() который выводит "${name} говорит ${sound}". Создай экземпляр и вызови speak().',
    desc_tj: 'Синфи Animal бо constructor(name, sound) ва усули speak() созед. Намунаро эҷод кунед ва speak()-ро фаро хонед.',
    hint_ru: 'class Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n  speak() {\n    console.log(`${this.name} говорит ${this.sound}`);\n  }\n}\nconst dog = new Animal("Собака", "Гав!");\ndog.speak();',
    hint_tj: 'class Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n  speak() {\n    console.log(`${this.name} мегӯяд ${this.sound}`);\n  }\n}\nconst dog = new Animal("Саг", "Ҳаф!");\ndog.speak();',
    template: `// Создай класс Animal
class Animal {
  // constructor(name, sound) { ... }
  // speak() { ... }
}
// const dog = new Animal(...)
// dog.speak()
`,
    html: `<div class="stage"><p>Смотри консоль ↓</p></div>`,
    validator: (root, logs) => logs.some(l => l.includes('говорит') || l.includes('says') || l.includes('мегӯяд')),
  },
  {
    id: 'js-practice-counter-1',
    type: 'js',
    difficulty: 'super',
    title_ru: '🏆 Финальная миссия: Интерактивный счётчик',
    title_tj: '🏆 Миссияи ниҳоӣ: Счётчики интерактивӣ',
    theory_ru: `**Финальный уровень JS!** Объединяем всё:
- DOM-манипуляции
- События
- Условия
- Переменные

Создай рабочий счётчик.`,
    theory_tj: `**Сатҳи ниҳоии JS!** Ҳамаро якҷоя мекунем:
- Дасткорӣ бо DOM
- Рӯйдодҳо
- Шартҳо
- Тағйирёбандаҳо`,
    desc_ru: 'Добавь 3 обработчика: кнопка #inc увеличивает счёт, #dec уменьшает (минимум 0), #reset обнуляет. Обнови #score.',
    desc_tj: '3 коркард илова кунед: тугмаи #inc ҳисобро зиёд мекунад, #dec кам (ҳадди ақал 0), #reset нулро нишон медиҳад.',
    hint_ru: 'let count = 0;\nconst score = document.getElementById("score");\ndocument.getElementById("inc").addEventListener("click",()=>{ count++; score.textContent=count; });\ndocument.getElementById("dec").addEventListener("click",()=>{ if(count>0){count--;} score.textContent=count; });\ndocument.getElementById("reset").addEventListener("click",()=>{ count=0; score.textContent=0; });',
    hint_tj: 'let count = 0;\nconst score = document.getElementById("score");\ndocument.getElementById("inc").addEventListener("click",()=>{ count++; score.textContent=count; });\ndocument.getElementById("dec").addEventListener("click",()=>{ if(count>0){count--;} score.textContent=count; });\ndocument.getElementById("reset").addEventListener("click",()=>{ count=0; score.textContent=0; });',
    template: `// Реализуй счётчик: #inc, #dec, #reset обновляют #score
let count = 0;
`,
    html: `<div class="stage" style="padding:30px;text-align:center;background:#1a1a2e">
  <h2 id="score" style="font-size:64px;color:#6C63FF;margin:0">0</h2>
  <div style="display:flex;gap:12px;justify-content:center;margin-top:24px">
    <button id="dec" style="padding:12px 20px;background:#e74c3c;color:white;border:none;border-radius:8px;font-size:20px;cursor:pointer">−</button>
    <button id="reset" style="padding:12px 20px;background:#555;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer">Reset</button>
    <button id="inc" style="padding:12px 20px;background:#3BC4A5;color:white;border:none;border-radius:8px;font-size:20px;cursor:pointer">+</button>
  </div>
</div>`,
    validator: (root) => {
      const inc = root.querySelector('#inc')
      const score = root.querySelector('#score')
      if (!inc || !score) return false
      inc.click()
      inc.click()
      return score.textContent === '2'
    },
  },
  {
    id: 'js-todo-1',
    type: 'js',
    difficulty: 'super',
    title_ru: '🏆 Финальная миссия: Todo List',
    title_tj: '🏆 Миссияи ниҳоӣ: Рӯйхати вазифаҳо',
    theory_ru: `**Todo List** — классическое приложение, объединяющее всё знание DOM:

\`\`\`javascript
// Получить значение из input
const input = document.getElementById("todoInput");
const text = input.value;

// Создать новый элемент li
const li = document.createElement("li");
li.textContent = text;

// Добавить в список
const list = document.getElementById("todoList");
list.appendChild(li);

// Очистить input
input.value = "";

// Всё вместе — по клику кнопки:
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  if (!input.value.trim()) return;
  const li = document.createElement("li");
  li.textContent = input.value;
  document.getElementById("todoList").appendChild(li);
  input.value = "";
});
\`\`\``,
    theory_tj: `**Todo List** — барномаи классикие, ки ҳамаи донишро дар бораи DOM муттаҳид мекунад:

\`\`\`javascript
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  const li = document.createElement("li");
  li.textContent = input.value;
  document.getElementById("todoList").appendChild(li);
  input.value = "";
});
\`\`\``,
    desc_ru: 'Реализуй Todo: кнопка #addBtn берёт значение из #todoInput и добавляет li в #todoList с текстом задачи.',
    desc_tj: 'Todo реализатсия кунед: тугмаи #addBtn арзишро аз #todoInput мегирад ва li-ро ба #todoList бо матни вазифа илова мекунад.',
    hint_ru: 'document.getElementById("addBtn").addEventListener("click", () => {\n  const input = document.getElementById("todoInput");\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  document.getElementById("todoList").appendChild(li);\n  input.value = "";\n});',
    hint_tj: 'document.getElementById("addBtn").addEventListener("click", () => {\n  const input = document.getElementById("todoInput");\n  const li = document.createElement("li");\n  li.textContent = input.value;\n  document.getElementById("todoList").appendChild(li);\n  input.value = "";\n});',
    template: `// Реализуй Todo List
// #addBtn -> берёт #todoInput.value -> создаёт li -> добавляет в #todoList
`,
    html: `<div class="stage" style="padding:20px;background:#1a1a2e"><h3 style="color:#6C63FF;margin-bottom:12px">📝 Todo List</h3><div style="display:flex;gap:8px;margin-bottom:16px"><input id="todoInput" placeholder="Новая задача..." style="flex:1;padding:8px 12px;background:#252526;border:1px solid #3a3a55;border-radius:6px;color:white;font-size:13px"><button id="addBtn" style="padding:8px 16px;background:#6C63FF;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px">+ Добавить</button></div><ul id="todoList" style="list-style:none;padding:0;color:#ccc"></ul></div>`,
    validator: (root) => {
      const input = root.querySelector('#todoInput')
      const btn = root.querySelector('#addBtn')
      const list = root.querySelector('#todoList')
      if (!input || !btn || !list) return false
      input.value = 'Тестовая задача'
      btn.click()
      return list.querySelectorAll('li').length >= 1
    },
  },
]

export default jsLevels
