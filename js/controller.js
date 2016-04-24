var uuid = require('node-uuid');

var controller = {

    getToday: function () {
        return new Date().toDateString();
    },

    isParamsValid: function (name, date) {
        var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

        return !!name.length && date_regex.test(date) && this.isNotPast(date);
    },

    isNotPast: function(date) {
        var paramDate = new Date(date.split('/').reverse());
        var today = new Date().setHours(0,0,0,0,0);

        return paramDate >= today;
    },

    createTicket: function (req) {
        var ticketName = req.body.ticketName || '',
            ticketDate = req.body.ticketDate || '',
            result = {};

        if (!this.isParamsValid(ticketName, ticketDate)) {
            result.status = 'Data is not valid!';
            return result;
        }

        req.session.tickets = req.session.tickets || [];
        this.storeTicket(req.session.tickets, ticketName, ticketDate);
        result.status = 'success';

        return result;
    },

    storeTicket: function (tickets, name, date) {
        tickets.push({
            id: uuid.v4(),
            name: name,
            date: date
        });
    }
}

module.exports = controller;
