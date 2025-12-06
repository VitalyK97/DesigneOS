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

// Окно Настроек
document.querySelector(".settings-button").addEventListener("click", () => {
  // Загружаем универсальное окно
  fetch("core/windows/window.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("windows-container").innerHTML = html;
      // Меняем заголовок окна
      document.querySelector(".window-title").textContent = "Настройки";
      // Загружаем контент приложения
      fetch("core/settings/settings.html")
        .then(res => res.text())
        .then(appHtml => {
          document.querySelector(".window-body").innerHTML = appHtml;
          // Подключаем стили и JS приложения
          const style = document.createElement("link");
          style.rel = "stylesheet";
          style.href = "core/settings/settings.css";
          document.head.appendChild(style);
          const script = document.createElement("script");
          script.src = "core/settings/settings.js";
          document.body.appendChild(script);
        });
      // Подключаем JS окна (drag/close)
      const script = document.createElement("script");
      script.src = "core/windows/window.js";
      document.body.appendChild(script);
    });
});

// Окно Заметок
document.querySelector(".toolbar-button img[alt='Notes']").parentElement.addEventListener("click", () => {
  fetch("core/windows/window.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("windows-container").innerHTML = html;
      document.querySelector(".window-title").textContent = "Заметки";

      fetch("apps/notes/notes.html")
        .then(res => res.text())
        .then(appHtml => {
          document.querySelector(".window-body").innerHTML = appHtml;

          const style = document.createElement("link");
          style.rel = "stylesheet";
          style.href = "apps/notes/notes.css";
          document.head.appendChild(style);

          const script = document.createElement("script");
          script.src = "apps/notes/notes.js";
          document.body.appendChild(script);
        });

      const script = document.createElement("script");
      script.src = "core/windows/window.js";
      document.body.appendChild(script);

      const styleButtons = document.createElement("link");
styleButtons.rel = "stylesheet";
styleButtons.href = "core/windows/window-buttons.css";
document.head.appendChild(styleButtons);
    });
});

