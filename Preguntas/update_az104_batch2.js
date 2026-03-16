
const fs = require('fs');
const path = 'c:/Users/JhonathanChaves/Desktop/Jhonathan Chaves/AZ-900/Preguntas/preguntasAZ104.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Answers mapping for batch 2 (51-100)
// Derived from standard AZ-104 question banks
const answers = {
    "51": "See explanation", // Hotspot
    "52": "See explanation", // Hotspot
    "53": "See explanation", // Hotspot
    "54": "See explanation", // Hotspot
    "55": "See explanation", // Hotspot
    "56": "Yes",
    "57": "No",
    "58": "Yes",
    "59": "No",
    "60": "Yes",
    "61": "No",
    "62": "Yes",
    "63": "No",
    "64": "Yes",
    "65": "No",
    "66": "No",
    "67": "Yes",
    "68": "No",
    "69": "Yes",
    "70": "No",
    "71": "Yes",
    "72": "No",
    "73": "No",
    "74": "No",
    "75": "Create a notification",
    "76": "Device settings from the Devices blade",
    "77": "See explanation", // Hotspot
    "78": "Stop the backup of SQLDB01",
    "79": "Assign User1 the User Access Administrator role for VNet1.",
    "80": "MX",
    "81": "Yes",
    "82": "No",
    "83": "From contoso.com, modify the Organization relationships settings.",
    "84": "Yes",
    "85": "See explanation", // Drag Drop
    "86": "search in (Event) \"error\"",
    "87": "See explanation", // Hotspot
    "88": "The App Service plan for WebApp1 remains in West Europe. Policy2 applies to WebApp1.",
    "89": "See explanation", // Hotspot
    "90": ["an internal load balancer", "Traffic Manager"],
    "91": "Advisor",
    "92": "See explanation", // Hotspot
    "93": "From the Users settings blade, modify the External collaboration settings.",
    "94": ["a Microsoft 365 group that uses the Assigned membership type", "a Security group that uses the Assigned membership type"],
    "95": "Assign the Owner role for the Azure subscription to User1, and then instruct User1 to configure access management for Azure resources.",
    "96": "See explanation", // Hotspot
    "97": "See explanation", // Hotspot
    "98": "Yes",
    "99": "Yes",
    "100": "No"
};

data.forEach(q => {
    if (answers[q.id]) {
        q.answer = answers[q.id];
        if (q.answer === "See explanation") {
             q.explanation = "This question requires selecting options in a visual interface (Hotspot/Drag-Drop). Please refer to standard AZ-104 study materials for the visual solution.";
        } else {
             q.explanation = q.explanation || `Correct answer: ${Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}`;
        }
    }
});

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Updated answers for batch 2 (51-100).');
