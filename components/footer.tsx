'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/lezioni', label: 'Lezioni' },
    { href: '/stagionali', label: 'Stagionali' },
    { href: '/sci-club', label: 'Sci Club' },
    { href: '/contatti', label: 'Contatti' },
  ];

  const contactInfo = {
    address: 'Via Roma 5/a',
    city: '12015 Limone Piemonte (CN)',
    phone: '0171 929132',
    email: 'info@equipelimone.it',
  };

  return (
    <footer className="bg-[#fbfafa] border-t border-gray-100">
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-3 group w-fit">
                <div className="bg-[#ee2825] p-2 rounded-lg transform group-hover:scale-110 transition-all duration-300">
                  <Icon icon="mdi:skiing" className="text-2xl text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-[#111111]">Equipe</span>
                  <span className="text-sm text-gray-600 block">Limone Piemonte</span>
                </div>
              </Link>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Scuola Sci & Snowboard con tradizione agonistica dal 2002. Passione, professionalità e famiglia.
              </p>
              {/* Social Media Links */}
              <div className="flex items-center space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
                  aria-label="Facebook"
                >
                  <Icon icon="mdi:facebook" className="text-xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
                  aria-label="Instagram"
                >
                  <Icon icon="mdi:instagram" className="text-xl" />
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="p-2 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
                  aria-label="Email"
                >
                  <Icon icon="mdi:email" className="text-xl" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wide mb-4">
                Navigazione
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#ee2825] transition-colors duration-300 inline-flex items-center group"
                    >
                      <Icon 
                        icon="mdi:chevron-right" 
                        className="text-base opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" 
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-[#111111] uppercase tracking-wide mb-4">
                Contatti
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Icon icon="mdi:map-marker" className="text-xl text-[#ee2825] mt-0.5 shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p>{contactInfo.address}</p>
                    <p>{contactInfo.city}</p>
                  </div>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-[#ee2825] transition-colors duration-300 group"
                  >
                    <Icon icon="mdi:phone" className="text-xl text-[#ee2825] group-hover:scale-110 transition-transform duration-300" />
                    <span>{contactInfo.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-[#ee2825] transition-colors duration-300 group"
                  >
                    <Icon icon="mdi:email" className="text-xl text-[#ee2825] group-hover:scale-110 transition-transform duration-300" />
                    <span className="break-all">{contactInfo.email}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              <div className="text-xs text-gray-500 text-center md:text-left">
                <p>
                  © {currentYear === 2017 ? '2017' : `2017-${currentYear}`} A.S.D. Equipe Limone - P.I. 02883750040
                </p>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <Link
                  href="/privacy"
                  className="text-gray-500 hover:text-[#ee2825] transition-colors duration-300"
                >
                  Informativa Privacy
                </Link>
                <span className="text-gray-300">|</span>
                <a
                  href="https://www.sefrapallo.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#ee2825] transition-colors duration-300"
                >
                  SEF Rapallo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="block md:hidden">
        <div className="px-6 py-8 space-y-6">
          {/* Brand */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="bg-[#ee2825] p-2 rounded-lg">
                <Icon icon="mdi:skiing" className="text-xl text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#111111]">Equipe</span>
                <span className="text-xs text-gray-600 block">Limone Piemonte</span>
              </div>
            </Link>
          </div>

          {/* Contact Info - Compact */}
          <div className="bg-white rounded-lg p-4 shadow-sm space-y-3">
            <div className="flex items-start space-x-3">
              <Icon icon="mdi:map-marker" className="text-lg text-[#ee2825] mt-0.5 shrink-0" />
              <div className="text-xs text-gray-600">
                <p>{contactInfo.address}</p>
                <p>{contactInfo.city}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center space-x-2 text-xs text-gray-600"
              >
                <Icon icon="mdi:phone" className="text-lg text-[#ee2825]" />
                <span>{contactInfo.phone}</span>
              </a>
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center space-x-2 text-xs text-gray-600 break-all"
            >
              <Icon icon="mdi:email" className="text-lg text-[#ee2825] shrink-0" />
              <span>{contactInfo.email}</span>
            </a>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Facebook"
            >
              <Icon icon="mdi:facebook" className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Icon icon="mdi:instagram" className="text-xl" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="p-3 rounded-lg bg-white hover:bg-[#ee2825] text-gray-600 hover:text-white transition-all duration-300 shadow-sm"
              aria-label="Email"
            >
              <Icon icon="mdi:email" className="text-xl" />
            </a>
          </div>

          {/* Copyright - Minimal */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {currentYear === 2017 ? '2017' : `2017-${currentYear}`} A.S.D. Equipe Limone
            </p>
            <div className="flex items-center justify-center space-x-3 text-xs">
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-[#ee2825] transition-colors duration-300"
              >
                Privacy
              </Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">P.I. 02883750040</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
