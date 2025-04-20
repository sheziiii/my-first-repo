// In the initStorage() function
if(!localStorage.getItem('teacherCredentials')) {
    localStorage.setItem('teacherCredentials', JSON.stringify({
        email: "teacher@school.com",  // Changed from teacher123 to be more email-like
        password: "admin123"
    }));
}
// Simplified teacher login
document.getElementById('teacherLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    
    if(email === "teacher@school.com" && password === "admin123") {
        localStorage.setItem('currentUser', JSON.stringify({
            role: 'teacher',
            email: "teacher@school.com"
        }));
        window.location.href = 'teacher.html';
    } else {
        alert('Invalid credentials. Use:\nEmail: teacher@school.com\nPassword: admin123');
    }
});
document.getElementById('teacherLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    
    // Get stored credentials
    const teacherCreds = JSON.parse(localStorage.getItem('teacherCredentials'));
    
    // Debug output
    console.log("Entered:", email, password);
    console.log("Stored:", teacherCreds);
    
    // Validation
    if(!teacherCreds) {
        alert('Teacher credentials not found. Please register first.');
        return;
    }
    
    if(email === teacherCreds.email && password === teacherCreds.password) {
        localStorage.setItem('currentUser', JSON.stringify({
            role: 'teacher',
            email: teacherCreds.email
        }));
        window.location.href = 'teacher.html';
    } else {
        alert('Invalid teacher credentials. Use:\nEmail: teacher@school.com\nPassword: admin123');
    }
});
// Initialize storage
function initStorage() {
    if(!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if(!localStorage.getItem('assignments')) {
        localStorage.setItem('assignments', JSON.stringify([]));
    }
    if(!localStorage.getItem('teacherCredentials')) {
        localStorage.setItem('teacherCredentials', JSON.stringify({
            email: "teacher123",
            password: "admin123"
        }));
    }
}
document.getElementById('teacherLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Login attempted"); // Add this
    
    const formData = new FormData(e.target);
    console.log("Entered:", formData.get('email'), formData.get('password')); // Add this
    
    const teacherCreds = JSON.parse(localStorage.getItem('teacherCredentials'));
    console.log("Stored:", teacherCreds); // Add this
    // ... rest of the code
});

// Student Registration
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    initStorage();
    
    const formData = new FormData(e.target);
    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if email exists
    if(users.some(u => u.email === formData.get('email'))) {
        alert('This email is already registered!');
        return;
    }
    
    const newStudent = {
        id: Date.now().toString(),
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        class: formData.get('class'),
        role: 'student',
        approved: false,
        registeredAt: new Date().toISOString()
    };
    
    users.push(newStudent);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Registration submitted! Please wait for teacher approval.');
    e.target.reset();
});

// Student Login
document.getElementById('studentLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    initStorage();
    
    const formData = new FormData(e.target);
    const users = JSON.parse(localStorage.getItem('users'));
    
    const student = users.find(u => 
        u.email === formData.get('email') && 
        u.password === formData.get('password') &&
        u.role === 'student'
    );
    
    if(!student) {
        alert('Invalid email or password');
        return;
    }
    
    if(!student.approved) {
        alert('Your account is pending approval. Please check back later.');
        return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(student));
    window.location.href = 'student.html';
});

// Teacher Login
document.getElementById('teacherLoginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    initStorage();
    
    const formData = new FormData(e.target);
    const teacherCreds = JSON.parse(localStorage.getItem('teacherCredentials'));
    
    if(formData.get('email') === teacherCreds.email && 
       formData.get('password') === teacherCreds.password) {
        localStorage.setItem('currentUser', JSON.stringify({
            role: 'teacher',
            email: teacherCreds.email
        }));
        window.location.href = 'teacher.html';
    } else {
        alert('Invalid teacher credentials');
    }
});

// Initialize on first load
initStorage();
// Change the check in script.js to:
if((formData.get('email') === teacherCreds.email || 
    formData.get('email') === 'teacher123@gmail.com') && 
   formData.get('password') === teacherCreds.password) {
    // ... rest of the code
}