(() => {
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
  let isDragging = false;
  let startX = 0, startY = 0;
  let initialLeft = 0, initialTop = 0;

  windowHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialLeft = parseInt(appWindow.style.left || appWindow.offsetLeft, 10);
    initialTop = parseInt(appWindow.style.top || appWindow.offsetTop, 10);

    appWindow.style.position = 'absolute';
    appWindow.style.margin = 0;

    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      appWindow.style.left = (initialLeft + dx) + 'px';
      appWindow.style.top = (initialTop + dy) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
})();
