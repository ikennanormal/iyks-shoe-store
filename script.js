// Ensure page reloads if coming from back/forward cache
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload();
  }
};

document.addEventListener("DOMContentLoaded", function () {
    // ===== LOCAL STORAGE REGISTRY =====
    const getRegistry = () => {
        return JSON.parse(localStorage.getItem("registry")) || [];
    };

    const saveRegistry = (registry) => {
        localStorage.setItem("registry", JSON.stringify(registry));
    };

    // ===== LOGIN FORM HANDLER =====
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const emailInput = document.getElementById("email").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            let errorMessage = "";

            // Basic validation
            if (emailInput === "") errorMessage += "Email cannot be empty.\n";
            if (passwordInput === "") errorMessage += "Password cannot be empty.\n";

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput)) errorMessage += "Invalid email format.\n";

            if (errorMessage !== "") {
                alert(errorMessage);
                return;
            }

            // Retrieve registry from localStorage
            const registry = getRegistry();

            // Check if user exists in registry
            const user = registry.find(
                u => u.email === emailInput && u.password === passwordInput
            );

            if (user) {
                alert("Login successful! Redirecting to dashboard...");
                window.location.href = "index.html";
            } else {
                alert("Invalid email or password. Please register first.");
            }
        });
    }

    // ===== REGISTRATION FORM HANDLER =====
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            let errorMessage = "";

            // Fullname validation
            if (fullname.length < 3) errorMessage += "Full name must be at least 3 characters.\n";

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) errorMessage += "Invalid email format.\n";

            // Password validation
            if (password.length < 6) errorMessage += "Password must be at least 6 characters.\n";
            if (password !== confirmPassword) errorMessage += "Passwords do not match.\n";

            // Retrieve registry from localStorage
            const registry = getRegistry();

            // Check if email already registered
            const emailExists = registry.some(user => user.email === email);
            if (emailExists) errorMessage += "This email is already registered. Please login.\n";

            if (errorMessage !== "") {
                alert(errorMessage);
                return;
            }

            // Add user to registry and save to localStorage
            registry.push({ fullname, email, password });
            saveRegistry(registry);

            alert("Registration successful! Redirecting to login page...");

            registerForm.reset();
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        });
    }

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            let errorMessage = "";

            if (name.length < 3) errorMessage += "Full name must be at least 3 characters.\n";

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) errorMessage += "Invalid email format.\n";

            if (message.length < 10) errorMessage += "Message must be at least 10 characters.\n";

            if (errorMessage !== "") {
                alert(errorMessage);
                return;
            }

            alert("Your message has been sent successfully!");
            contactForm.reset();
        });
    }
});
