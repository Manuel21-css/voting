const STORAGE_KEY = 'pollData';

        function getPoll() {
            const stored = localStorage.getItem(STORAGE_KEY);
            // console.log('Stored pollData:', stored);
            if (!stored) return null;
            return JSON.parse(stored);
        }

        function checkAndResetPoll() {
            const poll = getPoll();
            if (!poll) return null;
            const now = Date.now();
            if (now >= poll.endTime) {
                // Reset votes
                poll.votes = Object.fromEntries(Object.keys(poll.votes).map(key => [key, 0]));
                poll.total = 0;
                poll.endTime = now + 10 * 60 * 1000;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(poll));
            }
            return poll;
        }

        function updateCountdown() {
            const poll = checkAndResetPoll();
            if (!poll) return;

            const now = Date.now();
            const timeLeft = poll.endTime - now;

            const countdownEl = document.getElementById('countdown');
            if (timeLeft <= 0) {
                countdownEl.textContent = 'Voting has ended!';
                // document.querySelector('button')?.disabled = true;
                return;
            }

            const minutes = Math.floor(timeLeft / 60000);
            const seconds = Math.floor((timeLeft % 60000) / 1000);
            countdownEl.textContent = `Voting ends in: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            setTimeout(updateCountdown, 1000);
        }

        function displayPoll() {
            const poll = checkAndResetPoll();
            const contentEl = document.getElementById('pollContent');
            if (!poll) {
                contentEl.innerHTML = '<div class="no-poll">No poll created yet. <a href="createpoll.html">Create one</a></div>';
                return;
            }

            contentEl.innerHTML = `
                <div id="question">${poll.question}</div>
                <div class="countdown" id="countdown">Voting ends in: Calculating...</div>
                <form id="voteForm">
                    ${poll.options.map(option => `<label><input type="radio" name="candidate" value="${option}">${option}</label>`).join('')}
                    <button type="submit">Submit Vote</button>
                    <a href = "dashpoll.html">Dashboard</a>
                </form> 
                <div class="message" id="message"></div>
            `;
            updateCountdown();

            document.getElementById('voteForm').addEventListener('submit', handleVote);
        }

        function handleVote(event) {
            event.preventDefault();
            const selected = document.querySelector('input[name="candidate"]:checked');
            const messageEl = document.getElementById('message');

            if (!selected) {
                messageEl.className = 'message error';
                messageEl.textContent = 'Please select an option!';
                return;
            }

            let poll = getPoll();
            const now = Date.now();

            if (now >= poll.endTime) {
                messageEl.className = 'message error';
                messageEl.textContent = 'Voting has ended!';
                return;
            }

            const option = selected.value;
            poll.votes[option]++;
            poll.total++;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(poll));

            messageEl.className = 'message';
            messageEl.textContent = 'Vote submitted successfully!';
            document.querySelector('button').disabled = true;
        }

        displayPoll();