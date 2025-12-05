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
  let offsetX = 0, offsetY = 0;

  windowHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    // координаты курсора относительно окна
    offsetX = e.clientX - appWindow.offsetLeft;
    offsetY = e.clientY - appWindow.offsetTop;
    // чтобы окно точно было абсолютным
    appWindow.style.position = 'absolute';
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
})();


