import styled from '@emotion/styled';

const SvgIcon = styled.svg`
  height: var(--icon--size, 1em);
  min-height: var(--icon--size, 1em);
  max-height: var(--icon--size, 1em);

  width: var(--icon--size, 1em);
  min-width: var(--icon--size, 1em);
  max-width: var(--icon--size, 1em);
`;

SvgIcon.defaultProps = {
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg',
};

export type SvgIconProps = React.ComponentPropsWithRef<typeof SvgIcon>;

export default SvgIcon;
