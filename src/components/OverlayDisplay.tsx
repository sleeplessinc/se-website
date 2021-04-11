import React from 'react';

export interface Props {
  imageSrc: string;
  imageWidth?: number;
  overlap?: number;
  children?: React.ReactNode | null;
}

const defaultProps: Props = {
  imageSrc: '',
  imageWidth: 0.3,
  overlap: 0.1,
};

const OverlayDisplay: React.FC<Props> = ({ children, imageSrc, imageWidth, overlap }: Props) => {
  const toPercentString = (value: number) => `${Math.abs(value * 100)}%`;

  if (!imageWidth || imageWidth < 0 || imageWidth > 1) {
    return <p>Invalid prop `imageWidth` supplied to component `ContentList`. Value must be between 0 and 1.</p>;
  }
  if (!overlap || overlap < 0 || overlap > imageWidth) {
    return (
      <p>{`Invalid prop 'imageWidth' supplied to component 'ContentList'. Value must be between 0 and ${imageWidth}.`}</p>
    );
  }

  const containerWidth = 1 - imageWidth + overlap;

  return (
    <div className="d-flex flex-row flex-nowrap">
      <div
        style={{
          overflow: 'hidden',
          background: `url(${imageSrc})`,
          backgroundSize: 'auto 100%',
          backgroundPositionY: 'top',
          backgroundPositionX: 'center',
          backgroundRepeat: 'no-repeat',
          boxSizing: 'border-box',
          width: toPercentString(imageWidth),
          minHeight: '200px',
          flex: 'none',
        }}
      />
      <div
        className="my-5 p-0"
        style={{
          boxSizing: 'border-box',
          width: toPercentString(containerWidth),
          marginLeft: '-' + toPercentString(overlap),
          flex: 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};

OverlayDisplay.defaultProps = defaultProps;

export default OverlayDisplay;
