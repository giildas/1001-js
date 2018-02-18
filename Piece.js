
class Piece {

  constructor(canvas, index, game_size, sqSize, gap, nb_pieces){


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

    let zoomCoef = this.getZoomCoef(sqSize)

    this.sqSize = sqSize * zoomCoef

    this.piecePosition = this.getPosition()

    this.draw()
    this.addTouchEvents()
  }

  addTouchEvents(){
    this.canvas.addEventListener('click', (e)=>{
      let mouseX = e.offsetX
      let mouseY = e.offsetY

      if (
        mouseX > this.piecePosition.x &&
        mouseX < this.piecePosition.x + this.piecePosition.l &&
        mouseY > this.piecePosition.y &&
        mouseY < this.piecePosition.y + this.piecePosition.h
        ) {

        console.log("clicked on ", this.index)
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

  getPosition(){
    let pieceLength = this.getLongestLineLength() * this.sqSize
    let pieceHeight = this.getLongestColLength() * this.sqSize
    let offset = (this.pieceMaxWidth - (pieceLength)) / 2
    return {
      x: this.index * this.pieceMaxWidth + offset,
      y: this.game_size + 10, // 10px below game
      l: pieceLength,
      h: pieceHeight
    }

  }
  
  draw(){

    let position =  this.getPosition()

    //TEST
    if (G_DEBUG){
      ctx.strokeStyle = "red"
      ctx.lineWidth = 1
      ctx.strokeRect(position.x, position.y, position.l, position.h )
    }


    
    let { y } =  position
    this.piece.forEach(line => {
      
      let {x} = position 
        
      line.split('').map(sq => {
        Square.draw(ctx, this.sqSize, this.gap, this.color, {x, y} )
        x += this.sqSize 
      })
      y += this.sqSize

      })



  }
}
