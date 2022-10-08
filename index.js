$(document).ready(function() {
    $('#form').submit(function(e) {
        e.preventDefault();
        $('#alertMsg').addClass('d-none');
        $('#alertMsg').html('');
        $('#successMsg').addClass('d-none');
        $('#successMsg').html('');
        var match = /[a-zA-Z0-9_]{3,}@[a-zA-Z]{3,}/;
        var upi = $('#upi').val();
        if (upi == '' || !upi || !match.test(upi)) {
            $('#alertMsg').removeClass('d-none');
            $('#alertMsg').html('Please enter UPI ID');
            return
        }
        $('#submit').attr('disabled', 'disabled');
        $('#submit').html('Checking...');
        $.ajax({
            url: "https://paydigi.airtel.in/web/pg-service/v1/validate/vpa/" + upi,
            type: 'GET',
            dataType: 'json', // added data type
            success: function(res) {
                if(res.result) {
                    if(res.data.status === 'TXN_SUCCESS') {
                        $('#submit').removeAttr('disabled');
                        $('#successMsg').removeClass('d-none');
                        $('#successMsg').html('<b>'+ upi +'</b> is a valid UPI. <br> Payee name : <b>' + res.data.payeeAccountName + '</b>');                        
                        $('#submit').html('Check');
                        $('#upi').val('');
                        $('#upi').focus();
                    } else {
                        $('#alertMsg').removeClass('d-none');
                        $('#alertMsg').html('UPI Id is invalid');
                        $('#submit').removeAttr('disabled');
                        $('#submit').html('Check');
                        $('#upi').focus();
                    }
                } else {
                    $('#alertMsg').removeClass('d-none');
                    $('#alertMsg').html('UPI Id is invalid');
                    $('#submit').removeAttr('disabled');
                    $('#submit').html('Check');
                    $('#upi').focus();
                }
            }
        });
    })
})