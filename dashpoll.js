const STORAGE_KEY = 'pollData';

        function getPoll() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return null;
            return JSON.parse(stored);
        }

        function checkAndResetPoll() {
            let poll = getPoll();
            if (!poll) return null;
            const now = Date.now();
            if (now >= poll.endTime) {
                poll.votes = Object.fromEntries(Object.keys(poll.votes).map(key => [key, 0]));
                poll.total = 0;
                poll.endTime = now + 10 * 60 * 1000;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(poll));
            }
            return poll;
        }

        function displayResults() {
            const poll = checkAndResetPoll();
            const contentEl = document.getElementById('resultsContent');
            if (!poll) {
                contentEl.innerHTML = '<div class="no-poll">No poll created yet. <a href="create.html">Create one</a></div>';
                return;
            }

            contentEl.innerHTML = `
                <div id="question">${poll.question}</div>
                <div id="results"></div>
                <div class="total" id="total"></div>
                <div class="reset-time" id="resetTime"></div>
            `;

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            poll.options.forEach(option => {
                const votes = poll.votes[option] || 0;
                const percentage = poll.total > 0 ? (votes / poll.total * 100).toFixed(2) : 0;
                const candidateDiv = document.createElement('div');
                candidateDiv.className = 'candidate';
                candidateDiv.innerHTML = `
                    <div class="label">${option}: ${votes} votes (${percentage}%)</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${percentage}%;">${percentage}%</div>
                    </div>
                `;
                resultsDiv.appendChild(candidateDiv);
            });

            document.getElementById('total').textContent = `Total Votes: ${poll.total}`;

            const timeLeft = poll.endTime - Date.now();
            const resetEl = document.getElementById('resetTime');
            if (timeLeft > 0) {
                const minutes = Math.floor(timeLeft / 60000);
                const seconds = Math.floor((timeLeft % 60000) / 1000);
                resetEl.textContent = `Results reset in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                resetEl.textContent = 'Results have been reset!';
            }
            resetEl.innerHTML = ' <a href = "index.html">Go to home</a>'
            
        }

        displayResults();
        setInterval(displayResults, 1000);