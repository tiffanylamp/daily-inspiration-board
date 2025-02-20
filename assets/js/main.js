document.addEventListener("DOMContentLoaded", () => {
    // Fetching and displaying a random quote from ZenQuotes API
    fetch("https://zenquotes.io/api/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quote").textContent = `"${data[0].q}"`;
            document.getElementById("author").textContent = `- ${data[0].a}`;
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            document.getElementById("quote").textContent = "✨ Stay inspired! ✨";
            // document.getElementById("author").textContent = "";
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

    function saveJournalEntry() {
        const entry = document.getElementById("journal-entry").value;
    
        if (!entry.trim()) {
            alert("Your journal entry is empty. Write something before saving!");
            return;
        }
    
        if (confirm("Would you like to save this journal entry?")) {
            let savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
            
            // Create an entry object
            let newEntry = {
                text: entry,
                date: new Date().toLocaleString()
            };
    
            savedEntries.push(newEntry); // Add new entry
            localStorage.setItem("journalEntries", JSON.stringify(savedEntries)); // Save back to storage
    
            alert("Journal entry saved successfully!");
        }
    }
    
    // Load all saved entries
    function loadJournalEntries() {
        const savedEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];
        
        let entriesHTML = savedEntries.map(entry => `<p><strong>${entry.date}:</strong> ${entry.text}</p>`).join("");
        document.getElementById("journal-entries").innerHTML = entriesHTML;

        console.log("Loaded Entries:", savedEntries);

    }
    
    // Load on page start
    document.addEventListener("DOMContentLoaded", () => {
        loadJournalEntries();
    });
    
    
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


// Storing to-dos in JSON format 
// Load saved todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Function to add a new task
function addTodo(task) {
    const newTodo = { text: task, completed: false };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos(); // Refresh the UI
}

// Function to display tasks on the page
function displayTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear existing list

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        
        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => removeTodo(index);
        
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Function to remove a task
function removeTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos(); // Refresh the UI
}

// Load and display saved todos on page load
document.addEventListener("DOMContentLoaded", () => {
    displayTodos();
    
    document.getElementById("addTodoBtn").addEventListener("click", () => {
        const taskInput = document.getElementById("todoInput");
        if (taskInput.value.trim() !== "") {
            addTodo(taskInput.value.trim());
            taskInput.value = ""; // Clears input after adding
        }
    });
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
