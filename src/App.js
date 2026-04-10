import React from "react";
import "./App.css";

const internships = [
  {
    company: "StartupX (USA)",
    role: "Frontend Intern",
    stipend: "$100/month",
    link: "https://forms.gle/example1",
  },
  {
    company: "TechNova (Germany)",
    role: "Backend Intern",
    stipend: "$150/month",
    link: "https://forms.gle/example2",
  },
  {
    company: "AI Labs (UK)",
    role: "AI/ML Intern",
    stipend: "$200/month",
    link: "https://forms.gle/example3",
  },
];

function App() {
  return (
    <div className="container">
      <h1>🌍 InternsBridge</h1>
      <p>Connecting students with global internship opportunities</p>

      <div className="buttons">
        <a href="#internships">Browse Internships</a>
        <a href="https://forms.gle/postinternship" target="_blank" rel="noreferrer">
          Post Internship
        </a>
      </div>

      <h2 id="internships">Available Internships</h2>

      <div className="grid">
        {internships.map((job, index) => (
          <div className="card" key={index}>
            <h3>{job.role}</h3>
            <p>{job.company}</p>
            <p>{job.stipend}</p>
            <a href={job.link} target="_blank" rel="noreferrer">
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;