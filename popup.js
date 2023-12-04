document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        var textContent = '';
        ['h1', 'h2', 'h3', 'p'].forEach(function(tag) {
            var elements = document.getElementsByTagName(tag);
            for (var i = 0; i < elements.length; i++) {
                textContent += elements[i].textContent + ' ';
            }
        });
        getOpenAIResponse("How legit does this site seem? " + textContent);
    });
});

function getOpenAIResponse(question) {
    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = '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';

    // Replace 'YOUR_MODEL_NAME' with the name of the OpenAI language model you want to use
    const modelName = 'text-davinci-003';

    // Define the OpenAI API endpoint
    const apiUrl = 'https://api.openai.com/v1/engines/' + modelName + '/completions';

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
            alert('OpenAI Response:\n' + data.choices[0].text);
        })
        .catch(error => console.error('Error:', error));
}
