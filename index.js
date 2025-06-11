// ========== Footer Year ==========
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ========== Mobile Menu ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========== Scroll Animations ==========
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .service-card, .hero-card').forEach(card => {
    observer.observe(card);
});

// ========== Privacy Policy Modal ==========
const privacyModal = document.getElementById('privacyModal');
const privacyLink = document.getElementById('privacy-policy-link');
const closeModal = document.getElementById('closeModal');

privacyLink?.addEventListener('click', function (e) {
    e.preventDefault();
    privacyModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal?.addEventListener('click', function () {
    privacyModal?.classList.remove('active');
    document.body.style.overflow = '';
});

privacyModal?.addEventListener('click', function (e) {
    if (e.target === privacyModal) {
        privacyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== Terms of Service Modal ==========
const termsModal = document.getElementById('termsModal');
const termsLink = document.getElementById('terms-of-service-link');
const closeTermsModal = document.getElementById('closeTermsModal');

termsLink?.addEventListener('click', function (e) {
    e.preventDefault();
    termsModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeTermsModal?.addEventListener('click', function () {
    termsModal?.classList.remove('active');
    document.body.style.overflow = '';
});

termsModal?.addEventListener('click', function (e) {
    if (e.target === termsModal) {
        termsModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ========== Close Modals with Escape Key ==========
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        if (privacyModal?.classList.contains('active')) {
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (termsModal?.classList.contains('active')) {
            termsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (document.getElementById("confirmationPopup")?.classList.contains('show')) {
            hideConfirmation();
        }
    }
});

// ========== Contact Form Submission ==========
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            showConfirmation();
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Sorry, there was an error sending your message. Please try again.');
        console.error('Form submission error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});

// ========== Confirmation Popup ==========
function showConfirmation() {
    const popup = document.getElementById("confirmationPopup");
    if (!popup) return;

    popup.style.display = "block";
    setTimeout(() => popup.classList.add("show"), 10);
    setTimeout(hideConfirmation, 5000);
}

function hideConfirmation() {
    const popup = document.getElementById("confirmationPopup");
    if (!popup) return;

    popup.classList.remove("show");
    setTimeout(() => {
        popup.style.display = "none";
    }, 400);
}

document.getElementById("confirmationPopup")?.addEventListener("click", function (e) {
    if (e.target === this) hideConfirmation();
});
