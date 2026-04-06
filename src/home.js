import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return undefined;

    let scrollAmount = 0;
    let intervalId = setInterval(() => {
      scrollAmount += 1;
      slider.scrollLeft = scrollAmount;
      if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
        scrollAmount = 0;
      }
    }, 20);

    const pauseScroll = () => clearInterval(intervalId);
    const startScroll = () => {
      intervalId = setInterval(() => {
        scrollAmount += 1;
        slider.scrollLeft = scrollAmount;
        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
          scrollAmount = 0;
        }
      }, 20);
    };

    slider.addEventListener("mouseenter", pauseScroll);
    slider.addEventListener("mouseleave", startScroll);

    return () => {
      clearInterval(intervalId);
      slider.removeEventListener("mouseenter", pauseScroll);
      slider.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-badge">Internships &amp; career tools</p>
          <h1>Land the internship you want</h1>
          <p className="hero-subtitle">
            Browse openings, track applications, and build a polished resume—all in
            one place.
          </p>

          <div className="search-container">
            <Link to="/resume" className="search-cta hero-cta-primary">
              Create your resume
            </Link>
            <Link to="/internships" className="search-cta hero-cta-secondary">
              Browse internships
            </Link>
          </div>
        </div>
      </section>

      <section className="resume-spotlight">
        <div className="resume-spotlight-grid">
          <div>
            <span className="section-eyebrow">Built for students</span>
            <h2 className="resume-spotlight-title">Resume builder</h2>
            <p className="resume-spotlight-copy">
              Fill in your details, see a live preview, then save your draft or
              print a clean PDF. No sign-up required to start; log in to sync
              across devices.
            </p>
            <ul className="resume-spotlight-list">
              <li>Live preview as you type</li>
              <li>Save draft in your browser</li>
              <li>Print or save as PDF from your browser</li>
            </ul>
            <Link to="/resume" className="apply resume-spotlight-cta">
              Start building →
            </Link>
          </div>
          <div className="resume-spotlight-mock" aria-hidden="true">
            <div className="resume-mock-page">
              <div className="resume-mock-line wide" />
              <div className="resume-mock-line narrow" />
              <div className="resume-mock-line medium" />
              <div className="resume-mock-block" />
              <div className="resume-mock-line wide" />
              <div className="resume-mock-line wide" />
            </div>
          </div>
        </div>
      </section>

      <section className="trending">
        <div className="section-header">
          <span className="section-eyebrow">What&apos;s hot</span>
          <h2>Trending this week</h2>
        </div>
        <div className="trending-cards" ref={sliderRef}>
          <div className="trend-card">
            <h3>International roles</h3>
            <p>Remote-first internships from global teams.</p>
          </div>
          <div className="trend-card purple">
            <h3>Top startup picks</h3>
            <p>Fast-growing companies hiring across domains.</p>
          </div>
          <div className="trend-card orange">
            <h3>Summer drive</h3>
            <p>Fresh openings for engineering and design.</p>
          </div>
          <div className="trend-card">
            <h3>Stipend spotlight</h3>
            <p>Roles with competitive monthly stipends.</p>
          </div>
        </div>
      </section>

      <footer className="home-footer" id="about">
        <div className="home-footer-inner">
          <div className="home-footer-brand">
            <span className="home-footer-logo">InternsBridge</span>
            <p className="home-footer-tagline">
              We help students discover internships, organize applications, and
              present their best selves—with tools employers trust.
            </p>
          </div>

          <div className="home-footer-columns">
            <div className="home-footer-col">
              <h3 className="home-footer-heading">About</h3>
              <ul className="home-footer-links">
                <li>
                  <a href="#about">Our mission</a>
                </li>
                <li>
                  <Link to="/internships">Browse internships</Link>
                </li>
                <li>
                  <Link to="/resume">Resume builder</Link>
                </li>
                <li>
                  <a href="#about">How it works</a>
                </li>
              </ul>
            </div>

            <div className="home-footer-col">
              <h3 className="home-footer-heading">For companies</h3>
              <ul className="home-footer-links">
                <li>
                  <Link to="/signup">Post an internship</Link>
                </li>
                <li>
                  <Link to="/login">Employer login</Link>
                </li>
                <li>
                  <a href="mailto:partners@internsbridge.com">Partner with us</a>
                </li>
                <li>
                  <a href="mailto:partners@internsbridge.com">Hiring solutions</a>
                </li>
              </ul>
            </div>

            <div className="home-footer-col">
              <h3 className="home-footer-heading">Support</h3>
              <ul className="home-footer-links">
                <li>
                  <a href="mailto:support@internsbridge.com">Help center</a>
                </li>
                <li>
                  <a href="mailto:support@internsbridge.com">Contact support</a>
                </li>
                <li>
                  <a href="mailto:support@internsbridge.com">Report a listing</a>
                </li>
                <li>
                  <a href="mailto:support@internsbridge.com">Trust &amp; safety</a>
                </li>
              </ul>
            </div>

            <div className="home-footer-col">
              <h3 className="home-footer-heading">Legal &amp; more</h3>
              <ul className="home-footer-links">
                <li>
                  <a href="#privacy">Privacy policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of use</a>
                </li>
                <li>
                  <a href="#cookies">Cookie policy</a>
                </li>
                <li>
                  <a href="mailto:press@internsbridge.com">Press</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="home-footer-bottom">
            <p className="home-footer-copy">
              © {new Date().getFullYear()} InternsBridge. All rights reserved.
            </p>
            <div className="home-footer-social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
