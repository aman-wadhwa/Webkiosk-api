export default async function handler (req, res){
    try {
      console.log("Received Cookies from Frontend:", req.cookies);
      const {roll, pass} = req.body
      const encodedpass = encodeURIComponent(pass)
      const response = await fetch("https://webkiosk.thapar.edu/CommonFiles/UserAction.jsp", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "cookie": req.headers.cookie,
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `txtuType=Member+Type&UserType=P&txtCode=Parents+ID&MemberCode=${roll}&txtPin=Password%2FPin&Password=${encodedpass}&BTNSubmit=Submit`,
        "method": "POST"
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
  };