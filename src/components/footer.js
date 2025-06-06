import React from 'react';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { socialMedia, email } from '@config';

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
`;

const StyledSocialLinks = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 270px;
    margin: 0 auto 10px;
    color: var(--light-slate);
  }

  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    a {
      padding: 10px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledCredit = styled.div`
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-xxs);
  line-height: 1;
`;

const Footer = () => (
  <StyledFooter>
    <StyledSocialLinks>
      <ul>
        <li>
          <a href={`mailto:${email}`} aria-label="Mail">
            <Icon name="Mail" />
          </a>
        </li>
        {socialMedia &&
          socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name}>
                <Icon name={name} />
              </a>
            </li>
          ))}
      </ul>
    </StyledSocialLinks>

    <StyledCredit tabindex="-1">
      <div>
        <a href="/">Built by Maxime Charrière</a>&nbsp;&amp;&nbsp;
        <a href="https://brittanychiang.com/">Designed by Brittany Chiang</a>
      </div>
    </StyledCredit>
  </StyledFooter>
);

export default Footer;
