// Configuration - Replace with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzjrnvd';

// Global variables
let noClickCount = 0;

// DOM elements
const proposalSection = document.getElementById('proposal-section');
const successSection = document.getElementById('success-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const hintMessage = document.getElementById('hint-message');
const balloonsContainer = document.getElementById('balloons-container');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Send page visit notification
    sendPageVisitNotification();

    // Event listeners
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);

    // Prevent context menu on long press
    noBtn.addEventListener('contextmenu', (e) => e.preventDefault());
});

// Handle "Yes" button click
function handleYesClick() {
    proposalSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    createRedBalloonBackground();
    sendSuccessNotification();

    setTimeout(() => {
        createConfettiEffect();
    }, 1000);
}

// Handle "No" button click
function handleNoClick(e) {
    e.preventDefault();
    e.stopPropagation();

    noClickCount++;

    if (noClickCount === 1) {
        showHintMessage("😢 That breaks my heart a little...");
    } else if (noClickCount === 2) {
        showHintMessage("😭 But I still believe in us...");
    } else if (noClickCount === 3) {
        showHintMessage("💔 Please don’t do this... 😭");
    } else if (noClickCount >= 4) {
        showHintMessage("Goodbye... 💔");
        setTimeout(() => {
            window.open('', '_self').close();
            setTimeout(() => {
                window.location.href = "https://www.google.com";
            }, 1000);
        }, 1500);
    }
}

// Show hint message
function showHintMessage(message) {
    hintMessage.textContent = message;
    hintMessage.classList.add('show');
    setTimeout(() => {
        hintMessage.classList.remove('show');
    }, 4000);
}

// Balloon background
function createRedBalloonBackground() {
    const redBalloons = ['🎈', '❤️', '💕', '💖', '💗', '💝', '🌹', '💐'];
    let balloonInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createBackgroundBalloon(redBalloons[Math.floor(Math.random() * redBalloons.length)]);
            }, i * 500);
        }
    }, 2000);

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createBackgroundBalloon(redBalloons[Math.floor(Math.random() * redBalloons.length)]);
        }, i * 300);
    }

    setTimeout(() => {
        clearInterval(balloonInterval);
    }, 30000);
}

function createBackgroundBalloon(emoji) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon background-balloon';
    balloon.textContent = emoji;
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    balloon.style.animationDuration = (Math.random() * 5 + 8) + 's';
    balloon.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
    balloon.style.opacity = Math.random() * 0.4 + 0.3;
    balloon.style.zIndex = '1';
    balloonsContainer.appendChild(balloon);

    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, 13000);
}

// Confetti effect
function createConfettiEffect() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '10000';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer);
        }, i * 30);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#fd79a8'];

    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;

    container.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Notify via Formspree
async function sendPageVisitNotification() {
    try {
        await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: '💕 Someone visited your proposal page!',
                message: `Page visited at ${new Date().toLocaleString()}`,
                type: 'page_visit'
            })
        });
    } catch (error) {
        console.log('Could not log page visit:', error);
    }
}

async function sendSuccessNotification() {
    try {
        await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: '🎉 SHE SAID YES!!! 💍',
                message: `She said YES at ${new Date().toLocaleString()}! Time to celebrate! 🎊`,
                type: 'proposal_accepted'
            })
        });
    } catch (error) {
        console.log('Could not send success notification:', error);
    }
}
