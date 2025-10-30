'use client';

import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      logo: '/images/logos/marmotta.svg',
      title: 'Marmotte',
      age: '3-5 anni',
      description: 'Prime curve a spazzaneve e frenata in sicurezza',
      type: 'collettiva-bambini',
      level: 1
    },
    {
      id: 'leprotti',
      image: '/images/corsi-2.JPG',
      logo: '/images/logos/lepre.svg',
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
      image: '/images/corsi-4.JPG',
      logo: '/images/logos/volpe.svg',
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        id="hero" 
        data-animate 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1551524164-6cf2ac19c90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className={`relative z-10 text-center text-white px-6 max-w-4xl mx-auto ${isVisible('hero') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="mb-6 animate-float">
            <Icon icon="mdi:skiing" className="text-6xl text-[#ee2825] mx-auto mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            La Scuola Sci di <span className="text-[#ee2825]">Limone</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Dal 2002 Equipe forma bambini e atleti sulle piste di Limone.
            <br />I nostri maestri rendono ogni lezione un'esperienza unica.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#ee2825] hover:bg-[#d21e1a] cursor-pointer text-white px-8 py-4 text-lg font-semibold transition-all duration-500 transform hover:scale-105 shadow-xl">
              <Icon icon="mdi:calendar-clock" className="inline mr-2" />
              Prenota ora
            </Button>
            <Button variant="outline" size="lg" className="border-2 cursor-pointer border-white text-black hover:bg-white transition-all duration-500 px-8 py-4 text-lg font-semibold">
              <Icon icon="mdi:school" className="inline mr-2" />
              Scopri i corsi
            </Button>
          </div>
        </div>
      </section>

      {/* Chi Siamo */}
      <section id="about" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isVisible('about') ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div>
              <div className="flex items-center mb-6">
                <Icon icon="mdi:trophy" className="text-4xl text-[#ee2825] mr-4" />
                <h2 className="text-4xl font-bold text-[#111111]">Un'eccellenza a Limone Piemonte dal 2002</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                L'Equipe Limone nasce nel 2002 con l'obiettivo di creare una squadra unita da passione agonistica e spirito di gruppo. In pochi anni abbiamo scalato le classifiche nazionali.
              </p>
              <div className="bg-[#e8f4fb] p-6 rounded-lg mb-6">
                <p className="text-gray-800 font-semibold">
                  <Icon icon="mdi:trophy-award" className="inline text-[#ee2825] mr-2" />
                  Dal 170° al 17° posto nazionale FISI in 5 stagioni
                </p>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Questa crescita testimonia la nostra vocazione agonistica. Accogliamo atleti da tutta Europa con maestri che parlano italiano, inglese, francese, spagnolo e tedesco.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
                <Icon icon="flag:gb-4x3" className="text-4xl mx-auto mb-3" />
                <h3 className="font-semibold">English</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
                <Icon icon="flag:fr-4x3" className="text-4xl mx-auto mb-3" />
                <h3 className="font-semibold">Français</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
                <Icon icon="flag:es-4x3" className="text-4xl mx-auto mb-3" />
                <h3 className="font-semibold">Español</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
                <Icon icon="flag:de-4x3" className="text-4xl mx-auto mb-3" />
                <h3 className="font-semibold">Deutsch</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perché Scegliere Equipe */}
      <section id="why-choose" data-animate className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible('why-choose') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Perché scegliere <span className="text-[#ee2825]">Equipe</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Affidati a professionisti con oltre 20 anni di esperienza
            </p>
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible('why-choose') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Card className="bg-[#f3f4f6] border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:certificate" className="text-3xl text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-4">Tradizione Agonistica</CardTitle>
                <CardDescription className="text-gray-700">Dal 170° al 17° posto nazionale FISI</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-[#f3f4f6] border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:account-group" className="text-3xl text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-4">Corsi Personalizzati</CardTitle>
                <CardDescription className="text-gray-700">Programmi su misura per ogni livello</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-[#f3f4f6] border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:star" className="text-3xl text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-4">Cura del Dettaglio</CardTitle>
                <CardDescription className="text-gray-700">Dalle prenotazioni alle lezioni</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-[#f3f4f6] border-0 transform hover:scale-105 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon icon="mdi:heart" className="text-3xl text-white" />
                </div>
                <CardTitle className="text-xl font-bold mb-4">Spirito di Squadra</CardTitle>
                <CardDescription className="text-gray-700">Equipe significa squadra</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* I Corsi */}
      <section id="courses" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible('courses') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Le nostre Lezioni
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
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group"
              aria-label="Lezione precedente"
            >
              <Icon icon="mdi:chevron-left" className="text-2xl text-[#ee2825] group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full w-12 h-12 shadow-lg transition-all duration-500 flex items-center justify-center group"
              aria-label="Lezione successiva"
            >
              <Icon icon="mdi:chevron-right" className="text-2xl text-[#ee2825] group-hover:scale-110 transition-transform duration-300" />
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
                        className="absolute inset-0 bg-linear-to-br from-[#ee2825] to-[#d21e1a] transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${lezione.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      
                      {/* Logo badge (top right) */}
                      {lezione.logo && (
                        <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-2 z-10">
                          <Icon icon="mdi:paw" className="text-3xl text-[#ee2825]" />
                        </div>
                      )}

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
                        <div className="mt-6">
                          {lezione.age && (
                            <span className="inline-block bg-[#ee2825] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                              {lezione.age}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-[#111111] mb-2">
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
                                  className={`w-2 h-2 rounded-full ${
                                    i < lezione.level ? 'bg-[#ee2825]' : 'bg-gray-300'
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-[#ee2825] w-8' : 'bg-gray-300'
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
        <div className="max-w-6xl mx-auto px-6">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${isVisible('seasonal') ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div>
              <h2 className="text-4xl font-bold text-[#111111] mb-6">
                <span className="text-[#ee2825]">Sci Club Equipe Limone</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Programmi stagionali per bambini e ragazzi che accompagnano la crescita tecnica lungo tutto l'inverno.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Dalle categorie Scoiattoli Sprint, Pulcini Sprint e Raiders fino alle attività pre-agonistiche.
              </p>
              <Button size="lg" className="bg-[#ee2825] hover:bg-[#d21e1a] text-white transform hover:scale-105 shadow-xl transition-all duration-500">
                <Icon icon="mdi:trophy" className="inline mr-2" />
                Scopri i programmi stagionali
              </Button>
            </div>
            <div className="relative">
              <div className="bg-linear-to-br from-[#ee2825] to-[#d21e1a] p-8 rounded-lg text-white">
                <Icon icon="mdi:trophy-award" className="text-4xl mb-4" />
                <h3 className="text-2xl font-bold mb-4">Sci Club Equipe Limone</h3>
                <p className="text-sm mb-4 opacity-90">Dal 170° al 17° posto nazionale FISI</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Scoiattoli Sprint
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Pulcini Sprint
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Raiders
                  </li>
                  <li className="flex items-center">
                    <Icon icon="mdi:check-circle" className="mr-3 text-xl" />
                    Attività pre-agonistiche
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprensorio e Sedi */}
      <section id="locations" data-animate className="py-20 bg-[#fbfafa]">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible('locations') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Scopri le piste di <span className="text-[#ee2825]">Limone Piemonte</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Tre sedi operative per comodità e accesso diretto alle piste del Riserva Bianca
            </p>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 ${isVisible('locations') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:sun-angle" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sole - Limone Piemonte</h3>
              <p className="text-gray-700 mb-4">Partenza principale con telecabina dal centro di Limone Piemonte. Accesso diretto alle piste principali del comprensorio.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:cable-car" className="text-[#ee2825] text-xl" />
                <Icon icon="mdi:skiing" className="text-[#ee2825] text-xl" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:mountain" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Quota 1400 - Colle di Tenda</h3>
              <p className="text-gray-700 mb-4">Sede operativa sulle piste di Limone Piemonte. Ideale per lezioni avanzate e accesso diretto al Colle di Tenda.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:home-variant" className="text-[#ee2825] text-xl" />
                <Icon icon="mdi:ski" className="text-[#ee2825] text-xl" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-all duration-500">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon icon="mdi:horse" className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Maneggio - Limone</h3>
              <p className="text-gray-700 mb-4">Zona ideale per principianti e bambini a Limone Piemonte, sede di eventi e attività serali speciali dell'Equipe.</p>
              <div className="flex justify-center space-x-2">
                <Icon icon="mdi:account-child" className="text-[#ee2825] text-xl" />
                <Icon icon="mdi:party-popper" className="text-[#ee2825] text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-[#ee2825] hover:bg-[#d21e1a] text-white transform hover:scale-105 shadow-xl transition-all duration-500">
              <Icon icon="mdi:map" className="inline mr-2" />
              Visualizza mappa e sedi
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonianze */}
      <section id="testimonials" data-animate className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible('testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold text-[#111111] mb-6">
              Le parole di chi ha scelto <span className="text-[#ee2825]">Equipe</span>
            </h2>
          </div>

          <div className={`grid md:grid-cols-2 gap-8 ${isVisible('testimonials') ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="bg-[#f3f4f6] p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:format-quote-open" className="text-3xl text-[#ee2825] mr-3" />
                <div className="flex text-[#ee2825]">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-xl" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-4 italic">
                "I nostri figli aspettano tutto l'anno di tornare sulle piste di Limone Piemonte con i maestri Equipe. Professionalità e simpatia rare."
              </p>
              <p className="font-semibold text-[#ee2825]">— Famiglia R., Milano</p>
            </div>

            <div className="bg-[#f3f4f6] p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <Icon icon="mdi:format-quote-open" className="text-3xl text-[#ee2825] mr-3" />
                <div className="flex text-[#ee2825]">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} icon="mdi:star" className="text-xl" />
                  ))}
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-4 italic">
                "Un livello tecnico che fa la differenza. Ho scoperto il vero sci a Limone Piemonte con Equipe e ho ripreso a sciare con fiducia."
              </p>
              <p className="font-semibold text-[#ee2825]">— Gianni B., Torino</p>
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
        <div className="max-w-6xl mx-auto px-6">
          <div className={`text-center mb-16 ${isVisible('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-6">
              Prenota la tua lezione di sci a <span className="text-[#ee2825]">Limone Piemonte</span>
            </h2>
            <p className="text-xl opacity-90">Scuola Sci & Snowboard Equipe</p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ${isVisible('contact') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="group">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:map-marker" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Info Point</h3>
              <p className="opacity-90">Via Roma 5<br />Limone Piemonte</p>
            </div>

            <div className="group">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:phone" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Telefono</h3>
              <p className="opacity-90">+39 0171 928167</p>
            </div>

            <div className="group">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:cellphone" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Mobile</h3>
              <p className="opacity-90">+39 388 424 2447</p>
            </div>

            <div className="group">
              <div className="bg-[#ee2825] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                <Icon icon="mdi:email" className="text-3xl text-white" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="opacity-90">info@scuolasciquipe.it</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Scuola Sci & Snowboard Equipe Limone</h3>
            <p className="text-lg opacity-90 italic">Dal 2002: tradizione agonistica e passione sulle piste</p>
          </div>
        </div>
      </section>
    </div>
  );
}
