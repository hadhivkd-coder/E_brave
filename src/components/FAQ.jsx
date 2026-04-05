import React, { useState } from 'react';

const faqs = [
    {
        q: "What is career counseling and how does it help?",
        a: "Career counseling is a scientific process where certified experts help students discover their natural strengths, interests, and personality traits through psychometric assessments. This helps students make informed career decisions instead of following the crowd, ensuring they pursue paths they'll truly enjoy and excel in."
    },
    {
        q: "Who is this suitable for? What age group?",
        a: "Our counseling is designed specifically for students from Class 8 to graduates (ages 13–22). Whether you're confused about choosing a stream after 10th, a course after 12th, or a career after graduation — we've got you covered."
    },
    {
        q: "Is the counseling available in Malayalam?",
        a: "Absolutely! All our counselors are fluent in both Malayalam and English. You can choose whichever language you're most comfortable with for your sessions."
    },
    {
        q: "How long is a typical counseling session?",
        a: "A typical 1-on-1 session lasts between 45 minutes to 1 hour. This includes reviewing your psychometric results, discussing your interests, and building your personalized career roadmap."
    },
    {
        q: "What happens after I register on the website?",
        a: "Once you submit your registration, you'll be redirected to WhatsApp to connect with our team instantly. A counselor will reach out within 24 hours to schedule your psychometric assessment and first session."
    },
    {
        q: "Is there a refund policy?",
        a: "Yes! We offer a 100% satisfaction guarantee. If you don't find our guidance helpful after your first session, we provide a complete, hassle-free refund — no questions asked."
    },
    {
        q: "Can parents attend the counseling session?",
        a: "Absolutely. In fact, we encourage parents to be part of the session. Career decisions are family decisions, and having parents involved ensures everyone is aligned on the best path forward."
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
                    <p className="sec-p">Everything you need to know before taking the first step toward your dream career.</p>
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
