import React, { useState } from 'react';

const faqs = [
    {
        q: "What makes E-Brave's Maths Foundation program different?",
        a: "Unlike traditional tuition that just covers the current syllabus, we first diagnose exact 'learning gaps' from previous grades. We bridge these foundational gaps using visual video lessons followed by live 1-on-1 teacher doubt-solving sessions."
    },
    {
        q: "Who is the Maths program suitable for?",
        a: "Our Maths Foundation Program is designed for students in Grades 5 through 12 who experience math anxiety, struggle with core concepts, or want to build an unshakable foundation for competitive exams."
    },
    {
        q: "Do you also provide Career Counseling?",
        a: "Yes! While our primary focus is building strong mathematical foundations, we also have certified experts who provide comprehensive career counseling and psychometric assessments for students from Class 8 to college graduates."
    },
    {
        q: "How does the 1-on-1 teacher session work?",
        a: "After watching a conceptual video module, the student connects live with an expert teacher. The teacher assesses their understanding, answers specific doubts, and works through problems together to ensure total mastery."
    },
    {
        q: "Is the teaching available in Malayalam?",
        a: "Absolutely! Our mentors are fluent in both Malayalam and English, ensuring students can grasp complex concepts in the language they are most comfortable with."
    },
    {
        q: "What happens after I book a Free Demo Class?",
        a: "Once you register, our team will contact you within 24 hours to schedule a convenient time. During the free demo, we'll assess your child's current foundation level and explain how our methodology can help them."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section id="faq" className="faq-section scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">Got Questions?</span>
                    <h2 className="sec-h">Frequently Asked Questions</h2>
                    <p className="sec-p">Everything you need to know about our Foundation Program and Career Services.</p>
                </div>
                <div className="faq-list">
                    {faqs.map((faq, i) => (
                        <div
                            className={`faq-item scroll-reveal-child ${openIndex === i ? 'open' : ''}`}
                            key={i}
                        >
                            <button className="faq-question" onClick={() => toggle(i)}>
                                <span>{faq.q}</span>
                                <div className="faq-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </button>
                            <div className="faq-answer">
                                <div className="faq-answer-inner">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
