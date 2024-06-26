document.getElementById('receiptForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const receiptData = {
        PurchaseDate: document.getElementById('purchase').value,
        TotalAmount: document.getElementById('total').value,
        StoreName: document.getElementById('store').value,
        items: []
    };

    // Collect all items
    const items = document.querySelectorAll('#itemUL li');
    items.forEach((item) => {
        const details = item.textContent.split(", $");
        const priceDesc = details[1].split(", ");
        receiptData.items.push({
            Name: details[0],
            Amount: priceDesc[0],
            Description: priceDesc[1].slice(0, -1)
        });
    });

    // Send data to the server
    fetch('/api/receipts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(receiptData)
    })
        .then(response => {
            console.log(response); // Check the response object
            return response.text();  // Convert to text first to avoid JSON parsing issues
        })
        .then(text => {
            try {
                const data = JSON.parse(text); // Manually parse the text to JSON
                console.log('Success:', data);
            } catch (error) {
                console.error('Failed to parse JSON:', error);
                console.error('Received text:', text);
            }
        })
        .catch((error) => console.error('Error:', error));

});
