// Slider functionality with radio buttons
const radioButtons = document.querySelectorAll('.slider-radio');
const slidesContainer = document.querySelector('.slides-container');

// Optional: Auto-rotate slides every 5 seconds
let currentSlide = 1;

setInterval(() => {
    const nextSlide = currentSlide === 3 ? 1 : currentSlide + 1;
    document.getElementById(`slide${nextSlide}`).checked = true;
    currentSlide = nextSlide;
}, 15000);

// Drag-to-navigate for slides container
let isDown = false;
let startX;
let dragThreshold = 50; // minimum drag distance to trigger slide change

slidesContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // left button only
    isDown = true;
    slidesContainer.classList.add('dragging');
    startX = e.pageX;
    document.body.style.userSelect = 'none';
    e.preventDefault();
});

slidesContainer.addEventListener('mouseleave', () => {
    isDown = false;
    slidesContainer.classList.remove('dragging');
});

slidesContainer.addEventListener('mouseup', (e) => {
    if (!isDown) return;
    isDown = false;
    slidesContainer.classList.remove('dragging');
    
    const endX = e.pageX;
    const dragDistance = startX - endX;
    
    // Drag right (negative distance) = previous slide
    // Drag left (positive distance) = next slide
    if (Math.abs(dragDistance) > dragThreshold) {
        if (dragDistance > 0) {
            // Dragged left, show next slide
            const nextSlide = currentSlide === 3 ? 1 : currentSlide + 1;
            document.getElementById(`slide${nextSlide}`).checked = true;
            currentSlide = nextSlide;
        } else {
            // Dragged right, show previous slide
            const prevSlide = currentSlide === 1 ? 3 : currentSlide - 1;
            document.getElementById(`slide${prevSlide}`).checked = true;
            currentSlide = prevSlide;
        }
    }
});

['mouseup', 'mouseleave'].forEach(evt => {
    slidesContainer.addEventListener(evt, () => {
        document.body.style.userSelect = '';
    });
});
// Card Modal Functionality
// Card Modal Functionality
const cards = Array.from(document.querySelectorAll('.card'));
const modal = document.getElementById('cardModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentIndex = 0;

function openModal(index){
    const img = cards[index].querySelector('img');
    modalImage.src = img.src;
    modalImage.style.width = "50rem"
    modalImage.style.height = "50rem"
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    currentIndex = index;
}

function closeModal(){
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

cards.forEach((card, idx) => {
    card.addEventListener('click', () => openModal(idx));
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

prevBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openModal(currentIndex);
});

nextBtn.addEventListener('click', (e)=>{
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % cards.length;
    openModal(currentIndex);
});

// keyboard navigation
document.addEventListener('keydown', (e)=>{
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeModal();
});

// Drag-to-scroll for .scrollX containers (mouse)
const scrollContainers = document.querySelectorAll('.scrollX');
scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // left button only
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        // prevent text selection while dragging
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    container.addEventListener('mouseleave', ()=>{
        isDown = false; container.classList.remove('dragging');
    });
    container.addEventListener('mouseup', ()=>{
        isDown = false; container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        // drag multiplier for easier dragging
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollLeft - walk;
    });

    // restore userSelect when drag ends
    ['mouseup','mouseleave'].forEach(evt => {
        container.addEventListener(evt, ()=>{ document.body.style.userSelect = ''; });
    });
});