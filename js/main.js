// CREATE GRID BASED ON USER INPUT
const gridContainer = document.querySelector("#grid-container");
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

// GRID SIZE USER INPUT
// it can all go inside one function, but this way is more modular and there is no need to call the funciton to activate the event listener on the sizeBtn
const sizeInput = () => {
  num = prompt("Select a number from 1 to 100");
  clearGrid(); // first clear the existing grid
  createGrid(num); // create new grid based on user input
};
// add event listener to sizeBtn
const sizeBtn = document.querySelector(".grid-size");
sizeBtn.addEventListener("click", () => {
  sizeInput();
});

// RESET GRID
// If I add clearGrid() directly as an event listener it won't run by itself in the sizeInput function without the click event, so it has to be declared separately
const clearGrid = () => {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
};
// add the event listener to clearBtn
const clearBtn = document.querySelector(".reset");
clearBtn.addEventListener("click", () => {
  clearGrid();
});

createGrid(6); // optional: set the initial grid when the page is loaded - it will be overwritten when the sizeInput is entered
