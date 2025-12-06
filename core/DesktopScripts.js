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

// Универсальная функция открытия окна
function openAppWindow(title, htmlPath, cssPath, jsPath) {
  fetch("core/windows/window.html")
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("windows-container");
      container.insertAdjacentHTML("beforeend", html); // добавляем новое окно
      const newWindow = container.lastElementChild;

      // Заголовок
      newWindow.querySelector(".window-title").textContent = title;

      // Контент приложения
      fetch(htmlPath)
        .then(res => res.text())
        .then(appHtml => {
          newWindow.querySelector(".window-body").innerHTML = appHtml;

          if (cssPath) {
            const style = document.createElement("link");
            style.rel = "stylesheet";
            style.href = cssPath;
            document.head.appendChild(style);
          }

          if (jsPath) {
            const script = document.createElement("script");
            script.src = jsPath;
            document.body.appendChild(script);
          }
        });

      // Логика окна (drag/close)
      const script = document.createElement("script");
      script.src = "core/windows/window.js";
      document.body.appendChild(script);
    });
}

// Окно Настроек
document.querySelector(".settings-button").addEventListener("click", () => {
  openAppWindow("Настройки", "core/settings/settings.html", "core/settings/settings.css", "core/settings/settings.js");
});

// Окно Заметок
document.querySelector(".toolbar-button img[alt='Notes']").parentElement.addEventListener("click", () => {
  openAppWindow("Заметки", "apps/notes/notes.html", "apps/notes/notes.css", "apps/notes/notes.js");

  // Подключаем стили кнопок
  const styleButtons = document.createElement("link");
  styleButtons.rel = "stylesheet";
  styleButtons.href = "core/windows/window-buttons.css";
  document.head.appendChild(styleButtons);
});

// Окно References
document.querySelector(".toolbar-button img[alt='Reference']").parentElement.addEventListener("click", () => {
  openAppWindow("Референсы", "apps/references/references.html", "apps/references/references.css", "apps/references/references.js");
});
