var express    = require('express'),
    router     = express.Router(),
    controller = require('./controller');

router.get('/index', function (req, res) {
    res.render('index', { title: 'Index - 30 STF Test' });
});

router.get('/tickets', function (req, res) {
    res.render('tickets', {
        title: 'Booked Tickets - 30 STF Test',
        tickets: req.session.tickets
    });
});

router.post('/tickets', function (req, res) {
    res.send(controller.createTicket(req));
});

router.get('/tickets/add', function (req, res) {
    res.render('addTicket', {
        title: 'Book New Ticket - 30 STF Test',
        helpers: {
            today: controller.getToday
        }
    });
});

module.exports = router;
