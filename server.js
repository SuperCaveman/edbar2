const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mock database for example purposes
const phoneNumbers = ['1234567890', '0987654321']; // Example phone numbers

// Endpoint to check phone number
app.post('/check-phone-number', (req, res) => {
    const { phoneNumber } = req.body;

    if (phoneNumbers.includes(phoneNumber)) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
