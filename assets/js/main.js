document.addEventListener("DOMContentLoaded", () => {
    // Fetching and displaying a random quote
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = data.content;
            document.getElementById("author").textContent = `- ${data.author}`;
        });

    // Handle to-do list functionality
    document.getElementById("add-task").addEventListener("click", () => {
        const taskInput = document.getElementById("new-task");
        if (taskInput.value.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = taskInput.value;
            document.getElementById("todo-list").appendChild(li);
            taskInput.value = "";
        }
    });

    // Randomly dispaly Journal prompts 
    const journalPrompts = [
        "What are three things you’re grateful for today?",
        "Describe a moment from today that made you smile.",
        "What’s one challenge you faced today, and how did you overcome it?",
        "Write about a dream or goal you’re working towards.",
        "What’s one lesson you learned recently?"
    ];
    
    function displayJournalPrompt() {
        const promptElement = document.getElementById("journal-prompt");
        if (promptElement) {
            const randomIndex = Math.floor(Math.random() * journalPrompts.length);
            promptElement.innerText = journalPrompts[randomIndex];
        } else {
            console.error("Element with ID 'journal-prompt' not found.");
        }
    }
    
    // Show a random prompt when the page loads
    window.onload = () => {
        displayJournalPrompt();
    };
    

    // Handle journal entry save
    document.getElementById("save-entry").addEventListener("click", () => {
        const journalEntry = document.getElementById("journal-entry").value;
        if (journalEntry.trim() !== "") {
            localStorage.setItem("journal", journalEntry);
            alert("Journal entry saved!");
        }
    });
});


// Quotes API
fetch("https://api.quotable.io/random?tags=inspirational")
    .then(response => response.json())
    .then(data => {
        document.getElementById("quote").innerText = `"${data.content}" — ${data.author}`;
    })
    .catch(error => {
        console.error("Error fetching quote:", error);
        document.getElementById("quote").innerText = "✨ Stay inspired! ✨";
    });



// Weather API
window.onload = () => {
    const apiKey = "24c8bfd31f4ea5576d6ad057e9df20c5"; 

    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("weather").innerText = 
                    `🌤 ${data.main.temp}°C, ${data.weather[0].description}`;
            })
            .catch(() => {
                document.getElementById("weather").innerText = "Weather data unavailable.";
            });
    });
};

// Unsplash API 
const unsplashApiKey = "LTeZZMOBnJjfI58slhzqE7iGHVaY9LamYqRfSWNhm08"; 
const imageUrl = `https://api.unsplash.com/photos/random?query=nature,calm&client_id=${unsplashApiKey}`;

fetch(imageUrl)
    .then(response => response.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
    })
    .catch(() => {
        console.log("Failed to fetch background image.");
    });
