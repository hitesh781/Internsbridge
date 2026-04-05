import React, { useState } from "react";
import "./App.css";

const internshipsData = [
  {
    company: "StartupX (USA)",
    role: "Frontend Intern",
    stipend: "$100/month",
    type: "Remote",
    link: "https://forms.gle/example1",
  },
  {
    company: "TechNova (Germany)",
    role: "Backend Intern",
    stipend: "$150/month",
    type: "Remote",
    link: "https://forms.gle/example2",
  },
  {
    company: "AI Labs (UK)",
    role: "AI/ML Intern",
    stipend: "$200/month",
    type: "Remote",
    link: "https://forms.gle/example3",
  },
];

export default function Internships() {
  const [search, setSearch] = useState("");

  const filteredInternships = internshipsData.filter((job) =>
    job.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>💼 Available Internships</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by role (Frontend, Backend...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Internship Cards */}
      <div className="grid">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((job, index) => (
            <div className="card" key={index}>
              <h3>{job.role}</h3>
              <p><strong>{job.company}</strong></p>
              <p>{job.stipend}</p>
              <p>{job.type}</p>

              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className="apply-btn"
              >
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p>No internships found 😔</p>
        )}
      </div>
    </div>
  );
}