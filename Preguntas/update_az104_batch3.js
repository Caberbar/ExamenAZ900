
const fs = require('fs');
const path = 'c:/Users/JhonathanChaves/Desktop/Jhonathan Chaves/AZ-900/Preguntas/preguntasAZ104.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Answers mapping for batch 3 (101-150)
const answers = {
    "101": "See explanation", // Hotspot
    "102": "Yes",
    "103": "No",
    "104": "Yes",
    "105": "No",
    "106": "Yes",
    "107": "No",
    "108": "See explanation", // Hotspot
    "109": "See explanation", // Hotspot
    "110": "See explanation", // Hotspot
    "111": "See explanation", // Hotspot
    "112": "Assign a tag to the resource group.",
    "113": "Modify the Profile settings of User1.",
    "114": "From the Access control (IAM) blade of RG1, assign the Contributor role to User1.",
    "115": "Create a new user account for User1 in Tenant2.",
    "116": "See explanation", // Hotspot
    "117": "See explanation", // Hotspot
    "118": "See explanation", // Hotspot
    "119": "See explanation", // Hotspot
    "120": "See explanation", // Hotspot
    "121": "See explanation", // Hotspot
    "122": "See explanation", // Hotspot
    "123": "From Azure AD, create a new user account for Admin1.",
    "124": "See explanation", // Hotspot
    "125": "Yes",
    "126": "No",
    "127": "You are prevented from creating Azure SQL Servers in ContosoRG1 only.",
    "128": "No",
    "129": "Select the custom role and add Sub1 and Sub2 to the assignable scopes. Remove RG1 from the assignable scopes.",
    "130": ["View blob data in storageacct1234.", "View file shares in storageacct1234."],
    "131": "search in (Event) \"error\"",
    "132": "Configure user-level credentials for FTPS",
    "133": "Yes",
    "134": "See explanation", // Hotspot
    "135": "See explanation", // Drag Drop
    "136": "a service tag",
    "137": "User1, User2, User3, and User4",
    "138": "See explanation", // Hotspot
    "139": "See explanation", // Hotspot
    "140": "Assign User1 the Network Contributor role for VNet1.",
    "141": "See explanation", // Hotspot
    "142": "Assign User1 the Owner role for VNet1.",
    "143": "private endpoints",
    "144": "See explanation", // Hotspot
    "145": "Assign User1 the Access Administrator role for VNet1.",
    "146": "See explanation", // Hotspot
    "147": "Enable identity-based data access for the file shares in storage1.",
    "148": "Assign User1 the User Access Administrator role for VNet1.",
    "149": "VM1, storage1, VNET1, VM1Managed, and RVAULT1",
    "150": "See explanation" // Hotspot
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
console.log('Updated answers for batch 3 (101-150).');
