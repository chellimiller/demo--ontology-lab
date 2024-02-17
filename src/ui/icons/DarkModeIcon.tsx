import * as React from 'react';
import FeatherBaseIcon, { FeatherBaseIconProps } from './FeatherBaseIcon';

/**
 * Props for the DarkModeIcon
 */
export type DarkModeIconProps = Omit<FeatherBaseIconProps, 'children'>;

/**
 * Icon of a moon to represent dark mode.
 *
 * @param props
 * @returns
 */
const DarkModeIcon: React.FC<DarkModeIconProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return (
    <FeatherBaseIcon {...forwardedProps}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </FeatherBaseIcon>
  );
};

export default DarkModeIcon;
