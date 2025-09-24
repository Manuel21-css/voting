const STORAGE_KEY = 'pollData';

        function addOption() {
            const container = document.getElementById('optionsContainer');
            const div = document.createElement('div');
            div.className = 'option-input';
            div.innerHTML = `<input type="text" class="option" placeholder="New Option" required>`;
            container.appendChild(div);
        }

        function savePoll() {
            const question = document.getElementById('question').value.trim();
            const options = Array.from(document.querySelectorAll('.option')).map(opt => opt.value.trim()).filter(opt => opt);
            
            if (!question || options.length < 2) {
                const messageEl = document.getElementById('message');
                messageEl.className = 'message error';
                messageEl.textContent = 'Please enter a question and at least 2 options!';
                return false;
            }

            if (new Set(options).size !== options.length) {
                const messageEl = document.getElementById('message');
                messageEl.className = 'message error';
                messageEl.textContent = 'Options must be unique!';
                return false;
            }

            const now = Date.now();
            const endTime = now + 10 * 60 * 1000; // 10 minutes
            const pollData = {
                question,
                options,
                votes: options.reduce((acc, opt) => ({...acc, [opt]: 0}), {}),
                total: 0,
                endTime
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(pollData));
            
            const messageEl = document.getElementById('message');
            messageEl.className = 'message';
            messageEl.textContent = 'Poll created successfully!';
            return true;
        }

        document.getElementById('createForm').addEventListener('submit', function(e) {
            e.preventDefault();
            savePoll();
        });