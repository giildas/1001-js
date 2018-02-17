class Square {

  static draw(ctx, size, gap, color, position){
    
    var rectX = position.x + gap / 2
    var rectY = position.y + gap / 2
    var rectWidth = size - gap / 2
    var rectHeight = size - gap / 2
    var cornerRadius = size/4

    ctx.fillStyle = color
    ctx.strokeStyle = color

    ctx.lineJoin = "round"
    ctx.lineWidth = cornerRadius

    ctx.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius)
    ctx.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius)
  }
}