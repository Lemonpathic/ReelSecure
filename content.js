// content.js

// Function to send a request to the OpenAI API
function sendToOpenAI(question, apiKey, callback) {
    // Define the OpenAI API endpoint
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    // Make a POST request to the OpenAI API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
            prompt: question,
            max_tokens: 50,  // Adjust as needed
        }),
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error:', error));
}

// Run the script when the page is loaded
function runScript() {
    // Function to check for the presence of the word "password"
    function checkForPassword() {
        if (document.body.innerText.toLowerCase().includes('password')) {
            // Get the URL of the current tab
            var currentUrl = window.location.href;

            // Get text content from specified HTML elements
            var textContent = '';
            ['h1', 'h2', 'h3', 'p'].forEach(function (tag) {
                var elements = document.getElementsByTagName(tag);
                for (var i = 0; i < elements.length; i++) {
                    textContent += elements[i].textContent + ' ';
                }
            });

            // Prompt the user for the API key
            var apiKey = '';

            // Check if the user canceled the prompt or entered an empty API key
            if (!apiKey || apiKey.trim() === '') {
                alert('Invalid API key. Please try again.');
                return;
            }

            // Append the URL to the question
            var question = "Only give me a percentage of how legit this site seems. Don't give me any reasons to why it is that percent " + textContent + " URL: " + currentUrl;

            // Send the question to OpenAI API
            sendToOpenAI(question, apiKey, function(data) {
                // Extract the percentage from the OpenAI response excluding the forward slash
                const percentageString = data.choices[0].text.match(/\d+(?<!\/)/)[0];

                // Convert the percentage string to an integer
                const percentage = parseInt(percentageString, 10);
                if (percentage > 85) {
                    // If the percentage is above 85%, do nothing
                } else {
                    // If the percentage is below 85%, display a message and use Chat GPT to generate a reason
                    alert('We are ' + percentage + '% sure that this site is legit.');

                    // Generate a reason using Chat GPT
                    sendToOpenAI("Why do you think this site might be suspicious?", apiKey, function(reasonData) {
                        const reason = reasonData.choices[0].text;
                        alert('Reason: ' + reason);

                        // Check if the site seems phishy, and disable input fields
                        if (percentage < 50) {
                            disableInputFields();
                        }
                    });
                }
            });
        }
    }

    // Function to disable input fields
    function disableInputFields() {
        var inputFields = document.querySelectorAll('input, textarea, select');
        inputFields.forEach(function (input) {
            input.disabled = true;
        });
        alert('Input fields have been disabled as the site seems phishy.');
    }

    // Check for the word "password" when the page is loaded
    checkForPassword();

    // Set up a MutationObserver to detect changes in the DOM
    var observer = new MutationObserver(checkForPassword);

    // Configure and start the MutationObserver
    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the script when the page is loaded
runScript();
