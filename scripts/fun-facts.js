// Array of verified tech facts from around the world
const funFacts = [
    // Historical Tech Facts
    "In 1969, the first-ever message sent over ARPANET (predecessor to the Internet) was 'LO'. They tried to type 'LOGIN' but the system crashed after two letters!",
    "The first computer mouse was made of wood in the 1960s by Douglas Engelbart",
    "The first website ever created (1991) is still online at info.cern.ch",
    
    // African Tech Facts
    "In 2020, Africa's first smartphone factory opened in Rwanda, producing high-quality phones for the local market",
    "M-PESA, launched in Kenya in 2007, became the world's first mobile money transfer service and revolutionized banking in Africa",
    "Africa's Silicon Savannah in Kenya is home to over 200 tech startups and continues to grow rapidly",
    
    // Global Tech Facts
    "Over 90% of the world's data was created in the last two years alone",
    "The first computer programmer was Ada Lovelace, who wrote the first algorithm in 1843",
    "The first computer bug was an actual bug - a moth found trapped in a computer relay in 1947",
    
    // Modern Tech Facts
    "Every minute, over 500 hours of video are uploaded to YouTube",
    "The average smartphone today has more computing power than all of NASA's combined computing power in 1969",
    "Bitcoin's mysterious creator, Satoshi Nakamoto, disappeared in 2011 with over 1 million bitcoins",
    
    // Interesting Tech Facts
    "The first iPad was actually created by Microsoft in 2001, called the Microsoft Tablet PC",
    "The most expensive domain name ever sold was Cars.com for $872 million in 2015",
    "The first text message ever sent was 'Merry Christmas' in 1992"
];

// Function to get a set of 10 random facts for the day
function getRandomFactsForDay() {
    // Use the current date as seed for consistency throughout the day
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
        seed += today.charCodeAt(i);
    }

    // Fisher-Yates shuffle with seeded random
    const shuffled = [...funFacts];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const seededRandom = (seed * (i + 1)) % shuffled.length;
        [shuffled[i], shuffled[seededRandom]] = [shuffled[seededRandom], shuffled[i]];
    }

    // Return first 10 facts
    return shuffled.slice(0, 10);
}

let currentFactIndex = 0;
let dailyFacts = [];

// Function to update the fun fact display
function updateFunFact() {
    const funFactDisplay = document.getElementById('funFactDisplay');
    
    if (!funFactDisplay) {
        console.error('Fun fact element not found!');
        return;
    }

    try {
        // Get today's facts if we haven't already
        if (dailyFacts.length === 0) {
            dailyFacts = getRandomFactsForDay();
        }

        // Display current fact
        funFactDisplay.textContent = dailyFacts[currentFactIndex];
        
        // Update index for next time
        currentFactIndex = (currentFactIndex + 1) % dailyFacts.length;
    } catch (error) {
        console.error('Error updating fun fact:', error);
    }
}

// Update fact when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateFunFact();
    // Change fact every 5 minutes (300000 milliseconds)
    setInterval(updateFunFact, 300000);
});
