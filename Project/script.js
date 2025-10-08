document.addEventListener('DOMContentLoaded', () => {
    const movieData = [
        { id: 1, title: 'Jawan', image: 'https://via.placeholder.com/250x375.png?text=Jawan', description: 'Action/Thriller' },
        { id: 2, title: 'Oppenheimer', image: 'https://via.placeholder.com/250x375.png?text=Oppenheimer', description: 'Biographical/Thriller' },
        { id: 3, title: 'Gadar 2', image: 'https://via.placeholder.com/250x375.png?text=Gadar+2', description: 'Action/Drama' },
        { id: 4, title: 'Mission Impossible', image: 'https://via.placeholder.com/250x375.png?text=Mission+Impossible', description: 'Action/Adventure' }
    ];

    const movieContainer = document.querySelector('.movie-list');
    const seatingSection = document.querySelector('.seating-section');
    const seatsContainer = document.querySelector('.seats-container');
    const selectedSeatsCount = document.getElementById('selected-seats-count');
    const totalPrice = document.getElementById('total-price');
    const bookButton = document.getElementById('book-button');

    let selectedSeats = [];
    const seatPrice = 150;

    // Function to render movie cards
    function renderMovies() {
        movieData.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            card.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
            `;
            card.addEventListener('click', () => {
                showSeatingSection();
                renderSeats();
            });
            movieContainer.appendChild(card);
        });
    }

    // Function to show the seating section and hide the movie list
    function showSeatingSection() {
        movieContainer.style.display = 'none';
        seatingSection.style.display = 'block';
    }

    // Function to render the seating layout
    function renderSeats() {
        seatsContainer.innerHTML = ''; // Clear previous seats
        selectedSeats = [];
        updateSummary();

        const totalSeats = 100; // 10 rows of 10 seats
        const bookedSeats = [5, 6, 15, 16, 25, 26, 85, 86]; // Example booked seats

        for (let i = 1; i <= totalSeats; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            
            if (bookedSeats.includes(i)) {
                seat.classList.add('booked');
            } else {
                seat.classList.add('available');
                seat.addEventListener('click', () => {
                    toggleSeatSelection(seat, i);
                });
            }
            seatsContainer.appendChild(seat);
        }
    }

    // Function to handle seat selection
    function toggleSeatSelection(seat, seatIndex) {
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(index => index !== seatIndex);
        } else {
            seat.classList.add('selected');
            selectedSeats.push(seatIndex);
        }
        updateSummary();
    }

    // Function to update the booking summary
    function updateSummary() {
        selectedSeatsCount.textContent = selectedSeats.length;
        totalPrice.textContent = selectedSeats.length * seatPrice;
    }

    // Handle book button click
    bookButton.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            alert(`Booking successful for ${selectedSeats.length} seat(s). Total: ₹${selectedSeats.length * seatPrice}`);
            // Here you would typically handle the payment and a redirect
            // For this demo, we'll just reset the view
            seatingSection.style.display = 'none';
            movieContainer.style.display = 'flex';
        } else {
            alert('Please select at least one seat to book.');
        }
    });

    renderMovies();
});