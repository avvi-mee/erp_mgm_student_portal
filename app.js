const student={
 name:"Atharva Sambhaji Chavan", mother:"Akshada Sambhaji Chavan", programme:"B. Tech Artificial Intelligence and Machine Learning (University Department of Information and Communication Technology (UDICT))",
 semester:"Sem 3", division:"AIML-1", batch:"2025 - 2029", uid:"259140", seat:"202550102041"
};

const courses=[
["APS21BSL101","SINGLE AND MULTIVARIABLE CALCULUS","25.00","28.00","53.00","4.00","B","5.99"],
["APS21BSL104","ENGINEERING CHEMISTRY","50.00","27.00","77.00","3.00","B","5.99"],
["APS21BSP102","ENGINEERING CHEMISTRY LAB","24.00","19.00","43.00","1.00","B","5.49"],
["APS21ESL101","PYTHON PROGRAMMING","35.00","28.00","63.00","2.00","B","5.99"],
["APS21ESL103","ENGINEERING MECHANICS","31.00","26.00","57.00","2.00","B","5.99"],
["APS21ESP101","PYTHON PROGRAMMING LAB","22.00","18.00","40.00","1.00","B","5.49"],
["APS21ESP104","ENGINEERING MECHANICS LAB","21.00","19.00","40.00","1.00","B","5.49"],
["APS21PCL101","BASICS OF ELECTRICAL AND ELECTRONICS ENGINEERING","30.00","28.00","58.00","2.00","B","5.99"],
["APS21PCP101","ELECTRICAL AND ELECTRONICS TECHNOLOGY LAB","25.00","19.00","44.00","1.00","B","5.49"],
["APS21VSP102","WORKSHOP PRACTICES","50.00","29.00","79.00","2.00","B","5.99"],
["MGM54AEL101","COMMUNICATIVE ENGLISH","23.00","18.00","41.00","1.00","B","5.49"],
["MGM54AEP101","COMMUNICATIVE ENGLISH LAB","15.00","16.00","31.00","1.00","B","5.49"],
["MGM62CPC103","SPORTS","25.00","0.00","25.00","2.00","B","5.49"]
];

const menus={
Institute:["Institute Profile","Academic Calendar","Contact Institute"],
Personal:["Profile","Attendance","Announcements","Assessments"],
Schedules:["Course Schedule","Time Table","Attendance Schedule","Marks Schedule"],
Academic:["University Exam/Result","Course Feedback","Online Assessment","Summer Internship Programme","Courses","Course Open Elective Preferences"],
Events:["Events Calendar","Upcoming Events"],
Facilities:["Library","Transport","Hostel"],
Communication:["Announcements","Student Feedback","Messages"],
Planner:["Today's Schedule","Tasks","Bulletinboard"]
};

function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}
function modal(title,body){document.getElementById("modalBody").innerHTML=`<h2>${title}</h2><p>${body}</p>`;document.getElementById("modal").classList.remove("hidden")}
document.getElementById("closeModal").onclick=()=>document.getElementById("modal").classList.add("hidden");

function login(){
 const e=document.getElementById("email").value.trim(), p=document.getElementById("password").value;
 if((e==="chavanatharva332@gmail.com")&&p==="Atharva@123"){
   sessionStorage.setItem("loggedIn","true"); document.getElementById("loginView").classList.add("hidden");document.getElementById("erpView").classList.remove("hidden");renderDashboard();
 }else document.getElementById("loginError").textContent="Invalid email or password. Please enter your registered email and password.";
}
document.getElementById("loginBtn").onclick=login;
document.getElementById("password").addEventListener("keydown",e=>{if(e.key==="Enter")login()});
document.getElementById("togglePass").onclick=()=>{const p=document.getElementById("password");p.type=p.type==="password"?"text":"password"};
document.getElementById("forgot").onclick=e=>{e.preventDefault();modal("Forgot password","Please use your registered email and password.");};

if(sessionStorage.getItem("loggedIn")==="true"){document.getElementById("loginView").classList.add("hidden");document.getElementById("erpView").classList.remove("hidden");renderDashboard();}

