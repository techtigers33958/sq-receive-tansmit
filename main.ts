/**
 * Clears the screen
 */
/**
 * This function releases the ball when called
 */
/**
 * On start:
 * 
 * - Set the operations list to the operations you need
 * 
 * - Select the operation and show it
 * 
 * -Pick a random number and send it
 */
/**
 * This function contains an array which picks a random operation
 */
/**
 * This function will calculate the answer based on the random number and the operation
 */
function reset () {
    basic.pause(2000)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
/**
 * WHen you receive the string:
 * 
 * - If the expected (calculated answer me have) = to the number you send, you succeed
 * 
 * -If not, you lose and we reset
 */
radio.onReceivedString(function (receivedString) {
    let recievedNumber = 0
    if (expectedAnswer == recievedNumber) {
        basic.showIcon(IconNames.Yes)
        releaseBall()
    } else {
        basic.showIcon(IconNames.No)
        reset()
    }
})
function releaseBall () {
    radio.setGroup(50)
    pins.servoWritePin(AnalogPin.P0, 45)
    basic.pause(1000)
    pins.servoWritePin(AnalogPin.P0, 180)
}
function calculateAnswer (operation: string, operand: number) {
    if (operation == "DBL") {
        expectedAnswer = operand * 2
    } else if (operation == "INC") {
        expectedAnswer = operand + 1
    } else if (operation == "HLF") {
        expectedAnswer = operand / 2
    } else if (operation == "DEC") {
        expectedAnswer = operand - 1
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
basic.showString(operation)
let operand = Math.randomRange(0, 100)
radio.sendValue(operation, operand)
