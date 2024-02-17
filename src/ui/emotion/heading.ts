import { css } from '@emotion/react';

const base = css`
  font-family: var(--font-family--heading);
  font-weight: var(--font-weight--heading);
  letter-spacing: -0.1rem;
  margin-bottom: var(--my--md);
  margin-top: 0;

  color: inherit;
`;

const sm = css`
  ${base};

  font-size: var(--font-size--md);
  line-height: 1.35;
`;

const md = css`
  ${base};

  font-size: var(--font-size--lg);
  line-height: 1.25;
`;

const lg = css`
  ${base};

  font-size: var(--font-size--xl);
  line-height: 1.15;
`;

const heading = {
  base,
  sm,
  md,
  lg,
};

export default heading;
