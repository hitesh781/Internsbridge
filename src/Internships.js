import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { companyLogoFallbackDataUri, companyLogoSrc } from "./utils/companyLogo";

export default function Internships() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "internships"));
        const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(list);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (item.role?.toLowerCase().includes(search.toLowerCase()) ||
        item.company?.toLowerCase().includes(search.toLowerCase())) &&
      (typeFilter === "" || item.type === typeFilter)
    );
  });

  return (
    <div className="main page-shell">
      <aside className="filters">
        <h3>Filters</h3>
        <p>{filteredData.length} results</p>
        <input
          type="text"
          placeholder="Search role/company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select onChange={(e) => setTypeFilter(e.target.value)} className="filter-input">
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>
      </aside>

      <div className="jobs">
        <h2>All Internships</h2>

        {filteredData.length === 0 ? (
          <p>No internships found</p>
        ) : (
          filteredData.map((item) => (
            <article key={item.id} className="card">
              <img
                src={companyLogoSrc(item.company, item.logo)}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = companyLogoFallbackDataUri(item.company);
                }}
              />

              <div className="info">
                <h3>{item.role}</h3>
                <Link to={`/company/${item.company?.toLowerCase()}`} className="company-link">
                  {item.company}
                </Link>
                <p>Stipend: {item.stipend || "Not specified"}</p>
                <p>Mode: {item.type || "Not specified"}</p>
              </div>

              <a href={item.link} target="_blank" rel="noreferrer" className="apply">
                Apply
              </a>
            </article>
          ))
        )}
      </div>
    </div>
  );
}