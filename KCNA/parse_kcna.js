
const fs = require('fs');
const path = require('path');

const inputFile = 'c:\\Users\\JhonathanChaves\\Desktop\\Jhonathan Chaves\\AZ-900\\KCNA\\PREGUNTASKCNA';
const outputFile = 'c:\\Users\\JhonathanChaves\\Desktop\\Jhonathan Chaves\\AZ-900\\Preguntas\\preguntasKCNA.json';

try {
    const rawContent = fs.readFileSync(inputFile, 'utf8');
    
    // Split by "Question \d+"
    // We use a regex to split but keep the delimiter to know where questions start
    const parts = rawContent.split(/(?=Question \d+)/);
    const questions = [];

    parts.forEach((part, index) => {
        if (!part.trim().startsWith('Question')) return;

        const lines = part.split('\n').map(l => l.trim()).filter(l => l);
        
        // 1. Extract Question ID and Text
        // Line 0 is "Question X"
        // Following lines until "A." are the question text
        let qText = '';
        let i = 1;
        while (i < lines.length && !lines[i].match(/^[A-Z]\.$/)) {
            qText += lines[i] + ' ';
            i++;
        }

        if (!qText) return;

        // 2. Extract Options
        const options = [];
        const optionMap = {}; // A -> text, B -> text
        
        while (i < lines.length) {
            const line = lines[i];
            if (line.match(/^[A-Z]\.$/)) {
                const letter = line.replace('.', '');
                let optText = '';
                i++;
                // Capture text until next option or end of options (usually comments start or next question)
                // In this format, comments seem to follow.
                // We assume options are contiguous A, B, C...
                // But we need to stop if we hit "[-]" or "Selected Answer" or just "Question"
                while (i < lines.length && !lines[i].match(/^[A-Z]\.$/) && !lines[i].startsWith('[-]')) {
                    optText += lines[i] + ' ';
                    i++;
                }
                optionMap[letter] = optText.trim();
                options.push(optText.trim());
            } else {
                // If we are not at an option start, maybe we reached comments
                if (line.startsWith('[-]')) break;
                i++;
            }
        }

        // 3. Extract Answer from Comments
        // Look for "Selected Answer: X"
        // We will take the most frequent answer or the first one found
        const answerMatches = part.match(/Selected Answer:\s*([A-Z])/g);
        let finalAnswer = null;
        let explanation = '';

        if (answerMatches) {
            const votes = {};
            answerMatches.forEach(m => {
                const ans = m.split(':')[1].trim();
                votes[ans] = (votes[ans] || 0) + 1;
            });
            
            // Get answer with max votes
            finalAnswer = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b);
            
            // Try to find an explanation (text after the first Selected Answer)
            const explanationMatch = part.match(/Selected Answer:\s*[A-Z]([\s\S]*?)(\[-\]|$)/);
            if (explanationMatch && explanationMatch[1]) {
                explanation = explanationMatch[1].trim().replace(/\n/g, ' ').substring(0, 300) + '...';
            }
        }

        // Map letter answer to full text answer
        let fullAnswer = null;
        if (finalAnswer && optionMap[finalAnswer]) {
            fullAnswer = optionMap[finalAnswer];
        }

        if (qText && options.length > 0) {
            questions.push({
                id: (questions.length + 1).toString(),
                type: 'multiple-choice',
                question: qText.trim(),
                options: options,
                answer: fullAnswer, // Can be null if not found
                explanation: explanation || (finalAnswer ? `Community selected answer: ${finalAnswer}` : 'No explanation available.')
            });
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2), 'utf8');
    console.log(`Successfully parsed ${questions.length} questions.`);
    console.log(`Saved to ${outputFile}`);

} catch (err) {
    console.error('Error parsing KCNA file:', err);
}
