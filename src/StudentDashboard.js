import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "./firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export default function StudentDashboard() {
  const user = auth.currentUser;
  const [internships, setInternships] = useState([]);
  const [saved, setSaved] = useState([]);
  const [applied, setApplied] = useState([]);
  const [activeTab, setActiveTab] = useState("browse");

  useEffect(() => {
    const fetchAll = async () => {
      if (!user) return;

      const internshipsSnap = await getDocs(collection(db, "internships"));
      const internshipsList = internshipsSnap.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setInternships(internshipsList);

      const savedSnap = await getDocs(
        query(collection(db, "savedInternships"), where("userId", "==", user.uid))
      );
      setSaved(savedSnap.docs.map((item) => ({ id: item.id, ...item.data() })));

      const appliedSnap = await getDocs(
        query(collection(db, "applications"), where("userId", "==", user.uid))
      );
      setApplied(appliedSnap.docs.map((item) => ({ id: item.id, ...item.data() })));
    };

    fetchAll();
  }, [user]);

  const savedIds = useMemo(() => new Set(saved.map((item) => item.internshipId)), [saved]);
  const appliedIds = useMemo(
    () => new Set(applied.map((item) => item.internshipId)),
    [applied]
  );

  const handleSave = async (item) => {
    if (!user || savedIds.has(item.id)) return;
    await addDoc(collection(db, "savedInternships"), {
      userId: user.uid,
      internshipId: item.id,
      role: item.role,
      company: item.company,
      stipend: item.stipend,
      type: item.type || "",
      link: item.link || "",
    });
    setSaved((prev) => [...prev, { internshipId: item.id, ...item }]);
  };

  const handleApply = async (item) => {
    if (!user || appliedIds.has(item.id)) return;
    await addDoc(collection(db, "applications"), {
      userId: user.uid,
      internshipId: item.id,
      role: item.role,
      company: item.company,
      stipend: item.stipend,
      type: item.type || "",
      status: "Applied",
      link: item.link || "",
    });
    setApplied((prev) => [...prev, { internshipId: item.id, ...item, status: "Applied" }]);
  };

  if (!user) return <h2>Please login</h2>;

  const renderBrowse = () =>
    internships.map((item) => (
      <div key={item.id} className="intern-card">
        <div className="intern-info">
          <h3>{item.role}</h3>
          <p>{item.company}</p>
          <p>Stipend: {item.stipend || "Not specified"}</p>
          <p>Mode: {item.type || "Not specified"}</p>
        </div>

        <div className="student-actions">
          <button
            className="student-action-btn"
            disabled={savedIds.has(item.id)}
            onClick={() => handleSave(item)}
          >
            {savedIds.has(item.id) ? "Saved" : "Save"}
          </button>
          <button
            className="student-action-btn primary-action"
            disabled={appliedIds.has(item.id)}
            onClick={() => handleApply(item)}
          >
            {appliedIds.has(item.id) ? "Applied" : "Apply"}
          </button>
        </div>
      </div>
    ));

  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      <p>Track internships, saved jobs, and applications.</p>

      <div className="student-tabs">
        <button
          className={activeTab === "browse" ? "active-tab" : ""}
          onClick={() => setActiveTab("browse")}
        >
          Browse
        </button>
        <button
          className={activeTab === "saved" ? "active-tab" : ""}
          onClick={() => setActiveTab("saved")}
        >
          Saved ({saved.length})
        </button>
        <button
          className={activeTab === "applied" ? "active-tab" : ""}
          onClick={() => setActiveTab("applied")}
        >
          Applied ({applied.length})
        </button>
      </div>

      {activeTab === "browse" && renderBrowse()}
      {activeTab === "saved" &&
        saved.map((item, index) => (
          <div key={`${item.internshipId}-${index}`} className="intern-card">
            <div className="intern-info">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
              <p>Stipend: {item.stipend || "Not specified"}</p>
            </div>
          </div>
        ))}
      {activeTab === "applied" &&
        applied.map((item, index) => (
          <div key={`${item.internshipId}-${index}`} className="intern-card">
            <div className="intern-info">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
              <p>Status: {item.status || "Applied"}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
