// CSS Validation and Interaction
function validateCSS(code) {
    // Check if user has made any changes
    const defaultCode = code.includes('/* Style your heading */') && 
                       code.includes('/* Style your paragraph */') && 
                       code.includes('/* Style your list */');
    
    if (defaultCode) {
        throw new Error('Add some CSS styles! Try adding colors, font sizes, and spacing to make your page beautiful.');
    }

    // Check for required properties
    const hasColor = /color\s*:/.test(code);
    const hasFont = /font-size|font-weight|font-family/.test(code);
    const hasSpacing = /margin|padding/.test(code);

    if (!hasColor) {
        throw new Error('Try adding some colors! Use the color property to make your text stand out.');
    }

    if (!hasFont) {
        throw new Error('Style your text! Try using font-size, font-weight, or font-family to make your text look better.');
    }

    if (!hasSpacing) {
        throw new Error('Add some spacing! Use margin or padding to give your elements some breathing room.');
    }

    // Check for syntax errors
    try {
        const testStyle = document.createElement('style');
        testStyle.textContent = code;
        document.head.appendChild(testStyle);
        document.head.removeChild(testStyle);
    } catch (error) {
        throw new Error('Check your CSS syntax! Make sure to use correct punctuation like colons (:) and semicolons (;).');
    }
}

function showMessage(message, type = 'error') {
    const errorContainer = document.querySelector('.error-container');
    const errorMessage = document.querySelector('.error-message');
    const errorSolution = document.querySelector('.error-solution');
    
    if (errorContainer && errorMessage) {
        errorContainer.style.display = 'block';
        errorMessage.textContent = message;
        
        errorContainer.className = 'error-container ' + type;
        
        if (errorSolution) {
            if (type === 'error') {
                errorSolution.style.display = 'block';
                errorSolution.innerHTML = `
                    <h4> Need help?</h4>
                    <p>Here's what you can add:</p>
                    <ul>
                        <li>Use <code>color: blue;</code> to change text color</li>
                        <li>Use <code>font-size: 24px;</code> to change text size</li>
                        <li>Use <code>margin: 10px;</code> to add spacing</li>
                        <li>Remember to end each style with a semicolon (;)</li>
                    </ul>`;
            } else {
                errorSolution.style.display = 'none';
            }
        }
    }
}

function updatePreview(code) {
    try {
        validateCSS(code);
        const previewWindow = document.querySelector('.preview-window');
        if (previewWindow) {
            const style = document.createElement('style');
            style.textContent = code;
            previewWindow.innerHTML = `
                <div class="preview-content">
                    <style>${code}</style>
                    <h1>Welcome to Mount Eloumdem</h1>
                    <p>Discover the beautiful Mount Eloumdem in Yaoundé, Cameroon</p>
                    <ul>
                        <li>Hiking</li>
                        <li>Photography</li>
                        <li>Bird watching</li>
                    </ul>
                </div>`;
            showMessage('Great job!  Your styles look amazing! Ready for the next lesson?', 'success');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const runButtons = document.querySelectorAll('.run-button');
    const codeEditors = document.querySelectorAll('.code-editor');

    // Run button functionality
    runButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const code = codeEditors[index].textContent;
            updatePreview(code);
        });
    });
});
