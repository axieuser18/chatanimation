class BookingController {
    constructor() {
        this.bookingSystem = document.getElementById('bookingSystem');
        this.selectedDate = null;
        this.selectedTime = null;
    }
    
    openBookingSystem() {
        // Fade out chat
        window.chatController.fadeOutChat();
        
        setTimeout(() => {
            // Show booking system
            this.bookingSystem.classList.add('active');
            
            // Animate booking steps
            setTimeout(() => this.animateBookingStep(1), 500);
        }, 800);
    }
    
    animateBookingStep(stepNumber) {
        const step = document.getElementById(`step${stepNumber}`);
        if (step) {
            step.classList.add('active');
        }
    }
    
    selectDate(element, date) {
        // Remove previous selection
        document.querySelectorAll('.date-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedDate = date;
        
        setTimeout(() => this.animateBookingStep(2), 800);
    }
    
    selectTime(element, time) {
        // Remove previous selection
        document.querySelectorAll('.time-option').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        this.selectedTime = time;
        
        setTimeout(() => this.animateBookingStep(3), 800);
    }
    
    confirmBooking() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        if (name && email && phone && this.selectedDate && this.selectedTime) {
            alert(`Bokning bekräftad!\n\nDatum: ${this.selectedDate}\nTid: ${this.selectedTime}\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone}`);
        } else {
            alert('Vänligen fyll i alla fält och välj datum och tid.');
        }
    }
}