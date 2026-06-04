import React, { useState, useEffect, useRef, useMemo } from 'react';

// ===== FAQ DATA =====
const FAQ_DATA = [
  { cat: 'general', q: 'Who is Dr. Srishti Dubey Mishra?', a: 'Dr. Srishti Dubey Mishra is an MD Dermatologist with a Fellowship in Aesthetics & Hair Transplantation. She practices at Dr. Srishti\'s Skin Clinic in Raipur, Chhattisgarh, and is known for combining medical-grade dermatology with advanced aesthetic treatments.' },
  { cat: 'general', q: 'Where is the clinic located?', a: 'Dr. Srishti\'s Skin Clinic is located in Raipur, Chhattisgarh. You can reach us at 0771-4333414 / 2990162 or on mobile at 7489771443 to get the exact address or book an appointment.' },
  { cat: 'general', q: 'How do I book an appointment?', a: 'You can call us at 0771-4333414, 2990162, or 7489771443 to book an appointment. We also accept walk-ins subject to availability. For follow-up consultations, call the clinic directly.' },
  { cat: 'general', q: 'What are the clinic timings?', a: 'Please call us at 0771-4333414 or 7489771443 for current OPD timings, as hours may vary. We recommend calling ahead to confirm your slot and avoid waiting.' },
  { cat: 'skin', q: 'What skin conditions does Dr. Srishti treat?', a: 'Dr. Srishti treats a wide range of conditions including acne and acne scars, pigmentation & melasma, eczema, psoriasis, vitiligo, rosacea, fungal infections, urticaria, alopecia (hair loss), nail disorders, and sexually transmitted infections (STI/STD).' },
  { cat: 'skin', q: 'How is acne treated at the clinic?', a: 'Treatment depends on severity. Mild acne may be managed with topical retinoids, antibiotics, or salicylic acid. Moderate-to-severe cases may require oral antibiotics, hormonal therapy, or isotretinoin. Advanced options include chemical peels, laser treatments, and light therapy for stubborn cases.' },
  { cat: 'skin', q: 'What is the treatment for pigmentation and melasma?', a: 'Melasma and pigmentation are treated with a combination of medical-grade depigmenting creams (hydroquinone, arbutin, kojic acid), chemical peels (glycolic, lactic, TCA), Q-switched laser, and strict sun protection protocols.' },
  { cat: 'skin', q: 'Do you treat eczema and psoriasis?', a: 'Yes. Eczema is managed with emollients, topical corticosteroids, and trigger identification. Psoriasis may require topical therapies, phototherapy (narrowband UVB), or systemic medications such as methotrexate or biologics for severe cases.' },
  { cat: 'aesthetics', q: 'What aesthetic treatments are available?', a: 'We offer a comprehensive range: Botox & fillers, chemical peels, microneedling (dermaroller/RF), PRP therapy, laser skin rejuvenation, thread lifts, HydraFacial, carbon laser facials, Q-switched laser for pigmentation, and anti-aging protocols.' },
  { cat: 'aesthetics', q: 'What is PRP therapy and how does it help?', a: 'PRP (Platelet-Rich Plasma) therapy involves drawing a small amount of your blood, centrifuging it to concentrate growth factors, and injecting it into the scalp (for hair loss) or skin (for rejuvenation). It stimulates collagen, improves texture, and is highly effective for androgenetic alopecia.' },
  { cat: 'aesthetics', q: 'Are Botox and fillers safe?', a: 'When administered by a qualified dermatologist like Dr. Srishti, Botox and dermal fillers are safe and effective. Botox relaxes muscles causing dynamic wrinkles; fillers restore lost volume. Results are temporary and natural-looking when done conservatively.' },
  { cat: 'aesthetics', q: 'What is a chemical peel and what does it treat?', a: 'A chemical peel uses an acid solution applied to the skin to exfoliate and reveal fresher skin. Superficial peels treat dullness and mild pigmentation; medium peels address acne scars and deeper pigmentation; deep peels for significant skin rejuvenation. Most peels need no downtime.' },
  { cat: 'hair', q: 'What hair problems does the clinic treat?', a: 'We treat all hair and scalp concerns: androgenetic alopecia (male & female pattern baldness), alopecia areata, telogen effluvium (stress-related hair fall), scalp psoriasis, dandruff, seborrheic dermatitis, and trichodynia.' },
  { cat: 'hair', q: 'What is hair transplantation and who is a good candidate?', a: 'Hair transplantation (FUE/FUT) surgically moves hair follicles from a donor area to balding areas. Ideal candidates are those with stable, patterned hair loss who have adequate donor hair. Dr. Srishti holds a Fellowship in Hair Transplantation and offers both FUE and supportive non-surgical options.' },
  { cat: 'hair', q: 'How effective is PRP for hair loss?', a: 'PRP is highly effective as an adjunct therapy for androgenetic alopecia and alopecia areata. Studies show it can reduce shedding by 30-70% and improve density. It is usually done as a series of 3-6 sessions monthly, followed by maintenance every 3-6 months.' },
  { cat: 'hair', q: 'What oral or topical medications are used for hair loss?', a: 'Minoxidil (topical/oral) and finasteride/dutasteride (for men) are the mainstays for androgenetic alopecia. For alopecia areata, intralesional corticosteroids or immunotherapy may be recommended. Dr. Srishti will tailor a regimen based on your hair loss pattern and blood work.' },
  { cat: 'laser', q: 'What laser treatments are offered?', a: 'We offer Q-switched Nd:YAG laser (pigmentation, tattoo removal), fractional CO2 laser (scar resurfacing, skin tightening), diode laser (hair removal), KTP/Pulsed Dye laser (vascular lesions), and carbon laser facial (pore refinement and acne).' },
  { cat: 'laser', q: 'Is laser hair removal permanent?', a: 'Laser hair removal significantly reduces hair density and regrowth but is not always 100% permanent. Most patients see 70-90% permanent reduction after 6-8 sessions. Maintenance sessions may be needed annually. It works best on dark hair with light to medium skin.' },
  { cat: 'laser', q: 'How many sessions of laser are needed for pigmentation?', a: 'For Q-switched laser on pigmentation, 4-8 sessions spaced 4-6 weeks apart are typically needed. Results depend on pigmentation type, depth, and skin type. Superficial epidermal pigmentation responds faster than deep dermal melasma.' },
  { cat: 'care', q: 'What skincare routine does Dr. Srishti recommend?', a: 'A good basic routine includes a gentle cleanser, vitamin C serum (morning), moisturizer, and broad-spectrum SPF 50+ sunscreen (mandatory, reapply every 2-3 hours). At night, a retinol or retinoid serum helps with anti-aging and pigmentation. Dr. Srishti customises routines based on your skin type and concerns.' },
  { cat: 'care', q: 'How important is sunscreen in a skincare routine?', a: 'Sunscreen is the single most important anti-aging and anti-pigmentation product. UVA rays cause premature aging and worsen melasma; UVB causes burns. Use SPF 50+ PA++++ daily, rain or shine, indoors and outdoors (screens emit UV too). Reapply every 2-3 hours when outside.' },
  { cat: 'care', q: 'What ingredients should I avoid if I have sensitive skin?', a: 'Avoid high concentrations of retinoids (start low and slow), physical scrubs, alcohol-based toners, fragranced products, and harsh surfactants (SLS). Stick to gentle, fragrance-free formulations. Dr. Srishti can create a tailored regimen for sensitive or reactive skin types.' },
];

