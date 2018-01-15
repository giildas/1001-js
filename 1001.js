/***** TODO
- class Piece en globale -> a importer (webpack ?)
- remplacer la grille par des carrés gris
**********/



const canvas = document.getElementById('1001')

const SIZE = 200
const ROWS = 10
canvas.width = SIZE 
canvas.height = SIZE + SIZE/2

const ctx = canvas.getContext("2d")

draw()

// 1 - le fond : gris (pourait etre du css mais bon)
function fond(){
  ctx.fillStyle = "#DDD"
  ctx.fillRect(0, 0, SIZE, SIZE)
}


// 1 la grille
function grid(){
  ctx.fillStyle = "#DDD"
  let nbSeparations = ROWS + 1
  console.log("nbSeparations", nbSeparations)
  let sqSize = (SIZE-nbSeparations) / ROWS
  for (var i = 0; i <= ROWS; i++) {
    ctx.fillRect(i*sqSize, 0, sqSize, sqSize)
    
  }
}

// 3 - les pieces
// recuperer 3 pieces
// les dessiner en bas

function pieces(){
  for (var i = 0; i < 3; i++) {
    let piece = new Piece()
    piece.draw(i * (SIZE/3), SIZE + 20)
  }
}





function draw() {
  // fond()
  grid()
  pieces()
}




