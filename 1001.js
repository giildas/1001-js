/***** TODO
- class Piece en globale -> a importer (webpack ?)
- remplacer la grille par des carrés gris
**********/



const canvas = document.getElementById('1001')

const SIZE = 300
const ROWS = 10
const GAP_W = 3 // 3 px entre chaque carré
const sqSize = ( SIZE - (GAP_W * (ROWS-1)) ) / ROWS

canvas.width = SIZE 
canvas.height = SIZE + SIZE/2

const ctx = canvas.getContext("2d")

draw()
// 0 test
ctx.strokeStyle = "red"
ctx.lineWidth = 1

ctx.strokeRect(0, 0, SIZE, SIZE )


// 1 la grille
function grid(){


  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < ROWS; col++) {
      let position = {
        x: col * (sqSize + GAP_W),
        y:  row * (sqSize + GAP_W)
      }
      Square.draw(ctx, sqSize, "#CCC", position)
    }
  }
}

// 3 - les pieces
// recuperer 3 pieces
// les dessiner en bas

function pieces(){
  for (var i = 0; i < 3; i++) {
    new Piece(ctx, i, SIZE, sqSize, GAP_W)
  }
}





function draw() {
  grid()
  pieces()
}




