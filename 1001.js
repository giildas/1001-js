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


let pieces = []
let grid;




init()

function init(){
  // 1 la grille
  grid = new Grid(GRID_SIZE)

  // 3 - les pieces


  render()

}

function createThreeNewPieces(){
  let pieces = []
  for (var i = 0; i < NB_PIECES; i++) {
    let piece = new Piece(canvas, i, SIZE, sqSize, GAP, NB_PIECES, onPieceDrop )
    pieces.push(piece)
  }
  return pieces
}

function onPieceDrop(piece){
  pieces[piece.index] = null
}



function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  grid.draw(sqSize, GAP, COLORS)
  
  let temp_pieces = pieces.filter( p => p!= null)
  
  if (temp_pieces.length == 0) {
    pieces = createThreeNewPieces()
  }

  temp_pieces
    .sort((a, b) => a.isMoving && !b.isMoving ? 1 : -1) // moving piece on top
    .forEach( p => p.draw() )

  requestAnimationFrame(render)

}




