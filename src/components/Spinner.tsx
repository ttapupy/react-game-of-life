import * as React from 'react';

interface ISpinnerProps {
  visible?: boolean;
  children?: React.ReactNode;
}

const Spinner: React.FC<ISpinnerProps> = ({ visible = true, children }) => {
  if (!visible) { return null; }
  return (
    <>
      {!children && <div style={{ padding: '125px' }} />}
      <div className="lds-grid">
        {Array.from({ length: 9 }, (_, i) => i + 1).map(i => <div key={i}></div>)
        }
      </div>
      {children}
    </>
  );
};

export default Spinner;
