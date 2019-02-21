const Razorpay = require('razorpay')

var instance = new Razorpay({
    key_id: 'rzp_test_ci1GxgtQgJTbfh',
    key_secret: '8DKibopKlFJVSxFD0ioE8DzE'
})

var generateId = (sgid) => {

}

module.exports = (req, res) => {
    if (!req.body.amount) {
        res.json({
            success: false,
            msg: "Please send amount."
        })
    } else {
        let amount = req.body.amount * 100;
        let service_charge = 0,
            includingGst = 0;
        if (amount > 200000) {
            service_charge = ((amount / 100) * 2) + 3;
            includingGst = parseInt(service_charge * 1.18)
        }
        let totalAmount = amount + includingGst;
        console.log(includingGst, totalAmount, amount)
        instance.orders.create({ amount: totalAmount, currency: 'INR', receipt: 'f1125', payment_capture: false, notes: { note1: "Test example" } }).then(d => {
            console.log(d)
            res.json({
                success: true,
                totalAmount: totalAmount / 100,
                tax: includingGst / 100,
                internalOrderId: 'f001',
                razorPayId: d.id

            })
        }).catch(err => {
            console.log(err)
            res.json({
                success: false,
                msg: "Err"
            })
        })
    }

}