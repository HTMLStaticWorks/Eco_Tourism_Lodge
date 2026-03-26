/**
 * Sylvan Retreat Booking Logic
 * Handles multi-step navigation, state management, and real-time calculations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State ---
    let currentStep = 1;
    const totalSteps = 5;
    
    let bookingData = {
        checkIn: '2026-04-10',
        checkOut: '2026-04-12',
        room: { name: 'Celestial Canopy Suite', price: 850 },
        adults: 2,
        children: 0,
        enhancements: []
    };

    // --- Selectors ---
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sections = document.querySelectorAll('.booking-section');
    const steps = document.querySelectorAll('.step');
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');

    // --- Core Functions ---

    function calculateNights() {
        const start = new Date(bookingData.checkIn);
        const end = new Date(bookingData.checkOut);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }

    function calculateTotal() {
        const nights = calculateNights();
        const totalGuests = parseInt(bookingData.adults) + parseInt(bookingData.children);
        
        let total = bookingData.room.price * nights;
        
        bookingData.enhancements.forEach(e => {
            total += e.price * totalGuests;
        });
        
        return total;
    }

    function updateSummary() {
        if (!summaryItems) return;

        const nights = calculateNights();
        const totalGuests = parseInt(bookingData.adults) + parseInt(bookingData.children);
        
        let html = `
            <div class="flex justify-between" style="margin-bottom: 15px;">
                <span>${bookingData.room.name} (${nights} Night${nights > 1 ? 's' : ''})</span>
                <span class="text-accent">$${(bookingData.room.price * nights).toLocaleString()}</span>
            </div>
            <div class="flex justify-between" style="margin-bottom: 15px; font-size: 14px; opacity: 0.7;">
                <span>Guests: ${bookingData.adults} Adults, ${bookingData.children} Children</span>
                <span></span>
            </div>
        `;

        bookingData.enhancements.forEach(e => {
            html += `
                <div class="flex justify-between" style="margin-bottom: 15px;">
                    <span>${e.name} (${totalGuests} Guest${totalGuests > 1 ? 's' : ''})</span>
                    <span class="text-accent">+$${(e.price * totalGuests).toLocaleString()}</span>
                </div>
            `;
        });

        summaryItems.innerHTML = html;
        summaryTotal.textContent = `$${calculateTotal().toLocaleString()}`;
    }

    function updateStepUI(step) {
        // Toggle Sections
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${step}`).classList.add('active');

        // Update Stepper
        steps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            if (sNum === step) {
                s.classList.add('active');
            } else if (sNum < step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        // Update Buttons
        prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
        
        if (step === totalSteps) {
            nextBtn.textContent = 'Confirm Booking';
            updateSummary();
        } else {
            nextBtn.textContent = 'Continue';
        }
    }

    function handleNext() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepUI(currentStep);
        } else {
            // Final Confirmation
            alert('Your journey to Sylvan Retreat is confirmed! Check your email for logic details.');
            window.location.href = 'user-dashboard.html';
        }
    }

    function handlePrev() {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI(currentStep);
        }
    }

    // --- Interactive Elements ---

    // Calendar
    const days = document.querySelectorAll('.calendar-day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            const date = day.dataset.date;
            // Simple toggle for mock: first click is start, second click is end
            if (!day.classList.contains('selected')) {
                // If we already have a selection, clear it
                if (document.querySelectorAll('.calendar-day.selected').length >= 2) {
                    days.forEach(d => d.classList.remove('selected'));
                }
                day.classList.add('selected');
                
                // Update dates
                const selected = document.querySelectorAll('.calendar-day.selected');
                if (selected.length === 1) {
                    bookingData.checkIn = selected[0].dataset.date;
                } else if (selected.length === 2) {
                    bookingData.checkIn = selected[0].dataset.date;
                    bookingData.checkOut = selected[1].dataset.date;
                }
            } else {
                day.classList.remove('selected');
            }
        });
    });

    // Room Selection
    const roomOptions = document.querySelectorAll('.room-option');
    roomOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            roomOptions.forEach(r => r.classList.remove('selected'));
            opt.classList.add('selected');
            bookingData.room = {
                name: opt.dataset.room,
                price: parseInt(opt.dataset.price)
            };
        });
    });

    // Guest Inputs
    const adultInput = document.getElementById('guests-adults');
    const childInput = document.getElementById('guests-children');
    
    if (adultInput) {
        adultInput.addEventListener('change', (e) => {
            bookingData.adults = e.target.value;
        });
    }
    if (childInput) {
        childInput.addEventListener('change', (e) => {
            bookingData.children = e.target.value;
        });
    }

    // Enhancements
    const enhancementBtns = document.querySelectorAll('.enhancement-btn');
    enhancementBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            
            const index = bookingData.enhancements.findIndex(e => e.name === name);
            if (index > -1) {
                bookingData.enhancements.splice(index, 1);
                btn.textContent = 'Add';
                btn.classList.add('btn-outline');
                btn.classList.remove('btn-primary');
            } else {
                bookingData.enhancements.push({ name, price });
                btn.textContent = 'Added';
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
            }
        });
    });

    // Navigation Listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNext();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handlePrev();
    });

    // Initialize UI
    updateStepUI(1);
    
    // Set default visual selection for dates
    document.getElementById('default-start')?.classList.add('selected');
    document.getElementById('default-end')?.classList.add('selected');
});
