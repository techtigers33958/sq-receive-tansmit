function releaseBall () {
    radio.setGroup(50)
    pins.servoWritePin(AnalogPin.P0, 45)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P0, 180)
}
radio.onReceivedString(function (receivedString) {
    let recievedNumber = 0
    if (expectedAnswer == recievedNumber) {
        basic.showIcon(IconNames.Yes)
        releaseBall()
    } else {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})
function calculateAnswer (operation: string, operand: number) {
    if (operation == "DBL") {
        expectedAnswer = operand * 2
    } else if (operation == "INC") {
        expectedAnswer = operand + 1
    } else if (operation == "HLF") {
        expectedAnswer = operand / 2
    } else if (operation == "DEC") {
        expectedAnswer = operand - 1
    } else {
    	
    }
}
function selectOperation () {
    opIndex = Math.randomRange(0, operationsList.length - 1)
    operation = operationsList[opIndex]
}
let opIndex = 0
let expectedAnswer = 0
let operation = ""
let operationsList: string[] = []
operationsList = ["DBL", "INC", "HLF", "DEC"]
selectOperation()
basic.showString("" + (operation))
let operand = Math.randomRange(0, 100)
radio.sendValue(operation, operand)
