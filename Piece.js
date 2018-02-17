
class Piece {

  constructor(ctx, index, size, sqSize, gap){
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



    let piece = pieces[random_index]
    let color = colors[random_index]
    this.draw(piece, color, index)
  }

  getZoomCoef(piece){
    
    let longestLineLength = piece.reduce( (a, b) => a.length > b.length ? a : b ).length

    let pieceMaxWidth = this.size / 3
    let pieceWidth = longestLineLength * this.sqSize
    let coef = Math.min(1, pieceMaxWidth / pieceWidth )
    return coef
  }
  
  draw(piece, color, index){

  
    console.log(piece)    
    let zoomCoef = this.getZoomCoef(piece)
    let taille = this.sqSize * zoomCoef
    let gap = this.gap

    let y = this.size + 10

    piece.forEach(line => {

      let x = index * this.size/3
        
      line.split('').map(sq => {
        Square.draw(ctx, taille, gap, color, {x, y} )
        x += taille 
      })
      y += taille

    })



  }
}
