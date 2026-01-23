'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { images } from './imageConfig'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'bio', 'music', 'events', 'contact']
          const scrollPosition = window.scrollY + window.innerHeight / 2

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i])
            if (section) {
              const sectionTop = section.offsetTop
              const sectionBottom = sectionTop + section.offsetHeight
              
              if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveSection((prev) => {
                  if (prev !== sections[i]) {
                    return sections[i]
                  }
                  return prev
                })
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check after a delay
    const timeoutId = setTimeout(() => {
      handleScroll()
    }, 500)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('max@infinity-two.com')
    // Simple feedback - could be enhanced with a toast
    alert('Email copied to clipboard')
  }

  return (
    <>
      <main className={styles.main}>
        {/* HOME SECTION */}
        <section 
          id="home" 
          className={`${styles.section} ${styles.heroSection}`} 
          style={{ backgroundImage: `url(${images.home.main})` }}
          onClick={() => setSelectedImage(images.home.main)}
        >
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroNameContainer} onClick={(e) => e.stopPropagation()}>
            <h1 className={styles.h1White}>CUNT REMEMBER</h1>
          </div>
        </section>

        {/* BIO SECTION */}
        <section id="bio" className={styles.section}>
          <div className={styles.bioContainer}>
            <div 
              className={styles.bioImage} 
              style={{ backgroundImage: `url(${images.bio.main})` }}
              onClick={() => setSelectedImage(images.bio.main)}
            ></div>
            <div className={styles.bioContent}>
              <h2 className={styles.h2}>Bio</h2>
              <div className={styles.bioTextColumns}>
                <div className={styles.bioTextColumn}>
                  <p className={styles.bioText}>
                    Cunt Remember, aka Irene Carbonari, is an Argentinian artist based
                    in Berlin. With roots in art history and classical music, her practice
                    bridges electronic music, performance, and experimental sound design.
                  </p>
                </div>
                <div className={styles.bioTextColumn}>
                  <p className={styles.bioText}>
                    Her work explores the tension between body rhythm, digital texture, and
                    collective release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MUSIC SECTION */}
        <section id="music" className={`${styles.section} ${styles.musicSection}`}>
          <div className={styles.container}>
            <h2 className={styles.h2}>Music</h2>
            <div className={styles.videoEmbed}>
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/Y0tU4m0XO2g"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <ul className={styles.musicList}>
              <li>
                <div className={styles.musicItem}>
                  <div>
                    <strong>Forest Schranz</strong> (Album) — Magdalena's Apathy
                    (2024)
                  </div>
                  <a
                    href="https://magdalenas.bandcamp.com/album/forest-schranz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    ↗
                  </a>
                </div>
              </li>
              <li>
                <div className={styles.musicItem}>
                  <div>
                    <strong>Unconditional</strong> (VA Track) — Mama Told Ya
                    (2025)
                  </div>
                  <a
                    href="https://mamatoldya.bandcamp.com/track/unconditional"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    ↗
                  </a>
                </div>
              </li>
              <li>
                <div className={styles.musicItem}>
                  <div>
                    <strong>Aqua Spina</strong> (EP) — Fanée (2025)
                  </div>
                  <a
                    href="https://fanee.bandcamp.com/album/aqua-spina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    ↗
                  </a>
                </div>
              </li>
            </ul>
            <div className={styles.soundcloudEmbed}>
              <iframe
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1613134480&color=%23575757&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true"
              ></iframe>
            </div>
            
            {/* Mixes Section */}
            <div className={styles.mixesSection}>
              <h2 className={styles.h2}>Mixes</h2>
              <div className={styles.mixesEmbeds}>
                <div className={styles.mixEmbed}>
                  <iframe
                    width="100%"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1517542153&color=%23575757&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true"
                  ></iframe>
                  <div className={styles.soundcloudCredit}>
                    <a
                      href="https://soundcloud.com/crudeberlin"
                      title="/ CRUDE /"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      / CRUDE /
                    </a>
                    {' · '}
                    <a
                      href="https://soundcloud.com/crudeberlin/crude-mix-176-cunt-remember"
                      title="CRUDE MIX 176 - Cunt Remember"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CRUDE MIX 176 - Cunt Remember
                    </a>
                  </div>
                </div>
                <div className={styles.mixEmbed}>
                  <iframe
                    width="100%"
                    height="300"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2025228400&color=%23575757&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=true&visual=true"
                  ></iframe>
                  <div className={styles.soundcloudCredit}>
                    <a
                      href="https://soundcloud.com/funisstilltransgressive"
                      title="Fun Is Still Transgressive"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Fun Is Still Transgressive
                    </a>
                    {' · '}
                    <a
                      href="https://soundcloud.com/funisstilltransgressive/fist-mix-86-cunt-remember"
                      title="FIST MIX 86 – Cunt Remember"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FIST MIX 86 – Cunt Remember
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>Selected Performances</h2>
            <ul className={styles.eventsList}>
              <li>15.05.25 ∞333, Volksbühne (Berlin)</li>
              <li>19.04.25 Mama Told Ya, RSO (Berlin)</li>
              <li>08.08.24 Forever Unlimited, Ohm (Berlin)</li>
              <li>22.08.24 Technomate x HEELFX, RSO (Berlin)</li>
              <li>31.03.24 Vehemence, Oxi (Berlin)</li>
              <li>24.08.23 Säule, Berghain (Berlin)</li>
            </ul>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.h2}>Contact</h2>
            <div className={styles.contactGroup}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Booking:</span>
                <div className={styles.contactValue}>
                  <a
                    href="mailto:max@infinity-two.com"
                    className={styles.emailLink}
                  >
                    max@infinity-two.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className={styles.copyButton}
                    aria-label="Copy email"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BOTTOM NAVBAR */}
      <nav className={styles.bottomNav}>
        <button
          onClick={() => scrollToSection('home')}
          className={`${styles.navItem} ${
            activeSection === 'home' ? styles.navItemActive : ''
          }`}
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection('bio')}
          className={`${styles.navItem} ${
            activeSection === 'bio' ? styles.navItemActive : ''
          }`}
        >
          Bio
        </button>
        <button
          onClick={() => scrollToSection('music')}
          className={`${styles.navItem} ${
            activeSection === 'music' ? styles.navItemActive : ''
          }`}
        >
          Music
        </button>
        <button
          onClick={() => scrollToSection('events')}
          className={`${styles.navItem} ${
            activeSection === 'events' ? styles.navItemActive : ''
          }`}
        >
          Events
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`${styles.navItem} ${
            activeSection === 'contact' ? styles.navItemActive : ''
          }`}
        >
          Contact
        </button>
      </nav>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className={styles.imageModal}
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className={styles.closeModal}
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img 
            src={selectedImage} 
            alt="Full screen view"
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
