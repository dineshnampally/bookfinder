import React, { useState, useEffect } from 'react';

const Hero = () => {
  const texts = ['Title', 'Author', 'Genre']; 
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter Effect Logic
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < texts[index].length) {
        setDisplayedText((prev) => prev + texts[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (deleting && charIndex > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!deleting && charIndex === texts[index].length) {
        setDeleting(true);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, deleting ? 150 : 200); // Animation speed
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index]);

  return (
    <section className="relative w-full pt-24 sm:pt-32 py-10 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Static "Search By" */}
        <div className="text-center mb-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
            Search by
          </h1>
        </div>

        {/* Animated Text */}
        <div className="text-center mt-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800">
            <span className="text-purple-500">
              {displayedText}
              <span className="text-gray-800">|</span> 
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
