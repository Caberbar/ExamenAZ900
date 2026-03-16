
const fs = require('fs');
const path = 'c:/Users/JhonathanChaves/Desktop/Jhonathan Chaves/AZ-900/Preguntas/preguntasAZ104.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Answers mapping for known IDs
const answers = {
    "1": "Assign tags to the virtual machines.",
    "2": "No",
    "3": "No",
    "4": "Read-only geo-redundant storage",
    "22": "No",
    "23": "No",
    "24": "Yes",
    "25": "Modify the VM properties in the Azure Management Portal.",
    "26": "5",
    "27": "1",
    "28": "You can recover the files to any VM within the company's subscription.",
    "29": "You should restore the VM to a new Azure VM.",
    "30": "Azure Monitor",
    "31": ["VMs that run Windows 10.", "VMs that run Windows Server 2012 or higher.", "VMs that have NOT been shut down.", "VMs that have been shut down."],
    "32": "No",
    "33": "No",
    "34": "Yes",
    "35": "Yes",
    "36": "The az vm create command.",
    "37": "Yes",
    "38": "No",
    "39": "No",
    "40": "Yes",
    "41": "a Recovery Services vault",
    "42": "Use Azure Storage Explorer to copy the files.",
    "43": "See explanation", // Hotspot
    "44": "See explanation", // Hotspot
    "45": "See explanation", // Hotspot
    "46": "storage1",
    "47": "IP flow verify in Azure Network Watcher",
    "48": "Establish peering between VNET1 and VNET3.",
    "49": "See explanation", // Hotspot
    "50": "See explanation" // Hotspot
};

// Auto-fill answers for Yes/No questions if missing
// Many AZ-104 series questions follow a Yes/No pattern.
// We can't guess them all, but we applied the specific ones above.

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
console.log('Updated answers for batch 1.');
