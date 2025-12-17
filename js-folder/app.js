// =====================
// Favorite button toggle
// =====================
const favoriteBtn = document.getElementById("favoriteBtn");
const favoriteIcon = document.getElementById("favoriteIcon");

if (favoriteBtn && favoriteIcon) {
  favoriteBtn.addEventListener("click", function () {
    favoriteBtn.classList.toggle("active");
    favoriteIcon.classList.toggle("fa-regular");
    favoriteIcon.classList.toggle("fa-solid");
  });
}


  // custom hamburger

  const toggler = document.querySelector('.navbar-toggler');
  const barsIcon = toggler.querySelector('.fa-bars');
  const closeIcon = toggler.querySelector('.fa-xmark');

  toggler.addEventListener('click', () => {
    const isOpen = toggler.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      // Menu is open → show X
      barsIcon.classList.add('d-none');
      closeIcon.classList.remove('d-none');
    } else {
      // Menu is closed → show hamburger
      barsIcon.classList.remove('d-none');
      closeIcon.classList.add('d-none');
    }
  });






// =====================
// Paw trail in hero section
// =====================

let lastX = 0;
let lastY = 0;
const minDistance = 80; // same spacing as original code
let pawId = 0;

// We only track inside the hero section
const heroSection = document.querySelector(".hero-section");

if (heroSection) {
  heroSection.addEventListener("mousemove", handleHeroMove);
  heroSection.addEventListener("touchmove", handleHeroMove, { passive: false });
}

function handleHeroMove(e) {
  let clientX, clientY;

  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  // Position relative to the hero section
  const rect = heroSection.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const dx = x - lastX;
  const dy = y - lastY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // First paw OR moved enough distance
  if ((lastX === 0 && lastY === 0) || distance > minDistance) {
    lastX = x;
    lastY = y;
    createHeroPaw(x, y, dx, dy);
  }
}

function createHeroPaw(x, y, dx, dy) {
  const paw = document.createElement("div");
  paw.className = "paw";
   paw.innerHTML = '<i class="fa-solid fa-paw"></i>';

  // angle like original GSAP version
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  // flip every second paw (scaleY -1 like id & 1 ? -1 : 1)
  const flipY = (pawId & 1) ? -1 : 1;
  pawId++;

  paw.style.left = x + "px";
  paw.style.top = y + "px";
  paw.style.transform =
    `translate(-50%, -50%) rotate(${angle}deg) scaleY(${flipY})`;

  // append inside hero only
  heroSection.appendChild(paw);

  // when fade animation ends, remove from DOM
  paw.addEventListener("animationend", () => {
    paw.remove();
  });
}













// In your app.js
// Animate stats on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let startValue = 0;
        const duration = 2000;
        const increment = finalValue / (duration / 16);
        
        const updateCount = () => {
          startValue += increment;
          if (startValue < finalValue) {
            stat.textContent = Math.ceil(startValue) + '+';
            setTimeout(updateCount, 16);
          } else {
            stat.textContent = finalValue + '+';
          }
        };
        updateCount();
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-col').forEach(stat => observer.observe(stat));



















// Add to your app.js file

// Gallery Load More Functionality
document.addEventListener('DOMContentLoaded', function() {
  const loadMoreBtn = document.getElementById('loadMoreGallery');
  let loadedCount = 6;
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // Simulate loading more gallery items
      const galleryGrid = document.querySelector('.gallery-grid');
      const loadingSpinner = document.createElement('div');
      loadingSpinner.className = 'text-center my-3';
      loadingSpinner.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';
      
      loadMoreBtn.disabled = true;
      loadMoreBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Loading...';
      
      galleryGrid.after(loadingSpinner);
      
      // Simulate API call delay
      setTimeout(() => {
        // Add more gallery items
        const newItems = [
          {
            img: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg",
            title: "Rocky's Beach Day",
            date: "July 2023",
            text: "First beach trip was a success!"
          },
          {
            img: "https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg",
            title: "Whiskers & Coffee",
            date: "May 2023",
            text: "Perfect companion for morning coffee"
          }
        ];
        
        newItems.forEach(item => {
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
          galleryItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="img-fluid">
            <div class="gallery-overlay">
              <div class="gallery-content">
                <div class="d-flex align-items-center mb-2">
                  <div class="gallery-user me-2">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <p class="gallery-title mb-0">${item.title}</p>
                    <small class="gallery-subtitle">Adopted: ${item.date}</small>
                  </div>
                </div>
                <p class="gallery-text mb-0">"${item.text}"</p>
              </div>
            </div>
          `;
          galleryGrid.appendChild(galleryItem);
          loadedCount++;
        });
        
        loadingSpinner.remove();
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = '<i class="fa-solid fa-images me-2"></i> Load More Stories';
        
        // Hide button if we have enough items
        if (loadedCount >= 12) {
          loadMoreBtn.style.display = 'none';
          const message = document.createElement('p');
          message.className = 'text-muted mt-3';
          message.textContent = 'All stories loaded!';
          loadMoreBtn.after(message);
        }
        
        // Re-initialize hover effects for new items
        initializeGalleryHover();
      }, 1500);
    });
  }
  
  function initializeGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
    });
  }
  
  // Initialize gallery hover effects
  initializeGalleryHover();
  
  // Add click to enlarge gallery images
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target.classList.contains('gallery-item') || e.target.tagName === 'IMG') {
        const imgSrc = this.querySelector('img').src;
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        `;
        
        modal.innerHTML = `
          <img src="${imgSrc}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
          <button class="btn btn-light position-absolute top-0 end-0 m-3" style="z-index: 10000;">
            <i class="fa-solid fa-times"></i>
          </button>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function(e) {
          if (e.target === this || e.target.closest('button')) {
            document.body.removeChild(modal);
          }
        });
      }
    });
  });
});