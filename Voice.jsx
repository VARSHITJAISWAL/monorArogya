import React, { useState, useEffect } from 'react';
import styles from './Voice.module.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

const Voice = ({ onCommand }) => {
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Off');

  useEffect(() => {
    if (!recognition) {
      setStatusMessage('Voice commands not supported');
      return;
    }

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      onCommand(command); // Pass the recognized command to the parent
      setStatusMessage(`"${command}" recognized`);
      recognition.stop(); // Stop listening after a result
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatusMessage('Off');
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setStatusMessage(`Error: ${event.error}`);
      setIsListening(false);
    };

    return () => {
      if (isListening) recognition.stop();
    };
  }, [isListening, onCommand]);

  const handleToggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        setStatusMessage('Listening...');
      } catch (error) {
        console.error('Recognition already started:', error);
      }
    }
  };

  return (
    <div className={styles.voiceComponent}>
      <button
        onClick={handleToggleListening}
        className={`${styles.voiceButton} ${isListening ? styles.active : ''}`}
        disabled={!recognition}
      >
        {isListening ? 'Stop' : 'Start'} Voice Control
      </button>
      <div className={styles.status}>{statusMessage}</div>
    </div>
  );
};

export default Voice;