const CAT_LABELS = {
  general: 'General & Appointments',
  skin: 'Skin Conditions',
  aesthetics: 'Aesthetic Treatments',
  hair: 'Hair & Scalp',
  laser: 'Laser Treatments',
  care: 'Skincare & Home Care',
};

const SYSTEM_PROMPT = `You are the AI assistant for Dr. Srishti's Skin Clinic — warm, knowledgeable, and professional.

Dr. Srishti Dubey Mishra is an MD Dermatologist with a Fellowship in Aesthetics & Hair Transplantation, based in Raipur, Chhattisgarh. Contact: 0771-4333414 / 2990162 / 7489771443.

Your roles:
1. Answer skin, hair, and aesthetic questions accurately and concisely
2. Understand what the patient wants to address
3. Guide them to book an appointment for personalised advice
4. Capture concerns naturally — never all at once
5. Escalate to clinic team for: emergencies, specific pricing, post-procedure complications

Personality: Warm, empathetic, and clear. No filler phrases like "Great question!" — get to the answer. Short sentences. Real information.

Lead qualification — weave in naturally:
- Is this a skin, hair, or aesthetic concern?
- How long have you had the issue?
- Any prior treatments tried?
- Recommend booking a consultation for personalised diagnosis

Keep answers concise (3-5 sentences for simple questions; structured lists for complex ones). Always recommend an in-person consultation for diagnosis. Be honest when something requires clinical assessment.

Escalation script: "For a personalised diagnosis and treatment plan, I'd recommend booking a consultation with Dr. Srishti. Would you like the clinic contact details?"`;

