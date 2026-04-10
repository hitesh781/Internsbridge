import React, { useState } from "react";
import "./App.css";

const internships = [
  {
    company: "StartupX",
    location: "USA",
    role: "Frontend Intern",
    stipend: "$100/month",
    tags: ["React", "CSS", "JavaScript"],
    type: "Remote",
    link: "https://forms.gle/example1",
  },
  {
    company: "TechNova",
    location: "Germany",
    role: "Backend Intern",
    stipend: "$150/month",
    tags: ["Node.js", "MongoDB", "REST API"],
    type: "Hybrid",
    link: "https://forms.gle/example2",
  },
  {
    company: "AI Labs",
    location: "UK",
    role: "AI/ML Intern",
    stipend: "$200/month",
    tags: ["Python", "TensorFlow", "Data Science"],
    type: "On-site",
    link: "https://forms.gle/example3",
  },
  {
    company: "CloudBase",
    location: "Canada",
    role: "DevOps Intern",
    stipend: "$180/month",
    tags: ["AWS", "Docker", "Kubernetes"],
    type: "Remote",
    link: "https://forms.gle/example4",
  },
  {
    company: "DesignHub",
    location: "Australia",
    role: "UI/UX Intern",
    stipend: "$120/month",
    tags: ["Figma", "Prototyping", "User Research"],
    type: "Remote",
    link: "https://forms.gle/example5",
  },
  {
    company: "DataStream",
    location: "Singapore",
    role: "Data Analyst Intern",
    stipend: "$160/month",
    tags: ["SQL", "Python", "Tableau"],
    type: "Hybrid",
    link: "https://forms.gle/example6",
  },
];

const filterOptions = ["All", "Remote", "Hybrid", "On-site"];

function App() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = internships.filter((job) => {
    const matchType = filter === "All" || job.type === filter;
    const matchSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">InternsBridge</span>
        </div>
        <div className="nav-links">
          <a href="#internships">Browse</a>
          <a
            href="https://forms.gle/postinternship"
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
          >
            Post Internship
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-badge">🚀 100+ Opportunities Worldwide</div>
        <h1 className="hero-title">
          Launch Your Career
          <br />
          <span className="hero-accent">Globally.</span>
        </h1>
        <p className="hero-sub">
          Connecting ambitious students with world-class internship opportunities
          across every timezone.
        </p>
        <div className="hero-actions">
          <a href="#internships" className="btn-primary">
            Browse Internships
          </a>
          <a
            href="https://forms.gle/postinternship"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Post a Role
          </a>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat">
            <span className="stat-num">50+</span>
            <span className="stat-label">Companies</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">30+</span>
            <span className="stat-label">Countries</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Free to Apply</span>
          </div>
        </div>
      </header>

      {/* Listings */}
      <main className="listings" id="internships">
        <div className="listings-header">
          <h2>Available Internships</h2>
          <p>{filtered.length} opportunities found</p>
        </div>

        {/* Search + Filter */}
        <div className="controls">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by role, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filters">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className={`filter-btn ${filter === opt ? "active" : ""}`}
                onClick={() => setFilter(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid">
          {filtered.length > 0 ? (
            filtered.map((job, index) => (
              <div className="card" key={index}>
                <div className="card-top">
                  <div className="company-avatar">
                    {job.company.charAt(0)}
                  </div>
                  <span className={`type-badge type-${job.type.toLowerCase().replace("/", "")}`}>
                    {job.type}
                  </span>
                </div>
                <h3 className="card-role">{job.role}</h3>
                <p className="card-company">
                  {job.company} &nbsp;·&nbsp;
                  <span className="card-location">📍 {job.location}</span>
                </p>
                <div className="card-tags">
                  {job.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card-footer">
                  <span className="stipend">💰 {job.stipend}</span>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="apply-btn"
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <span>😕</span>
              <p>No internships found. Try a different search or filter.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 InternsBridge · Built for students, by students 🌍</p>
      </footer>
    </div>
  );
}

export default App;
