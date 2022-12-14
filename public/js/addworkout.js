//EXAMPLE FROM JOG LOGGER


// Wait for DOM to load
$(document).ready(function () {
    // Event Listener -> Add workout button
    $('#add-a-workout').on('click', function () {
        // Capture user input
        let category = $('#category').val();
        let distance = $('#distance').val();
        let duration = $('#duration').val();
        let workout_date = $('#workout_date').val();
        let details = $('#details').val();

        // Validate user input
        if (distance === '') {
            showAlert(
                'is-danger',
                'Whoops! Looks like your distance is missing. Please provide a valid distance and try again.'
            );
            return;
        } else if (duration === '') {
            showAlert(
                'is-danger',
                'Whoops! Looks like your duration is missing. Please provide a valid duration and try again.'
            );
            return;
        } else if (workout_date === '') {
            showAlert(
                'is-danger',
                'Whoops! Looks like the date is missing. Please provide a valid date and try again.'
            );
            return;
        }

        // Format user input
        let data = {
            category: category,
            duration: duration,
            distance: distance,
            workout_date: workout_date,
            details: details,
        };

        // Send new workout object back to API
        $.ajax({
            url: '/api/workouts',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            data: JSON.stringify(data),
            success: function (res) {
                // If successful, clear input fields and show success alert

                $("#myModal").modal('show');
                $("body.modal-open").removeAttr("style");
                resetFields();

            },
            error: function () {
                console.error('Error');
            },
        });
    });


    // Helper -> Show alerts
    function showAlert(color, message) {
        // Set alert time
        const staysVisible = 4000;

        // If there's already a visible notification, remove it
        if ($('.notification')) {
            $('.notification').remove();
        }

        // Create new alert
        const alertDiv = $('<div>');
        alertDiv.addClass(`notification is-light has-text-justified m-2 ${color}`);
        alertDiv.text(message);

        // Insert alert into DOM
        $('#form-top').before(alertDiv);

        setTimeout(function () {
            $('.notification').remove();
        }, staysVisible);
    }

    // Helper -> Reset input fields
    function resetFields() {
        $('#category').val('Cardio - Running');
        $('#distance').val('');
        $('#duration').val('');
        $('#date').val('');
        $('#details').val('');
    }
});
