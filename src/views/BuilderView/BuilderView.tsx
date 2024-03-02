/* eslint-disable prefer-destructuring */
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
  id: string;
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
    this.addLink = this.addLink.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.render = this.render.bind(this);
    this.setState = this.setState.bind(this);
    this.selection.attr('width', width).attr('height', height);
  }

  addLink(link: SetRequired<Partial<Link>, 'source' | 'target'>) {
    const { id = uniqueId('builder-link'), source, target } = link;

    const links = new Map(this.state.links);
    links.set(id, { id, source, target });

    this.setState({
      ...this.state,
      links,
    });
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

  render() {
    const { selection, state } = this;
    const handleNodeClick = (event: PointerEvent) =>
      this.handleNodeClick(event);
    const selected = this.state.selected;
    const nodes = Array.from(this.state.nodes.values());
    const links = Array.from(this.state.links.values());

    selection.selectAll('svg > *').remove();

    selection
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .style('stroke', '#AAA')
      .attr('x1', (link) => state.nodes.get(link.source)?.x ?? '0')
      .attr('y1', (link) => state.nodes.get(link.source)?.y ?? '0')
      .attr('x2', (link) => state.nodes.get(link.target)?.x ?? '0')
      .attr('y2', (link) => state.nodes.get(link.target)?.y ?? '0');

    selection
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('id', (node) => node.id)
      .attr('class', (node) =>
        node.id === selected ? 'node selected' : 'node'
      )
      .attr('r', this.settings.nodeRadius)
      .attr('cx', (node) => node.x)
      .attr('cy', (node) => node.y)
      .style('fill', (node) => {
        console.log('selected ', {
          selected,
          value: node.id === selected,
          node: node.id,
        });
        return selected === node.id ? '#999' : '#555';
      })
      .style('cursor', 'pointer')
      .on('click', handleNodeClick);
  }

  isSelected(id: string): boolean {
    return this.state.selected === id;
  }

  handleNodeClick(event: PointerEvent) {
    const element = event.target as SVGCircleElement;
    const id = element.getAttribute('id');

    if (!id) return;

    if (this.isSelected(id)) {
      this.setState({ ...this.state, selected: undefined });
      return;
    }

    if (!event.ctrlKey) {
      console.log(id);
      this.setState({ ...this.state, selected: id });
      return;
    }

    if (!this.state.selected) return;

    this.addLink({ source: this.state.selected, target: id });
  }

  setState(state: BuilderState) {
    this.state = state;
    this.render();
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
