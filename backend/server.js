const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://webkiosk.thapar.edu/index.jsp", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      "credentials": "include",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    });

    const setCookieHeader = response.headers.get("set-cookie");
    console.log("Received Set-Cookie:", setCookieHeader);

    if (setCookieHeader) {
      res.setHeader("set-cookie", setCookieHeader); 
      
    }
    const text = await response.text();
    res.json({ content: text });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});


app.post("/action", async (req, res) => {
  try {
    console.log("Received Cookies from Frontend:", req.cookies);
    const {roll, pass} = req.body
    const encodedpass = encodeURIComponent(pass)
    const response = await fetch("https://webkiosk.thapar.edu/CommonFiles/UserAction.jsp", {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        cookie: req.headers.cookie, // Pass received cookie
        Referer: "https://webkiosk.thapar.edu/index.jsp",
      },
      
      body: `txtuType=Member+Type&UserType=S&txtCode=Enrollment+No&MemberCode=${roll}&txtPin=Password%2FPin&Password=${encodedpass}&BTNSubmit=Submit`,
      
    "mode": "cors",
    method:"POST"
    });

    const setCookieHeader = response.headers.get("set-cookie");
    console.log("New Set-Cookie from Login:", setCookieHeader);

    if (setCookieHeader) {
      res.setHeader("set-cookie", setCookieHeader);
    }
    
    // const text = await response.text();
      
    const data = await response.text()
    res.json(data);
    // res.json({ message: "Login Attempted" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/grades", async (req, res) => {
  try {
    console.log("Received Cookies for Grades:", req.cookies);
    const {sem} = req.body

    const response = await fetch(`https://webkiosk.thapar.edu/StudentFiles/Exam/StudentEventGradesView.jsp?x=&exam=${sem}&Subject=ALL`, {
      method: "GET",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
      "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "frame",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
        "accept-language": "en-US,en;q=0.9",
        "upgrade-insecure-requests": "1",
        "cookie": req.headers.cookie, 
         "Referer": "https://webkiosk.thapar.edu/StudentFiles/Exam/StudentEventGradesView.jsp",
      }
    });

    const text = await response.text();
    res.json(text);
  } catch (error) {
    console.error("Error fetching grades:", error.message);
    res.status(500).json({ error: "Error fetching grades" });
  }
});

app.get("/personalinfo", async (req, res) => {
  try {
    console.log("Received Cookies for Grades:", req.cookies);

    const response = await fetch("https://webkiosk.thapar.edu/StudentFiles/PersonalFiles/StudPersonalInfo.jsp", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "frame",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": req.headers.cookie,
        "Referer": "https://webkiosk.thapar.edu/StudentFiles/FrameLeftStudent.jsp",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    const text = await response.text();
    res.json({ content: text });
  } catch (error) {
    console.error("Error fetching personal info:", error.message);
    res.status(500).json({ error: "Error fetching personal info" });
  }
});

app.post("/marks", async (req, res) => {
  try {
    console.log("Received Cookies for Marks:", req.cookies);
    const {sem} = req.body
    const response = await fetch(`https://webkiosk.thapar.edu/StudentFiles/Exam/StudentEventMarksView.jsp?x=&exam=${sem}`, {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "frame",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": req.headers.cookie,
        "Referer": "https://webkiosk.thapar.edu/StudentFiles/Exam/StudentEventMarksView.jsp",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });

    const text = await response.text();
    res.json(text);
  } catch (error) {
    console.error("Error fetching grades:", error.message);
    res.status(500).json({ error: "Error fetching grades" });
  }
});

app.get('/cgpa', async (req,res) => {
  try{
    const response = await fetch("https://webkiosk.thapar.edu/StudentFiles/Exam/StudCGPAReport.jsp", {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "frame",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": req.headers.cookie,
        "Referer": "https://webkiosk.thapar.edu/StudentFiles/FrameLeftStudent.jsp",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    });
    const text = await response.text();
    res.json(text)
  }

  catch(error){
    console.log('error fetching cgpa ', error)
  }
})

app.listen(5000, () => console.log("Proxy running on port 5000"));
