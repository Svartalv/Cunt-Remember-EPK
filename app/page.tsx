'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { images } from './imageConfig'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [carouselIndex, setCarouselIndex] = useState<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'bio', 'music', 'gallery', 'events', 'contact']
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

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const newIndex = carouselIndex > 0 ? carouselIndex - 1 : images.gallery.length - 1
        setCarouselIndex(newIndex)
        setSelectedImage(images.gallery[newIndex])
      } else if (e.key === 'ArrowRight') {
        const newIndex = carouselIndex < images.gallery.length - 1 ? carouselIndex + 1 : 0
        setCarouselIndex(newIndex)
        setSelectedImage(images.gallery[newIndex])
      } else if (e.key === 'Escape') {
        setSelectedImage(null)
        setCarouselIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, carouselIndex])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScrollAnimations = () => {
      const textElements = document.querySelectorAll('.scrollAnimate')
      textElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible) {
          element.classList.add('animated')
        }
      })
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScrollAnimations()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScrollAnimations()

    return () => {
      window.removeEventListener('scroll', onScroll)
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


  return (
    <>
      <main className={styles.main}>
        {/* HOME SECTION */}
        <section 
          id="home" 
          className={`${styles.section} ${styles.heroSection}`} 
          style={{ backgroundImage: `url(${images.home.main})` }}
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
            ></div>
            <div className={styles.bioContent}>
              <h2 className={`${styles.h2} scrollAnimate`}>Bio</h2>
              <div className={styles.bioTextColumns}>
                <div className={styles.bioTextColumn}>
                  <p className={`${styles.bioText} scrollAnimate`}>
                    Cunt Remember is the project of Argentinian artist Irene Carbonari, based in Berlin. With a background in art history and classical music, her work moves between electronic music, performance, and experimental sound.
                  </p>
                  <p className={`${styles.bioText} scrollAnimate`}>
                    Rooted in techno and psytrance, her sets follow emotion over genre, navigating shifting BPMs, contrasting textures, and moments of rupture. Her performances balance introspective depth with ecstatic release, using sound as a space for collective experience.
                  </p>
                  <p className={`${styles.bioText} scrollAnimate`}>
                    Cunt Remember has performed across Europe and beyond, appearing at venues such as Volksbühne, Berghain Säule, RSO, Oxi, Ohm, and Den Anden Side, and has released music on labels including Katharsis, Magdalena's Apathy, Mama Told Ya, and Fanée.
                  </p>
                </div>
              </div>
              <div className={styles.bioSocialLinks}>
                <a
                  href="https://open.spotify.com/artist/cuntremember"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Spotify"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
                  <a
                    href="https://soundcloud.com/cuntremember"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label="SoundCloud"
                  >
                    <img src="/images/soundcloud-logo.png" alt="SoundCloud" />
                  </a>
                <a
                  href="https://www.instagram.com/cxntremember.it/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=AzaEK8dHFck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MUSIC SECTION */}
        <section id="music" className={`${styles.section} ${styles.musicSection}`}>
          <div className={styles.container}>
            <h2 className={`${styles.h2} scrollAnimate`}>Music</h2>
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
            <h3 className={styles.sectionSubheading}>Tracks</h3>
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
              <h3 className={styles.sectionSubheading}>Mixes</h3>
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

        {/* GALLERY SECTION */}
        <section id="gallery" className={styles.section}>
          <div className={styles.container}>
            <h2 className={`${styles.h2} scrollAnimate`}>Gallery</h2>
            <div className={styles.galleryGrid}>
              {images.gallery.map((imagePath, index) => (
                <div
                  key={index}
                  className={styles.galleryItem}
                  style={{ backgroundImage: `url(${imagePath})` }}
                  onClick={() => {
                    setCarouselIndex(index)
                    setSelectedImage(imagePath)
                  }}
                >
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section id="events" className={styles.section}>
          <div className={styles.container}>
            <h2 className={`${styles.h2} scrollAnimate`}>Events</h2>
            <ul className={styles.eventsList}>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2025">
                <span className={styles.eventDate}>15.05.25</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>∞333</span>
                  <span className={styles.eventVenue}>Volksbühne</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2025">
                <span className={styles.eventDate}>19.04.25</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Mama Told Ya</span>
                  <span className={styles.eventVenue}>RSO</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>08.08.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Forever Unlimited</span>
                  <span className={styles.eventVenue}>Ohm</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>22.08.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Technomate x HEELFX</span>
                  <span className={styles.eventVenue}>RSO</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>13.07.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Fuego</span>
                  <span className={styles.eventVenue}>AEDEN</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>27.06.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Speedgasm x Harmless Rec</span>
                  <span className={styles.eventVenue}>Berlin</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>22.06.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Dreamscape</span>
                  <span className={styles.eventVenue}>Den Anden Side</span>
                  <span className={styles.eventLocation}>Copenhagen, Denmark</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`}>
                <span className={styles.eventDate}>31.03.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Vehemence</span>
                  <span className={styles.eventVenue}>Oxi</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>08.03.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Heartscape</span>
                  <span className={styles.eventVenue}>Zur Klappe</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`}>
                <span className={styles.eventDate}>01.03.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Radical Softness Fund</span>
                  <span className={styles.eventVenue}>Oxi</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>10.02.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Magdalena's Apathy</span>
                  <span className={styles.eventVenue}>Ohm</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2024">
                <span className={styles.eventDate}>03.02.24</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Sacred Interface</span>
                  <span className={styles.eventVenue}>Den Anden Side</span>
                  <span className={styles.eventLocation}>Copenhagen, Denmark</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2023">
                <span className={styles.eventDate}>16.12.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Molt Gallery</span>
                  <span className={styles.eventVenue}>Berlin</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2023">
                <span className={styles.eventDate}>15.09.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Deestricted</span>
                  <span className={styles.eventVenue}>Club Ost</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`}>
                <span className={styles.eventDate}>24.08.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>SÄULE</span>
                  <span className={styles.eventVenue}>Berghain</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2023">
                <span className={styles.eventDate}>01.07.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Nature Loves Courage Festival</span>
                  <span className={styles.eventVenue}>Sougia</span>
                  <span className={styles.eventLocation}>Crete, Greece</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2023">
                <span className={styles.eventDate}>15.04.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>ParkingStone</span>
                  <span className={styles.eventVenue}>Trauma Bar</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2023">
                <span className={styles.eventDate}>25.02.23</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Metarave</span>
                  <span className={styles.eventVenue}>Mensch Meier</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2022">
                <span className={styles.eventDate}>12.11.22</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Soulfeeder</span>
                  <span className={styles.eventVenue}>Re:mise</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2022">
                <span className={styles.eventDate}>09.22.22</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Nature Loves Courage</span>
                  <span className={styles.eventVenue}>Wilde Renate</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2022">
                <span className={styles.eventDate}>29.07.22</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Nasenbluten</span>
                  <span className={styles.eventVenue}>Krakow</span>
                  <span className={styles.eventLocation}>Krakow, Poland</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2022">
                <span className={styles.eventDate}>14.05.22</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Weeeirdos</span>
                  <span className={styles.eventVenue}>Fitzroy</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2022">
                <span className={styles.eventDate}>05.03.22</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>City Club Cafe</span>
                  <span className={styles.eventVenue}>Augsburg</span>
                  <span className={styles.eventLocation}>Augsburg, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`}>
                <span className={styles.eventDate}>31.12.21</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>RO</span>
                  <span className={styles.eventVenue}>Buenos Aires</span>
                  <span className={styles.eventLocation}>Buenos Aires, Argentina</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2020">
                <span className={styles.eventDate}>04.07.20</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>P.L.U.R.</span>
                  <span className={styles.eventVenue}>Berlin</span>
                  <span className={styles.eventLocation}>Berlin, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2019">
                <span className={styles.eventDate}>11.10.19</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Minerals x bbbbbb</span>
                  <span className={styles.eventVenue}>mjut</span>
                  <span className={styles.eventLocation}>Leipzig, Germany</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2019">
                <span className={styles.eventDate}>03.04.19</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Cocoliche</span>
                  <span className={styles.eventVenue}>Buenos Aires</span>
                  <span className={styles.eventLocation}>Buenos Aires, Argentina</span>
                </span>
              </li>
              <li className={`${styles.eventItem} scrollAnimate`} data-year="2018">
                <span className={styles.eventDate}>20.04.18</span>
                <span className={styles.eventContent}>
                  <span className={styles.eventName}>Kindcrime Recordings</span>
                  <span className={styles.eventVenue}>R33</span>
                  <span className={styles.eventLocation}>Barcelona, Spain</span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className={styles.section}>
          <div className={styles.contactContainer}>
            <div className={styles.contactContent}>
              <h2 className={`${styles.h2} scrollAnimate`}>Contact</h2>
              <div className={styles.contactGroup}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Booking</span>
                  <div className={styles.contactValue}>
                    <a
                      href="mailto:max@infinity-two.com"
                      className={styles.emailLink}
                    >
                      max@infinity-two.com
                    </a>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Socials</span>
                  <div className={styles.socialLinks}>
                    <a
                      href="https://open.spotify.com/artist/cuntremember"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Spotify"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </a>
                    <a
                      href="https://soundcloud.com/cuntremember"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="SoundCloud"
                    >
                      <img src="/images/soundcloud-logo.png" alt="SoundCloud" />
                    </a>
                    <a
                      href="https://www.instagram.com/cxntremember.it/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Instagram"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=AzaEK8dHFck"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="YouTube"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contactImage}>
              <img src="/images/forest.jpg" alt="Contact" />
            </div>
          </div>
        </section>

      </main>

      {/* SOCIAL BAR */}
      <div className={styles.socialBar}>
        <a
          href="https://open.spotify.com/artist/cuntremember"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBarItem}
          aria-label="Spotify"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </a>
        <a
          href="https://soundcloud.com/cuntremember"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBarItem}
          aria-label="SoundCloud"
        >
          <img src="/images/soundcloud-logo.png" alt="SoundCloud" />
        </a>
        <a
          href="https://www.instagram.com/cxntremember.it/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBarItem}
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a
          href="https://www.youtube.com/watch?v=AzaEK8dHFck"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBarItem}
          aria-label="YouTube"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>

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
          onClick={() => scrollToSection('gallery')}
          className={`${styles.navItem} ${
            activeSection === 'gallery' ? styles.navItemActive : ''
          }`}
        >
          Gallery
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

      {/* GALLERY CAROUSEL MODAL */}
      {selectedImage && (
        <div 
          className={styles.imageModal}
          onClick={() => {
            setSelectedImage(null)
            setCarouselIndex(0)
          }}
        >
          <button 
            className={styles.closeModal}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
              setCarouselIndex(0)
            }}
            aria-label="Close"
          >
            ×
          </button>
          
          <button
            className={styles.carouselPrev}
            onClick={(e) => {
              e.stopPropagation()
              const newIndex = carouselIndex > 0 ? carouselIndex - 1 : images.gallery.length - 1
              setCarouselIndex(newIndex)
              setSelectedImage(images.gallery[newIndex])
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <button
            className={styles.carouselNext}
            onClick={(e) => {
              e.stopPropagation()
              const newIndex = carouselIndex < images.gallery.length - 1 ? carouselIndex + 1 : 0
              setCarouselIndex(newIndex)
              setSelectedImage(images.gallery[newIndex])
            }}
            aria-label="Next image"
          >
            ›
          </button>
          
          <div className={styles.carouselContainer} onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt={`Gallery image ${carouselIndex + 1}`}
              className={styles.modalImage}
            />
            <div className={styles.carouselCounter}>
              {carouselIndex + 1} / {images.gallery.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
