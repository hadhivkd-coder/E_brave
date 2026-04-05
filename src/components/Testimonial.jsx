import React from 'react';

export default function Testimonial() {
    const reviews = [
        {
            name: 'Aswathi Menon',
            location: 'Kochi, Kerala',
            class: 'Class 12 pass — now B.Des student',
            text: 'I was torn between Engineering and Design for over a year. After the psychometric session with Dr. Priya, I finally understood why I kept gravitating toward visual subjects. I am now pursuing B.Des at Srishti Manipal and could not be happier.',
            rating: 5,
            photo: '/portraits/testimonial_aswathi.png',
            date: 'March 2025'
        },
        {
            name: 'Rahul Nambiar',
            location: 'Trivandrum, Kerala',
            class: 'Class 12 — PCMB stream',
            text: 'Honestly, I expected generic advice like everyone gives. Instead, they actually mapped my personality scores to career options I had never even heard of. I am now preparing for a BCA in Data Science. The session changed my entire direction.',
            rating: 5,
            photo: '/portraits/testimonial_rahul.png',
            date: 'February 2025'
        },
        {
            name: 'Sneha Varghese',
            location: 'Kozhikode, Kerala',
            class: '12th Pass — Commerce student',
            text: 'My parents wanted CA, I wanted something in Healthcare. The counselor bridged that gap beautifully. Some parts of the session\'s workbooks could have been more detailed, but the one-on-one clarity I got was truly worth it.',
            rating: 4,
            photo: null,
            initials: 'SV',
            date: 'January 2025'
        }
    ];

    return (
        <section id="reviews" className="testimonials scroll-reveal">
            <div className="sw">
                <div className="section-head text-center scroll-reveal-child">
                    <span className="stag">Student Stories</span>
                    <h2 className="sec-h">What Our Students Say</h2>
                    <p className="sec-p">Unfiltered feedback from real students across Kerala who found clarity with our guidance.</p>
                    <div className="overall-rating-bar">
                        <div className="orb-stars">{'★'.repeat(5)}</div>
                        <strong>4.9 / 5</strong>
                        <span>based on 780+ verified sessions</span>
                    </div>
                </div>

                <div className="testimonial-grid mt-4">
                    {reviews.map((review, index) => (
                        <div key={index} className={`test-card scroll-reveal-child delay-${index + 1}`}>
                            <div className="test-quote-icon">"</div>
                            <p className="test-body">{review.text}</p>
                            <div className="test-stars">
                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                <span className="test-rating-num">{review.rating}.0</span>
                            </div>
                            <div className="test-header">
                                <div className="test-avatar">
                                    {review.photo ? (
                                        <img
                                            src={review.photo}
                                            alt={review.name}
                                            className="test-avatar-img"
                                            loading="lazy"
                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        />
                                    ) : null}
                                    <div className="test-avatar-fallback" style={{ display: review.photo ? 'none' : 'flex' }}>
                                        {review.initials || review.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="test-meta">
                                    <h4 className="test-name">{review.name}</h4>
                                    <span className="test-loc">{review.location}</span>
                                    <span className="test-class">{review.class}</span>
                                    <span className="test-date">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
