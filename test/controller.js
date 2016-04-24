var expect     = require('chai').expect,
    controller = require('../js/controller');

describe('Controller Functionality', function() {

    describe('Get current date', function() {
        it('Return string with current date only without time', function() {
            expect(controller.getToday()).to.equal(new Date().toDateString());
        });
    });

    describe('Valid parameters of new ticket request', function() {
        it('Return true for valid name and date', function() {
            var validSet = controller.isParamsValid('Bob', '24/09/2099');

            expect(validSet).to.be.true;
        });
        it('Return false for empty username', function() {
            var noUser = controller.isParamsValid('', '24/09/2099');

            expect(noUser).to.be.false;
        });
        it('Return false for empty date', function() {
            var noDate = controller.isParamsValid('Bob', '');

            expect(noDate).to.be.false;
        });
        it('Return false for wrongly formatted date', function() {
            var badDate = controller.isParamsValid('Bob', 'bad-date');

            expect(badDate).to.be.false;
        });
    });

    describe('Date must be not in the past', function() {
        it('Return true if date is not in the past', function() {
            var futureDate = controller.isNotPast('20/06/2099');

            expect(futureDate).to.be.true;
        });
        it('Return false if date is in the past', function() {
            var pastDate = controller.isNotPast('09/05/1945');

            expect(pastDate).to.be.false;
        });
    });

    describe('Check for ticket\'s adding functionality', function() {
        it('User can book a new ticket', function() {
            var request = {
                body: {
                    ticketName: 'Jimmy Hendrix',
                    ticketDate: '19/11/2088'
                },
                session: {}
            };
            var ticket = controller.createTicket(request);
            var successResponce = {status: 'success'};

            expect(ticket).to.deep.equal(successResponce);
            expect(request.session.tickets[0].name).to.equal(request.body.ticketName);
            expect(request.session.tickets[0].date).to.equal(request.body.ticketDate);
        });
        it('Ticket saves properly', function() {
            var tickets = [],
                name = 'Barack Obama',
                date = '04/08/2061';
            controller.storeTicket(tickets, name, date);

            expect(tickets[0].name).to.be.equal(name);
            expect(tickets[0].date).to.be.equal(date);
        });
    });
});
