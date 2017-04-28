const fs = require('fs')
const cont = fs.readFileSync('./input.txt')

console.log(cont.toString())

const instructions = cont.toString().split(',')
      .map(i => i.trim())
      .map(([r,...l]) => [r == 'R' ? 1 : -1, parseFloat(l.join(''))])


const directions = i => [
    ([x,y], l) => [x, y+l],
    ([x,y], l) => [x+l, y],
    ([x,y], l) => [x, y-l],
    ([x,y], l) => [x-l, y]
][i]

const s = "nesw"

function calculate([h, ...tail], direction,  position){
    const newDirection = (direction + h[0] + 4 ) % 4
    const newPos = directions(newDirection)(position, h[1])

    console.log("_______________________")
    console.log(direction, position)
    console.log([h, ...tail], newPos, newDirection)
    console.log(s[direction], "=>", s[newDirection])

    if (tail.length == 0) return newPos
    return calculate(tail, newDirection, newPos)
}

const [finalX, finalY] = calculate(instructions, 0, [0,0])

console.log(Math.abs(finalY) + Math.abs(finalX))
