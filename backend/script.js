// const roll = 'demo', pass = 'demo';

// // Function to start the session by making a request to the server
// const sessionStart = async () => {
//     try {
//         const response = await fetch("http://localhost:5000/proxy", { 
//             credentials: "include" 
//         });
//         console.log('Session established...');
//         console.log(response);
//     } catch (error) {
//         console.error("Error establishing session:", error);
//     }
    
// }

// const login = async (roll, pass) => {
//     try {
//         const response = await fetch("http://localhost:5000/action", {
//             method: "POST",
//             headers: { 
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ roll, pass })
//         });
      

//         const respons = await fetch("http://localhost:5000/action", {
//             method: "POST",
//             headers: { 
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({roll,pass}),
//             credentials: "include" 
//         });
//         console.log(respons)
        
//         const data = await respons.text();
//         console.log(data);
        
//         if (data.includes("frameset")) return true
//         return false;
//     } catch (error) {
//         console.log("Login Error:", error);
//     }
// }

// const trylogin = async () => {
//     await sessionStart(); 
//     const response = await login(roll, pass);
//     console.log(response);

//     if (response === true) {
//         console.log('Login successful');
//     } else {
//         console.log('Login failed');
//     }
// }

// trylogin(); 
