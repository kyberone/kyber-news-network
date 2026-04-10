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
            if (item.classList.contains('stable')) return;
            const currentVal = parseFloat(item.textContent.split(' ')[1]);
            const change = (Math.random() * 0.2 - 0.1).toFixed(2);
            const newVal = (parseFloat(currentVal) + parseFloat(change)).toFixed(2);
            const isUp = newVal > 0;
            
            item.textContent = `${isUp ? '▲' : '▼'} ${Math.abs(newVal)}%`;
            item.className = isUp ? 'up' : 'down';
        });
    }, 5000);

    // Live Feed Switching
    const camBtns = document.querySelectorAll('.cam-btn');
    const mainFeed = document.getElementById('main-feed');
    const camLabel = document.getElementById('cam-label');
    const feedSector = document.getElementById('feed-sector');
    const feedThreat = document.getElementById('feed-threat');

    const feeds = [
        {
            name: 'CAM-01: NEVARRO APPROACH',
            img: 'images/nevarro.png',
            sector: '004-B',
            threat: 'LOW',
            filter: 'sepia(1) hue-rotate(90deg) brightness(0.7)'
        },
        {
            name: 'CAM-02: CORUSCANT SENATE',
            img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
            sector: '001-A',
            threat: 'MODERATE',
            filter: 'grayscale(0.5) brightness(0.8) contrast(1.2) sepia(0.2)'
        },
        {
            name: 'CAM-03: TATOOINE DOCKING BAY 94',
            img: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800',
            sector: '012-C',
            threat: 'HIGH',
            filter: 'sepia(0.8) brightness(0.9) contrast(1.1)'
        }
    ];

    camBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const camIdx = parseInt(btn.getAttribute('data-cam'));
            const feed = feeds[camIdx];

            // Update UI
            camBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Feed
            mainFeed.style.backgroundImage = `url('${feed.img}')`;
            mainFeed.style.filter = feed.filter;
            camLabel.textContent = feed.name;
            feedSector.textContent = feed.sector;
            feedThreat.textContent = feed.threat;

            // Trigger scanner pulse effect
            const blips = document.querySelectorAll('.scanner-blip');
            blips.forEach(blip => {
                blip.style.top = Math.random() * 80 + 10 + '%';
                blip.style.left = Math.random() * 80 + 10 + '%';
            });
        });
    });

    // Bounty Cycling
    const bounties = [
        {
            name: 'UNKNOWN ACCOMPLICE',
            reward: '50,000 CREDITS',
            status: 'AT LARGE',
            img: 'images/bounty.png'
        },
        {
            name: 'PIRATE CAPTAIN VANE',
            reward: '120,000 CREDITS',
            status: 'WANTED FOR RAIDING',
            img: 'images/underworld.png'
        },
        {
            name: 'REMNANT OFFICER ZALE',
            reward: '250,000 CREDITS',
            status: 'WANTED FOR WAR CRIMES',
            img: 'images/trandoshan.png'
        }
    ];

    let currentBounty = 0;
    const bountyImg = document.getElementById('bounty-img');
    const bountyName = document.getElementById('bounty-name');
    const bountyReward = document.getElementById('bounty-reward');
    const bountyStatus = document.getElementById('bounty-status');
    const nextBtn = document.getElementById('next-bounty');
    const prevBtn = document.getElementById('prev-bounty');

    const updateBounty = (idx) => {
        const b = bounties[idx];
        bountyImg.style.backgroundImage = `url('${b.img}')`;
        bountyName.textContent = b.name;
        bountyReward.textContent = `REWARD: ${b.reward}`;
        bountyStatus.textContent = `STATUS: ${b.status}`;
    };

    nextBtn.addEventListener('click', () => {
        currentBounty = (currentBounty + 1) % bounties.length;
        updateBounty(currentBounty);
    });

    prevBtn.addEventListener('click', () => {
        currentBounty = (currentBounty - 1 + bounties.length) % bounties.length;
        updateBounty(currentBounty);
    });

    // Read More & Nav Feedback
    const readMoreBtn = document.querySelector('.read-more');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            alert('TRANSMISSION ENCRYPTED: Access denied. Requires New Republic Security Clearance Level 4.');
        });
    }

    const navLinks = document.querySelectorAll('nav a, .sector-card, .news-card');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.tagName === 'A' && link.getAttribute('href') === '#') {
                e.preventDefault();
            }
            console.log('Interpreting galactic coordinates...');
            // In a real app, this would navigate to a sub-page
        });
    });
});