export default function App() {
  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // FAQ states
  const [activeCat, setActiveCat] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openQuestion, setOpenQuestion] = useState(null);

  // Chatbot states
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hello! I'm the assistant for Dr. Srishti's Skin Clinic.\n\nSkin concerns, hair loss, aesthetic treatments, or booking an appointment — ask me anything and I'll guide you."
    }
  ]);
  const [quickReplies, setQuickReplies] = useState([
    "I have an acne problem",
    "Hair fall treatment",
    "Interested in aesthetic treatments",
    "Book an appointment"
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Refs for Chat
  const chatMessagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Handle FAQ Toggling
  const toggleFAQ = (qText) => {
    if (openQuestion === qText) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(qText);
    }
  };

  // Filter FAQs
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCat = activeCat === 'all' || item.cat === activeCat;
      const matchesSearch = !searchTerm ||
        item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.a.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCat, searchTerm]);

  // Group FAQs by category
  const groupedFAQs = useMemo(() => {
    const groups = {};
    filteredFAQs.forEach((item) => {
      if (!groups[item.cat]) {
        groups[item.cat] = [];
      }
      groups[item.cat].push(item);
    });
    return groups;
  }, [filteredFAQs]);

  // Send message function
  const handleSendMessage = async (overrideText) => {
    const text = (overrideText || chatInput).trim();
    if (!text || isTyping) return;

    if (!overrideText) {
      setChatInput('');
    }
    setQuickReplies([]);

    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const apiMessages = updatedMessages.slice(1).map((msg) => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));

      const apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/chat';
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: apiMessages })
      });

      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);

      const lower = text.toLowerCase();
      let newQRs = [];
      if (lower.includes('acne') || lower.includes('pimple') || lower.includes('breakout')) {
        newQRs = ['Types of acne treatments?', 'Chemical peel for acne scars?', 'Is isotretinoin safe?'];
      } else if (lower.includes('hair') || lower.includes('bald') || lower.includes('alopecia')) {
        newQRs = ['PRP for hair loss?', 'Hair transplant details?', 'How long until I see results?'];
      } else if (lower.includes('laser') || lower.includes('pigment') || lower.includes('dark spot')) {
        newQRs = ['Laser sessions needed?', 'Q-switched vs CO2 laser?', 'Cost of laser treatment?'];
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('visit')) {
        newQRs = ['Clinic phone number?', 'Walk-in available?', 'What to bring for first visit?'];
      } else {
        newQRs = ['Skin concerns', 'Hair loss help', 'Aesthetic treatments', 'Book appointment'];
      }
      setQuickReplies(newQRs);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Having trouble connecting right now. Please call us at 7489771443.' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendToChat = (q) => {
    const faqEl = document.getElementById('faq');
    if (faqEl) {
      faqEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      handleSendMessage(q);
    }, 400);
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="logo">
          Dr. Srishti's<span> Skin Clinic</span>
        </a>
        <button
          className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
          <li><a href="#treatments" onClick={() => setIsMenuOpen(false)}>Treatments</a></li>
          <li><a href="#tech" onClick={() => setIsMenuOpen(false)}>Technology</a></li>
          <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Packages</a></li>
          <li><a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a></li>
          <li><a href="tel:7489771443" className="nav-cta" onClick={() => setIsMenuOpen(false)}>Book Appointment</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">Dermatologist · MD · Fellow in Aesthetics & Hair Transplantation</div>
          <h1>
            Expert skin & hair care by <em>Dr. Srishti</em>
          </h1>
          <p className="hero-sub">
            Medical-grade dermatology, advanced aesthetic treatments, and hair transplantation — all under one roof at Dr. Srishti's Skin Clinic, Raipur.
          </p>
          <div className="hero-actions">
            <a href="tel:7489771443" className="btn-primary">📞 Call Now: 7489771443</a>
            <a href="#faq" className="btn-secondary">Ask the AI Assistant</a>
          </div>
        </div>
        <div className="hero-visual"></div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div>
          <div className="stat-num">2,109+</div>
          <div className="stat-label">Happy followers & patients</div>
        </div>
        <div>
          <div className="stat-num">205+</div>
          <div className="stat-label">Posts & patient education</div>
        </div>
        <div>
          <div className="stat-num">MD</div>
          <div className="stat-label">Qualified Dermatologist</div>
        </div>
        <div>
          <div className="stat-num">Raipur</div>
          <div className="stat-label">Chhattisgarh, India</div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-label">What we offer</div>
        <h2 className="section-title">Comprehensive skin & hair care under one roof</h2>
        <p className="section-sub">
          From everyday skin concerns to advanced aesthetic procedures — expert dermatology care by Dr. Srishti Dubey Mishra, MD.
        </p>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon bg-pink">🩺</div>
            <h3>Medical Dermatology</h3>
            <p>Diagnosis and treatment of acne, eczema, psoriasis, vitiligo, urticaria, fungal infections, and all chronic skin conditions.</p>
            <span className="service-tag">Clinical</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-blue">✨</div>
            <h3>Aesthetic Treatments</h3>
            <p>Botox, dermal fillers, chemical peels, PRP therapy, microneedling, HydraFacial, and anti-aging skin rejuvenation protocols.</p>
            <span className="service-tag">Aesthetics</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-green">💇</div>
            <h3>Hair & Scalp Care</h3>
            <p>Treatment of all hair loss types — androgenetic alopecia, alopecia areata, telogen effluvium — with PRP, medications, and mesotherapy.</p>
            <span className="service-tag">Trichology</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-purple">💡</div>
            <h3>Laser Treatments</h3>
            <p>Q-switched laser, fractional CO2, diode laser hair removal, carbon laser facial, and laser for pigmentation, scars, and vascular lesions.</p>
            <span className="service-tag">Technology</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-orange">🧴</div>
            <h3>Hair Transplantation</h3>
            <p>FUE hair transplant by a Fellowship-trained surgeon. Natural results for male and female pattern baldness and hairline restoration.</p>
            <span className="service-tag">Surgical</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-yellow">🛡️</div>
            <h3>Skin Cancer Screening</h3>
            <p>Dermoscopy-assisted skin lesion evaluation, mole mapping, and early detection of suspicious skin lesions.</p>
            <span className="service-tag">Preventive</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-pink">🌿</div>
            <h3>Customised Skincare</h3>
            <p>Personalised skincare routines with medical-grade actives — retinoids, vitamin C, SPF, AHAs — tailored to your skin type and goals.</p>
            <span className="service-tag">Prescription</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-blue">🔬</div>
            <h3>STI / STD Management</h3>
            <p>Confidential diagnosis, testing, and treatment of sexually transmitted infections with complete privacy and sensitivity.</p>
            <span className="service-tag">Confidential</span>
          </div>
          <div className="service-card">
            <div className="service-icon bg-green">💉</div>
            <h3>Intralesional Therapy</h3>
            <p>Steroid injections for alopecia areata, keloids, hypertrophic scars, and cystic acne for rapid targeted improvement.</p>
            <span className="service-tag">In-Clinic</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works" id="how">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Your journey to healthier skin in four steps</h2>
        <p className="section-sub">A clear, personalised path from consultation to results — no guesswork.</p>
        <div className="steps-grid">
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-num">01</div>
            <h4>Book a Consultation</h4>
            <p>Call or walk into the clinic. Dr. Srishti listens to your concerns and history thoroughly.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Clinical Examination</h4>
            <p>Skin/scalp examination, dermoscopy if needed, and any required investigations are done.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Personalised Treatment Plan</h4>
            <p>A tailored treatment protocol — medical, procedural, or both — designed for your condition.</p>
          </div>
          <div className="step">
            <div className="step-num">04</div>
            <h4>Follow-Up & Results</h4>
            <p>Regular follow-ups, progress tracking, and skincare guidance to maintain and enhance results.</p>
          </div>
        </div>
      </section>

      {/* TREATMENTS (was DRONE TYPES) */}
      <section className="drone-types" id="treatments">
        <div className="section-label">Treatment categories</div>
        <h2 className="section-title">Every concern, expertly addressed</h2>
        <p className="section-sub">From common skin issues to advanced procedures — comprehensive dermatology care for every patient.</p>
        <div className="types-grid">
          <div className="type-card">
            <div className="type-img bg-pink">🫧</div>
            <div>
              <h3>Acne & Acne Scars</h3>
              <p>Comedonal, inflammatory, cystic acne — topicals, oral therapy, chemical peels, lasers, and scar revision.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-orange">🌟</div>
            <div>
              <h3>Pigmentation & Melasma</h3>
              <p>Melasma, post-inflammatory hyperpigmentation, sunspots — depigmenting agents, peels, Q-switched laser.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-green">🍃</div>
            <div>
              <h3>Eczema & Psoriasis</h3>
              <p>Chronic skin conditions managed with topicals, phototherapy (NB-UVB), systemic therapy, and lifestyle guidance.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-purple">💜</div>
            <div>
              <h3>Vitiligo</h3>
              <p>Narrowband UVB phototherapy, topical immunomodulators, excimer laser, and surgical options like melanocyte transfer.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-yellow">⚡</div>
            <div>
              <h3>Anti-Aging & Rejuvenation</h3>
              <p>Botox, fillers, PRP, thread lifts, fractional laser, HydraFacial — non-surgical options for youthful, glowing skin.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-blue">💙</div>
            <div>
              <h3>Hair Loss & Hair Transplant</h3>
              <p>PRP, minoxidil, finasteride, mesotherapy, and Fellowship-level FUE hair transplantation for all hair loss types.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-pink">🌺</div>
            <div>
              <h3>Nail Disorders</h3>
              <p>Fungal nail infections, nail psoriasis, ingrown nails, pitting, and other nail disorders diagnosed and treated.</p>
            </div>
          </div>
          <div className="type-card">
            <div className="type-img bg-green">🔬</div>
            <div>
              <h3>Skin Growths & Lesions</h3>
              <p>Mole removal, wart treatment (CO2 laser/cautery), skin tag removal, sebaceous cysts, and lipoma removal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="tech-section" id="tech">
        <div className="section-label">Clinic technology</div>
        <h2 className="section-title">Advanced technology for superior results</h2>
        <p className="section-sub">State-of-the-art dermatology equipment used by Dr. Srishti for diagnosis and treatment.</p>
        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-company-name">Q-Switched Nd:YAG Laser</div>
            <div className="tech-country">Pigmentation & Tattoo Removal</div>
            <div className="tech-tags">
              <span className="tech-tag">Melasma</span>
              <span className="tech-tag">Dark Spots</span>
              <span className="tech-tag">Tattoo Removal</span>
              <span className="tech-tag">Carbon Facial</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">Fractional CO2 Laser</div>
            <div className="tech-country">Resurfacing & Scar Treatment</div>
            <div className="tech-tags">
              <span className="tech-tag">Acne Scars</span>
              <span className="tech-tag">Skin Tightening</span>
              <span className="tech-tag">Wrinkle Reduction</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">Diode Laser</div>
            <div className="tech-country">Permanent Hair Reduction</div>
            <div className="tech-tags">
              <span className="tech-tag">Full Body</span>
              <span className="tech-tag">Face & Underarms</span>
              <span className="tech-tag">All Skin Types</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">Narrowband UVB Phototherapy</div>
            <div className="tech-country">Vitiligo & Psoriasis</div>
            <div className="tech-tags">
              <span className="tech-tag">NB-UVB</span>
              <span className="tech-tag">Vitiligo</span>
              <span className="tech-tag">Psoriasis</span>
              <span className="tech-tag">Eczema</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">Dermoscopy</div>
            <div className="tech-country">Advanced Skin Lesion Analysis</div>
            <div className="tech-tags">
              <span className="tech-tag">Mole Mapping</span>
              <span className="tech-tag">Hair Analysis</span>
              <span className="tech-tag">Scalp Scope</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">RF Microneedling</div>
            <div className="tech-country">Collagen Induction Therapy</div>
            <div className="tech-tags">
              <span className="tech-tag">Skin Tightening</span>
              <span className="tech-tag">Pore Reduction</span>
              <span className="tech-tag">Scar Revision</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">PRP System</div>
            <div className="tech-country">Platelet-Rich Plasma Therapy</div>
            <div className="tech-tags">
              <span className="tech-tag">Hair Restoration</span>
              <span className="tech-tag">Skin Rejuvenation</span>
              <span className="tech-tag">Alopecia Areata</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">HydraFacial System</div>
            <div className="tech-country">Deep Cleansing & Hydration</div>
            <div className="tech-tags">
              <span className="tech-tag">Exfoliation</span>
              <span className="tech-tag">Hydration</span>
              <span className="tech-tag">Pore Cleansing</span>
            </div>
          </div>
          <div className="tech-card">
            <div className="tech-company-name">FUE Hair Transplant</div>
            <div className="tech-country">Follicular Unit Extraction</div>
            <div className="tech-tags">
              <span className="tech-tag">Permanent Results</span>
              <span className="tech-tag">Minimally Invasive</span>
              <span className="tech-tag">Fellowship Trained</span>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="section-label">Consultation packages</div>
        <h2 className="section-title">Transparent. Personalised. Affordable.</h2>
        <p className="section-sub">
          Consultation fees and procedure pricing at Dr. Srishti's Skin Clinic. Call for exact procedure costs.
        </p>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-name">General Consultation</div>
            <div className="plan-price"><sup>₹</sup>500</div>
            <div className="plan-period">Per visit · First consultation</div>
            <ul className="plan-features">
              <li>Skin / scalp examination</li>
              <li>Medical history review</li>
              <li>Diagnosis & prescription</li>
              <li>Skincare guidance</li>
              <li>Follow-up plan</li>
            </ul>
            <a href="tel:7489771443" className="btn-primary">Book Now</a>
          </div>
          <div className="plan-card featured">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-name">Aesthetic Consultation</div>
            <div className="plan-price"><sup>₹</sup>800</div>
            <div className="plan-period">Per visit · Includes treatment plan</div>
            <ul className="plan-features">
              <li>In-depth skin analysis</li>
              <li>Customised aesthetic plan</li>
              <li>Procedure recommendation</li>
              <li>Pre-procedure assessment</li>
              <li>Before-after photo protocol</li>
              <li>Post-care instructions</li>
              <li>Priority follow-up</li>
            </ul>
            <a href="tel:7489771443" className="btn-primary">Book Now</a>
          </div>
          <div className="plan-card">
            <div className="plan-name">Hair Transplant Consult</div>
            <div className="plan-price"><sup>₹</sup>1000</div>
            <div className="plan-period">Per visit · Detailed hair assessment</div>
            <ul className="plan-features">
              <li>Trichoscopy / dermoscopy</li>
              <li>Donor area assessment</li>
              <li>Graft count estimation</li>
              <li>FUE procedure planning</li>
              <li>Blood test guidance</li>
              <li>Pre-op instructions</li>
              <li>Transparent pricing quote</li>
            </ul>
            <a href="tel:7489771443" className="btn-primary">Contact Clinic</a>
          </div>
        </div>
      </section>

      {/* FAQ + CHATBOT */}
      <section className="faq-chatbot-section" id="faq">
        <div className="section-label">FAQ + AI Assistant</div>
        <h2 className="section-title">21 expert answers. And an AI that goes deeper.</h2>
        <p className="section-sub">
          Search our dermatology FAQ instantly. Or ask the AI assistant anything — it answers in seconds and helps you understand your skin and hair concerns.
        </p>

        <div className="faq-chat-layout">
          {/* FAQ PANEL */}
          <div className="faq-panel">
            <div className="faq-panel-header">
              <h2>Skin & Hair FAQ — 21 Expert Answers</h2>
              <span className="faq-count">6 Categories</span>
            </div>
            <div className="faq-search-wrap">
              <div className="search-wrap-inner">
                <span className="search-icon">🔍</span>
                <input
                  className="faq-search"
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); }}
                />
              </div>
            </div>
            <div className="faq-cats">
              {['all', 'general', 'skin', 'aesthetics', 'hair', 'laser', 'care'].map((catKey) => (
                <div
                  key={catKey}
                  className={`cat-tab ${activeCat === catKey ? 'active' : ''}`}
                  onClick={() => { setActiveCat(catKey); }}
                >
                  {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                </div>
              ))}
            </div>
            <div className="faq-list">
              {filteredFAQs.length === 0 ? (
                <div className="no-results">No matching questions. Try the AI assistant below.</div>
              ) : activeCat === 'all' ? (
                Object.keys(groupedFAQs).map((catKey) => (
                  <React.Fragment key={catKey}>
                    <div className="faq-category-label">{CAT_LABELS[catKey]}</div>
                    {groupedFAQs[catKey].map((item) => (
                      <div
                        key={item.q}
                        className={`faq-item ${openQuestion === item.q ? 'open' : ''}`}
                      >
                        <div className="faq-q" onClick={() => toggleFAQ(item.q)}>
                          <span className="faq-q-text">{item.q}</span>
                          <span className="faq-chevron">▾</span>
                        </div>
                        <div className="faq-a" style={{ display: openQuestion === item.q ? 'block' : 'none' }}>
                          <div className="faq-a-inner">
                            {item.a}
                            <br />
                            <button className="ask-chat-btn" onClick={() => sendToChat(item.q)}>
                              💬 Ask follow-up in AI chat →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                filteredFAQs.map((item) => (
                  <div
                    key={item.q}
                    className={`faq-item ${openQuestion === item.q ? 'open' : ''}`}
                  >
                    <div className="faq-q" onClick={() => toggleFAQ(item.q)}>
                      <span className="faq-q-text">{item.q}</span>
                      <span className="faq-chevron">▾</span>
                    </div>
                    <div className="faq-a" style={{ display: openQuestion === item.q ? 'block' : 'none' }}>
                      <div className="faq-a-inner">
                        {item.a}
                        <br />
                        <button className="ask-chat-btn" onClick={() => sendToChat(item.q)}>
                          💬 Ask follow-up in AI chat →
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CHAT PANEL */}
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">🩺</div>
              <div className="chat-header-info">
                <h3>Skin Clinic Assistant</h3>
                <p>Dr. Srishti's Clinic AI — replies instantly</p>
              </div>
              <div className="online-dot"></div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`msg ${msg.role}`}>
                  <div className="msg-avatar">
                    {msg.role === 'bot' ? '🩺' : 'You'}
                  </div>
                  <div className="msg-bubble">
                    {msg.content.split('\n').map((line, lIdx) => (
                      <React.Fragment key={lIdx}>
                        {line}
                        {lIdx < msg.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="msg bot">
                  <div className="msg-avatar">🩺</div>
                  <div className="msg-bubble typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatMessagesEndRef} />
            </div>

            <div className="quick-replies">
              {quickReplies.map((replyText, idx) => (
                <button
                  key={idx}
                  className="qr-btn"
                  onClick={() => { handleSendMessage(replyText); }}
                >
                  {replyText}
                </button>
              ))}
            </div>

            <div className="chat-input-row">
              <input
                className="chat-input"
                type="text"
                placeholder="Ask about skin, hair, or treatments..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { handleSendMessage(); } }}
              />
              <button className="send-btn" onClick={() => { handleSendMessage(); }}>
                <svg viewBox="0 0 24 24">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>
          Ready to achieve your <span>best skin</span> ever?
        </h2>
        <p>Join hundreds of patients who trust Dr. Srishti Dubey Mishra for expert dermatology care in Raipur.</p>
        <div className="cta-actions">
          <a href="tel:7489771443" className="btn-accent">📞 Call: 7489771443</a>
          <a href="#faq" className="btn-outline-white">Ask the AI Now</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-brand">
          <a href="#" className="logo">
            Dr. Srishti's<span style={{ color: 'var(--accent)' }}> Skin Clinic</span>
          </a>
          <p>
            Expert dermatology, aesthetic treatments, and hair transplantation by Dr. Srishti Dubey Mishra, MD — serving Raipur, Chhattisgarh.
          </p>
        </div>
        <div>
          <h5>Treatments</h5>
          <ul>
            <li><a href="#services">Medical Dermatology</a></li>
            <li><a href="#services">Aesthetic Treatments</a></li>
            <li><a href="#services">Laser Therapy</a></li>
            <li><a href="#services">Hair Transplant</a></li>
            <li><a href="#services">Skincare Plans</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="tel:07714333414">0771-4333414</a></li>
            <li><a href="tel:07712990162">0771-2990162</a></li>
            <li><a href="tel:7489771443">7489771443</a></li>
            <li><a href="https://www.instagram.com/dr.srishti.skinclinic" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h5>Info</h5>
          <ul>
            <li><a href="#">About Dr. Srishti</a></li>
            <li><a href="#">Patient Education</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2025 Dr. Srishti's Skin Clinic, Raipur. All rights reserved.</span>
        <a href="https://www.instagram.com/dr.srishti.skinclinic" target="_blank" rel="noreferrer">@dr.srishti.skinclinic</a>
      </div>
    </>
  );
}
