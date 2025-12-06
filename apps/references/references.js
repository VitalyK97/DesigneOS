// Экспортируем явную функцию инициализации для конкретного окна
window.initReferences = function(root) {
  const dropzone = root.querySelector(".references-dropzone");
  const input = root.querySelector("#references-input");
  const grid = root.querySelector(".references-grid");

  if (!dropzone || !input || !grid) {
    console.error("References elements not found in window", root);
    return;
  }

  // Клик по зоне открывает выбор файлов
  dropzone.addEventListener("click", () => input.click());

  // Drag & Drop события
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

  // Выбор через input
  input.addEventListener("change", () => {
    handleFiles(input.files);
  });

  // Добавление изображений в текущую сетку
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
};
