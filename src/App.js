import { useState } from 'react';
import Form from './Form';
import Success from './Success';
import './App.css'

const App = () => {
  const [currentView, setCurrentView] = useState('form');
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSuccess = (formData) => {
    setSubmittedData(formData);
    setCurrentView('success');
  };

  const handleBackToForm = () => {
    setCurrentView('form');
  };

  return (
    <>
      {currentView === 'form' && (
        <Form onSuccess={handleFormSuccess} />
      )}
      {currentView === 'success' && (
        <Success 
          formData={submittedData} 
          onBackToForm={handleBackToForm} 
        />
      )}
    </>
  );
};

export default App;