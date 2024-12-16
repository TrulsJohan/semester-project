export function initializeCountdown(countdownElements) {
    countdownElements.forEach((element) => {
        const endsAt = new Date(element.dataset.endsAt);

        const updateCountdown = () => {
            const timeLeft = endsAt - new Date();
            if (timeLeft <= 0) {
                element.textContent = 'Auction ended';
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
}
