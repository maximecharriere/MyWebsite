module.exports = {
  email: 'contact@maximecharriere.ch',

  socialMedia: [
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/maximecharriere',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/maximecharriere',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/maximecharriere',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Studies',
      url: '/#studies',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#95d0a1',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
