import React, { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        name,
        email,
        role,
        createdAt: serverTimestamp(),
      });
      alert("✅ Account created!");
      navigate(role === "company" ? "/admin" : "/student");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth card-box">
      <h2>Create your account</h2>

      <input placeholder="Full name" onChange={(e) => setName(e.target.value)} />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select className="filter-input" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="company">Company</option>
      </select>

      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}