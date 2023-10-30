const gridRows = document.querySelector("#grid-rows");

function createGridRows(rowNum) {
  for (let i = 0; i < rowNum; i++) {
    const newSquare = document.createElement("div");
    newSquare.className = "square"; // add a class name for later manipulation
    gridRows.appendChild(newSquare);
  }
}

createGridRows(10);
