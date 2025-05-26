import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { IconHex } from '@components/icons';

const StyledAboutSection = styled.section`
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
    grid-template-columns: ${props =>
    props.columns === 1 ? '1fr' : 'repeat(2, minmax(140px, 200px))'};
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

  const ProfilePicture = (
    <div className="pp">
      <div className="pp-container">
        <StaticImage
          className="img"
          src="../../images/me-500.png"
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
              <span role="img" aria-label="waving hand">
                👋
              </span>{' '}
              Hey there! I'm Maxime, a Swiss engineer who's obsessed with tech and deeply concerned
              about the climate crisis. Since I was a kid, I've been fascinated by robotics and
              building things that make life easier. And with the state of our planet, I decided to
              go all in on sustainability — using my skills to create solutions that actually make a
              difference.
            </p>
            <p>
              <span role="img" aria-label="magnifying glass">
                🔍
              </span>{' '}
              What gets me excited?
              <StyledText columns={1}>
                <ul className="skills-list">
                  <li>
                    <b>Renewable Energy</b> (Solar, Battery &amp; Smart-grid)
                  </li>
                  <li>
                    <b>Data Analysis &amp; AI for Sustainability</b>
                  </li>
                  <li>
                    <b>Open-source, Ethical, &amp; Decentralized Projects</b>
                  </li>
                  <li>
                    <b>…basically anything Clean-tech!</b>
                  </li>
                </ul>
              </StyledText>
            </p>
            <p>
              <span role="img" aria-label="camera">
                📸
              </span>{' '}
              When I'm not coding, you'll probably find me out taking photos, doing basketball, or
              wrestling with my self-hosted server.
            </p>
          </div>
        </StyledText>

        <StyledPic>{ProfilePicture}</StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
