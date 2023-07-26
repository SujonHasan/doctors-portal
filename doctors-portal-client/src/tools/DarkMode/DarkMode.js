
import React, { useState } from 'react';
import DarkModeToggle from "react-dark-mode-toggle";

const DarkMode = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => true);

    if(isDarkMode){
        document.body.className = isDarkMode;
    }

    return (
        <DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={60}
    />
    );
};

export default DarkMode;