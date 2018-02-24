class Grid {
  constructor(size, colors) {
    this.grid = []

    for (var line = 0; line < size; line++){
      let line = ""
      for (var column = 0; column < size; column++){
        line += "x"
      }
      this.grid.push(line.split(''))
    }
  }


  changeSquare(colIndex, lineIndex, colorIndex ){
    this.grid[lineIndex][colIndex] = colorIndex
  }


  draw(ctx, sqSize, gap, colors){
    this.grid.forEach( (row, rowIndex) => {

      row.forEach( (colorIndex, colIndex) => {

        let position = {
          x: colIndex * sqSize,
          y:  rowIndex * sqSize
        }

        let color = colorIndex == "x" ? "#CCC" : colors[colorIndex]

        Square.draw(ctx, sqSize, gap, color, position)
      })
    })
  }
}