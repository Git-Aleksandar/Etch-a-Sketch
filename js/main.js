const gridContainer = document.querySelector("#grid-container");
const num = 10;

// create Grid based on the num input
const createGrid = function (num) {
  // create a single row
  const createRow = function (num) {
    const row = document.createElement("div"); // create a single row
    row.className = "row"; // for css styling

    for (let i = 0; i < num; i++) {
      const newSquare = document.createElement("div");
      newSquare.className = "square";
      newSquare.style.flexBasis = `calc(100% / ${num})`; // make flex-basis 100% so that it fills out the container no matter the number of squares
      row.appendChild(newSquare);
    }

    return row; // you have to return it, else it would be undefined and not visible/ reusable
  };

  // create columns by stacking single rows
  for (let i = 0; i < num; i++) {
    gridContainer.appendChild(createRow(num));
  }
};

createGrid(num); // call the function
