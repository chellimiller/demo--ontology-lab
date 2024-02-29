import * as React from 'react';
import UploadOntology from '../../ui/components/UploadOntology';

/**
 * Props for the ExplorerView component.
 */
export type ExplorerViewProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const ExplorerView: React.FC<ExplorerViewProps> = (props) => {
  const { /* extract custom props here */ ...forwardedProps } = props;

  return (
    <div {...forwardedProps}>
      <h2>Explorer View</h2>
      <UploadOntology accept="application/json, application/csv"/>
    </div>
  );
};

export default ExplorerView;
