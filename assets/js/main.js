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

    // Handle journal entry save
    document.getElementById("save-entry").addEventListener("click", () => {
        const journalEntry = document.getElementById("journal-entry").value;
        if (journalEntry.trim() !== "") {
            localStorage.setItem("journal", journalEntry);
            alert("Journal entry saved!");
        }
    });
});


// ZenQuotes API
window.onload = () => {
    const quoteElement = document.getElementById("quote"); 
    if (!quoteElement) {
        console.error("Element with ID 'quote' not found!");
        return;
    }

    fetch("https://zenquotes.io/api/random")
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Quote:", data); 
            quoteElement.innerText = `"${data[0].q}" — ${data[0].a}`;
        })
        .catch((error) => {
            console.error("Error fetching quote:", error); 
            quoteElement.innerText = "✨ Stay inspired! ✨";
        });
};


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
