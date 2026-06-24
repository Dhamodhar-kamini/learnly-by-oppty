window.addEventListener('load', function() {
    const loader = document.getElementById('loader-wrapper');
    
    // Wait for 3 seconds (3000 milliseconds)
    setTimeout(() => {
      // Start the fade out
      loader.style.opacity = '0';
      
      // Wait 500ms for the fade transition to finish, then hide completely
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500); 
      
    }, 500); // <-- 3 seconds timer here
  });