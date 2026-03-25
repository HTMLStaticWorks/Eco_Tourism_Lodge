/**
 * Sylvan Retreat Booking Logic
 * Handles multi-step navigation and state management
 */

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 5;
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sections = document.querySelectorAll('.booking-section');
    const steps = document.querySelectorAll('.step');

    function updateStep(step) {
        // Update Sections
        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${step}`).classList.add('active');

        // Update Stepper UI
        steps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            if (sNum === step) {
                s.classList.add('active');
            } else if (sNum < step) {
                s.classList.add('active'); // Keep previous steps highlighted
            } else {
                s.classList.remove('active');
            }
        });

        // Update Buttons
        prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
        
        if (step === totalSteps) {
            nextBtn.textContent = 'Confirm Booking';
            nextBtn.onclick = () => {
                alert('Booking Confirmed! Redirecting to Dashboard...');
                window.location.href = 'user-dashboard.html';
            };
        } else {
            nextBtn.textContent = 'Continue';
            nextBtn.onclick = nextStep;
        }
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStep(currentStep);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStep(currentStep);
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Here we would normally validate the current section
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevStep();
    });

    // Room Selection Logic
    const roomOptions = document.querySelectorAll('.room-option');
    roomOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            roomOptions.forEach(r => r.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    // Calendar Selection Logic
    const days = document.querySelectorAll('.calendar-day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            day.classList.toggle('selected');
        });
    });
});
