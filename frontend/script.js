const input = document.getElementById("inputArea");
const summarizeButton = document.getElementById("summarizeButton");
const output = document.getElementById("outputArea");

const apiUrl = window.location.protocol === 'file:' 
    ? 'http://localhost:3000/summarize' 
    : '/summarize';

summarizeButton.addEventListener("click", async () => {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    });
    const data = await response.json();
    output.value = data.summary;
});


