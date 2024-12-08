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
