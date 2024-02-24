import * as React from 'react';

/**
 * Props for the BuilderView component.
 */
export type BuilderViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const BuilderView: React.FC<BuilderViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return (
    <div {...forwardedProps}>
      <h2>Builder View</h2>
    </div>
  );
}

export default BuilderView;
