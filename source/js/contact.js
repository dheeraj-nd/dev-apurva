const subscriptionForm = document.getElementById('subscriptionForm');
const subscribeButton = document.getElementById('subscribeButton');
const closebtn = document.getElementById('close');

function sendSubscription(name, email, organization, description) {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    var url = `https://script.google.com/macros/s/AKfycbxDfGjbMiHvo0GxHlmuJZbE1VceYmHgYWtfvixefKa6SfHm-3BKkqAh9mT0BZqRSjgKhQ/exec?Name=${name}&Email=${email}&Organisation=${organization}&Message=${description}`;
    
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        // Handle the result here, such as showing a success message to the user
      })
      .catch(error => console.log('error', error));
  }
  
subscribeButton.addEventListener('click', function () {

    // Validate the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const organization = document.getElementById('Organization').value;
    const description = document.getElementById('des').value;

    if (!name) {
        document.getElementById('name-validation').style.display = 'block';
    } else {
        document.getElementById('name-validation').style.display = 'none';
    }

    if (!email) {
        document.getElementById('email-validation').style.display = 'inline';
    } else {
        document.getElementById('email-validation').style.display = 'none';
    }

    if (!organization) {
        document.getElementById('org-validation').style.display = 'inline';
    } else {
        document.getElementById('org-validation').style.display = 'none';
    }

    if (!description) {
        document.getElementById('des-validation').style.display = 'inline';
    } else {
        document.getElementById('des-validation').style.display = 'none';
    }

    if (!name || !email || !organization || !description) {
        return;
    }

    sendSubscription(name, email, organization, description);
   
    subscriptionForm.reset();
});


closebtn.addEventListener('click', function () {
  
    const validationMessages = document.querySelectorAll('.validation-message');

   
    validationMessages.forEach(function (element) {
        element.style.display = 'none';
    });

})


