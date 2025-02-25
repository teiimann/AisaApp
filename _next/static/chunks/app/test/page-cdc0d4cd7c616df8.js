(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[928],{2352:function(e,n,t){Promise.resolve().then(t.bind(t,3315))},6463:function(e,n,t){"use strict";var a=t(1169);t.o(a,"useRouter")&&t.d(n,{useRouter:function(){return a.useRouter}}),t.o(a,"useSearchParams")&&t.d(n,{useSearchParams:function(){return a.useSearchParams}})},3315:function(e,n,t){"use strict";t.r(n);var a=t(7437),i=t(2265),s=t(6463),r=t(2157),o=t.n(r);let l=["I enjoy solving complex puzzles and problems for extended periods.","I prefer working on back-end systems and optimizing server performance rather than designing user interfaces.","I feel most comfortable when following well-defined structures and processes in my work.","When approaching a problem, I focus on its broader impact rather than the specific details.","I enjoy creating algorithms or programs from scratch that improve existing workflows.","I prefer working independently rather than collaborating with a team on projects.","I handle stress well in high-pressure environments and tight deadlines.","I enjoy the process of debugging and troubleshooting more than the initial project planning.","I prefer to explore new technologies and frameworks, even if they are not widely used yet.","I am skilled at simplifying complex concepts when explaining them to others.","I thrive in situations where I am leading a team and making executive decisions.","I get energized by designing visually appealing and user-friendly interfaces.","I prefer building secure systems over improving performance metrics.","I feel comfortable experimenting with machine learning algorithms and data science applications.","I am more motivated by the end result of a project than the journey of getting there.","I enjoy working on mobile app development over web-based applications.","I believe understanding business needs is more important than the technical specifications when developing a solution.","I prioritize learning new programming languages and tools over mastering a specific set of skills.","I am more drawn to roles that involve data analysis and statistical models than those requiring front-end design.","I believe cybersecurity is one of the most crucial areas to focus on in the IT industry today."];n.default=()=>{let[e,n]=(0,i.useState)(Array(l.length).fill("")),[t,r]=(0,i.useState)(0),[c,u]=(0,i.useState)(""),[d,h]=(0,i.useState)(!1),p=(0,s.useRouter)(),g=e=>{n(n=>{let a=[...n];return a[t]=e,a})},m=async n=>{if(n.preventDefault(),""===e[t]){u("Please answer the question before submitting."),h(!0);return}try{let n=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({answers:e})});if(!n.ok)throw Error("Failed to fetch analysis");let t=await n.json();p.push("/dashboard/result?analysis=".concat(encodeURIComponent(t.analysis)))}catch(e){console.error("Error submitting answers:",e)}},f=l[t];return(0,a.jsx)("div",{className:o().container,children:(0,a.jsxs)("div",{className:o().surveyBox,children:[(0,a.jsx)("h1",{className:o().heading,children:"Career Test"}),(0,a.jsxs)("div",{className:o().questionContainer,children:[(0,a.jsx)("p",{className:o().questionText,children:"".concat(t+1,". ").concat(f)}),["Strongly Agree","Agree","Neutral","Disagree","Strongly Disagree"].map(n=>(0,a.jsxs)("label",{className:o().answerOption,children:[(0,a.jsx)("input",{type:"radio",value:n,checked:e[t]===n,onChange:()=>g(n),style:{marginRight:"10px"}}),n]},n))]}),d&&(0,a.jsx)("div",{className:o().modal,children:c}),(0,a.jsxs)("div",{className:o().buttonContainer,children:[t>0&&(0,a.jsx)("button",{onClick:()=>{h(!1),r(e=>Math.max(e-1,0))},className:o().button,children:"Previous"}),t<l.length-1?(0,a.jsx)("button",{onClick:()=>{if(""===e[t]){u("Please select an answer before moving to the next question."),h(!0);return}h(!1),r(e=>e+1)},className:o().button,children:"Next"}):(0,a.jsx)("button",{onClick:m,className:o().button,children:"Submit"})]})]})})}},2157:function(e){e.exports={container:"page_container__puW9X",surveyBox:"page_surveyBox__1Fohp",heading:"page_heading__FDP49",questionContainer:"page_questionContainer__TRLug",questionText:"page_questionText__poy4f",answerOption:"page_answerOption__kMx99",radio:"page_radio__GJLnC",buttonContainer:"page_buttonContainer__6n_EA",button:"page_button__Yc0dO",linkButton:"page_linkButton__ybYzi",modal:"page_modal__m_rmH"}}},function(e){e.O(0,[917,971,23,744],function(){return e(e.s=2352)}),_N_E=e.O()}]);