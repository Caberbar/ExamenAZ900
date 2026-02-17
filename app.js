// Fallback data
window.FALLBACK_QUESTIONS = [
  { "question": "Se puede crear un grupo de recursos dentro de otro grupo de recursos.", "options": ["Sí", "No"], "answer": "No" },
  { "question": "Una máquina virtual de Azure puede estar en múltiples grupos de recursos.", "options": ["Sí", "No"], "answer": "No" }
];

(function () {
  const els = {
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
  };

  const state = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    answeredCount: 0,
  };

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function chooseExamSubset(arr) {
    const total = arr.length;
    const min = 30;
    const max = 60;
    const count = (total >= min) ? Math.floor(Math.random() * (Math.min(max, total) - min + 1)) + min : total;
    return arr.slice(0, count);
  }

  function normalizeQuestion(q) {
    const n = { ...q };
    if (n.answer == null && n.right != null) n.answer = n.right;
    if (!n.type) n.type = 'yes_no';
    if (n.type === 'matching') {
      n.correctMap = n.mapping || n.answer || {};
      n.left = Array.isArray(n.left) ? n.left : Object.keys(n.correctMap);
      n.right = Array.isArray(n.right) ? n.right : Array.from(new Set(Object.values(n.correctMap)));
    }
    return n;
  }

  function getAutoExplanation(q) {
      return q.explanation || `Correct answer: ${q.answer}`; 
  }

  function getParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      preguntas: p.get('preguntas'),
      apuntes: p.get('apuntes'),
      name: p.get('name'),
      title: p.get('title'),
      mode: p.get('mode') || 'practica',
    };
  }

  function resolvePath(path) {
    if (!path) return null;
    try {
      const u = new URL(path, window.location.href);
      return u.href;
    } catch {
      return path;
    }
  }

  async function loadQuestions() {
    const params = getParams();
    const src = resolvePath(params.preguntas);
    const processData = (data) => Array.isArray(data) ? data.map(normalizeQuestion) : window.FALLBACK_QUESTIONS.map(normalizeQuestion);

    if (src) {
      try {
        const res = await fetch(src, { cache: 'no-store' });
        if (!res.ok) throw new Error('error');
        const data = await res.json();
        return processData(data);
      } catch (e) {
        console.warn('Fallback due to load error', e);
        return window.FALLBACK_QUESTIONS.map(normalizeQuestion);
      }
    }
    
    // Default fallback
    try {
        const res = await fetch('./Preguntas/preguntasAZ900.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('error');
        return processData(await res.json());
    } catch (e) {
        return window.FALLBACK_QUESTIONS.map(normalizeQuestion);
    }
  }

  function updateStatus() {
    if (els.current) els.current.textContent = state.currentIndex + 1;
    if (els.total) els.total.textContent = state.questions.length;
    
    const answeredPct = Math.round(state.answeredCount > 0 ? (state.score / state.answeredCount) * 100 : 0);
    if (els.accuracy) els.accuracy.textContent = `${answeredPct}%`;

    // Progress Bar
    const pct = Math.round(((state.currentIndex) / Math.max(1, state.questions.length)) * 100);
    if (els.progressBar) els.progressBar.style.width = `${pct}%`;
  }

  function clearOptions() {
    els.options.innerHTML = '';
    els.feedback.innerHTML = '';
    els.feedback.classList.add('hidden');
    els.feedback.className = 'mt-8 hidden animate-fade-in-up'; 
  }

  function createButton(text, value, onClick) {
      const btn = document.createElement('button');
      btn.textContent = text;
      // Modern professional button style
      btn.className = 'option-btn w-full text-left px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all';
      btn.dataset.value = value;
      btn.addEventListener('click', onClick);
      return btn;
  }

  function renderQuestion() {
    const q = state.questions[state.currentIndex];
    
    // Clean text
    els.question.innerHTML = (String(q.question ?? ''))
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

    clearOptions();
    state.answered = false;
    
    if (els.nextBtn) els.nextBtn.classList.add('hidden');
    if (els.checkBtn) els.checkBtn.classList.add('hidden');

    if (q.type === 'matching') {
      renderMatching(q);
    } else if (Array.isArray(q.answer)) {
      renderMultiSelect(q);
    } else {
      q.options.forEach((opt) => {
        const btn = createButton(opt, opt, () => handleAnswer(btn, q));
        els.options.appendChild(btn);
      });
    }
  }

  function linkify(text) {
    return (text || '').replace(/https?:\/\/\S+/g, (url) => `<a href="${url}" target="_blank" class="underline text-brand-600 hover:text-brand-700">${url}</a>`);
  }

  function handleAnswer(clickedBtn, q) {
    if (state.answered) return;
    state.answered = true;
    state.answeredCount += 1;

    const correctAnswer = q.answer;
    const isCorrect = clickedBtn.dataset.value === correctAnswer;
    
    if (isCorrect) state.score += 1;

    const buttons = Array.from(els.options.querySelectorAll('button'));
    buttons.forEach((b) => {
        b.disabled = true;
        b.classList.add('cursor-default', 'opacity-80');
        const v = b.dataset.value;
        
        if (v === correctAnswer) {
            b.classList.add('state-correct');
            b.classList.remove('bg-white', 'dark:bg-slate-800/50', 'border-slate-200');
        } else if (b === clickedBtn && !isCorrect) {
            b.classList.add('state-incorrect');
            b.classList.remove('bg-white', 'dark:bg-slate-800/50', 'border-slate-200');
        }
    });

    showFeedback(isCorrect, q);
    if (els.nextBtn) els.nextBtn.classList.remove('hidden');
    updateStatus();
  }

  function showFeedback(isCorrect, q) {
      const baseMsg = isCorrect ? 'Correct' : 'Incorrect';
      const colorClass = isCorrect ? 'text-green-700 bg-green-50 border-green-100 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/30' : 'text-red-700 bg-red-50 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/30';
      const icon = isCorrect ? 'fa-check-circle' : 'fa-xmark-circle';
      
      const explanationText = q.explanation || getAutoExplanation(q);
      
      els.feedback.innerHTML = `
        <div class="p-4 rounded-xl border ${colorClass} flex gap-4 items-start">
            <i class="fa-solid ${icon} text-xl mt-0.5"></i>
            <div>
                <div class="font-bold text-lg">${baseMsg}</div>
                <div class="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    ${linkify(explanationText)}
                </div>
            </div>
        </div>
      `;
      els.feedback.classList.remove('hidden');
  }

  function renderMultiSelect(q) {
      const requiredCount = q.answer.length;
      const selected = new Set();
      
      q.options.forEach((opt) => {
        const btn = createButton(opt, opt, () => {
             if (state.answered) return;
             const v = btn.dataset.value;
             if (selected.has(v)) {
                 selected.delete(v);
                 btn.classList.remove('state-selected');
             } else {
                 selected.add(v);
                 btn.classList.add('state-selected');
             }
        });
        els.options.appendChild(btn);
      });

      if (els.checkBtn) {
          els.checkBtn.classList.remove('hidden');
          els.checkBtn.onclick = () => {
              if (state.answered) return;
              if (selected.size !== requiredCount) return; // Add visual warning if needed
              
              state.answered = true;
              state.answeredCount += 1;
              const correctSet = new Set(q.answer);
              let allCorrect = true;
              
              const buttons = Array.from(els.options.querySelectorAll('button'));
              buttons.forEach(b => {
                  b.disabled = true;
                  const v = b.dataset.value;
                  const isSel = selected.has(v);
                  const isCor = correctSet.has(v);
                  
                  if (isCor) b.classList.add('state-correct');
                  else if (isSel && !isCor) {
                      b.classList.add('state-incorrect');
                      allCorrect = false;
                  }
                  b.classList.remove('state-selected');
              });
              
              if (allCorrect) state.score += 1;
              showFeedback(allCorrect, q);
              els.checkBtn.classList.add('hidden');
              els.nextBtn.classList.remove('hidden');
              updateStatus();
          };
      }
  }

  function renderMatching(q) {
    const container = document.createElement('div');
    container.className = 'space-y-4';
    const selects = [];
    const options = shuffle([...q.right]);

    q.left.forEach((leftItem) => {
      const row = document.createElement('div');
      row.className = 'flex flex-col md:flex-row gap-3 items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700';
      
      const label = document.createElement('div');
      label.textContent = leftItem;
      label.className = 'flex-1 font-medium text-slate-700 dark:text-slate-200';
      
      const select = document.createElement('select');
      select.className = 'w-full md:w-1/2 p-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-bg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500';
      
      const ph = document.createElement('option');
      ph.text = 'Select match...'; ph.value = ''; ph.disabled = true; ph.selected = true;
      select.add(ph);
      
      options.forEach(opt => {
          const o = document.createElement('option');
          o.text = opt; o.value = opt;
          select.add(o);
      });
      
      selects.push({select, leftItem});
      row.appendChild(label);
      row.appendChild(select);
      container.appendChild(row);
    });
    
    els.options.appendChild(container);
    if (els.checkBtn) {
        els.checkBtn.classList.remove('hidden');
        els.checkBtn.onclick = () => {
             if (state.answered) return;
             if (selects.some(s => !s.select.value)) return;
             
             state.answered = true;
             state.answeredCount += 1;
             let allCorrect = true;
             
             selects.forEach(({select, leftItem}) => {
                 select.disabled = true;
                 const isOk = select.value === q.correctMap[leftItem];
                 if (!isOk) allCorrect = false;
                 select.classList.add(isOk ? 'bg-green-50' : 'bg-red-50');
                 select.classList.add(isOk ? 'border-green-500' : 'border-red-500');
             });
             
             if (allCorrect) state.score += 1;
             showFeedback(allCorrect, q);
             els.checkBtn.classList.add('hidden');
             els.nextBtn.classList.remove('hidden');
             updateStatus();
        };
    }
  }

  function nextQuestion() {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      updateStatus();
      renderQuestion();
    } else {
      showFinal();
    }
  }

  function resetQuiz() {
    state.currentIndex = 0;
    state.score = 0;
    state.answeredCount = 0;
    if (els.final) els.final.classList.add('hidden');
    if (els.card) els.card.classList.remove('hidden');
    shuffle(state.questions);
    updateStatus();
    renderQuestion();
  }

  function showFinal() {
    if (!els.final) return;
    const finalPct = Math.round((state.score / Math.max(1, state.questions.length)) * 100);
    
    if (els.finalScore) els.finalScore.textContent = `${finalPct}%`;
    if (els.finalTotal) els.finalTotal.textContent = state.questions.length;
    
    if (els.card) els.card.classList.add('hidden');
    els.final.classList.remove('hidden');
  }

  async function init() {
    const params = getParams();
    if (els.examTitle) els.examTitle.textContent = params.title || params.name || 'Practice Session';
    
    if (els.modeSwitch) {
        els.modeSwitch.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('mode', params.mode === 'examen' ? 'practica' : 'examen');
            window.location.href = url.href;
        });
        els.modeSwitch.textContent = params.mode === 'examen' ? 'Switch to Practice' : 'Switch to Exam';
    }

    const loaded = await loadQuestions();
    const shuffled = shuffle(loaded);
    state.questions = params.mode === 'examen' ? chooseExamSubset(shuffled) : shuffled;
    
    updateStatus();
    renderQuestion();

    if (els.nextBtn) els.nextBtn.addEventListener('click', nextQuestion);
    if (els.resetBtn) els.resetBtn.addEventListener('click', resetQuiz);
    if (els.restartBtn) els.restartBtn.addEventListener('click', resetQuiz);
  }

  init();
})();
