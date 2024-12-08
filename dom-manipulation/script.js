document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const importFileInput = document.getElementById('importFile');

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
    }

    function addQuote(text, category) {
        quotes.push({ text, category });
        saveQuotes();
        alert('Quote added successfully!');
    }

    function exportToJsonFile() {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    newQuoteButton.addEventListener('click', showRandomQuote);
    importFileInput.addEventListener('change', importFromJsonFile);

    // Initial load
    if (quotes.length > 0) {
        showRandomQuote();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quoteDisplay = document.getElementById('quoteDisplay');
    const categoryFilter = document.getElementById('categoryFilter');

    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        displayQuotes(filteredQuotes);
        localStorage.setItem('selectedCategory', selectedCategory);
    }

    function displayQuotes(quotesToDisplay) {
        quoteDisplay.innerHTML = '';
        quotesToDisplay.forEach(quote => {
            const quoteElement = document.createElement('div');
            quoteElement.textContent = `${quote.text} - ${quote.category}`;
            quoteDisplay.appendChild(quoteElement);
        });
    }

    function loadSelectedCategory() {
        const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
        categoryFilter.value = selectedCategory;
        filterQuotes();
    }

    populateCategories();
    loadSelectedCategory();
    categoryFilter.addEventListener('change', filterQuotes);

    function addQuote(text, category) {
        quotes.push({ text, category });
        saveQuotes();
        if (!Array.from(categoryFilter.options).some(option => option.value === category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        }
        alert('Quote added successfully!');
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        const quoteDisplay = document.getElementById('quoteDisplay');
        const newQuoteButton = document.getElementById('newQuote');
        const importFileInput = document.getElementById('importFile');
    
        function saveQuotes() {
            localStorage.setItem('quotes', JSON.stringify(quotes));
        }
    
        function showRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];
            quoteDisplay.textContent = `${quote.text} - ${quote.category}`;
        }
    
        function addQuote(text, category) {
            quotes.push({ text, category });
            saveQuotes();
            alert('Quote added successfully!');
        }
    
        function exportToJsonFile() {
            const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'quotes.json';
            a.click();
            URL.revokeObjectURL(url);
        }
    
        function importFromJsonFile(event) {
            const fileReader = new FileReader();
            fileReader.onload = function(event) {
                const importedQuotes = JSON.parse(event.target.result);
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            };
            fileReader.readAsText(event.target.files[0]);
        }
    
        async function fetchQuotesFromServer() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const serverQuotes = await response.json();
                serverQuotes.forEach(quote => {
                    if (!quotes.some(q => q.text === quote.text)) {
                        quotes.push({ text: quote.title, category: 'Server' });
                    }
                });
                saveQuotes();
                alert('Quotes synced with server!');
            } catch (error) {
                console.error('Error fetching quotes from server:', error);
            }
        }
    
        function syncDataWithServer() {
            setInterval(fetchQuotesFromServer, 60000); // Sync every 60 seconds
        }
    
        newQuoteButton.addEventListener('click', showRandomQuote);
        importFileInput.addEventListener('change', importFromJsonFile);
    
        // Initial load
        if (quotes.length > 0) {
            showRandomQuote();
        }
    
        syncDataWithServer();
    });
    
});

