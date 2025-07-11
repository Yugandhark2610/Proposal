// Configuration - Replace with your actual Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzjrnvd';

// Global variables
let noClickCount = 0;
let noButtonMoved = false;

// DOM elements
const proposalSection = document.getElementById('proposal-section');
const successSection = document.getElementById('success-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const hintMessage = document.getElementById('hint-message');
const balloonsContainer = document.getElementById('balloons-container');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Send page visit notification
    sendPageVisitNotification();
    
    // Add event listeners
    yesBtn.addEventListener('click', handleYesClick);
    noBtn.addEventListener('click', handleNoClick);
    
    // Enhanced mobile touch support
    noBtn.addEventListener('touchstart', handleNoTouch, { passive: false });
    noBtn.addEventListener('touchmove', handleNoTouch, { passive: false });
    noBtn.addEventListener('mouseenter', handleNoHover);
    
    // Prevent context menu on long press
    noBtn.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // Handle orientation change
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);
});

// Handle "Yes" button click
function handleYesClick() {
    // Hide proposal section
    proposalSection.classList.add('hidden');
    
    // Show success section
    successSection.classList.remove('hidden');
    
    // Create red balloon animation in background
    createRedBalloonBackground();
    
    // Send success notification
    sendSuccessNotification();
    
    // Add celebration confetti effect
    setTimeout(() => {
        createConfettiEffect();
    }, 1000);
}

// Handle "No" button touch events (mobile)
function handleNoTouch(e) {
    e.preventDefault();
    e.stopPropagation();
    
    noClickCount++;
    
    // Move the button randomly
    moveNoButtonMobile();
    
    // Show messages based on click count
    showNoClickMessage();
}

// Handle "No" button click/touch
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
        
        // Remove No button from screen
        noBtn.style.display = "none";

        // Optional: Try to close the browser tab (will work only if opened via JS like window.open)
        setTimeout(() => {
            showHintMessage("Goodbye... 💔");

            // Attempt to close (will only work in some browsers)
            window.open('', '_self').close();

            // Fallback redirect if close fails
            setTimeout(() => {
                window.location.href = "https://www.google.com"; // Or any goodbye page
            }, 1000);
        }, 2000);
    }
}


// Show message based on "No" click count
function showNoClickMessage() {
    if (noClickCount === 1) {
        showHintMessage("Come on, you know you want to... 💕");
    } else if (noClickCount === 2) {
        showHintMessage("Think again... I'm waiting 💕");
    } else if (noClickCount === 3) {
        showSadMessage();
    } else if (noClickCount === 4) {
        showHintMessage("You know you want to say yes... 😘");
    } else if (noClickCount === 6) {
        showHintMessage("I'll keep waiting for you... 💖");
    }
}

// Show sad message after 3 "No" clicks
function showSadMessage() {
    const sadMessages = [
        "😢 That breaks my heart a little... 💔",
        "😭 But I still believe in us... 🥺",
        "😔 My heart is crying... 💔😢",
        "🥺 Please don't break my heart... 😭💔"
    ];
    
    const randomSadMessage = sadMessages[Math.floor(Math.random() * sadMessages.length)];
    showHintMessage(randomSadMessage);
    
    // Add sad animation to the proposal section
    proposalSection.style.animation = 'sadShake 1s ease-in-out';
    
    setTimeout(() => {
        proposalSection.style.animation = '';
    }, 1000);
}

// Handle "No" button hover
function handleNoHover() {
    if (noClickCount > 0 && window.innerWidth > 768) {
        moveNoButton();
    }
}

// Move the "No" button to a random position (desktop)
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe bounds
    const maxX = Math.max(0, containerRect.width - btnRect.width);
    const maxY = Math.max(0, containerRect.height - btnRect.height);
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply position
    noBtn.style.position = 'absolute';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = `translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * 100 - 50}px)`;
    
    // Add wiggle animation
    noBtn.style.animation = 'wiggle 0.5s ease-in-out';
    
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

// Move the "No" button for mobile devices
function moveNoButtonMobile() {
    const container = document.querySelector('.buttons-container');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe bounds within viewport
    const maxX = Math.max(0, viewportWidth - btnRect.width - 40); // 40px padding
    const maxY = Math.max(0, viewportHeight - btnRect.height - 200); // Extra space for other elements
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Apply position relative to viewport
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.style.transform = 'none';
    noBtn.style.zIndex = '1000';
    
    // Add mobile-specific wiggle animation
    noBtn.style.animation = 'mobileWiggle 0.6s ease-in-out';
    
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 600);
}

