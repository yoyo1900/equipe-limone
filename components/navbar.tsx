'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('IT');

  const navItems = [
    { 
      href: '/', 
      label: 'Home', 
      icon: 'mdi:home' 
    },
    { 
      href: '/team', 
      label: 'Team', 
      icon: 'mdi:account-group' 
    },
    { 
      href: '/lezioni', 
      label: 'Lezioni', 
      icon: 'mdi:school' 
    },
    { 
      href: '/stagionali', 
      label: 'Stagionali', 
      icon: 'mdi:calendar-range' 
    },
    { 
      href: '/sci-club', 
      label: 'Sci Club', 
      icon: 'mdi:trophy' 
    },
    { 
      href: '/contatti', 
      label: 'Contatti', 
      icon: 'mdi:contact-mail' 
    },
  ];

  const languages = [
    { code: 'IT', flag: 'flag:it-4x3', label: 'Italiano' },
    { code: 'EN', flag: 'flag:gb-4x3', label: 'English' },
    { code: 'FR', flag: 'flag:fr-4x3', label: 'Français' },
    { code: 'ES', flag: 'flag:es-4x3', label: 'Español' },
    { code: 'DE', flag: 'flag:de-4x3', label: 'Deutsch' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-[#ee2825] p-2 rounded-lg transform group-hover:scale-110 transition-all duration-300">
                <Icon icon="mdi:skiing" className="text-2xl text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#111111]">Equipe</span>
                <span className="text-sm text-gray-600 ml-2">Limone Piemonte</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#ee2825] transition-colors duration-300 group"
                >
                  <Icon 
                    icon={item.icon} 
                    className="text-lg group-hover:scale-110 transition-transform duration-300" 
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Language Selector & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300">
                  <Icon 
                    icon={languages.find(lang => lang.code === language)?.flag || 'flag:it-4x3'} 
                    className="text-lg" 
                  />
                  <span className="text-sm font-medium hidden sm:block">{language}</span>
                  <Icon icon="mdi:chevron-down" className="text-sm" />
                </button>
                
                {/* Language Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Icon icon={lang.flag} className="text-lg" />
                      <span className="text-sm font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <Icon 
                  icon={isOpen ? 'mdi:close' : 'mdi:menu'} 
                  className="text-2xl text-gray-700"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />
        
        {/* Mobile Menu */}
        <div 
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-[#ee2825] p-2 rounded-lg">
                <Icon icon="mdi:skiing" className="text-xl text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-[#111111]">Equipe</span>
                <span className="text-xs text-gray-600 block">Limone Piemonte</span>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon icon="mdi:close" className="text-xl text-gray-700" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="p-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="bg-[#ee2825]/10 p-2 rounded-lg group-hover:bg-[#ee2825]/20 transition-colors duration-200">
                  <Icon 
                    icon={item.icon} 
                    className="text-xl text-[#ee2825]" 
                  />
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-[#ee2825] transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Language Selector */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Lingua / Language
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    toggleMenu();
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg transition-colors duration-200 ${
                    language === lang.code 
                      ? 'bg-[#ee2825] text-white' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon icon={lang.flag} className="text-lg" />
                  <span className="text-sm font-medium">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600">Dal 2002 a Limone Piemonte</p>
              <p className="text-xs text-gray-500 mt-1">Tradizione agonistica e passione</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
