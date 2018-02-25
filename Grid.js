


class Grid {
  _transpose(a) {
    return Object.keys(a[0]).map(function(c) {
      return a.map(function(r) { return r[c]; });
    });
  }
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


  changeSquare(col_index, line_index, color_index ){
    this.grid[line_index][col_index] = color_index
  }

  testOverlap(piece, x, y){
    let overlap = false
    piece.piece.forEach( (line, line_index) => {
      line.split('').forEach( (col, col_index)=>{
        let squareX = col_index + x
        let squareY = line_index + y

        // if one square only is overlaping, return true
        if(this.grid[squareY][squareX] != "x"){
          overlap = true
        }

      })
    })


    return overlap
  }

  placePiece(piece, x, y){
    piece.piece.forEach( (line, line_i) => {
      line.split('').forEach((color_i, column_i)=>{
        this.changeSquare(column_i + x, line_i + y, color_i)
      })
    })

    this.checkCompletedLinesAndColumns()
  }

  checkCompletedLinesAndColumns(){
    //1 - test
    let completedLinesIndex = this.getCompletedLine(this.grid)
    let transposed_grid = this._transpose(this.grid)
    let completedColsIndex = this.getCompletedLine(transposed_grid)


    //2 - remplacement
    this.grid.forEach((line, line_index)=>{

      line.forEach((square, col_index)=>{
        if (
          completedLinesIndex.indexOf(line_index) > -1 ||
          completedColsIndex.indexOf(col_index) > -1
        ) {
          this.grid[line_index][col_index] = "x"
        }
      })
    })



  }

  getCompletedLine(matrix){
    let completedLines = []
    matrix.forEach( (line, line_index) => {
      if( line.every(sq => sq!="x" ) ) completedLines.push(line_index)
    })
    console.log(completedLines)
    return completedLines
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

