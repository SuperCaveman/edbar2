document.addEventListener('DOMContentLoaded', function () {
    const seats = document.querySelectorAll('.seat');
    const reserveButton = document.getElementById('reserve-seat');
    const phoneNumberSection = document.getElementById('phone-number-section');
    const submitReservationButton = document.getElementById('submit-reservation');
    const phoneNumberInput = document.getElementById('phone-number');
    let selectedSeats = [];

    seats.forEach(seat => {
        seat.addEventListener('click', function () {
            const seatNumber = this.dataset.seat;

            if (selectedSeats.includes(seatNumber)) {
                // Deselect if already selected
                this.classList.remove('selected');
                selectedSeats = selectedSeats.filter(num => num !== seatNumber);
            } else if (selectedSeats.length < 2) {
                // Select if less than 2 seats are selected
                this.classList.add('selected');
                selectedSeats.push(seatNumber);
            } else {
                // Show alert if trying to select more than 2 seats
                alert('You can only select up to 2 seats.');
            }
        });
    });

    reserveButton.addEventListener('click', function () {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat.');
        } else {
            phoneNumberSection.style.display = 'block'; // Show phone number input
        }
    });

    submitReservationButton.addEventListener('click', function () {
        const phoneNumber = phoneNumberInput.value.trim();

        if (!phoneNumber) {
            alert('Please enter your phone number.');
            return;
        }

        // Verify phone number
        fetch('/verify-phone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.exists) {
                const mainGuest = prompt('Enter the name of the main guest:');
                if (mainGuest) {
                    alert(`Reservation confirmed for seats: ${selectedSeats.join(', ')} under the name ${mainGuest}.`);
                    // Clear selection and phone number input
                    seats.forEach(seat => seat.classList.remove('selected'));
                    selectedSeats = [];
                    phoneNumberInput.value = '';
                    phoneNumberSection.style.display = 'none';
                }
            } else {
                alert('There was an error verifying the phone number. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error verifying the phone number. Please try again.');
        });
    });
});
