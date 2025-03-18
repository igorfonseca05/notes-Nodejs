
function sum(num1, num2) {
    return num1 + num2
}


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                console.log('Numbers must be non-negative')
            }

            resolve(a + b)
        }, 2000)

    })
}

module.exports = {
    sum,
    add
}