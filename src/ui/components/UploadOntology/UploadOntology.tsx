import * as React from 'react';
import { setExplorerEntity } from '../../../state';

/**
 * Props for the UploadOntology
 */
export type UploadOntologyProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

/**
 * @todo Add description
 *
 * @param props
 * @returns
 */
const UploadOntology: React.FC<UploadOntologyProps> = (props) => {
  const {
    label = 'Choose a file',
    /* extract custom props here */ ...forwardedProps
  } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const chosenFiles = Array.prototype.slice.call(files);

      chosenFiles.forEach((file) => {
        setExplorerEntity(file);
      });
    }
  };

  return (
    <form>
      <label>
        <span>{label}</span>
        <input
          type="file"
          onChange={(event) => handleOnChange(event)}
          {...forwardedProps}
        />
      </label>
    </form>
  );
};

export default UploadOntology;
