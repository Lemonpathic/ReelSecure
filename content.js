// content.js

// Function to send a request to the OpenAI API
function sendToOpenAI(question, apiKey) {
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
            // Display the OpenAI response (you can customize this part)
            alert('Reel Secure:\n' + data.choices[0].text);
        })
        .catch(error => console.error('Error:', error));
}

// Run the script when the page is loaded
// content.js

// Function to send a request to the OpenAI API

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
            var question = "How legit does this site seem? " + textContent + " URL: " + currentUrl;

            // Send the question to OpenAI API
            sendToOpenAI(question, apiKey);
        }
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
