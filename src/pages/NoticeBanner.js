import React, { useEffect, useState } from 'react';
import './NoticeBanner.css'; // Optional for styling

const NOTICE_KEY = 'dismissedNoticeV1'; // Versioning helps if message changes later

const NoticeBanner = ({ message, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem(NOTICE_KEY);
    if (!dismissed && message) {
      setVisible(true);
      const timer = setTimeout(() => {
        localStorage.setItem(NOTICE_KEY, 'true');
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  
  }, [message, duration]);
  const handleDismiss = () => {
    localStorage.setItem(NOTICE_KEY, 'true');
    setVisible(false);
  }

  if (!visible || !message) return null;

  return (
    <div className="notice-banner">
      <span>{message}</span>
      <button className="dismiss-button" onClick={handleDismiss}>
        x
        </button>
    </div>
  );
};

export default NoticeBanner;
