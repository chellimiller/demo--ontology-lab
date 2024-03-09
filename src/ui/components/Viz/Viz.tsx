/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import * as d3 from 'd3';
import styled from '@emotion/styled';

export type VizSelection<T> = d3.Selection<
  SVGSVGElement,
  T,
  HTMLDivElement,
  unknown
>;

export interface VizManager<T> {
  ref: React.RefCallback<HTMLDivElement>;
  readonly selection: VizSelection<T>;

  readonly container: HTMLDivElement | null;
}

export abstract class AbstractVizManager<T> implements VizManager<T> {
  private _container: HTMLDivElement | null = null;

  private _selection: VizSelection<T>;

  constructor() {
    this.ref = this.ref.bind(this);
    this._selection = d3.create('svg') as unknown as VizSelection<T>;
  }

  ref(element: HTMLDivElement) {
    this._container = element;
    if (this._container) {
      const svg = this._selection.node();
      if (!svg) return;
      this._container.append(svg);
    }
  }

  get container() {
    return this._container;
  }

  get selection() {
    return this._selection;
  }
}

const VizContainer = styled.div`
  border: 1px solid red;
  overflow: auto;
`;

/**
 * Props for the Viz
 */
export type VizProps<T = unknown> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  manager: VizManager<T>;
};

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const Viz: React.FC<VizProps> = (props) => {
  const { manager, ...forwardedProps } = props;
  return <VizContainer ref={manager.ref} {...forwardedProps} />;
};

export default React.memo(Viz);
