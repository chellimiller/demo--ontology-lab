import * as React from 'react';
import SvgIcon, { SvgIconProps } from './SvgIcon';

/**
 * Props for the FeatherBaseIcon
 */
export type FeatherBaseIconProps = SvgIconProps;

/**
 * Base icon for Feather icons.
 *
 * @see https://feathericons.com/
 *
 * @param props
 * @returns
 */
const FeatherBaseIcon: React.FC<FeatherBaseIconProps> = (props) => (
  <SvgIcon
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    stroke="currentColor"
    {...props}
  />
);

export default FeatherBaseIcon;
