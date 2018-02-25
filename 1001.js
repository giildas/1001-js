/***** TODO

* the grid must tell if there's a piece underneath the dropped one
* the grid must tell if there is a completed line


**********/




start_game()
function start_game(){
  const canvas = document.getElementById('1001')

  const PX_SIZE = 300
  const GRID_SIZE = 10 // nb de carrés
  const GAP = 6 // 3 px entre chaque carré
  const sqSize = PX_SIZE / GRID_SIZE
  const NB_PIECES = 3

  canvas.width = PX_SIZE
  canvas.height = PX_SIZE + PX_SIZE/2

  const ctx = canvas.getContext("2d")
  const COLORS = [ "red", "green", "blue", "orange", "purple", "lime", "yellow", "darkblue", "pink"]

  // globals
  let pieces = []
  let grid;




  init()

  function init(){
    grid = new Grid(GRID_SIZE)
    pieces = createThreeNewPieces()
    render()
  }

  function createThreeNewPieces(){
    let pieces = []
    for (var i = 0; i < NB_PIECES; i++) {
      let piece = new Piece(canvas, i, PX_SIZE, GRID_SIZE, sqSize, GAP, NB_PIECES, onPieceDrop )
      pieces.push(piece)
    }
    return pieces
  }

  function onPieceDrop(piece, x, y){

    // we see if piece was dropped onto another
    if ( grid.testOverlap(piece, x, y) ) {

      piece.reset()

    }else{

      grid.placePiece(piece, x, y)
      pieces[piece.index] = null


      if (pieces.every(p=>p==null)) {
        pieces = createThreeNewPieces()
      }

    }

  }



  function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    grid.draw(ctx, sqSize, GAP, COLORS)


    let temp_pieces = pieces.filter( p => p!= null)


    temp_pieces
      .sort((a, b) => a.isMoving && !b.isMoving ? 1 : -1) // moving piece on top
      .forEach( p => p.draw(ctx, COLORS) )


    requestAnimationFrame(render)
  }

}




