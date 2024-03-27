import React, { useState, useEffect } from 'react';
//styles
import styles from './css/tab.module.css';

const Tab = ({ tabLabels, tabContents, initialActiveIndex }) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex || 0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    setActiveIndex(initialActiveIndex || 0);
  }, [initialActiveIndex]);

  return (
    <div className={styles.tabComponent}>
      <div className={styles.tabButtons}>
        {tabLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              color: activeIndex === index ? 'white' : '#9D9D9D',
              borderBottom: activeIndex === index ? '2px solid white' : '',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabContents.map((content, index) => (
          <div key={index} className={`tab ${activeIndex === index ? 'active' : 'hidden'}`}>
            {activeIndex === index && content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
