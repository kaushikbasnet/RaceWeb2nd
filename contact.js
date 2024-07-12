document.getElementById('contact-form').addEventListener('submit', function(event) {
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('All fields are required!');
        event.preventDefault(); // Prevent form submission
    }
});
