const Razorpay = require('razorpay')

var instance = new Razorpay({
    key_id: 'rzp_test_ci1GxgtQgJTbfh',
    key_secret: '8DKibopKlFJVSxFD0ioE8DzE'
})

var generateId = () => {

}

module.exports = (req, res) => {
    if (!req.body.amount) {
        res.json({
            success: false,
            msg: "Please send amount."
        })
    } else {
        let amount = req.body.amount;
        let service_charge = 0,
            includingGst = 0;
        if (amount > 200000) {
            service_charge = ((amount / 100) * 2) + 3;
            includingGst = service_charge * 1.18
        }
        let totalAmount = amount + includingGst;
        instance.orders.create({ amount: totalAmount, currency: 'INR', receipt: 'f001', payment_capture: true, notes: { note1: "Test example" } }).then(d => {
            res.json({

            })
        }).catch(err => {
            console.log(err)
        })
    }

}