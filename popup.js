document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        // Get the API key from the input field
        var apiKey = document.getElementById('apiKey').value;

        // Get the URL of the current tab
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var currentTab = tabs[0];
            var currentUrl = currentTab.url;

            // Get text content from specified HTML elements
            var textContent = '';
            ['h1', 'h2', 'h3', 'p'].forEach(function (tag) {
                var elements = document.getElementsByTagName(tag);
                for (var i = 0; i < elements.length; i++) {
                    textContent += elements[i].textContent + ' ';
                }
            });

            // Append the URL to the question
            var question = "How legit does this site seem? " + textContent + " URL: " + currentUrl;

            // Send the question to OpenAI API
            getOpenAIResponse(question, apiKey);
        });
    });
});

function getOpenAIResponse(question, apiKey) {
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
            alert('OpenAI Response:\n' + data.choices[0].text);
        })
        .catch(error => console.error('Error:', error));
}
