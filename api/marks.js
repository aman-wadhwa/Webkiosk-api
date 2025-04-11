export default async function handler (req, res){
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
  };
  