document.querySelectorAll(".nav-item").forEach(btn=>{
 btn.onclick=e=>{e.stopPropagation(); document.querySelectorAll(".menu").forEach(x=>x.remove()); const name=btn.dataset.menu; const menu=document.createElement("div");menu.className="menu";menu.style.left=btn.offsetLeft+"px";
 menus[name].forEach((item,i)=>{
   const b=document.createElement("button");b.className="menu-item";b.textContent=item;
   if(name==="Academic"&&item==="University Exam/Result"){
     b.classList.add("has-submenu");
     b.onmouseenter=()=>showSub(b);
     b.onclick=(e)=>{e.stopPropagation();showSub(b)};
   } else b.onclick=()=>menuAction(item);
   menu.appendChild(b);
 });document.getElementById("menuLayer").appendChild(menu);
 };
});
function showSub(parent){
 document.querySelectorAll(".submenu").forEach(x=>x.remove());
 const sub=document.createElement("div");
 sub.className="submenu";
 ["Autonomous Student Result","Photocopy/Reval Application","Autonomous University Exam Form"].forEach(x=>{
   const b=document.createElement("button");
   b.className="menu-item";
   b.textContent=x;
   b.onclick=(e)=>{e.stopPropagation();menuAction(x)};
   sub.appendChild(b);
 });
 parent.appendChild(sub);
}
document.addEventListener("click",()=>document.querySelectorAll(".menu").forEach(x=>x.remove()));

function menuAction(item){
 if(item==="Autonomous Student Result"){renderResult();return}
 const map={"Course Schedule":"timetable","Time Table":"timetable","Attendance Schedule":"attendance","Marks Schedule":"marks","Profile":"profile","Attendance":"attendance","Announcements":"announcement","Assessments":"assessments","Courses":"courses","Library":"library","Fees Details":"fees"};
 if(map[item]) renderSimple(map[item]);
 else if(item==="Today's Schedule") renderDashboard();
 else modal(item,"This section is currently available through the student portal.");
}

function renderDashboard(){
 document.getElementById("main").innerHTML=`
 <div class="dashboard-grid">
  <aside>
   <div class="card info-card">
    ${[
      ["Enrollment No.","-"],["Programme",student.programme],["Semester",student.semester],["Division",student.division],["Batch",student.batch],["Student Unique ID",student.uid]
    ].map(x=>`<div class="info-row"><div class="info-label">${x[0]}</div><div class="info-value">${x[1]}</div></div>`).join("")}
    <button class="outline-btn" onclick="modal('Admission Link','Admission link opened successfully.')">Load Admission Link</button>
   </div>
   <div class="card info-card quick"><h3>Quick Links</h3><p>Open common student actions directly.</p>
   ${["Profile","Attendance","Announcement","Assessments","Courses","Time Table","Fees Details","Library"].map(x=>`<button class="quick-item" onclick="menuAction('${x}')">◉ &nbsp; ${x}</button>`).join("")}
   </div>
  </aside>
  <section>
   ${section("Today's Schedule","Today's timetable stays unloaded until the student asks for it.","Load","loadSchedule")}
   ${section("Tasks","Student task tray items, loaded only when requested.","Load","loadTasks")}
   ${section("Builtinboard","Recent posts from the bulletin area.","Load","loadBulletin")}
  </section>
 </div>`;
}
function section(title,desc,button,fn){return `<div class="card section-card"><div class="section-head"><div><h2>${title}</h2><div class="desc">${desc}</div></div><button class="load-btn" onclick="${fn}()">${button}</button></div><div id="${title.replaceAll(" ","").toLowerCase()}Body" class="section-body">Click Load to fetch demo content.</div></div>`}
function loadSchedule(){document.getElementById("todaysscheduleBody").innerHTML=`<table class="simple-table"><tr><th>TIME</th><th>SESSION</th><th>ROOM</th></tr><tr><td>09:00 AM</td><td>Constitution of India</td><td>-</td></tr><tr><td>12:45 PM</td><td>OOP</td><td>-</td></tr><tr><td>01:45 PM - 02:45 PM</td><td>NCC</td><td>-</td></tr><tr><td>10:00 AM - 12:00 PM</td><td>OOP-Lab</td><td>-</td></tr></table>`}
function loadTasks(){document.getElementById("tasksBody").innerHTML=`<h2 style="font-size:36px;margin:0">7</h2><h3>Student Feedback</h3><p>Feedback : IICT AIML Mid Term PR 2025-2026 Part 1<br>2025-09-01 | By Bharat Kashinath Chaudhari</p><button class="outline-btn" onclick="modal('Student Feedback','Task opened successfully.')">Open task</button>`}
function loadBulletin(){document.getElementById("builtinboardBody").innerHTML=`<b>University Notice</b><p>Semester examination and academic updates are available here in demo mode.</p><button class="outline-btn" onclick="modal('Bulletin','Bulletin content opened successfully.')">Open bulletin</button>`}

