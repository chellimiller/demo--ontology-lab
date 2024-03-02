/* eslint-disable class-methods-use-this */
import * as React from 'react';
import { uniqueId } from 'lodash';
import { AbstractVizManager, Button, Viz } from '../../ui/components';

/**
 * Props for the BuilderView component.
 */
export type BuilderViewProps = React.HTMLAttributes<HTMLDivElement>;

type Node = {
  name: string;
};

type BuilderState = {
  nodes: Map<string, Node>;
};

class BuilderVizManager extends AbstractVizManager<unknown> {
  constructor(private state: BuilderState = { nodes: new Map() }) {
    super();
    this.addNode = this.addNode.bind(this);
    this.selection.attr('width', 500).attr('height', 500);
  }

  addNode(node: Node) {
    const id = uniqueId('builder-node');
    const group = this.selection
      .append('g')
      .attr('id', id)
      .attr('transform', `translate(${250}, ${250})`);
    const circle = group
      .append('circle')
      .attr('rx', 50)
      .attr('ry', 50)
      .attr('x', 50)
      .attr('y', 50);
    const text = group.append('text').text(node.name);

    this.state.nodes.set(id, node);
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
