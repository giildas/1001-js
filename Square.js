class Square {

  static draw(ctx, size, color, position){

    var rectX = position.x
    var rectY = position.y
    var rectWidth = size
    var rectHeight = size
    var cornerRadius = size/4

    ctx.fillStyle = color
    ctx.strokeStyle = color

    ctx.lineJoin = "round"
    ctx.lineWidth = cornerRadius

    ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius)
    ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius)
  }
}