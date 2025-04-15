import React, { useEffect, useState } from 'react';
import './NoticeBanner.css'; // Optional for styling

const NOTICE_KEY = 'dismissedNoticeV1'; // Versioning helps if message changes later

const NoticeBanner = ({ message, timeout = 5000 }) => {
  const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(NOTICE_KEY);
        if (!dismissed && message) {
            setVisible(true);   
        }
    }, [message]);

    useEffect(() => {
        let timer;
        if (visible && timeout > 0) {
            timer = setTimeout (()=>{
                localStorage.setItem(NOTICE_KEY, 'true');
                setVisible(false);
            }, timeout);
        }
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [visible, timeout]);

  const handleDismiss = () => {
    localStorage.setItem(NOTICE_KEY, 'true');
    setVisible(false);
  }

  if (!visible || !message) return null;

  return (
    <div className="notice-banner">
      <span dangerouslySetInnerHTML={{ __html: message }} />
      <button className="dismiss-button" onClick={handleDismiss}>
        x
        </button>
    </div>
  );
};

export default NoticeBanner;
