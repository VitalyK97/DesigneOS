window.initReferences = function(root) {
  const dropzone = root.querySelector(".references-dropzone");
  const input = root.querySelector("#references-input");
  const grid = root.querySelector(".references-grid");

  const selectBtn = root.parentElement.querySelector(".references-actions .window-menu-btn:first-child");
  const deleteBtn = root.parentElement.querySelector(".references-actions .window-menu-btn:last-child");

  if (!dropzone || !input || !grid) return;

  // Клик по зоне открывает выбор файлов
  dropzone.addEventListener("click", () => input.click());

  // Drag & Drop
  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("dragover");
  });
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });

  input.addEventListener("change", () => {
    handleFiles(input.files);
  });

  function handleFiles(files) {
    [...files].forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className = "reference-item";
        grid.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  // Кнопка "Выбрать"
  selectBtn.addEventListener("click", () => {
    alert("Функция выбора пока не реализована");
  });

  // Кнопка "Удалить все"
  deleteBtn.addEventListener("click", () => {
    grid.innerHTML = "";
  });
};
