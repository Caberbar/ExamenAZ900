
// State Management
export const state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    answeredCount: 0,
    mode: 'practica', // 'practica' or 'examen'
    timerInterval: null,
    startTime: null,
    userAnswers: [], // Store user answers for review
};

export const els = {
    current: document.getElementById('current'),
    total: document.getElementById('total'),
    accuracy: document.getElementById('accuracy'),
    scoreContainer: document.getElementById('scoreContainer'),
    question: document.getElementById('question'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    nextBtn: document.getElementById('nextBtn'),
    checkBtn: document.getElementById('checkBtn'),
    resetBtn: document.getElementById('resetBtn'),
    final: document.getElementById('final'),
    finalScore: document.getElementById('finalScore'),
    finalTotal: document.getElementById('finalTotal'),
    restartBtn: document.getElementById('restartBtn'),
    card: document.getElementById('card'),
    progressBar: document.getElementById('progressBar'),
    examTitle: document.getElementById('examTitle'),
    examSubtitle: document.getElementById('examSubtitle'),
    modeSwitch: document.getElementById('modeSwitch'),
    timer: document.getElementById('timer'),
    timeDisplay: document.getElementById('timeDisplay'),
    reviewBtn: document.getElementById('reviewBtn'),
};
