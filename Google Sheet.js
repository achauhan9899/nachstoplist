function fetchDetails() {
  const fileNumber = document.getElementById('fileNumber').value;
  var loader = document.getElementById('fetchLoader');
  var message = document.getElementById('message');

  loader.style.display = "block"; 
  message.style.display = "none";
  fetch('https://script.googleusercontent.com/macros/echo?user_content_key=LUGQot8ULDo4EE1vDKi1XHR33qUKSE3XLk_iV86FPsflO4HLM-9g9r4kEPfe9Ki2RpGiK9oQhFsaHmzdjCO04pMr8KHd8xM0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHOvyci_60ZFpyqXZkBnYtyViFIQ-_qnfD_FevmNVk3Cn7BaSuAL7_vhC9BzA16llzg931m6WZjZAHsDfvltXnY9HAelqyy4LQ&lib=Miy6B6UcqCOifjJiMiuGnFyeTdAXsPvv2')
      .then(response => response.json())
      .then(data => {
          const foundData = data.find(item => item["FILE NUMBER"] == fileNumber);
          if (foundData) {
            console.log('Data found:', foundData); // Log found data
              document.getElementById('customerName').value = foundData["CUSTOMER NAME"];
              document.getElementById('vehicleNumber').value = foundData["VEHICLE NUMBER"];
              document.getElementById('vehicleModel').value = foundData["VEHICLE MODEL"];
              message.style.display = "none";
              
          } else {
              document.getElementById('customerName').value = "";
              document.getElementById('vehicleNumber').value = "";
              document.getElementById('vehicleModel').value = "";
              message.style.display = "block";
              setTimeout(function() {
                window.location.reload();
            }, 2000);
          }
          loader.style.display = "none";
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        loader.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['contact-form'];
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const loader = document.getElementById('fetchLoader'); // Assume you have a loader element
      loader.style.display = 'block';
      const scriptURL = 'https://script.google.com/macros/s/AKfycbxasZzaH44ylhWl-qwG75KTnQZhogSP6c46rKfQsbauHVMTAC-XSXbAP6YnVK1yooDq/exec';
  
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          alert("Thank you! Your form is submitted successfully.");
          loader.style.display = 'none';
          window.location.reload();
        })
        .catch(error => {
          console.error('Error!', error.message);
          alert("Submission failed: " + error.message);
          loader.style.display = 'none';
        });
    });
  });