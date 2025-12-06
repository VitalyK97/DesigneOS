// Часы
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const separator = now.getSeconds() % 2 === 0 ? ':' : ' ';
  document.getElementById('clock').textContent = `${hours}${separator}${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Z-стек для окон
let zCounter = 100;

// Инициализация одного окна: заголовок, close, drag, z-index
function initWindowInstance(winEl) {
  winEl.style.position = 'absolute';
  winEl.style.left = `${24 + (Math.random() * 40 | 0)}px`;
  winEl.style.top = `${24 + (Math.random() * 40 | 0)}px`;
  winEl.style.zIndex = ++zCounter;

  winEl.addEventListener('mousedown', () => {
    winEl.style.zIndex = ++zCounter;
  });

  const closeBtn = winEl.querySelector('.window-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      winEl.remove();
    });
  }

  const header = winEl.querySelector('.window-header');
  if (header) {
    let dragging = false, startX = 0, startY = 0, origX = 0, origY = 0;
    header.style.cursor = 'move';

    header.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = winEl.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;
      document.body.style.userSelect = 'none';
      winEl.style.zIndex = ++zCounter;
    });

    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      winEl.style.left = `${origX + dx}px`;
      winEl.style.top = `${origY + dy}px`;
    });

    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = '';
    });
  }
}

// Вставка окна: парсим шаблон и добавляем .app-window узел
function appendWindowFromTemplate(templateHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(templateHtml, 'text/html');
  const winEl = doc.querySelector('.app-window');
  if (!winEl) return null;
  document.getElementById('windows-container').appendChild(winEl);
  return winEl;
}

// Универсальное открытие нового окна
function openAppWindow(title, htmlPath, cssPath, jsPath, extraCss = [], initFnName = null) {
  fetch('core/windows/window.html')
    .then(res => res.text())
    .then(html => {
      const winEl = appendWindowFromTemplate(html);
      if (!winEl) return;

      const titleEl = winEl.querySelector('.window-title');
      if (titleEl) titleEl.textContent = title;

      fetch(htmlPath)
        .then(res => res.text())
        .then(appHtml => {
          const bodyEl = winEl.querySelector('.window-body');
          if (bodyEl) bodyEl.innerHTML = appHtml;

          if (cssPath) {
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = cssPath;
            document.head.appendChild(style);
          }

          extraCss.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
          });

          if (jsPath) {
            const script = document.createElement('script');
            script.src = jsPath;
            script.onload = () => {
              if (initFnName && window[initFnName]) {
                const root = winEl.querySelector('.window-body');
                window[initFnName](root);
              }
            };
            document.body.appendChild(script);
          }
        })
        .finally(() => {
          initWindowInstance(winEl);
        });
    });
}

// Настройки
document.querySelector('.settings-button').addEventListener('click', () => {
  openAppWindow(
    'Настройки',
    'core/settings/settings.html',
    'core/settings/settings.css',
    'core/settings/settings.js'
  );
});

// Заметки
document.querySelector(".toolbar-button img[alt='Notes']").parentElement.addEventListener('click', () => {
  openAppWindow(
    'Заметки',
    'apps/notes/notes.html',
    'apps/notes/notes.css',
    'apps/notes/notes.js',
    ['core/windows/window-buttons.css']
  );
});

// Референсы
document.querySelector(".toolbar-button img[alt='Reference']").parentElement.addEventListener('click', () => {
  openAppWindow(
    'Референсы',
    'apps/references/references.html',
    'apps/references/references.css',
    'apps/references/references.js',
    [],
    'initReferences' // вызываем функцию инициализации из references.js
  );
});
