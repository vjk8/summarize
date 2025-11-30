const input = document.getElementById("inputArea");
const summarizeButton = document.getElementById("summarizeButton");
const output = document.getElementById("outputArea");

summarizeButton.addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    });
    const data = await response.json();
    output.value = data.summary;
});


