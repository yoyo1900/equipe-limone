'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSeasonalSlide, setCurrentSeasonalSlide] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const seasonalScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  // Lezioni data
  const lezioni = [
    // Collettive Bambini
    {
      id: 'marmotte',
      image: '/images/corsi-1.JPG',
      logo: '/images/marmotta.PNG',
      title: 'Marmotte',
      age: '3-5 anni',
      description: 'Prime curve a spazzaneve e frenata in sicurezza',
      type: 'collettiva-bambini',
      level: 1
    },
    {
      id: 'leprotti',
      image: '/images/corsi-2.JPG',
      logo: '/images/scoiattolo.JPG',
      title: 'Leprotti',
      age: '4-6 anni',
      description: 'Curve collegate e controllo dello spazzaneve',
      type: 'collettiva-bambini',
      level: 2
    },
    {
      id: 'lupetti',
      image: '/images/corsi-3.JPG',
      logo: '/images/logos/lupo.svg',
      title: 'Lupetti',
      age: '5-8 anni',
      description: 'Sci paralleli e curve fluide',
      type: 'collettiva-bambini',
      level: 3
    },
    {
      id: 'volpi',
      image: '/images/corsi-4.jpeg',
      logo: '/images/volpe.PNG',
      title: 'Volpi',
      age: '7-12 anni',
      description: 'Carving, fuoripista e tecnica avanzata',
      type: 'collettiva-bambini',
      level: 4
    },
    // Altre Lezioni
    {
      id: 'collettive-adulti',
      image: '/images/courses/adulti-gruppo.jpg',
      title: 'Collettive Adulti',
      description: 'Gruppi di livello omogeneo per imparare o perfezionarsi insieme',
      type: 'collettiva-adulti'
    },
    {
      id: 'individuali-bambini',
      image: '/images/courses/individuali-bambini.jpg',
      title: 'Individuali Bambini',
      description: 'Lezioni personalizzate per una crescita rapida e mirata',
      type: 'individuale-bambini'
    },
    {
      id: 'individuali-adulti',
      image: '/images/courses/individuali-adulti.jpg',
      title: 'Individuali Adulti',
      description: 'Programma su misura con un maestro dedicato',
      type: 'individuale-adulti'
    }
  ];

  // Seasonal courses data
  const stagionali = [
    {
      id: 'scoiattoli-sprint',
      image: '/images/corsi-1.JPG',
      logo: '/images/scoiattolo.JPG',
      title: 'Scoiattoli Sprint',
      age: 'Età da definire',
      description: '[Descrizione da brochure]'
    },
    {
      id: 'pulcini-sprint',
      image: '/images/corsi-2.JPG',
      logo: '/images/marmotta.PNG',
      title: 'Pulcini Sprint',
      age: 'Età da definire',
      description: '[Descrizione da brochure]'
    },
    {
      id: 'raiders',
      image: '/images/corsi-3.JPG',
      logo: '/images/volpe.PNG',
      title: 'Raiders',
      age: 'Età da definire',
      description: '[Descrizione da brochure]'
    }
  ];

  // Navigation functions
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const nextSlide = () => {
    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(0, lezioni.length - visibleCards);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    scrollToSlide(currentSlide + 1 > maxSlide ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    const visibleCards = getVisibleCards();
    const maxSlide = Math.max(0, lezioni.length - visibleCards);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
    scrollToSlide(currentSlide - 1 < 0 ? maxSlide : currentSlide - 1);
  };

  const scrollToSlide = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const visibleCards = getVisibleCards();
      const containerWidth = container.clientWidth - 128; // subtract padding (64px each side)
      const cardWidth = containerWidth / visibleCards;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // Seasonal carousel navigation functions
  const getVisibleSeasonalCards = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const nextSeasonalSlide = () => {
    const visibleCards = getVisibleSeasonalCards();
    const maxSlide = Math.max(0, stagionali.length - visibleCards);
    setCurrentSeasonalSlide(prev => prev >= maxSlide ? 0 : prev + 1);
    scrollToSeasonalSlide(currentSeasonalSlide + 1 > maxSlide ? 0 : currentSeasonalSlide + 1);
  };

  const prevSeasonalSlide = () => {
    const visibleCards = getVisibleSeasonalCards();
    const maxSlide = Math.max(0, stagionali.length - visibleCards);
    setCurrentSeasonalSlide(prev => prev <= 0 ? maxSlide : prev - 1);
    scrollToSeasonalSlide(currentSeasonalSlide - 1 < 0 ? maxSlide : currentSeasonalSlide - 1);
  };

  const scrollToSeasonalSlide = (index: number) => {
    if (seasonalScrollContainerRef.current) {
      const container = seasonalScrollContainerRef.current;
      const visibleCards = getVisibleSeasonalCards();
      const containerWidth = container.clientWidth - 128;
      const cardWidth = containerWidth / visibleCards;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="hero"
        data-animate
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url("/images/hero-home.JPG")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 100%'
        }}
      >
        <div className={`relative z-10 text-center text-white px-2 md:px-6 max-w-4xl mx-auto ${isVisible('hero') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-6 animate-float">
            <Icon icon="mdi:skiing" className="text-6xl text-(--color-primary) mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            La Scuola Sci di <span className="text-(--color-primary)">Limone</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Dal 2002 Equipe forma bambini e atleti sulle piste di Limone.
            <br />I nostri maestri rendono ogni lezione un&apos;esperienza unica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-(--color-primary) hover:bg-[#d21e1a] cursor-pointer text-white px-8! py-6! text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl">
              <Icon icon="mdi:calendar-clock" className="inline mr-2" />
              Prenota ora
            </Button>
            <Button variant="outline" size="lg" className="border-2 cursor-pointer border-white text-black hover:bg-white transition-all duration-500 px-8! py-6! text-lg font-semibold">
              <Icon icon="mdi:school" className="inline mr-2" />
              Scopri i corsi
            </Button>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section id="about" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-start ${isVisible('about') ? 'animate-fade-in-left' : 'opacity-0'}`}>


            {/* Right column: keep the text content */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-4xl font-bold text-[#111111]">Un&apos;eccellenza a Limone Piemonte dal 2002</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                L&apos;Equipe Limone nasce nel 2002 con l&apos;obiettivo di creare una squadra unita da passione preagonistica e spirito di gruppo. In pochi anni abbiamo scalato le classifiche nazionali.
              </p>
              <div className="bg-[#e8f4fb] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold">
                  <Icon icon="mdi:trophy-award" className="items-center inline text-3xl text-(--color-primary) mr-2" />
                  Dal 170° al 17° posto nazionale FISI in 5 stagioni
                </p>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Questa crescita testimonia la nostra vocazione preagonistica. Accogliamo atleti da tutta Europa con maestri che parlano italiano, inglese, francese, spagnolo e tedesco.
              </p>
            </div>

            {/* Left column: large image + smaller language cards underneath */}
            <div>
              <div className="w-full rounded-lg overflow-hidden max-h-[480px]">
                <Image
                  src="/images/home-1.jpg"
                  alt="Equipe Limone"
                  width={480}
                  height={480}
                  className="w-full h-auto object-top rounded-lg md:min-w-[50vw]"
                  style={{ objectPosition: 'center 100%' }}
                />
              </div>
            </div>


          </div>

          {/* Languages (smaller cards) placed right under the image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
              <Icon icon="flag:gb-4x3" className="text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-sm">English</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
              <Icon icon="flag:fr-4x3" className="text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Français</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
              <Icon icon="flag:es-4x3" className="text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Español</h3>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
              <Icon icon="flag:de-4x3" className="text-2xl mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Deutsch</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Perché Scegliere Equipe */}
      <section id="why-choose" data-animate className="py-20 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.5)), url("/images/home-2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="max-w-6xl mx-auto sm:px-6 px-2 relative z-10">
          <div className={`text-center mb-16 ${isVisible('why-choose') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Perché scegliere <span className="text-(--color-primary)">Equipe</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Affidati a professionisti con oltre 20 anni di esperienza
            </p>
          </div>

          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 ${isVisible('why-choose') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-[#f3f4f6] p-3 lg:p-4 border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl rounded-lg">
              <div className="bg-(--color-primary) w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Icon icon="mdi:certificate" className="text-2xl lg:text-3xl text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4 text-center">Tradizione Preagonistica</h3>
              <p className="text-sm lg:text-base text-gray-700 text-center">Dal 170° al 17° posto nazionale FISI</p>
            </div>

            <div className="bg-[#f3f4f6] p-3 lg:p-8 border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl rounded-lg text-center">
              <div className="bg-(--color-primary) w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Icon icon="mdi:account-group" className="text-2xl lg:text-3xl text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Corsi Personalizzati</h3>
              <p className="text-sm lg:text-base text-gray-700">Programmi su misura per ogni livello</p>
            </div>

            <div className="bg-[#f3f4f6] p-3 lg:p-8 border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl rounded-lg text-center">
              <div className="bg-(--color-primary) w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Icon icon="mdi:star" className="text-2xl lg:text-3xl text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Cura del Dettaglio</h3>
              <p className="text-sm lg:text-base text-gray-700">Dalle prenotazioni alle lezioni</p>
            </div>

            <div className="bg-[#f3f4f6] p-3 lg:p-8 border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl rounded-lg text-center">
              <div className="bg-(--color-primary) w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                <Icon icon="mdi:heart" className="text-2xl lg:text-3xl text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold mb-3 lg:mb-4">Spirito di Squadra</h3>
              <p className="text-sm lg:text-base text-gray-700">Equipe significa squadra</p>
            </div>
          </div>
        </div>
      </section>

      {/* I Corsi */}
      <section id="courses" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <div className={`text-center mb-16 ${isVisible('courses') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Corsi e Lezioni <span className="text-(--color-primary)">Equipe</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Dalle prime discese ai corsi avanzati, ogni programma è su misura
            </p>
          </div>

          {/* Horizontal scrolling cards */}
          <div className={`relative ${isVisible('courses') ? 'animate-fade-in-right' : 'opacity-0'}`}>
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute opacity-80 hover:opacity-100 left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group cursor-pointer"
              aria-label="Lezione precedente"
            >
              <Icon icon="mdi:chevron-left" className="text-2xl text-(--color-primary) group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute opacity-80 hover:opacity-100 right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group cursor-pointer"
              aria-label="Lezione successiva"
            >
              <Icon icon="mdi:chevron-right" className="text-2xl text-(--color-primary) group-hover:scale-110 transition-transform duration-300" />
            </button>

            <div
              ref={scrollContainerRef}
              className="overflow-x-auto pb-8 scrollbar-hide px-16"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-6">
                {lezioni.map((lezione, index) => (
                  <div
                    key={lezione.id}
                    className="group relative shrink-0 cursor-pointer responsive-card"
                    style={{
                      scrollSnapAlign: 'start'
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                      {/* Image that scales on hover */}
                      <div
                        className="absolute inset-0 bg-linear-to-br from-(--color-primary) to-[#d21e1a] transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${lezione.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      {/* Caption overlay (bottom) - no blur, matches card exactly */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-white p-6 transform transition-all duration-500"
                        style={{
                          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
                          marginLeft: '-1px',
                          marginRight: '-1px',
                          marginBottom: '-1px'
                        }}
                      >
                        <div className="mt-6 relative">
                          {/* Logo positioned at top right of white section, near oblique line */}
                          {lezione.logo && (
                            <div className="absolute -top-6 -right-4 w-16 h-16  rounded-full flex items-center justify-center p-2">
                              <Image src={lezione.logo} alt={lezione.title} width={40} height={40} className="object-contain rounded-2xl" />
                            </div>
                          )}

                          {lezione.age && (
                            <span className="inline-block bg-(--color-primary) text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                              {lezione.age}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-[#111111] mb-2 pr-20">
                            {lezione.title}
                          </h3>
                          {lezione.description && (
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {lezione.description}
                            </p>
                          )}
                          {lezione.level && (
                            <div className="flex items-center gap-1 mt-3">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${i < lezione.level ? 'bg-(--color-primary)' : 'bg-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {(() => {
                const visibleCards = getVisibleCards();
                const maxSlides = Math.max(0, lezioni.length - visibleCards);
                return Array.from({ length: maxSlides + 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      scrollToSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide ? 'bg-(--color-primary) w-8' : 'bg-gray-300'
                      }`}
                    aria-label={`Vai alla slide ${index + 1}`}
                  />
                ));
              })()}
            </div>
          </div>

          {/* Custom styles for scrollbar and responsive behavior */}
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            
            /* Responsive card widths */
            .responsive-card {
              width: calc((100vw - 192px) / 1); /* 1 card on mobile, accounting for container padding */
            }
            
            @media (min-width: 768px) {
              .responsive-card {
                width: calc((100vw - 216px) / 2); /* 2 cards on md, accounting for max-width and padding */
              }
            }
            
            @media (min-width: 1024px) {
              .responsive-card {
                width: calc((100vw - 240px) / 3); /* 3 cards on lg */
              }
            }
            
            @media (min-width: 1280px) {
              .responsive-card {
                width: calc((100vw - 264px) / 4); /* 4 cards on xl */
              }
            }
            
            /* For very large screens, limit card size */
            @media (min-width: 1536px) {
              .responsive-card {
                width: calc((1536px - 264px) / 4); /* Max container width */
              }
            }
          `}</style>
        </div>
      </section>

      {/* Corsi Stagionali */}
      <section id="seasonal" data-animate className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <div className={`text-center mb-16 ${isVisible('seasonal') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Corsi <span className="text-(--color-primary)">Stagionali</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Programmi invernali completi per bambini e ragazzi che vogliono crescere sugli sci
            </p>
          </div>

          {/* Horizontal scrolling cards */}
          <div className={`relative ${isVisible('seasonal') ? 'animate-fade-in-right' : 'opacity-0'}`}>
            {/* Navigation arrows */}
            <button
              onClick={prevSeasonalSlide}
              className="absolute opacity-80 hover:opacity-100 left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group cursor-pointer"
              aria-label="Corso precedente"
            >
              <Icon icon="mdi:chevron-left" className="text-2xl text-(--color-primary) group-hover:scale-110 transition-transform duration-300" />
            </button>

            <button
              onClick={nextSeasonalSlide}
              className="absolute opacity-80 hover:opacity-100 right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group cursor-pointer"
              aria-label="Corso successivo"
            >
              <Icon icon="mdi:chevron-right" className="text-2xl text-(--color-primary) group-hover:scale-110 transition-transform duration-300" />
            </button>

            <div
              ref={seasonalScrollContainerRef}
              className="overflow-x-auto pb-8 scrollbar-hide px-16"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-6">
                {stagionali.map((corso) => (
                  <div
                    key={corso.id}
                    className="group relative shrink-0 cursor-pointer responsive-seasonal-card"
                    style={{
                      scrollSnapAlign: 'start'
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl">
                      {/* Image that scales on hover */}
                      <div
                        className="absolute inset-0 bg-linear-to-br from-(--color-primary) to-[#d21e1a] transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${corso.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      {/* Caption overlay (bottom) */}
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-white p-6 transform transition-all duration-500"
                        style={{
                          clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
                          marginLeft: '-1px',
                          marginRight: '-1px',
                          marginBottom: '-1px'
                        }}
                      >
                        <div className="mt-6 relative">
                          {/* Logo positioned at top right */}
                          {corso.logo && (
                            <div className="absolute -top-6 -right-4 w-16 h-16 rounded-full flex items-center justify-center p-2">
                              <Image src={corso.logo} alt={corso.title} width={40} height={40} className="object-contain rounded-2xl" />
                            </div>
                          )}

                          <span className="inline-block bg-(--color-primary) text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                            {corso.age}
                          </span>
                          <h3 className="text-2xl font-bold text-[#111111] mb-2 pr-20">
                            {corso.title}
                          </h3>
                          {corso.description && (
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                              {corso.description}
                            </p>
                          )}

                          {/* CTA Buttons */}
                          <div className="space-y-2 mt-4">
                            <Button
                              size="sm"
                              className="w-full bg-(--color-primary) hover:bg-[#d21e1a] text-white cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `mailto:info@scuolasciquipe.it?subject=Info ${corso.title}`;
                              }}
                            >
                              <Icon icon="mdi:email" className="inline mr-2" />
                              Richiedi info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Custom styles for responsive seasonal cards */}
          <style jsx>{`
            .responsive-seasonal-card {
              width: calc((100vw - 192px) / 1);
            }
            
            @media (min-width: 768px) {
              .responsive-seasonal-card {
                width: calc((100vw - 216px) / 2);
              }
            }
            
            @media (min-width: 1024px) {
              .responsive-seasonal-card {
                width: calc((100vw - 240px) / 3);
              }
            }
            
            @media (min-width: 1536px) {
              .responsive-seasonal-card {
                width: calc((1536px - 264px) / 3);
              }
            }
          `}</style>
        </div>
      </section>

      {/* Sci Club Equipe */}
      <section id="sci-club" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isVisible('sci-club') ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative order-2 md:order-1">
              <div className="bg-linear-to-br from-(--color-primary) to-[#d21e1a] p-8 rounded-lg text-white shadow-2xl">
                <Icon icon="mdi:trophy-award" className="text-5xl mb-4" />
                <h3 className="text-3xl font-bold mb-4">Sci Club Equipe Limone</h3>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-4 inline-block">
                  <p className="text-lg font-bold">⛷️ Programma AGONISTICO</p>
                </div>
                <p className="text-sm mb-4 opacity-90">Dal 170° al 17° posto nazionale FISI</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Allenamenti strutturati agonistici
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Preparazione tecnica avanzata
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Competizioni nazionali FISI
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Team competitivo e motivato
                  </li>
                </ul>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white text-white hover:bg-white hover:text-(--color-primary) transition-all duration-500 cursor-pointer"
                  onClick={() => window.open('https://pattern.site', '_blank')}
                >
                  <Icon icon="mdi:open-in-new" className="inline mr-2" />
                  Scopri il programma completo
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-[#111111] mb-6">
                Sei un esperto e vuoi portare il tuo sci al <span className="text-(--color-primary)">livello successivo?</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Lo Sci Club Equipe Limone è il <strong>programma agonistico</strong> dedicato agli sciatori esperti che vogliono eccellere nelle competizioni.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Entra a far parte di una squadra che in poche stagioni è passata dal 170° al 17° posto nelle classifiche nazionali FISI.
              </p>
              <div className="bg-[#e8f4fb] p-6 rounded-lg">
                <p className="text-gray-800 font-semibold mb-4">
                  <Icon icon="mdi:information" className="inline text-2xl text-(--color-primary) mr-2" />
                  Requisiti di accesso
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Icon icon="mdi:chevron-right" className="mr-2 mt-1 text-(--color-primary)" />
                    Livello tecnico avanzato
                  </li>
                  <li className="flex items-start">
                    <Icon icon="mdi:chevron-right" className="mr-2 mt-1 text-(--color-primary)" />
                    Vocazione agonistica e competitiva
                  </li>
                  <li className="flex items-start">
                    <Icon icon="mdi:chevron-right" className="mr-2 mt-1 text-(--color-primary)" />
                    Disponibilità per allenamenti regolari
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprensorio e Sedi */}
      <section id="locations" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className={`text-center mb-16 ${isVisible('locations') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Scopri le piste di <span className="text-(--color-primary)">Limone Piemonte</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Tre sedi operative per comodità e accesso diretto alle piste del Riserva Bianca
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${isVisible('locations') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:sun-angle" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sole - Limone Piemonte</h3>
              <p className="text-gray-700 mb-4">Partenza principale con telecabina dal centro di Limone Piemonte. Accesso diretto alle piste principali del comprensorio.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:cable-car" className="text-(--color-primary) text-xl" />
                <Icon icon="mdi:skiing" className="text-(--color-primary) text-xl" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:mountain" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quota 1400 - Colle di Tenda</h3>
              <p className="text-gray-700 mb-4">Sede operativa sulle piste di Limone Piemonte. Ideale per lezioni avanzate e accesso diretto al Colle di Tenda.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:home-variant" className="text-(--color-primary) text-xl" />
                <Icon icon="mdi:ski" className="text-(--color-primary) text-xl" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:horse" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Maneggio - Limone</h3>
              <p className="text-gray-700 mb-4">Zona ideale per principianti e bambini a Limone Piemonte, sede di eventi e attività serali speciali dell&apos;Equipe.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:account-child" className="text-(--color-primary) text-xl" />
                <Icon icon="mdi:party-popper" className="text-(--color-primary) text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-(--color-primary) hover:bg-[#d21e1a] text-white transform hover:scale-105 shadow-xl transition-all duration-500 cursor-pointer">
              <Icon icon="mdi:map" className="inline mr-2" />
              Visualizza mappa e sedi
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonianze */}
      <section id="testimonials" data-animate className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className={`text-center mb-16 ${isVisible('testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Le parole di chi ha scelto <span className="text-(--color-primary)">Equipe</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 ${isVisible('testimonials') ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="bg-[#f3f4f6] p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:format-quote-open" className="text-3xl text-(--color-primary) mr-3" />
                <div className="flex text-(--color-primary)">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-xl" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-4 italic">
                &quot;I nostri figli aspettano tutto l&apos;anno di tornare sulle piste di Limone Piemonte con i maestri Equipe. Professionalità e simpatia rare.&quot;
              </p>
              <p className="font-semibold text-(--color-primary)">— Famiglia R., Milano</p>
            </div>

            <div className="bg-[#f3f4f6] p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:format-quote-open" className="text-3xl text-(--color-primary) mr-3" />
                <div className="flex text-(--color-primary)">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-xl" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-4 italic">
                &quot;Un livello tecnico che fa la differenza. Ho scoperto il vero sci a Limone Piemonte con Equipe e ho ripreso a sciare con fiducia.&quot;
              </p>
              <p className="font-semibold text-(--color-primary)">— Gianni B., Torino</p>
            </div>
          </div>

          <div className={`text-center mt-12 ${isVisible('testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-6">Partner e Convenzioni a Limone Piemonte</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              <span className="text-lg font-semibold">Botteroski Limone</span>
              <span className="text-lg font-semibold">Riserva Bianca</span>
              <span className="text-lg font-semibold">FISI Piemonte</span>
              <span className="text-lg font-semibold">Comune di Limone</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className="py-20 bg-[#111111] text-white">
        <div className="max-w-6xl mx-auto px-2 md:px-6">
          <div className={`text-center mb-16 ${isVisible('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-6">
              Prenota la tua lezione di sci a <span className="text-(--color-primary)">Limone Piemonte</span>
            </h2>
            <p className="text-xl opacity-90">Scuola Sci & Snowboard Equipe</p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ${isVisible('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="group">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:map-marker" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Info Point</h3>
              <p className="opacity-90">Via Roma 5<br />Limone Piemonte</p>
            </div>

            <div className="group">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:phone" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Telefono</h3>
              <p className="opacity-90">+39 0171 928167</p>
            </div>

            <div className="group">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:cellphone" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Mobile</h3>
              <p className="opacity-90">+39 388 424 2447</p>
            </div>

            <div className="group">
              <div className="bg-(--color-primary) w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:email" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="opacity-90">info@scuolasciquipe.it</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Scuola Sci & Snowboard Equipe Limone</h3>
            <p className="text-lg opacity-90 italic">Dal 2002: tradizione preagonistica e passione sulle piste</p>
          </div>
        </div>
      </section>
    </div>
  );
}
