// Пример динамического добавления изображений в контейнер
export function addReference(src, alt = "reference") {
  const grid = document.querySelector(".references-grid");
  if (!grid) return;
  const img = document.createElement("img");
  img.className = "reference-item";
  img.src = src;
  img.alt = alt;
  grid.appendChild(img);
}

document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.querySelector(".references-dropzone");
  const input = document.getElementById("references-input");
  const grid = document.querySelector(".references-grid");

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

  // Функция добавления картинок
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
});
