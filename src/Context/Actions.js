
export const fetchUser = async () => {
    await fetch("http://localhost:5000/proxy", {
      method: "GET",
      credentials: "include", 
    });
    console.log("session established...");
  };

export const login = async (roll, pass, dispatch) => {

    await fetch("http://localhost:5000/action", {
      method: "POST",
      credentials: "include" ,
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({roll, pass})
    });

    const respons = await fetch("http://localhost:5000/action", {
      method: "POST",
      credentials: "include" ,
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({roll, pass})
    });

    const semesters = await fetchSem()

    const data = await respons.text();
    if(data.includes('frameset')) dispatch({'type' : 'set_login', 'payload' : semesters})

};

export const getGrades = async (sem) => {
  console.log(sem)
    const response = await fetch("http://localhost:5000/grades", {
      method: "POST",
      credentials: "include" ,
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({sem})
    });

    const data = await response.text();
    // console.log(data)
    const parsedDocument = new DOMParser().parseFromString(data, "text/html");
    const tables = parsedDocument.querySelectorAll('table');
    const table = tables[2];
    const rows = table.querySelectorAll('tbody tr')
    const grades = []
    
    rows.forEach((row)=>{
      const cols = row.querySelectorAll('td')
      grades.push([cols[0].innerText.trim(), cols[2].innerText.trim(), cols[4].innerText.trim()]);
    })
    console.log(grades)
    console.log(Array.isArray(grades))
    return grades
};



export const getMarks = async (sem) => {
  console.log(sem)
    const response = await fetch('http://localhost:5000/marks', {
      method : "POST",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({sem}),
      credentials:"include"
    })
    const data = await response.text();
    const parsedDocument = new DOMParser().parseFromString(data, "text/html");
    const tables = parsedDocument.querySelectorAll('table');
    const table = tables[2];
    const rows = table.querySelectorAll('tbody tr')
    const marks = []
    rows.forEach((row)=>{
      const cols = row.querySelectorAll('td')
      marks.push([cols[2].innerText.trim(), cols[3].innerText.trim(), cols[7].innerText.trim(), cols[6].innerText.trim()]);
    })
    console.log(marks)
    return marks
}

export const getCgpa = async () => {
    const response = await fetch('http://localhost:5000/cgpa', {credentials:"include"})
    const data = await response.text();

    const parsedDocument = new DOMParser().parseFromString(data, "text/html");
    const tables = parsedDocument.querySelectorAll('table');
    const table = tables[2];
    const rows = table.querySelectorAll('tbody tr')
    const cgpa = []
    rows.forEach((row)=>{
      const cols = row.querySelectorAll('td')
      cgpa.push([cols[0].innerText.trim(), cols[4].innerText.trim(), cols[5].innerText.trim()]);
    })
    console.log(cgpa)
    return cgpa
}

export const fetchSem = async () => {
  const sem = []
  const x = 'ALL'
  const response = await fetch('http://localhost:5000/marks', {method:"POST", 
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify({x}),
    credentials:"include"})
  const data = await response.text();
  const doc = new DOMParser().parseFromString(data, "text/html")
  const options = doc.querySelectorAll('table select option')
  options.forEach((option)=>{
    sem.push(option.innerText)
  })
  return sem
}





// export const getPersonalInfo = async () => {
//     const response = await fetch('http://localhost:5000/personalinfo', {
//       credentials:"include"
//     })
//     const data = await response.text();
//     // console.log("Personal info:", data);
//     const parsedDocument = new DOMParser().parseFromString(data, "text/html");
//     const table = parsedDocument.querySelector('table')
//     const info = {}
//     const rows = table.querySelectorAll('tr')
//     // rows.forEach(row=>{
//     //   const cols = row.querySelectorAll('td')
//     //   info[cols[0].innerText.replaceAll(' ','')] = cols[1].innerText.trim()
//     // })
//     for(let i=1;i<=7 ;i++){
//       const row = rows[i];
//       const cols = row.querySelectorAll('td')
//       info[cols[0].innerText.replaceAll(' ','')] = cols[1].innerText.trim()
//     }
//     console.log(info)
//   }