class Grid {
  constructor(size) {
    this.grid = new Array(size).fill("0000000000", 0, size) 
  }


  draw(sqSize, gap, colors){
    this.grid.forEach( (line, rowIndex) => {
      line.split('').forEach( (square, colIndex) => {

        let position = {
          x: colIndex * sqSize,
          y:  rowIndex * sqSize
        }

        let color = colors[square]

        Square.draw(ctx, sqSize, GAP, color, position)
      })
    })
  }
}