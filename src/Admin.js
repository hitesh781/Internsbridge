import React, { useCallback, useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as CompanyLogo from "./utils/companyLogo";

export default function Admin() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    company: "",
    role: "",
    stipend: "",
    link: "",
    type: "",
    logo: "",
    description: "",
    website: ""
  });

  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔄 handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const fetchData = useCallback(async () => {
    if (!user) return;

    const q = query(
      collection(db, "internships"),
      where("userId", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setData(list);
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🚀 ADD / UPDATE
  const handleSubmit = async () => {

    if (editId) {
      // update
      await updateDoc(doc(db, "internships", editId), form);
      alert("Updated!");
      setEditId(null);
    } else {
      // add
      await addDoc(collection(db, "internships"), {
  ...form,
  userId: user.uid,
  company: form.company
});
      alert("Posted!");
    }

    setForm({
      company: "",
      role: "",
      stipend: "",
      link: "",
      type: "",
      logo: "",
      description: "",
      website: ""
    });

    fetchData();
  };

  // ❌ delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "internships", id));
    fetchData();
  };

  // ✏️ edit
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  // 🔓 logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return <h2>Please login</h2>;

  return (
    <div className="dashboard">

      <h1>🏢 Company Dashboard</h1>
      <p>{user.email}</p>

      <button className="logout" onClick={handleLogout}>Logout</button>

      {/* FORM */}
      <div className="card-box">
        <h2>{editId ? "✏️ Edit Internship" : "➕ Post Internship"}</h2>

        <div className="form-row">
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
          <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
          <input name="stipend" placeholder="Stipend" value={form.stipend} onChange={handleChange} />
          <input name="link" placeholder="Apply Link" value={form.link} onChange={handleChange} />
          <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
          <input name="logo" placeholder="Logo URL" value={form.logo} onChange={handleChange} />
          <input name="description" placeholder="Company Description" value={form.description} onChange={handleChange} />
          <input name="website" placeholder="Website" value={form.website} onChange={handleChange} />

          <button className="post-btn" onClick={handleSubmit}>
            {editId ? "Update" : "Post"}
          </button>
        </div>
      </div>

      {/* LIST */}
      <h2 className="section-title">📊 My Internships</h2>

      {data.length === 0 && <p>No internships yet</p>}

      {data.map(item => (
        <div key={item.id} className="intern-card">

          <img
            src={CompanyLogo.companyLogoSrc(item.company, item.logo)}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = CompanyLogo.companyLogoFallbackDataUri(item.company);
            }}
          />

          <div className="intern-info">
            <h3>{item.role}</h3>
            <p>{item.company}</p>
            <p>₹ {item.stipend}</p>
          </div>

          <div>
            <button onClick={() => handleEdit(item)}>✏️ Edit</button>
            <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
          </div>

        </div>
      ))}

    </div>
  );
}