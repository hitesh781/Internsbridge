import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const STORAGE_KEY = "internbridge_resume_draft";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  education: "",
  experience: "",
  skills: "",
  projects: "",
};

export default function ResumeBuilder() {
  const user = auth.currentUser;
  const [form, setForm] = useState(emptyForm);
  const [saveMsg, setSaveMsg] = useState("");

  const loadLocal = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      setForm((prev) => ({ ...prev, ...parsed }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadLocal();
  }, [loadLocal]);

  useEffect(() => {
    const loadCloud = async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, "resumes", user.uid));
      if (snap.exists()) {
        const d = snap.data();
        const { updatedAt: _u, ...rest } = d;
        setForm((prev) => ({ ...prev, ...rest }));
      }
    };
    loadCloud();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveLocal = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaveMsg("Draft saved in this browser.");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const saveCloud = async () => {
    if (!user) {
      setSaveMsg("Log in to save to your account.");
      setTimeout(() => setSaveMsg(""), 4000);
      return;
    }
    await setDoc(doc(db, "resumes", user.uid), {
      ...form,
      updatedAt: serverTimestamp(),
    });
    setSaveMsg("Saved to your account.");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handlePrint = () => window.print();

  const skillList = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="page-shell resume-page">
      <div className="resume-toolbar no-print">
        <div>
          <h1 className="resume-page-title">Create your resume</h1>
          <p className="resume-page-lead">
            Edit on the left; preview updates on the right.{" "}
            <Link to="/internships">Find internships</Link> when you are ready.
          </p>
        </div>
        <div className="resume-toolbar-actions">
          <button type="button" className="login-btn" onClick={saveLocal}>
            Save draft (browser)
          </button>
          <button type="button" className="register-btn" onClick={saveCloud}>
            Save to account
          </button>
          <button type="button" className="login-btn" onClick={handlePrint}>
            Print / PDF
          </button>
        </div>
      </div>
      {saveMsg && <p className="resume-save-msg no-print">{saveMsg}</p>}
      {!user && (
        <p className="resume-hint no-print">
          Tip: <Link to="/login">Log in</Link> to store this resume in the cloud.
        </p>
      )}

      <div className="resume-split">
        <form className="resume-form card-box no-print" onSubmit={(e) => e.preventDefault()}>
          <h2>Your details</h2>
          <input name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input name="location" placeholder="City, Country" value={form.location} onChange={handleChange} />

          <h3>Professional summary</h3>
          <textarea
            name="summary"
            placeholder="2–4 lines: who you are, what you study, what you are looking for."
            value={form.summary}
            onChange={handleChange}
          />

          <h3>Education</h3>
          <textarea
            name="education"
            placeholder="Degree, institution, years, highlights (one block is fine)."
            value={form.education}
            onChange={handleChange}
          />

          <h3>Experience</h3>
          <textarea
            name="experience"
            placeholder="Internships, projects, volunteer work—role, org, dates, bullet points."
            value={form.experience}
            onChange={handleChange}
          />

          <h3>Skills</h3>
          <input
            name="skills"
            placeholder="Comma-separated e.g. React, Python, Figma"
            value={form.skills}
            onChange={handleChange}
          />

          <h3>Projects (optional)</h3>
          <textarea
            name="projects"
            placeholder="Notable projects with links or outcomes."
            value={form.projects}
            onChange={handleChange}
          />
        </form>

        <div className="resume-preview-wrap">
          <article className="resume-preview">
            <header className="resume-preview-header">
              <h2 className="resume-preview-name">{form.fullName || "Your name"}</h2>
              <div className="resume-preview-meta">
                {[form.email, form.phone, form.location].filter(Boolean).join(" · ") || "email · phone · location"}
              </div>
            </header>

            {form.summary && (
              <section className="resume-preview-section">
                <h3>Summary</h3>
                <p className="resume-preview-preserve">{form.summary}</p>
              </section>
            )}

            {form.education && (
              <section className="resume-preview-section">
                <h3>Education</h3>
                <p className="resume-preview-preserve">{form.education}</p>
              </section>
            )}

            {form.experience && (
              <section className="resume-preview-section">
                <h3>Experience</h3>
                <p className="resume-preview-preserve">{form.experience}</p>
              </section>
            )}

            {skillList.length > 0 && (
              <section className="resume-preview-section">
                <h3>Skills</h3>
                <ul className="resume-preview-skills">
                  {skillList.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {form.projects && (
              <section className="resume-preview-section">
                <h3>Projects</h3>
                <p className="resume-preview-preserve">{form.projects}</p>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