// Handle orientation change
function handleOrientationChange() {
    setTimeout(() => {
        // Reset button position on orientation change
        if (noButtonMoved) {
            resetNoButtonPosition();
        }
    }, 100);
}

// Handle window resize
function handleResize() {
    if (noButtonMoved && window.innerWidth <= 768) {
        resetNoButtonPosition();
    }
}

// Reset "No" button position
function resetNoButtonPosition() {
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.transform = 'none';
    noBtn.style.zIndex = 'auto';
    noButtonMoved = false;
}

// Show hint message
function showHintMessage(message) {
    hintMessage.textContent = message;
    hintMessage.classList.add('show');
    
    setTimeout(() => {
        hintMessage.classList.remove('show');
    }, 4000); // Increased time for sad messages
}

// Create red balloon background animation
function createRedBalloonBackground() {
    const redBalloons = ['🎈', '❤️', '💕', '💖', '💗', '💝', '🌹', '💐'];
    
    // Create continuous balloon animation
    let balloonInterval = setInterval(() => {
        // Create multiple balloons at once
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createBackgroundBalloon(redBalloons[Math.floor(Math.random() * redBalloons.length)]);
            }, i * 500);
        }
    }, 2000);
    
    // Initial burst of balloons
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createBackgroundBalloon(redBalloons[Math.floor(Math.random() * redBalloons.length)]);
        }, i * 300);
    }
    
    // Stop creating new balloons after 30 seconds
    setTimeout(() => {
        clearInterval(balloonInterval);
    }, 30000);
}

// Create individual background balloon
function createBackgroundBalloon(emoji) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon background-balloon';
    balloon.textContent = emoji;
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDelay = Math.random() * 2 + 's';
    balloon.style.animationDuration = (Math.random() * 5 + 8) + 's'; // Slower animation
    balloon.style.fontSize = (Math.random() * 2 + 1.5) + 'rem'; // Varied sizes
    balloon.style.opacity = Math.random() * 0.4 + 0.3; // Semi-transparent
    balloon.style.zIndex = '1'; // Behind other content
    
    balloonsContainer.appendChild(balloon);
    
    // Remove balloon after animation
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, 13000);
}

// Create balloon animation (original function - kept for compatibility)
function createBalloonAnimation() {
    createRedBalloonBackground();
}

// Create individual balloon (original function - kept for compatibility)
function createBalloon(emoji) {
    createBackgroundBalloon(emoji);
}

// Create confetti effect
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
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer);
        }, i * 30);
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Create individual confetti piece
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
    
    // Remove confetti piece after animation
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Send page visit notification
async function sendPageVisitNotification() {
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: '💕 Someone visited your proposal page!',
                message: `Page visited at ${new Date().toLocaleString()}`,
                type: 'page_visit'
            })
        });
        console.log('Page visit logged');
    } catch (error) {
        console.log('Could not log page visit:', error);
    }
}

// Send success notification
async function sendSuccessNotification() {
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: '🎉 SHE SAID YES!!! 💍',
                message: `She said YES at ${new Date().toLocaleString()}! Time to celebrate! 🎊`,
                type: 'proposal_accepted'
            })
        });
        console.log('Success notification sent');
    } catch (error) {
        console.log('Could not send success notification:', error);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
    }
    
    @keyframes mobileWiggle {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(5deg); }
        50% { transform: scale(0.9) rotate(-5deg); }
        75% { transform: scale(1.1) rotate(5deg); }
    }
    
    @keyframes sadShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .background-balloon {
        position: fixed !important;
        z-index: 1 !important;
        animation: backgroundBalloonFloat 10s ease-in-out infinite !important;
    }
    
    @keyframes backgroundBalloonFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0.3;
        }
        10% {
            opacity: 0.6;
        }
        50% {
            opacity: 0.4;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    /* Mobile-specific animations */
    @media (max-width: 768px) {
        @keyframes balloonFloat {
            0% {
                transform: translateY(100vh) rotate(0deg) scale(0.8);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(1.2);
                opacity: 0;
            }
        }
        
        .balloon {
            font-size: 2rem !important;
        }
        
        .background-balloon {
            font-size: 1.5rem !important;
        }
        
        .success-section {
            animation: successPulseMobile 2s ease-out !important;
        }
        
        @keyframes successPulseMobile {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                transform: scale(1.02);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes backgroundBalloonFloat {
            0% {
                transform: translateY(100vh) rotate(0deg) scale(0.8);
                opacity: 0.2;
            }
            10% {
                opacity: 0.5;
            }
            50% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(1.1);
                opacity: 0;
            }
        }
    }
`;
document.head.appendChild(style);