const roll = '102303550', pass = 'Amanwadhwa@07';

// Function to start the session by making a request to the server
const sessionStart = async () => {
    try {
        const response = await fetch("http://localhost:5000/proxy", { 
            credentials: "include" // This will include cookies in the request
        });
        console.log('Session established...');
        console.log(response);
    } catch (error) {
        console.error("Error establishing session:", error);
    }
    
}

// Function to login
const login = async (roll, pass) => {
    try {
        const response = await fetch("http://localhost:5000/action", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roll, pass }),
            credentials: "include" // Ensures cookies are included in the request
        });
      

        const respons = await fetch("http://localhost:5000/action", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ roll, pass }),
            credentials: "include" // Ensures cookies are included in the request
        });
        console.log(respons)
        
        const data = await respons.text();
        console.log(data);
        
        // Check for login success
        if (data.includes("frameset")) return true; // Customize based on response
        return false;
    } catch (error) {
        console.log("Login Error:", error);
    }
}

// Function to try login by starting the session and then logging in
const trylogin = async () => {
    await sessionStart(); // Start session first
    const response = await login(roll, pass);
    console.log(response);

    if (response === true) {
        console.log('Login successful');
    } else {
        console.log('Login failed');
    }
}

trylogin();  // Call the trylogin function
