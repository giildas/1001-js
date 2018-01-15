
class Piece {

  constructor(){
    var piecesLisible = [
    "x",
    "xx",
    "xxx",
    "xxxx",
    "xxxxx",
    "xxox",
    "xxoxx",
    "xxxoxxxoxxx",
    "xxxoxox",
    ]

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
    
    this.pieces = piecesLisible.map(p=>p.split('o'))
    this.i = Math.floor( Math.random() * this.pieces.length )
    this.colors = colors
  }
  
  draw(posX, posY){
    let taille = 20
    let p = this.pieces[this.i]
    let c = this.colors[this.i]
    ctx.fillStyle = c
    let x = 0
    let y = 0
    p.forEach(line => {
      line.split('').map(sq => {
        ctx.fillRect(posX + x, posY + y, taille, taille)
        x+= taille + 1
      })
      x = 0
      y+= taille + 1

    })

  }
}
