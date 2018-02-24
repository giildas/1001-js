/*
TODO :
prendre en compte les rotations !!

*/
class Piece {

  constructor(canvas, index, game_size, grid_size, sqSize, gap, nb_pieces, onPieceDropFunc){


    let pieces = [
    "0",
    "11",
    "222",
    "3333",
    "44444",
    "55o5",
    "66o66",
    "777o777o777",
    "888o8o8",
    ].map(p=>p.split('o'))

    let random_index = Math.floor( Math.random() * pieces.length )

    this.canvas = canvas

    this.game_size = game_size
    this.grid_size = grid_size

    this.gap = gap

    this.piece = pieces[random_index]

    this.index = index
    this.pieceMaxWidth = game_size / nb_pieces

    this.zoomCoef = this.getZoomCoef(sqSize)

    this.sqSize = sqSize

    this.piecePosition = this.getFirstPosition()

    this.isMoving = false
    this.addTouchEvents(onPieceDropFunc)

    return this
  }

  addTouchEvents(onPieceDropFunc){
    this.canvas.addEventListener('mousedown', (e)=>{
      let mouseX = e.offsetX
      let mouseY = e.offsetY

      if (
        mouseX > this.piecePosition.x &&
        mouseX < this.piecePosition.x + (this.piecePosition.l * this.zoomCoef) &&
        mouseY > this.piecePosition.y &&
        mouseY < this.piecePosition.y + (this.piecePosition.h * this.zoomCoef)
        ) {
        this.isMoving = true
        this.zoomCoef = 1
        this.piecePosition.x = mouseX - this.piecePosition.l/2
        this.piecePosition.y = mouseY - this.piecePosition.h/2
      }
    })

    this.canvas.addEventListener('mousemove', (e)=>{
      if (this.isMoving) {
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        this.piecePosition.x = mouseX - this.piecePosition.l/2
        this.piecePosition.y = mouseY - this.piecePosition.h/2
      }
    })

    this.canvas.addEventListener('mouseup', (e)=>{
      let mouseX = e.offsetX
      let mouseY = e.offsetY

      if (this.isMoving) {

        this.isMoving = false
        let snapX = Math.round(this.piecePosition.x / this.sqSize)
        let snapY = Math.round(this.piecePosition.y / this.sqSize)

        if (
          snapX >= 0 &&
          snapX + this.getLongestLineLength() <= this.grid_size &&
          snapY >= 0 &&
          snapY + this.getLongestColLength() <= this.grid_size
        ) {

          this.piecePosition.x = snapX * this.sqSize
          this.piecePosition.y = snapY * this.sqSize

          onPieceDropFunc(this, snapX, snapY)
        }else{
          // the piece is off limits ! it goes back under the board
          this.zoomCoef = this.getZoomCoef(this.sqSize)
          this.piecePosition = this.getFirstPosition()
        }



      }



    })
  }

  getLongestLineLength(){
    return this.piece.reduce( (a, b) => a.length > b.length ? a : b ).length
  }
  getLongestColLength(){
    return this.piece.length
  }

  getZoomCoef(origSqSize){
    let longestLineLength = this.getLongestLineLength() * origSqSize;
    let coef = Math.min(1, this.pieceMaxWidth / longestLineLength )
    return coef
  }

  getFirstPosition(){
    let pieceLength = this.getLongestLineLength() * this.sqSize
    let pieceHeight = this.getLongestColLength() * this.sqSize
    let offset = (this.pieceMaxWidth - (pieceLength * this.zoomCoef)) / 2
    return {
      x: this.index * this.pieceMaxWidth + offset,
      y: this.game_size + 10, // 10px below game
      l: pieceLength,
      h: pieceHeight
    }

  }

  draw(ctx, colors){

    let pieceLength = this.piecePosition.l * this.zoomCoef
    let pieceHeight = this.piecePosition.h * this.zoomCoef

    let { y } =  this.piecePosition
    this.piece.forEach(line => {

      let {x} = this.piecePosition

      line.split('').map(sq => {
        Square.draw(ctx, this.sqSize * this.zoomCoef, this.gap, colors[sq], {x, y} )
        x += this.sqSize * this.zoomCoef
      })
      y += this.sqSize * this.zoomCoef

      })



  }
}
