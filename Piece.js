
class Piece {

  constructor(canvas, index, game_size, sqSize, gap, nb_pieces, onPieceDropFunc){


    let pieces = [
    "x",
    "xx",
    "xxx",
    "xxxx",
    "xxxxx",
    "xxox",
    "xxoxx",
    "xxxoxxxoxxx",
    "xxxoxox",
    ].map(p=>p.split('o'))

    let colors = [
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
    
    let random_index = Math.floor( Math.random() * pieces.length )
    
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    
    this.game_size = game_size


    this.gap = gap

    this.piece = pieces[random_index]
    this.color = colors[random_index]
    
    this.index = index
    this.pieceMaxWidth = game_size / nb_pieces

    this.zoomCoef = this.getZoomCoef(sqSize)

    this.sqSize = sqSize

    this.piecePosition = this.getFirstPosition()

    this.isMoving = false 
    this.addTouchEvents(onPieceDropFunc)

    return this
    // this.draw()
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
        this.piecePosition.x = snapX * sqSize
        this.piecePosition.y = snapY * sqSize
        onPieceDropFunc(this)

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
  
  draw(){

    let pieceLength = this.piecePosition.l * this.zoomCoef
    let pieceHeight = this.piecePosition.h * this.zoomCoef


    //TEST
    if (G_DEBUG){
      ctx.strokeStyle = "red"
      ctx.lineWidth = 1
      ctx.strokeRect(this.piecePosition.x, this.piecePosition.y, pieceLength , pieceHeight )
    }


    
    let { y } =  this.piecePosition
    this.piece.forEach(line => {
      
      let {x} = this.piecePosition 
        
      line.split('').map(sq => {
        Square.draw(ctx, this.sqSize * this.zoomCoef, this.gap, this.color, {x, y} )
        x += this.sqSize * this.zoomCoef
      })
      y += this.sqSize * this.zoomCoef

      })



  }
}
