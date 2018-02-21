/***** TODO

* when a piece is dropped, the piece should disapear from the array 
* the grid should evolve and draw colored squares at the same position as the dropped piece
* so it can tell if there is a line, or a piece already there on dropping the next one


**********/



const canvas = document.getElementById('1001')

const G_DEBUG = false
const SIZE = 300
const GRID_SIZE = 10
const GAP = 6 // 3 px entre chaque carré
const sqSize = SIZE / GRID_SIZE
const NB_PIECES = 3 
canvas.width = SIZE 
canvas.height = SIZE + SIZE/2

const ctx = canvas.getContext("2d")



const COLORS = [
  "#CCC",
  "red",
  "green",
  "blue",
  "orange",
  "purple",
  "lime",
  "yellow",
  "darkblue",
  "pink"
]


const pieces = []
let grid;




init()

function init(){
  // 1 la grille
  grid = new Grid(GRID_SIZE)

  // 3 - les pieces
  for (var i = 0; i < NB_PIECES; i++) {
    let piece = new Piece(canvas, i, SIZE, sqSize, GAP, NB_PIECES)
    pieces.push(piece)
  }


  render()

}



function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  grid.draw(sqSize, GAP, COLORS)
  pieces.forEach( p => p.draw() )
  requestAnimationFrame(render)

}




