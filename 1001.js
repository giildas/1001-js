/***** TODO
- class Piece en globale -> a importer (webpack ?)
- remplacer la grille par des carrés gris
**********/



const canvas = document.getElementById('1001')

const G_DEBUG = true
const SIZE = 300
const ROWS = 10
const GAP = 6 // 3 px entre chaque carré
const sqSize = SIZE / ROWS
const NB_PIECES = 3 
canvas.width = SIZE 
canvas.height = SIZE + SIZE/2

const ctx = canvas.getContext("2d")

const pieces = []

init()
// 0 test

if (G_DEBUG) {

  ctx.strokeStyle = "red"
  ctx.lineWidth = 1
  ctx.strokeRect(0, 0, SIZE, SIZE )
}


// 1 la grille
function grid(){
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < ROWS; col++) {
      let position = {
        x: col * sqSize,
        y:  row * sqSize
      }
      Square.draw(ctx, sqSize, GAP, "#CCC", position)
    }
  }
}




function init(){
  // 1 : créer 3 pieces a stocker dans un tableau
  
  // 3 - les pieces
  for (var i = 0; i < NB_PIECES; i++) {
    let piece = new Piece(canvas, i, SIZE, sqSize, GAP, NB_PIECES)
    pieces.push(piece)
  }


  render()

}



function render() {
  let rerender = pieces.some(p => p.isMoving == true)
  
  pieces.forEach( p => p.draw() )
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  grid()
  pieces.forEach( p => p.draw() )
  requestAnimationFrame(render)

}




