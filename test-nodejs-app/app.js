const crypto = require('crypto')


function generateUniqueId() {
  const random = crypto.randomBytes(6).toString('hex') + Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
  return random;
}


function getBillId(name, mesa) {
     const hash = crypto.randomBytes(3).toString('hex')

     console.log(hash)

    const date = Date.now()
    // const resul = `${mesa}${date}${generateUniqueId()}`
    const resul = `${generateUniqueId()}`
    return resul
}

getBillId('santa prosa', '13')
// console.log(getBillId('santa prosa', '13'))


// console.log(Date.now().toString(36))
