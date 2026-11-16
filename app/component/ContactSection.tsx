import { useEffect, useState } from 'react';
import { ChevronRight, Compass, Globe2, WandSparkles, X } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { ProjectDetailModal } from './ProjectDetailModal';
interface Lead {
  name: string;
  projectType: string;
  email: string;
  visionText: string;
}

interface ContactInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mayaLead: Lead = {
  name: 'Maya Chen',
  projectType: 'Brand website',
  email: 'maya.chen@example.com',
  visionText: "I'm looking for a thoughtful digital identity and a polished launch experience."
};

const jordanLead: Lead = {
  name: 'Jordan Ellis',
  projectType: 'Product design',
  email: 'jordan.ellis@example.com',
  visionText: 'We need help shaping a clear, memorable interface for a new product.'
};


const ContactInquiryModal = ({
  isOpen,
  onClose
}: ContactInquiryModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="contact-modal-overlay"
      role="presentation"
      onMouseDown={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-inquiry-title"
        className="contact-modal-dialog"
        onMouseDown={event => event.stopPropagation()}
      >
        <header className="contact-modal-header">
          <h2
            id="project-inquiry-title"
            className="contact-modal-title"
          >
            <span>Project Inquiry</span>
          </h2>

          <button
            type="button"
            aria-label="Close project inquiry"
            className="contact-modal-close"
            onClick={onClose}
          >
            <X
              aria-hidden="true"
              size={18}
              strokeWidth={1.8}
            />
          </button>
        </header>

        <form
          className="contact-inquiry-form"
          onSubmit={event => {
            event.preventDefault();
            // No submission endpoint is configured yet. Keep the visitor's draft in place.
          }}
        >
          <fieldset>
            <legend className="form-legend">
              <span>Name </span>
              <span className="required-mark">*</span>
            </legend>

            <div className="name-fields">
              <label className="form-label">
                <input
                  className="form-input"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                />
                <span className="field-description">
                  First Name
                </span>
              </label>

              <label className="form-label">
                <input
                  className="form-input"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                />
                <span className="field-description">
                  Last Name
                </span>
              </label>
            </div>
          </fieldset>

          <label className="form-label form-label-small">
            <span className="form-label-title">
              <span>Email </span>
              <span className="required-mark">*</span>
            </span>

            <input
              className="form-input"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="form-label form-label-small">
            <span className="form-label-title">
              Project Type
            </span>

            <input
              className="form-input"
              name="projectType"
              type="text"
            />
          </label>

          <label className="form-label">
            <span className="form-label-title">
              <span>Message </span>
              <span className="required-mark">*</span>
            </span>

            <textarea
              className="form-textarea"
              name="message"
              required
              defaultValue={consultantSummary}
            />
          </label>

          <p className="contact-submit-notice" role="status">
            Inquiry delivery is not configured yet. Your details stay in this form and are not sent or stored.
          </p>

          <div className="submit-container">
            <button
              type="button"
              className="submit-button"
              disabled
              aria-disabled="true"
            >
              <span>Submission unavailable</span>
            </button>
          </div>
        </form>
      </article>
    </div>
  );
};

export const LandingDashboard = () => {
  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [isContactOpen, setIsContactOpen] =
    useState(false);
  const [consultantSummary, setConsultantSummary] = useState("");

  useEffect(() => {
    const handleConsultantInquiry = (event: Event) => {
      const detail = (event as CustomEvent<{ summary?: string }>).detail;
      if (typeof detail?.summary === "string") {
        setConsultantSummary(detail.summary.slice(0, 9000));
        setIsContactOpen(true);
      }
    };

    window.addEventListener("onyx:open-inquiry", handleConsultantInquiry);
    return () => window.removeEventListener("onyx:open-inquiry", handleConsultantInquiry);
  }, []);

  return (
    <main className="landing-dashboard">
   <section
  className="landing-hero"
  aria-labelledby="hero-title"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)),
      url('/image/contact-banner.png')
    `,
  }}
>
        <div className="contact-content">
         

          <div className="contact-button-container">
            <button
              type="button"
              className="hero-button"
            >
              <span>Explore the portfolio</span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="landing-content-section"
        aria-labelledby="landing-title"
      >
        <div className="landing-card">
          <header>
            <h2
              id="landing-title"
              className="landing-title"
            >
              <span>A sharper point of view</span>
            </h2>
          </header>

          <section
            className="conversations-section"
            aria-labelledby="conversations-title"
          >
            <h2
              id="conversations-title"
              className="conversations-title"
            >
              <span>Recent project conversations</span>
            </h2>

            <div className="conversation-list">
              <button
                type="button"
                onClick={() => setSelectedLead(mayaLead)}
                className="conversation-button"
              >
                <span className="conversation-person">
                  <span className="conversation-name">
                    Maya Chen
                  </span>

                  <span className="conversation-project">
                    Brand website
                  </span>
                </span>

                <span
                  className="conversation-arrow"
                  aria-hidden="true"
                >
                  <ChevronRight
                    size={24}
                    strokeWidth={1.7}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(jordanLead)}
                className="conversation-button"
              >
                <span className="conversation-person">
                  <span className="conversation-name">
                    Jordan Ellis
                  </span>

                  <span className="conversation-project">
                    Product design
                  </span>
                </span>

                <span
                  className="conversation-arrow"
                  aria-hidden="true"
                >
                  <ChevronRight
                    size={24}
                    strokeWidth={1.7}
                  />
                </span>
              </button>
            </div>
          </section>

          <section
            className="momentum-section"
            aria-labelledby="momentum-title"
          >
            <h2
              id="momentum-title"
              className="momentum-title"
            >
              <span>Designed for meaningful momentum</span>
            </h2>

            <div className="momentum-grid">
              <article className="feature-card">
                <div className="feature-icon">
                  <Compass
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="feature-content">
                  <h3 className="feature-title">
                    <span>Clear direction</span>
                  </h3>

                  <p className="feature-description">
                    <span>
                      Turn complex ideas into a focused creative path.
                    </span>
                  </p>
                </div>
              </article>

              <article className="feature-card">
                <div className="feature-icon">
                  <WandSparkles
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="feature-content">
                  <h3 className="feature-title">
                    <span>Polished craft</span>
                  </h3>

                  <p className="feature-description">
                    <span>
                      Bring every interaction together with confident detail.
                    </span>
                  </p>
                </div>
              </article>

              <article className="feature-card">
                <div className="feature-icon">
                  <Globe2
                    aria-hidden="true"
                    size={28}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="feature-content">
                  <h3 className="feature-title">
                    <span>Remote collaboration</span>
                  </h3>

                  <p className="feature-description">
                    <span>
                      Move from first conversation to launch with clarity.
                    </span>
                  </p>
                </div>
              </article>
            </div>
          </section>

          <div className="contact-button-container">
            <ActionButton
              label="Contact Us"
              fullWidth
              onClick={() => setIsContactOpen(true)}
            />
          </div>
        </div>
      </section>

      <ProjectDetailModal
        isOpen={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        data={selectedLead ?? undefined}
      />

      <ContactInquiryModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
};