function renderResult(){
 document.getElementById("main").innerHTML=`
 <div class="breadcrumb">ACADEMIC FUNCTIONS » UNIVERSITY EXAM/RESULT » AUTONOMOUS STUDENT RESULT</div>
 <div class="alert">⚑ Please select at least one Category for result.</div>
 <div class="filters">
  <div class="filter"><label>Select Exam:</label><select id="examSelect"><option value="">Select</option><option>ET WINTER (REG) 2025</option></select></div>
  <div class="filter"><label>Select Term:</label><select id="termSelect"><option value="">Select</option><option>I</option></select></div>
 </div>
 <div id="resultArea"></div>`;
 document.getElementById("examSelect").onchange=checkResult;
 document.getElementById("termSelect").onchange=checkResult;
}
function checkResult(){const e=document.getElementById("examSelect").value,t=document.getElementById("termSelect").value;if(e&&t){document.querySelector(".alert").style.display="none";renderResultTable(e,t)}}
function renderResultTable(exam,term){
 document.getElementById("resultArea").innerHTML=`
 <div class="result-wrap"><div class="tab">Term (${term}) Result</div>
 <div class="result-date">01 SEP 2026</div>
 <div class="uni-head">MGM University<br>N-6, MGM Campus, CIDCO, Chhatrapati Sambhajinagar<br>[ Bachelor of Technology (Artificial Intelligence and Machine Learning) ]</div>
 <div class="student-meta">
 <div class="label">Student Name</div><div><b>${student.name}</b></div><div class="label">Exam Name</div><div><b>${exam} (Term - ${term})</b></div>
 <div class="label">Mother Name</div><div><b>${student.mother}</b></div><div class="label">Seat No.</div><div><b>${student.seat}</b></div>
 </div>
 <table class="result-table"><thead><tr><th>Sr.No</th><th>Course Code</th><th>Course</th><th>Internal Marks</th><th>External Marks</th><th>Total Marks</th><th>Credits</th><th>Grade</th><th>Earned Grade Point</th></tr></thead>
 <tbody>${courses.map((c,i)=>`<tr><td>${i+1}</td><td><b>${c[0]}</b><br>Int:${c[2].replace(".00","")} Ext:${c[3].replace(".00","")}</td><td class="course">${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td>${c[4]}</td><td>${c[5]}</td><td>${c[6]}</td><td>${c[7]}</td></tr>`).join("")}</tbody></table>
 <div class="summary"><div>SGPA: 5.63</div><div>CGPA: --</div><div>Percentage: 59.23 %</div><div class="pass">Result : PASS</div></div>
 </div>`;
}
function renderSimple(type){
 const titles={profile:"Student Profile",attendance:"Attendance",announcement:"Announcements",assessments:"Assessments",courses:"Courses",timetable:"Time Table",fees:"Fees Details",library:"Library",marks:"Marks"};
 const title=titles[type]||type;

 if(type==="attendance"){
   document.getElementById("main").innerHTML=`
   <div class="attendance-page">
     <div class="breadcrumb">ACADEMIC SCHEDULES » ATTENDANCE</div>
     <div class="term-bar"><label>Term</label><select id="attendanceTerm"><option>Sem 3</option><option>Sem 2</option><option>Sem 1</option></select></div>
     <div class="page-tabs">
       <button class="page-tab" onclick="showToast('Courses selected')">Courses</button>
       <button class="page-tab" onclick="renderSimple('timetable')">Schedule</button>
       <button class="page-tab active">Attendance</button>
       <button class="page-tab" onclick="renderSimple('marks')">Marks</button>
       <button class="page-tab" onclick="renderSimple('assessments')">Assessment</button>
       <button class="page-tab" onclick="modal('Shared Contents','Shared course contents opened successfully.')">Shared Contents</button>
     </div>
     <div class="attendance-wrap">
       <table class="attendance-table">
       <thead><tr>
       <th>Course Code</th><th>Course Name</th><th>Total<br>Sessions</th><th>Faculty<br>Name</th><th>Present<br>Count</th><th>Absent<br>Count</th><th>Leaves<br>Applied</th><th>Attendance<br>Not<br>Entered</th><th>Total<br>Count</th><th>Percentage</th>
       </tr></thead>
       <tbody>
       ${[
       ["ITY23HSL201","Business Management and Financial Accounting","40","Dr.Ghousia Imam","0","0","0","0","0","0.00"],
       ["MGM56VEL102","Constitution of India","50","Ms.Varsha Mantri","10","10","0","0","20","50.00"],
       ["ITY23PCL202","Data structures","40","Ms.Ujwala Suresh Chaudhari","13","6","0","0","19","68.42"],
       ["ITY23PCP202","Data structures Lab","12","Ms.Ujwala Suresh Chaudhari","8","2","0","0","10","80.00"],
       ["ITY23PCL201","Discrete Structures and Applications","40","Dr.Smita Avinash Thite-Ponde","10","8","0","0","18","55.56"],
       ["BAH31MDL201","Introduction to Business Analytics","30","Ms.Pramila Vasantrao Kharat","0","0","0","0","0","0.00"],
       ["MGM31OEL126","Investment Management","30","Dr.Himani","1","3","0","0","4","25.00"],
       ["MGM32OEL103","Mocktail Making","30","Dr.Kevin Karmel Nawngiri","0","5","0","0","5","0.00"],
       ["ITY23PCL204","Network Communications and Computing","40","Ms.Pratima Manikrao Sukhre","6","7","0","0","13","46.15"],
       ["ITY23PCL203","Object Oriented Programming","40","Mrs.Sangita Nitin Bhasme","8","8","0","0","16","50.00"],
       ["ITY23PCP203","Object Oriented Programming Lab","12","Mrs.Sangita Nitin Bhasme","4","5","0","0","9","44.44"],
       ["ITY23FJU201","Web Technology","40","Dr.Jaykumar Shreeram Dhage","12","9","0","0","21","57.14"]
       ].map(r=>`<tr>${r.map((v,i)=>`<td>${v}</td>`).join("")}</tr>`).join("")}
       <tr class="attendance-total"><td></td><td></td><td></td><td></td><td>72</td><td>63</td><td>0</td><td>0</td><td>135</td><td>53.33</td></tr>
       </tbody></table>
     </div>
   </div>`;
   return;
 }

 if(type==="timetable"){
   document.getElementById("main").innerHTML=`
   <div class="simple-page">
    <div class="breadcrumb">ACADEMIC SCHEDULES » TIME TABLE</div>
    <div class="card" style="padding:12px">
      <div class="page-tabs">
       <button class="page-tab" onclick="renderSimple('courses')">Courses</button>
       <button class="page-tab active">Schedule</button>
       <button class="page-tab" onclick="renderSimple('attendance')">Attendance</button>
       <button class="page-tab" onclick="renderSimple('marks')">Marks</button>
       <button class="page-tab" onclick="renderSimple('assessments')">Assessment</button>
       <button class="page-tab" onclick="modal('Shared Contents','Shared course contents opened successfully.')">Shared Contents</button>
      </div>
      <table class="simple-table"><tr><th>Day</th><th>Time</th><th>Course</th><th>Faculty</th><th>Room</th></tr>
      <tr><td>Monday</td><td>09:00 AM - 10:00 AM</td><td>Data Structures</td><td>Ms. Ujwala Suresh Chaudhari</td><td>-</td></tr>
      <tr><td>Monday</td><td>10:00 AM - 12:00 PM</td><td>Data Structures Lab</td><td>Ms. Ujwala Suresh Chaudhari</td><td>-</td></tr>
      <tr><td>Tuesday</td><td>11:00 AM - 12:00 PM</td><td>Object Oriented Programming</td><td>Mrs. Sangita Nitin Bhasme</td><td>-</td></tr>
      <tr><td>Wednesday</td><td>01:45 PM - 02:45 PM</td><td>Network Communications and Computing</td><td>Ms. Pratima Manikrao Sukhre</td><td>-</td></tr>
      </table>
    </div>
   </div>`;
   return;
 }

 const body=`<div class="card" style="padding:20px"><p>Welcome to ${title}.</p><button class="load-btn" onclick="showToast('Information loaded successfully')">Load</button></div>`;
 document.getElementById("main").innerHTML=`<div class="simple-page"><div class="breadcrumb">ACADEMIC FUNCTIONS » ${title.toUpperCase()}</div><h1 class="page-title">${title}</h1>${body}</div>`;
}

document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>modal("Portal action",`${b.dataset.action} opened successfully.`));
