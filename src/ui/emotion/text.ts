import { css } from '@emotion/react';

const base = css`
  font-family: var(--font-family);
  font-weight: var(--font-weight);
  letter-spacing: 0.01rem;
  line-height: 1.6;
`;

const sm = css`
  ${base};

  font-size: var(--font-size--xs);
  line-height: 1.35;
`;

const md = css`
  ${base};

  font-size: var(--font-size--sm);
  line-height: 1.25;
`;

const lg = css`
  ${base};

  font-size: var(--font-size--md);
`;

const ellipsis = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const text = {
  sm,
  md,
  lg,
  ellipsis,
};

export default text;
