// Global variable
var square = []

// Create elements

var messageBoard = document.createElement("div");
document.body.appendChild(messageBoard)

var grid = document.createElement("div");
grid.setAttribute("class", "grid")
document.body.appendChild(grid)

function createSquares() {
  var myOutputValue = ""
  for (let row = 1; row <= 3; row++) {
    for (let column = 1; column <= 3; column++) {
      square = document.createElement("div")
      // square.innerHTML =""
      square.setAttribute("class","square")
      square.setAttribute("row", row)
      square.setAttribute("column", column)
      // squares.push(square)
      grid.appendChild(square)
      myOutputValue = myOutputValue + square
      square.addEventListener("click", (event) => {
        chosenId = event.target.getAttribute("row" + row + "column" + column) 
        // event.target.getAttribu.log("idArray " + idArray)
        // counter++
        // draw ()
      })
      myOutputValue = myOutputValue + "<br>"
    }
  }
}

createSquares()