(() => {
  const buttons = document.querySelectorAll('.settings-btn');
  const content = document.getElementById('settingsContent');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      // показываем правую часть при первом клике
      content.style.display = 'block';

      // пока просто меняем текст-заглушку
      if (target === 'designos') {
        content.innerHTML = "<h2>О DesignOS</h2><p>Здесь будет информация о системе.</p>";
      } else if (target === 'aboutme') {
        content.innerHTML = "<h2>Обо мне</h2><p>Здесь будет информация о разработчике.</p>";
      }
    });
  });
})();
