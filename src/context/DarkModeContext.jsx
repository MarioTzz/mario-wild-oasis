import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useContext } from 'react';
const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'dark-mode');
  useEffect(
    function () {
      // if (isDarkMode) {
      //   document.documentElement.classList.add('dark-mode');
      //   document.documentElement.classList.remove('light-mode');
      // } else {
      //   document.documentElement.classList.add('light-mode');
      //   document.documentElement.classList.remove('dark-mode');
      // }
      document.documentElement.classList.toggle('dark-mode', isDarkMode);
      document.documentElement.classList.toggle('light-mode', !isDarkMode);
    },
    [isDarkMode]
  );
  function toggleDarkMode() {
    setIsDarkMode(isDark => !isDark);
  }
  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (context === undefined) {
    throw new Error('useDarkModeContext must be used within a DarkModeProvider');
  }
  return context;
}
export { DarkModeProvider, useDarkModeContext };
