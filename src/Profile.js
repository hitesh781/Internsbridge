import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

export default function Profile() {

  const user = auth.currentUser;

  const [form, setForm] = useState({
    company: "",
    description: "",
    website: "",
    logo: ""
  });

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 📊 load profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "companies", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setForm(docSnap.data());
      }
    };

    loadProfile();
  }, [user]);

  // 💾 save profile
  const handleSave = async () => {
    await setDoc(doc(db, "companies", user.uid), form);
    alert("Profile saved!");
  };

  if (!user) return <h2>Please login</h2>;

  return (
    <div className="dashboard">

      <h1>🏢 Company Profile</h1>

      <div className="card-box">

        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />

        <input
          name="logo"
          placeholder="Logo URL"
          value={form.logo}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={form.description}
          onChange={handleChange}
        />

        <br />

        <button className="post-btn" onClick={handleSave}>
          Save Profile
        </button>

      </div>

    </div>
  );
}