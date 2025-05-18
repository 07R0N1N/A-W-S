document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('swipe-container');
    let index = 1;                // 0=reception, 1=home, 2=ceremony (start at home)
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let initialTransform = 0;
  
    // Navigation buttons (new order)
    const navButtons = [
        document.getElementById('nav-reception'),
        document.getElementById('nav-cover'),
        document.getElementById('nav-ceremony')
    ];
  
    // Apply the transform based on index
    function updateView() {
        console.log('updateView called, index:', index);
        container.style.transform = `translateX(-${index * 100}vw)`;
        // Highlight the active nav button
        navButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        // Debug: log which section is visible
        const sections = container.querySelectorAll('section');
        sections.forEach((section, i) => {
            if (i === index) {
                console.log(`VISIBLE: index ${i}, id=${section.id}`);
            } else {
                console.log(`HIDDEN: index ${i}, id=${section.id}`);
            }
        });
    }
  
    // Touch/Mouse event handlers
    function handleDragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        initialTransform = -index * 100;
        container.style.transition = 'none';
        console.log('Drag start', { startX, index });
    }
  
    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = ((currentX - startX) / window.innerWidth) * 100;
        const newTransform = initialTransform + diff;
        container.style.transform = `translateX(${newTransform}vw)`;
        console.log('Dragging', { currentX, diff, newTransform });
    }
  
    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        container.style.transition = 'transform 0.3s ease';
        
        const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
        const diff = ((endX - startX) / window.innerWidth) * 100;
        console.log('Drag end', { endX, diff });
        
        if (Math.abs(diff) > 20) { // Threshold for page change
            if (diff > 0 && index > 0) {
                index--;
            } else if (diff < 0 && index < 2) {
                index++;
            }
        }
        updateView();
    }
  
    // Touch events
    container.addEventListener('touchstart', handleDragStart);
    container.addEventListener('touchmove', handleDragMove);
    container.addEventListener('touchend', handleDragEnd);
  
    // Mouse events
    container.addEventListener('mousedown', handleDragStart);
    container.addEventListener('mousemove', handleDragMove);
    container.addEventListener('mouseup', handleDragEnd);
    container.addEventListener('mouseleave', handleDragEnd);
  
    // Footer-nav click handlers (new order)
    navButtons[0].addEventListener('click', () => { index = 0; console.log('Nav: Reception'); updateView(); });
    navButtons[1].addEventListener('click', () => { index = 1; console.log('Nav: Home'); updateView(); });
    navButtons[2].addEventListener('click', () => { index = 2; console.log('Nav: Ceremony'); updateView(); });

    // Initial highlight
    updateView();
});
  