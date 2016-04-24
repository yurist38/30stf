$(function() {
    var $bookForm = $('#bookForm');
        $bookTicketBtn = $('#bookTicketBtn');

    $bookForm.validate({
        rules: {
            ticketName: {
                required: true
            },
            ticketDate: {
                required: true
            }
        },
        onkeyup: function() {
            $bookTicketBtn.attr('disabled', !$bookForm.valid());
        }
    });

    $('#ticketDate').datetimepicker({
        minDate: new Date(),
        format: 'DD/MM/YYYY'
    });

    $bookForm.on('submit', function(e) {
        e.preventDefault();

        $.post('/tickets', $bookForm.serialize()).success(function(res) {
            if (res.status === 'success') {
                document.location.href = '/tickets';
            } else {
                alert(res.status);
            }
        });
    });
});
