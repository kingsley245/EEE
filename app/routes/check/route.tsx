import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: 'NDU EEE',
      content:
        'welcome to Niger Delta University (NDU) Electrical Electronics department',
    },
  ];
}

import { useState, useEffect, useCallback } from 'react';
import { slides } from '~/lib/HomeData';
import { Link } from 'react-router';
import FeaturedLecturers from '~/components/lectures';

import CourseCurriculum from '~/components/courses';
import PresidentPortfolio from '~/components/DetpPresident';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logic to move to next slide
  const nextSlide = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex]);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        nextSlide();
      } else {
        clearInterval(timer);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, nextSlide]);

  return (
    <>
      <section className="relative w-full h-[80vh] overflow-hidden bg-black text-white mt-5">
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
                  {slide.text}
                </p>
                <div className="flex gap-4">
                  <Link
                    to="project"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('NO projects still under development');
                      return;
                    }}
                    className="bg-linear-to-r from-blue-900 to-blue-900 px-8 py-3 font-bold transition-all transform hover:-translate-y-1  hover:"
                  >
                    View Projects
                  </Link>
                  <Link
                    to="started"
                    className="border-2 border-white hover:bg-white hover:text-black px-8 py-3 font-bold transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 disabled:opacity-10 disabled:cursor-not-allowed transition-all"
        >
          &#10094;
        </button>

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-4 bg-white/10 hover:bg-white/20 disabled:opacity-10 disabled:cursor-not-allowed transition-all"
        >
          &#10095;
        </button>

        {/* Progress Indicators (Optional) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 transition-all ${
                i === currentIndex ? 'bg-red-600' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>
      <FeaturedLecturers />

      <PresidentPortfolio />
      <CourseCurriculum />
    </>
  );
}
