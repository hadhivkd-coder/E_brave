document.addEventListener('DOMContentLoaded', () => {

    // --- SET COPYRIGHT YEAR ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- STICKY NAVBAR EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // --- REGISTRATION LOGIC ---
    const registrationForm = document.getElementById('registrationForm');
    const successMsg = document.getElementById('formSuccessMsg');
    const adminBtn = document.getElementById('adminBtn');

    // In-memory sheet/database (stored locally)
    let registrationsList = [];

    // Capture form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // Collect data
            const name = document.getElementById('regName').value.trim();
            const age = document.getElementById('regAge').value.trim();
            const education = document.getElementById('regEducation').value;
            const problems = document.getElementById('regProblems').value.trim();

            // Create a submission object
            const newRegistration = {
                name: name,
                age: age,
                education: education,
                problems: problems || 'N/A', // fallback if empty
                date: new Date().toLocaleString()
            };

            registrationsList.push(newRegistration);
            console.log('New Registration Added:', newRegistration);

            // Show success message smoothly
            successMsg.classList.remove('hidden');
            registrationForm.reset(); // clear input fields

            // Hide success message after 4 seconds
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 4000);
        });
    }

    // --- CSV / SHEET EXPORT ---
    // Convert standard array of objects into CSV format
    function convertToCSV(objArray) {
        const header = ['Name', 'Age', 'Education', 'Challenges/Problems', 'Date Submitted'];
        const rows = objArray.map(obj => [
            `"${obj.name.replace(/"/g, '""')}"`, // safe quoting for CSV
            obj.age,
            `"${obj.education.replace(/"/g, '""')}"`,
            `"${obj.problems.replace(/"/g, '""')}"`,
            `"${obj.date}"`
        ]);

        // Combine header and rows
        return [header.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    // Trigger Sheet File Download
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (registrationsList.length === 0) {
                alert("No registrations yet! Try filling out the form first.");
                return;
            }

            // 1. Convert to CSV text
            const csvStr = convertToCSV(registrationsList);

            // 2. Create a Blob object
            const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });

            // 3. Create a temporary downloadable link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `E-Brave_Registrations_${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("Exported data to sheet automatically.");
        });
    }
});
