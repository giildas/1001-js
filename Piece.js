
class Piece {

  constructor(ctx, index, size, sqSize, gap, nb_pieces){
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
    
    
    this.size = size
    this.sqSize = sqSize
    this.gap = gap
    this.pieceMaxWidth = size / nb_pieces // TODO nb pieces configurable ??



    let piece = pieces[random_index]
    let color = colors[random_index]
    
    let longestLineLength = this.getLongestLineLength(piece)
    this.pieceWidth = longestLineLength * this.sqSize


    this.draw(piece, color, index)
  }

  getLongestLineLength(piece){
    return piece.reduce( (a, b) => a.length > b.length ? a : b ).length
  }

  getZoomCoef(piece){    
    let coef = Math.min(1, this.pieceMaxWidth / this.pieceWidth )
    return coef
  }

  getXPosition(index, coef){
    let offset = (this.pieceMaxWidth - (coef * this.pieceWidth)) / 2
    return index * this.pieceMaxWidth + offset
  }
  
  draw(piece, color, index){

    let zoomCoef = this.getZoomCoef(piece)
    let taille = this.sqSize * zoomCoef
    let gap = this.gap

    let y = this.size + 10 // 10px below game

    piece.forEach(line => {

      let x = this.getXPosition(index, zoomCoef)
        
      line.split('').map(sq => {
        Square.draw(ctx, taille, gap, color, {x, y} )
        x += taille 
      })
      y += taille

    })



  }
}
