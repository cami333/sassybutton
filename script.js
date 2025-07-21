// Track which job descriptions are currently in sassy mode
let sassyStates = {};

// Toggle between original and sassy content
function toggleSassy(jobIndex) {
    const originalContent = document.getElementById(`original-${jobIndex}`);
    const sassyContent = document.getElementById(`sassy-${jobIndex}`);
    const button = document.querySelector(`[onclick="toggleSassy(${jobIndex})"]`);
    
    // Check current state
    const isSassy = sassyStates[jobIndex] || false;
    
    if (isSassy) {
        // Switch back to original
        originalContent.style.display = 'block';
        sassyContent.style.display = 'none';
        button.textContent = 'Make it Sassy';
        button.style.background = '#6366f1';
        sassyStates[jobIndex] = false;
    } else {
        // Switch to sassy
        originalContent.style.display = 'none';
        sassyContent.style.display = 'block';
        button.textContent = 'Back to Boring';
        button.style.background = '#059669';
        sassyStates[jobIndex] = true;
    }
    
    // Add a little animation effect
    const content = isSassy ? originalContent : sassyContent;
    content.style.animation = 'none';
    setTimeout(() => {
        content.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}

// Add some fun interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to job cards
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click sound effect (optional - you can remove this if you don't want sound)
    const buttons = document.querySelectorAll('.sassy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Create a subtle click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add some random sassy comments that appear occasionally
    const sassyComments = [
        "Oh, you want the REAL version? 😏",
        "Finally, someone who can handle the truth! 🔥",
        "Buckle up, buttercup! 🎢",
        "Time for some reality! ✨",
        "Let's spice things up! 🌶️"
    ];
    
    // Show random sassy comment when toggling (10% chance)
    window.originalToggleSassy = toggleSassy;
    window.toggleSassy = function(jobIndex) {
        if (Math.random() < 0.1 && !sassyStates[jobIndex]) {
            const comment = sassyComments[Math.floor(Math.random() * sassyComments.length)];
            showToast(comment);
        }
        originalToggleSassy(jobIndex);
    };
});

// Toast notification function
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6366f1;
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
