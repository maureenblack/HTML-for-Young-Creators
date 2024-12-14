document.addEventListener('DOMContentLoaded', () => {
    // Array of random images
    const randomImages = [
        {
            src: "../images/Mt._Eloumdem,_Yaoundé_Cameroon.jpg",
            alt: "Beautiful Mount Eloumdem in Yaoundé"
        },
        {
            src: "../images/giiyotech_logo.png",
            alt: "GiiyoTech Logo"
        },
        {
            src: "../images/Mt._Eloumdem,_Yaoundé_Cameroon.jpg",
            alt: "Scenic view of Mount Eloumdem"
        }
    ];

    // Code Editor Functionality
    const codeEditors = document.querySelectorAll('.code-editor');
    const runButtons = document.querySelectorAll('.run-button');
    const previewWindows = document.querySelectorAll('.preview-window');

    runButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const code = codeEditors[index].textContent;
            previewWindows[index].innerHTML = code;
        });
    });

    // Get random image from array
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * randomImages.length);
        return randomImages[randomIndex];
    }

    // Try It Buttons
    const tryItButtons = document.querySelectorAll('.try-it-button');
    tryItButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tag = button.dataset.tag;
            const editor = button.closest('.content-box').querySelector('.code-editor');
            let example = '';
            
            switch(tag) {
                case 'h1':
                    example = '<h1>Mount Eloumdem, Yaoundé</h1>';
                    break;
                case 'p':
                    example = '<p>Discover the breathtaking Mount Eloumdem in Yaoundé, Cameroon. This majestic mountain offers stunning views of the capital city and its surroundings.</p>';
                    break;
                case 'img':
                    const randomImg = getRandomImage();
                    example = `<img src="${randomImg.src}" alt="${randomImg.alt}" style="width: 100%; max-width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
                    break;
            }
            
            editor.textContent = example;
        });
    });
});
