console.log('EmailJS available:', typeof emailjs !== 'undefined');

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    };
});

// Initialize EmailJS with error handling
(function() {
    try {
        emailjs.init("M86ewPiU0vj3G_Sle"); // Your EmailJS user ID
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization error:", error);
    }
})();

// Contact form functionality
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Form submitted");

    const submitButton = document.getElementById('send-msg');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        to_name: "Krishna",
        to_email: "krishna0304006@gmail.com",
        reply_to: document.getElementById('email').value
    };

    console.log("Sending email with params:", templateParams); 
    emailjs.send(
        'service_d67w8g5',
        'template_6afapd4', 
        templateParams
    )
    .then(function(response) {
        if(response.status === 200) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('success-message').style.opacity = '1';
            document.getElementById('contact-form').reset();
            
        } else {
            throw new Error('Email sent but status was ' + response.status);
        }
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        setTimeout(function() {
            document.getElementById('success-message').style.display = 'none';
        }, 5000);
    })
    .catch(function(error) {
        console.error('FAILED...', error);
        alert('Failed to send message. Error: ' + (error.text || error.message || 'Unknown error'));
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
});
