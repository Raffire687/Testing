document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');

            // Redirect if "general" is clicked
            if (sectionId === 'back') {
                window.location.href = 'admin.html';
                return;
            }

            // Remove active class from all items
            document.querySelectorAll('.sidebar-item').forEach(i => {
                i.classList.remove('active');
            });

            // Add active class to clicked item
            this.classList.add('active');

            // Hide all sections
            document.querySelectorAll('.settings-section').forEach(section => {
                section.classList.remove('visible');
            });

            // Show the selected section (if it exists)
            const targetSection = document.getElementById(`${sectionId}-section`);
            if (targetSection) {
                targetSection.classList.add('visible');
            }
        });
    });

    // Make sure the General section is visible by default
    const defaultSection = document.getElementById('general-section');
    if (defaultSection) {
        defaultSection.classList.add('visible');
    }
});
