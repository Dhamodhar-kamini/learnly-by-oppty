window.addEventListener('load', () => {
    const loader = document.getElementById('lms-loader-wrapper');
    
    // We wait enough time for the track to hit all 3 nodes (at least 2000ms) 
    // before hiding the overlay, ensuring a great first impression.
    setTimeout(() => {
        loader.classList.add('hidden');
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600); // Matches the CSS visibility transition duration
    }, 2200); 
});