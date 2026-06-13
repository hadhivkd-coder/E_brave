import React, { useState, useEffect, useRef } from 'react';
import './FAQ.css';

const faqData = [
  {
    question: 'How many students can be enrolled per batch?',
    answer:
      'E-Brave Compass can accommodate batches of 30 to 500+ students simultaneously. For larger institutions, we deploy multiple dedicated counselors to ensure every student receives personalized attention.',
  },
  {
    question: 'What is the typical program duration for a school?',
    answer:
      'Our standard institutional program runs over 6-8 weeks, with options for extended 12-week deep-dive programs. Each week includes structured assessments, counseling sessions, and group workshops.',
  },
  {
    question: 'Do you provide individual progress reports for each student?',
    answer:
      'Yes. Every student receives a comprehensive Compass Report that includes assessment results, career aptitude scores, counselor recommendations, and a personalized roadmap. Institutional partners also receive a consolidated impact report.',
  },
  {
    question: 'Can the program be customized for our curriculum?',
    answer:
      'Absolutely. E-Brave works closely with your academic leadership to align the Compass program with your school calendar, subject structure, and student profile. No two institutional programs are identical.',
  },
  {
    question: 'Is there a formal agreement or MoU for institutional partners?',
    answer:
      'Yes. All institutional partnerships are formalized through a Memorandum of Understanding that outlines program scope, timelines, deliverables, counselor assignment, and reporting cadence.',
  },
  {
    question: 'What qualifications do the E-Brave counselors hold?',
    answer:
      'All E-Brave counselors are certified career guidance professionals with a minimum of 3 years of student counseling experience. They undergo continuous training in assessments, psychometric tools, and contemporary career landscape analysis.',
  },
  {
    question: 'How do parents get involved in the program?',
    answer:
      "E-Brave includes dedicated Parent Guidance Sessions as part of every institutional package. These sessions help parents understand their child's assessment results and how to support informed academic decision-making at home.",
  },
  {
    question: 'What outcomes can we expect after the program?',
    answer:
      'Institutional partners consistently report improved student confidence, reduced career-related anxiety, clearer subject selection, and stronger parent satisfaction. Most schools observe visible changes within the first 3 weeks of the program.',
  },
];

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const headerRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('faq-header--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(headerEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header" ref={headerRef}>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-accent-line" aria-hidden="true" />
          <p className="faq-subtitle">
            Everything institutional partners need to know before getting started.
          </p>
        </div>

        {/* FAQ List */}
        <ul className="faq-list" role="list">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={index}
                className={`faq-item${isActive ? ' faq-item--active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => handleClick(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span
                    className={`faq-icon-wrapper${isActive ? ' faq-icon-wrapper--active' : ''}`}
                    aria-hidden="true"
                  >
                    <PlusIcon />
                  </span>
                </button>

                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
