import * as React from 'react';
import { css, keyframes } from '@emotion/react';
import { SvgIconProps } from './SvgIcon';

const flicker = keyframes`
  from  { opacity: 0; }
  0%    { opacity: 1; }
  3%    { opacity: 0.4; }
  6%    { opacity: 1; }
  7%    { opacity: 0.4; }
  8%    { opacity: 1; }
  9%    { opacity: 0.4; }
  10%   { opacity: 1; }
  89%   { opacity: 1; }
  90%   { opacity: 0.4; }
  100%  { opacity: 0.4; }
  to    { opacity: 1; }
`;

/**
 * Props for the UtoriLogoIcon
 */
export type UtoriLogoIconProps = Omit<SvgIconProps, 'children'>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const UtoriLogoIcon: React.FC<UtoriLogoIconProps> = (props) => {
  const { ...forwardedProps } = props;

  return (
    <svg {...forwardedProps}>
      <defs>
        <filter id="shadow1">
          <feDropShadow
            opacity="0.2"
            floodColor="#326a98"
            dx="0.4"
            dy="0.4"
            stdDeviation="0.2"
          />
        </filter>
        <filter id="shadow2">
          <feDropShadow dx="0.4" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
      <rect rx="100" ry="100" x="0" y="0" fill="white" />
      <path
        d="M 15,15 L 15,50 A 35,35 0,1,0 85,50 L 85,15 L 60,15 L 60,50 A 10,10 0,0,1 50,60 L 50,50 L 15,15"
        fill="#4898da"
        stroke="none"
        filter="url(#shadow1)"
      />
      <path
        d="M 0,0 L 45,45 L 40,55 L 100,100 L 55,55 L 60,45 L 0,0"
        fill="#000000"
        stroke="none"
        filter="url(#shadow2)"
        css={css`
          animation: ${flicker} 6s linear 3s infinite;
        `}
      />
    </svg>
  );
};

export default UtoriLogoIcon;
