import React, { useState } from 'react';
import StartForm from './StartForm';
import FormComponent from './FormComponent';

function MainComponent() {
  const [showFormComponent, setShowFormComponent] = useState(false);

  const handleStartClick = () => {
    setShowFormComponent(true); // This will switch to displaying the FormComponent
  };

  return (
    <div>
      {!showFormComponent ? (
        <StartForm onStartClick={handleStartClick} />
      ) : (
        <FormComponent />
      )}
    </div>
  );
}

export default MainComponent;
