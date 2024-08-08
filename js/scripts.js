window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitSuccessMessage = document.getElementById('submitSuccessMessage');
    const submitErrorMessage = document.getElementById('submitErrorMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async event => {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message')
            };

            try {
                // Send data to backend
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Show success message
                    submitSuccessMessage.classList.remove('d-none');
                    submitErrorMessage.classList.add('d-none');
                    contactForm.reset(); // Clear the form
                } else {
                    // Show error message
                    submitErrorMessage.classList.remove('d-none');
                    submitSuccessMessage.classList.add('d-none');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                submitErrorMessage.classList.remove('d-none');
                submitSuccessMessage.classList.add('d-none');
            }
        });
    }
});
