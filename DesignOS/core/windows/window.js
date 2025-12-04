document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.querySelector('.settings-button');
  const windowsContainer = document.getElementById('windows-container');

  if (!settingsButton || !windowsContainer) return;

  settingsButton.addEventListener('click', () => {
    fetch('../windows/window.html')
      .then(response => {
        if (!response.ok) throw new Error('Не удалось загрузить window.html');
        return response.text();
      })
      .then(html => {
        windowsContainer.innerHTML = html;

        // ищем элементы только после вставки
        const appWindow = document.getElementById('appWindow');
        const closeWindow = document.getElementById('closeWindow');
        const windowHeader = document.getElementById('windowHeader');

        if (!appWindow || !closeWindow || !windowHeader) {
          console.error('Элементы окна не найдены');
          return;
        }

        // закрытие
        closeWindow.addEventListener('click', () => {
          appWindow.style.display = 'none';
        });

        // перемещение
        let isDragging = false, offsetX, offsetY;
        windowHeader.addEventListener('mousedown', (e) => {
          isDragging = true;
          offsetX = e.clientX - appWindow.offsetLeft;
          offsetY = e.clientY - appWindow.offsetTop;
        });
        document.addEventListener('mousemove', (e) => {
          if (isDragging) {
            appWindow.style.left = (e.clientX - offsetX) + 'px';
            appWindow.style.top = (e.clientY - offsetY) + 'px';
          }
        });
        document.addEventListener('mouseup', () => {
          isDragging = false;
        });
      })
      .catch(err => console.error(err));
  });
});
