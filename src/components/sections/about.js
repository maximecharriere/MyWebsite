import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconHex } from '@components/icons';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  aspect-ratio: 1;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .pp {
    transition: var(--transition);
    display: block;
    position: relative;
    width: 100%;
    height: 100%;

    .pp-container {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    .hex-container {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 110%;
      height: 110%;

      svg {
        width: 100%;
        height: 100%;
        polygon {
          fill: none;
          strokewidth: 1;
          stroke: var(--green);
        }
      }
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);
      .hex-container {
        transform: translate(8px, 8px);
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'];

  const ProfilePicture = (
    <div className="pp">
      <div className="pp-container">
        <StaticImage
          className="img"
          src="../../images/me.png"
          width={500}
          quality={95}
          formats={['AUTO', 'WEBP', 'AVIF']}
          alt="Headshot"
        />
      </div>
      <div className="hex-container">
        <IconHex />
      </div>
    </div>
  );

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Brittany and I enjoy creating things that live on the internet. My
              interest in web development started back in 2012 when I decided to try editing custom
              Tumblr themes — turns out hacking together a custom reblog button taught me a lot
              about HTML &amp; CSS!
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="https://us.mullenlowe.com/">an advertising agency</a>,{' '}
              <a href="https://starry.com/">a start-up</a>,{' '}
              <a href="https://www.apple.com/">a huge corporation</a>, and{' '}
              <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences at <a href="https://upstatement.com/">Upstatement</a> for a variety of
              clients.
            </p>

            <p>
              I also recently{' '}
              <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
                launched a course
              </a>{' '}
              that covers everything you need to build a web app with the Spotify API using Node
              &amp; React.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>{ProfilePicture}</StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
