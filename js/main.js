// CREATE A TOGGLE LIKE FUNCTIONALITY ON BUTTONS

const colorButtons = document.querySelectorAll(".color-button");

let activeColorButton = null; // track the active color button

// handle button click
const handleButtonClick = (button, colorType) => {
  // If the clicked button is active, deactivate it
  if (activeColorButton === button) {
    activeColorButton = null; // no active color button
    button.classList.remove("active");
    // deactivate the corresponding color trail
    deactivateColorTrail(colorType);
  } else {
    // deactivate the previously active button
    if (activeColorButton) {
      activeColorButton.classList.remove("active");
      // deactivate the corresponding color trail
      deactivateColorTrail(activeColorButton.getAttribute("data-color-type"));
    }
    activeColorButton = button; // set the clicked button as active
    button.classList.add("active");
    // activate the corresponding color trail
    activateColorTrail(colorType);
  }
};

// activate a color trail
const activateColorTrail = (colorType) => {
  switch (colorType) {
    case "black":
      blackTrailEnabled = true;
      break;
    case "random":
      randomTrailEnabled = true;
      break;
    case "custom":
      customTrailEnabled = true;
      break;
    default:
      break;
  }
};

// deactivate a color trail
const deactivateColorTrail = (colorType) => {
  switch (colorType) {
    case "black":
      blackTrailEnabled = false;
      break;
    case "random":
      randomTrailEnabled = false;
      break;
    case "custom":
      customTrailEnabled = false;
      break;
    default:
      break;
  }
};

// add click event listeners to color buttons
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const colorType = button.getAttribute("data-color-type");
    handleButtonClick(button, colorType);
  });
});

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

  // COLOR TRAILS

  // BLACK COLOR TRAIL
  const gridSquares = document.querySelectorAll(".square"); // Select all .square elements

  // for of seems most practical for iterating over a node list or an array
  const blackTrail = () => {
    for (const gridSquare of gridSquares) {
      gridSquare.addEventListener("mouseover", () => {
        // check the toggle state variable
        if (blackTrailEnabled) {
          // apply the color
          gridSquare.style.backgroundColor = "black";
        }
      });
    }
  };

  const blackColorBtn = document.querySelector(".color-black");
  blackColorBtn.addEventListener("click", () => {
    blackTrail();
  });

  // RANDOM COLOR TRAIL
  const randomTrail = () => {
    for (const gridSquare of gridSquares) {
      gridSquare.addEventListener("mouseover", () => {
        // generate random rgb values
        const randomRGB =
          "rgb(" +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          "," +
          Math.floor(Math.random() * 256) +
          ")";

        if (randomTrailEnabled) {
          gridSquare.style.backgroundColor = randomRGB;
        }
      });
    }
  };

  const randomColorBtn = document.querySelector(".random-color");
  randomColorBtn.addEventListener("click", () => {
    if (randomTrailEnabled) {
      randomTrail();
    }
  });

  // CUSTOM COLOR TRAIL
  const colorPickerBtn = document.querySelector(".color-picker");
  const colorPickerInput = document.querySelector("#color-picker");

  const customTrail = () => {
    const selectedColor = colorPickerInput.value;
    for (const gridSquare of gridSquares) {
      gridSquare.addEventListener("mouseover", () => {
        if (customTrailEnabled) {
          gridSquare.style.backgroundColor = selectedColor;
        }
      });
    }
  };

  // show the color picker tool
  colorPickerBtn.addEventListener("click", () => {
    colorPickerInput.click();
  });

  // apply the selected color when the color input changes
  colorPickerInput.addEventListener("input", () => {
    customTrail();
  });
};

// GRID SIZE USER INPUT
// it can all go inside one function, but this way is more modular and there is no need to call the function to activate the event listener on the sizeBtn
const sizeInput = () => {
  const input = prompt("Select a number from 1 to 100");

  // check for the correct user input via prompt
  if (input === null) {
    return; // User canceled the prompt, nothing happens
  }

  const num = parseInt(input);
  // check if num is a number from 1 to 100
  if (!isNaN(num) && num >= 1 && num <= 100) {
    clearGrid();
    createGrid(num);
  } else {
    alert("Please enter a valid number between 1 and 100.");
    sizeInput();
  }
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
  createGrid(10);
});

createGrid(10); // optional: set the initial grid when the page is loaded - it will be overwritten when the sizeInput is entered

// DARKENING TRAIL
