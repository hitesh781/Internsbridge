import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { companyLogoFallbackDataUri, companyLogoSrc } from "./utils/companyLogo";

export default function CompanyPage() {
  const { name } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "internships"));
      const list = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) => item.company && item.company.toLowerCase() === name.toLowerCase()
        );

      setData(list);
    };

    fetchData();
  }, [name]);

  const companyInfo = data[0];
  const displayName = companyInfo?.company || name;
  const websiteLink = companyInfo?.website?.startsWith("http")
    ? companyInfo.website
    : `https://${companyInfo?.website || ""}`;

  return (
    <div className="company-page">
      <div className="company-header">
        <img
          src={companyLogoSrc(displayName, companyInfo?.logo)}
          alt=""
          width={86}
          height={86}
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = companyLogoFallbackDataUri(displayName);
          }}
        />

        <div>
          <h1>{displayName}</h1>

          {companyInfo?.description && (
            <p className="desc">{companyInfo.description}</p>
          )}

          {companyInfo?.website && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noreferrer"
              className="website"
            >
              Visit Website
            </a>
          )}
        </div>
      </div>

      <h2>Open Internships</h2>
      {data.length === 0 && <p>No internships available</p>}
      {data.map((item) => (
        <div key={item.id} className="card">
          <h3>{item.role}</h3>
          <p>Stipend: {item.stipend}</p>
          <p>Mode: {item.type}</p>

          <a href={item.link} target="_blank" rel="noreferrer">
            Apply
          </a>
        </div>
      ))}
    </div>
  );
}