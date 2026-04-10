document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Stardate
    const stardateEl = document.getElementById('stardate');
    const updateStardate = () => {
        const now = new Date();
        const year = 9; // 9 ABY
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        stardateEl.textContent = `${year} ABY ${month}.${day}.${time}`;
    };
    
    updateStardate();
    setInterval(updateStardate, 60000);

    // Subtle Hover Effects
    const cards = document.querySelectorAll('.news-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Potential for audio blip here if assets exist
        });
    });

    // Market fluctuations
    const marketItems = document.querySelectorAll('.market-item span:last-child');
    setInterval(() => {
        marketItems.forEach(item => {
            const change = (Math.random() * 0.1).toFixed(2);
            const isUp = Math.random() > 0.4;
            if (item.classList.contains('stable')) return;
            
            if (isUp) {
                item.textContent = `▲ ${change}%`;
                item.className = 'up';
            } else {
                item.textContent = `▼ ${change}%`;
                item.className = 'down';
            }
        });
    }, 5000);
});
