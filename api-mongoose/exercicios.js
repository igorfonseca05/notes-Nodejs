
class Produtos {
    constructor(name, price, height, width) {
        this.name = name
        this.price = price
        this.height = height
        this.width = width
    }

    getProduct() {
        console.log({ name: this.name, price: this.price, height: this.height })
    }

}

const abajur = new Produtos('abajur lilas', 120.65, 56, 25)


// Produtos para casa

class HouseProducts extends Produtos {
    constructor(name, price, height, width, type) {
        super(name, price, height, width)
        this.type = type
    }
}


const house = new HouseProducts('mesa', 10, 36, 78, 'house')

console.log(house)




// Produtos para banho

// Produtos para escritório