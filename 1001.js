/***** TODO
- class Piece en globale -> a importer (webpack ?)
- remplacer la grille par des carrés gris
**********/



const canvas = document.getElementById('1001')

const SIZE = 300
const ROWS = 10
const GAP = 6 // 3 px entre chaque carré
const sqSize = SIZE / ROWS
const NB_PIECES = 3 
canvas.width = SIZE 
canvas.height = SIZE + SIZE/2

const ctx = canvas.getContext("2d")

draw()
// 0 test
// ctx.strokeStyle = "red"
// ctx.lineWidth = 1
// ctx.strokeRect(0, 0, SIZE, SIZE )


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

// 3 - les pieces
// recuperer 3 pieces
// les dessiner en bas

function pieces(){
  for (var i = 0; i < NB_PIECES; i++) {
    new Piece(ctx, i, SIZE, sqSize, GAP, NB_PIECES)
  }
}





function draw() {
  grid()
  pieces()
}




