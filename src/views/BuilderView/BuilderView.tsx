/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { uniqueId } from 'lodash';
import { AbstractVizManager, Button, Viz } from '../../ui/components';
import { SetRequired } from 'type-fest';

/**
 * Props for the BuilderView component.
 */
export type BuilderViewProps = React.HTMLAttributes<HTMLDivElement>;

type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
};
type Link = {
  source: string;
  target: string;
};

type BuilderState = {
  nodes: Map<string, Node>;
  links: Link[];
};

type BuilderVizSettings = {
  height: number;
  width: number;
};

class BuilderVizManager extends AbstractVizManager<unknown> {
  private state: BuilderState;

  private settings: BuilderVizSettings;

  constructor(settings: Partial<BuilderVizSettings> = {}) {
    super();
    const { height = 500, width = 500 } = settings;
    this.settings = Object.freeze({ height, width });
    this.state = { nodes: new Map(), links: [] };
    this.addNode = this.addNode.bind(this);
    this.render = this.render.bind(this);
    this.setState = this.setState.bind(this);
    this.selection.attr('width', width).attr('height', height);
  }

  render() {
    const links = this.selection
      .selectAll('line')
      .data(this.state.links)
      .enter()
      .append('line')
      .style('stroke', '#AAA');

    const nodes = this.selection
      .selectAll('circle')
      .data(Array.from(this.state.nodes.values()))
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
      .style('fill', '#555');
  }

  setState(state: BuilderState) {
    this.state = state;
    this.render();
  }

  addNode(node: SetRequired<Partial<Node>, 'name'>) {
    const {
      name,
      id = uniqueId('builder-node'),
      x = Math.random() * this.settings.width,
      y = Math.random() * this.settings.height,
    } = node;

    const nodes = new Map(this.state.nodes);
    nodes.set(id, { name, id, x, y });

    this.setState({
      ...this.state,
      nodes,
    });
  }
}

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const BuilderView: React.FC<BuilderViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  const manager = React.useMemo(() => new BuilderVizManager(), []);

  return (
    <div {...forwardedProps}>
      <h2>Builder View</h2>
      <Button
        onClick={() => manager.addNode({ name: 'New Node' })}
        label="Add Node"
      />
      <Viz manager={manager} />
    </div>
  );
};

export default BuilderView;
