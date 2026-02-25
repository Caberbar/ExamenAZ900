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
      if (q.explanation) return q.explanation;
      
      if (Array.isArray(q.answer)) {
          const joined = q.answer.join(', ');
          return `Respuestas correctas: ${joined}.`;
      }
      
      if (q.type === 'hotspot-yes-no') {
          return `Combinación correcta de Sí/No: ${q.answer}.`;
      }
      
      if (q.type === 'matching') {
          return 'La respuesta correcta se basa en las correspondencias mostradas en la corrección.';
      }
      
      if (q.type === 'ordering') {
          return 'El orden correcto se muestra en la lista marcada como correcta.';
      }
      
      return `La respuesta correcta es: ${q.answer}.`;
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

    // Add Image if exists
    if (q.image) {
        els.question.innerHTML += `<div class="mt-6 mb-4 flex justify-center"><img src="${q.image}" class="max-w-full max-h-[400px] h-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" alt="Question Image" onerror="this.style.display='none'"></div>`;
    }

    clearOptions();
    state.answered = false;
    
    if (els.nextBtn) els.nextBtn.classList.add('hidden');
    if (els.checkBtn) els.checkBtn.classList.add('hidden');

    if (q.type === 'matching') {
      renderMatching(q);
    } else if (q.type === 'dropdown') {
      renderDropdown(q);
    } else if (q.type === 'hotspot-yes-no') {
      renderHotspotYesNo(q);
    } else if (q.type === 'ordering') {
      renderOrdering(q);
    } else if (Array.isArray(q.answer)) {
      renderMultiSelect(q);
    } else {
      q.options.forEach((opt) => {
        const btn = createButton(opt, opt, () => handleAnswer(btn, q));
        els.options.appendChild(btn);
      });
    }
  }

  function renderHotspotYesNo(q) {
      const container = document.createElement('div');
      container.className = 'w-full overflow-x-auto mt-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm';

      const table = document.createElement('table');
      table.className = 'w-full text-left border-collapse min-w-[600px]';

      const thead = document.createElement('thead');
      thead.innerHTML = `
          <tr class="bg-slate-50 dark:bg-slate-900/50">
              <th class="p-4 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white w-full">Statement</th>
              <th class="p-4 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-center w-24">Yes</th>
              <th class="p-4 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white text-center w-24">No</th>
          </tr>
      `;
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      const selections = new Map();

      q.statements.forEach((stmt, idx) => {
          const row = document.createElement('tr');
          row.className = 'border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors';
          
          const textCell = document.createElement('td');
          textCell.className = 'p-4 text-slate-700 dark:text-slate-300 leading-relaxed';
          textCell.textContent = stmt.text;
          
          const createRadio = (val) => {
              const cell = document.createElement('td');
              cell.className = 'p-4 text-center';
              
              const label = document.createElement('label');
              label.className = 'inline-flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors';
              
              const input = document.createElement('input');
              input.type = 'radio';
              input.name = `stmt-${idx}`;
              input.value = val;
              input.className = 'w-5 h-5 text-brand-600 border-slate-300 focus:ring-brand-500 cursor-pointer accent-brand-600';
              
              input.onchange = () => {
                  if (state.answered) return;
                  selections.set(idx, val);
              };
              
              label.appendChild(input);
              cell.appendChild(label);
              return { cell, input };
          };

          const yes = createRadio('Yes');
          const no = createRadio('No');

          row.appendChild(textCell);
          row.appendChild(yes.cell);
          row.appendChild(no.cell);
          tbody.appendChild(row);
      });
      table.appendChild(tbody);
      container.appendChild(table);
      els.options.appendChild(container);

      if (els.checkBtn) {
          els.checkBtn.classList.remove('hidden');
          els.checkBtn.onclick = () => {
              if (state.answered) return;
              if (selections.size < q.statements.length) {
                  // Simple alert or better UI feedback
                  const feedback = document.createElement('div');
                  feedback.className = 'mt-4 text-red-500 font-medium text-center animate-pulse';
                  feedback.textContent = 'Please answer all statements.';
                  container.after(feedback);
                  setTimeout(() => feedback.remove(), 2000);
                  return;
              }

              state.answered = true;
              state.answeredCount += 1;
              
              let allCorrect = true;
              q.statements.forEach((stmt, idx) => {
                  const userVal = selections.get(idx);
                  const isRowCorrect = userVal === stmt.correct;
                  if (!isRowCorrect) allCorrect = false;

                  const row = tbody.children[idx];
                  const inputs = row.querySelectorAll('input');
                  inputs.forEach(input => {
                      input.disabled = true;
                      if (input.value === stmt.correct) {
                          // Correct answer styling
                          input.parentElement.classList.add('bg-green-100', 'dark:bg-green-900/30');
                      } else if (input.checked && !isRowCorrect) {
                          // Wrong selection styling
                          input.parentElement.classList.add('bg-red-100', 'dark:bg-red-900/30');
                      }
                  });
                  
                  // Color text
                  if (!isRowCorrect) {
                      row.children[0].classList.add('text-red-600', 'dark:text-red-400');
                  } else {
                      row.children[0].classList.add('text-green-600', 'dark:text-green-400');
                  }
              });

              if (allCorrect) state.score += 1;
              showFeedback(allCorrect, q);
              els.checkBtn.classList.add('hidden');
              els.nextBtn.classList.remove('hidden');
              updateStatus();
          };
      }
  }

  function renderOrdering(q) {
      const container = document.createElement('div');
      container.className = 'flex flex-col gap-6 mt-6';

      const sourceTitle = document.createElement('h4');
      sourceTitle.textContent = 'Available Steps';
      sourceTitle.className = 'font-semibold text-slate-700 dark:text-slate-300';
      
      const sourceList = document.createElement('div');
      sourceList.className = 'flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[100px]';
      
      const targetTitle = document.createElement('h4');
      targetTitle.textContent = 'Correct Sequence';
      targetTitle.className = 'font-semibold text-slate-700 dark:text-slate-300';
      
      const targetList = document.createElement('div');
      targetList.className = 'flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 min-h-[100px] relative';
      
      // Add numeric markers to target list background or pseudo-elements for guidance
      
      const items = shuffle([...q.items]); // Shuffle source items
      const selectedItems = [];

      const createItem = (text, isSource) => {
          const item = document.createElement('div');
          item.textContent = text;
          item.className = 'p-3 bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-brand-50 dark:hover:bg-slate-600 transition-colors flex justify-between items-center';
          
          if (!isSource) {
              const num = document.createElement('span');
              num.className = 'w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs flex items-center justify-center font-bold mr-3';
              num.textContent = selectedItems.indexOf(text) + 1;
              item.prepend(num);
          } else {
              const icon = document.createElement('i');
              icon.className = 'fa-solid fa-plus text-slate-400';
              item.appendChild(icon);
          }

          item.onclick = () => {
              if (state.answered) return;
              if (isSource) {
                  // Move to target
                  const idx = items.indexOf(text);
                  if (idx > -1) {
                      items.splice(idx, 1);
                      selectedItems.push(text);
                      refreshLists();
                  }
              } else {
                  // Move back to source
                  const idx = selectedItems.indexOf(text);
                  if (idx > -1) {
                      selectedItems.splice(idx, 1);
                      items.push(text);
                      refreshLists();
                  }
              }
          };
          return item;
      };

      const refreshLists = () => {
          sourceList.innerHTML = '';
          targetList.innerHTML = '';
          
          if (items.length === 0) {
              sourceList.innerHTML = '<div class="text-slate-400 text-sm text-center italic py-2">All items selected</div>';
          }
          
          items.forEach(text => {
              sourceList.appendChild(createItem(text, true));
          });

          if (selectedItems.length === 0) {
              targetList.innerHTML = '<div class="text-slate-400 text-sm text-center italic py-2">Select items to build sequence</div>';
          }

          selectedItems.forEach(text => {
              targetList.appendChild(createItem(text, false));
          });
      };

      refreshLists();

      container.appendChild(sourceTitle);
      container.appendChild(sourceList);
      container.appendChild(targetTitle);
      container.appendChild(targetList);
      els.options.appendChild(container);

      if (els.checkBtn) {
          els.checkBtn.classList.remove('hidden');
          els.checkBtn.onclick = () => {
              if (state.answered) return;
              if (selectedItems.length === 0) return;
              
              state.answered = true;
              state.answeredCount += 1;
              
              // Check if sequence matches exactly
              const isCorrect = JSON.stringify(selectedItems) === JSON.stringify(q.correctOrder);
              
              if (isCorrect) state.score += 1;
              
              // Visual feedback on items
              const targetDivs = targetList.children;
              for (let i = 0; i < targetDivs.length; i++) {
                  const itemDiv = targetDivs[i];
                  const itemText = selectedItems[i];
                  if (itemText === q.correctOrder[i]) {
                      itemDiv.classList.add('border-green-500', 'bg-green-50', 'dark:bg-green-900/20');
                      itemDiv.classList.remove('border-slate-200', 'dark:border-slate-600', 'bg-white', 'dark:bg-slate-700');
                  } else {
                      itemDiv.classList.add('border-red-500', 'bg-red-50', 'dark:bg-red-900/20');
                      itemDiv.classList.remove('border-slate-200', 'dark:border-slate-600', 'bg-white', 'dark:bg-slate-700');
                  }
              }
              
              // Show correct order in feedback if wrong
              if (!isCorrect) {
                  q.explanation = (q.explanation || '') + `<br><br><strong>Correct Order:</strong><ol class="list-decimal ml-5 mt-2 space-y-1">${q.correctOrder.map(s => `<li>${s}</li>`).join('')}</ol>`;
              }

              showFeedback(isCorrect, q);
              els.checkBtn.classList.add('hidden');
              els.nextBtn.classList.remove('hidden');
              updateStatus();
          };
      }
  }

  function renderDropdown(q) {
      const container = document.createElement('div');
      container.className = 'p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 mt-4';
      
      const select = document.createElement('select');
      // Added max-w-full to prevent overflow on small screens
      select.className = 'inline-block max-w-full md:w-auto min-w-[200px] p-2.5 mx-2 my-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-bg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500 font-medium align-middle whitespace-normal overflow-hidden text-ellipsis';
      
      const ph = document.createElement('option');
      ph.text = 'Select an option...'; ph.value = ''; ph.disabled = true; ph.selected = true;
      select.add(ph);
      
      q.options.forEach(opt => {
          const o = document.createElement('option');
          o.text = opt; o.value = opt;
          select.add(o);
      });

      // Replace {{option}} with select or append select
      const parts = q.question.split('{{option}}');
      if (parts.length > 1) {
          els.question.innerHTML = ''; // Clear original question text as we rebuild it
          const wrapper = document.createElement('div');
          wrapper.className = 'text-lg md:text-xl leading-relaxed text-slate-900 dark:text-white flex flex-wrap items-baseline gap-2'; // Changed items-center to items-baseline
          
          const part1 = document.createElement('span');
          part1.innerHTML = parts[0];
          wrapper.appendChild(part1);
          wrapper.appendChild(select);
          const part2 = document.createElement('span');
          part2.innerHTML = parts[1];
          wrapper.appendChild(part2);
          
          els.question.appendChild(wrapper);
      } else {
          // If no placeholder, just append select to container
          // Ensure container handles overflow
          container.className = 'p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 mt-4 overflow-x-auto';
          container.appendChild(select);
          els.options.appendChild(container);
      }

      if (els.checkBtn) {
          els.checkBtn.classList.remove('hidden');
          els.checkBtn.onclick = () => {
              if (state.answered) return;
              if (!select.value) return;
              
              state.answered = true;
              state.answeredCount += 1;
              const isCorrect = select.value === q.answer;
              
              select.disabled = true;
              select.classList.add(isCorrect ? 'bg-green-50' : 'bg-red-50');
              select.classList.add(isCorrect ? 'border-green-500' : 'border-red-500');
              select.classList.add(isCorrect ? 'text-green-900' : 'text-red-900');
              
              if (isCorrect) state.score += 1;
              showFeedback(isCorrect, q);
              els.checkBtn.classList.add('hidden');
              els.nextBtn.classList.remove('hidden');
              updateStatus();
          };
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
