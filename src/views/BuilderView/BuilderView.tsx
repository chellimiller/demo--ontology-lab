/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { uniqueId } from 'lodash';
import { SetRequired } from 'type-fest';
import { AbstractVizManager, Button, Viz } from '../../ui/components';

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
  links: Map<string, Link>;
  selected?: string;
};

type BuilderVizSettings = {
  height: number;
  width: number;
  nodeRadius: number;
};

class BuilderVizManager extends AbstractVizManager<unknown> {
  private state: BuilderState;

  private settings: BuilderVizSettings;

  constructor(settings: Partial<BuilderVizSettings> = {}) {
    super();
    const { height = 500, width = 500, nodeRadius = 25 } = settings;
    this.settings = Object.freeze({ height, width, nodeRadius });
    this.state = { nodes: new Map(), links: new Map() };
    this.addNode = this.addNode.bind(this);
    this.render = this.render.bind(this);
    this.setState = this.setState.bind(this);
    this.selection.attr('width', width).attr('height', height);
  }

  render() {
    // eslint-disable-next-line prefer-destructuring
    const selection = this.selection;

    const links = selection
      .selectAll('line')
      .data(Array.from(this.state.links.values()))
      .enter()
      .append('line')
      .style('stroke', '#AAA');

    const nodes = selection
      .selectAll('circle')
      .data(Array.from(this.state.nodes.values()))
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
      .style('fill', '#555')
      .style('cursor', 'pointer')
      .on('click', (event: PointerEvent) => {
        console.log(event.target);
        const element = event.target as SVGCircleElement;
        selection.selectAll('circle').style('fill', '#555');
        element.style.fill = '#999';
      });
  }

  setState(state: BuilderState) {
    this.state = state;
    this.render();
  }

  addNode(node: SetRequired<Partial<Node>, 'name'>) {
    const { height, width, nodeRadius } = this.settings;
    const getRandomNodePosition = (size: number) =>
      Math.random() * (size - nodeRadius * 2) + nodeRadius;

    const {
      name,
      id = uniqueId('builder-node'),
      x = getRandomNodePosition(width),
      y = getRandomNodePosition(height),
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
