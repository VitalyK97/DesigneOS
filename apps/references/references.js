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
