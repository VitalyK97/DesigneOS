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

// Локальная инициализация окна: закрыть, перетащить, стекировать
let zCounter = 10;
function initWindowInstance(win) {
  // базовое позиционирование и стекировка
  win.style.position = 'absolute';
  win.style.top = `${24 + (Math.random() * 40 | 0)}px`;
  win.style.left = `${24 + (Math.random() * 40 | 0)}px`;
  win.style.zIndex = ++zCounter;

  // bring to front on click
  win.addEventListener('mousedown', () => {
    win.style.zIndex = ++zCounter;
  });

  // close
  const closeBtn = win.querySelector('.window-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      win.remove();
    });
  }

  // drag by header
  const header = win.querySelector('.window-header');
  if (header) {
    let dragging = false, startX = 0, startY = 0, origX = 0, origY = 0;

    header.addEventListener('mousedown', (e) => {
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = win.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      win.style.left = `${origX + dx}px`;
      win.style.top = `${origY + dy}px`;
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = '';
    });
  }
}

// Универсальное открытие нового окна
function openAppWindow(title, htmlPath, cssPath, jsPath, extraCss = []) {
  fetch("core/windows/window.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("windows-container");
      container.insertAdjacentHTML("beforeend", html);
      const newWindow = container.lastElementChild;

      // устанавливаем заголовок
      newWindow.querySelector(".window-title").textContent = title;

      // загружаем контент приложения
      fetch(htmlPath)
        .then(res => res.text())
        .then(appHtml => {
          newWindow.querySelector(".window-body").innerHTML = appHtml;

          // подключаем стили
          if (cssPath) {
            const style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = cssPath;
            document.head.appendChild(style);
          }
          // дополнительные стили (например, кнопки окна)
          extraCss.forEach(href => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
          });

          // подключаем JS приложения
          if (jsPath) {
            const script = document.createElement("script");
            script.src = jsPath;
            document.body.appendChild(script);
          }
        })
        .finally(() => {
          // локально инициализируем окно (drag/close/z-index)
          initWindowInstance(newWindow);
        });

      // НЕ подгружаем core/windows/window.js каждый раз, чтобы не конфликтовать
      // Если он нужен глобально, подключи его один раз в index.html
    });
}

// Настройки
document.querySelector(".settings-button").addEventListener("click", () => {
  openAppWindow(
    "Настройки",
    "core/settings/settings.html",
    "core/settings/settings.css",
    "core/settings/settings.js"
  );
});

// Заметки
document.querySelector(".toolbar-button img[alt='Notes']").parentElement.addEventListener("click", () => {
  openAppWindow(
    "Заметки",
    "apps/notes/notes.html",
    "apps/notes/notes.css",
    "apps/notes/notes.js",
    ["core/windows/window-buttons.css"] // стили акцентных кнопок
  );
});

// Референсы
document.querySelector(".toolbar-button img[alt='Reference']").parentElement.addEventListener("click", () => {
  openAppWindow(
    "Референсы",
    "apps/references/references.html",
    "apps/references/references.css",
    "apps/references/references.js"
  );
});
