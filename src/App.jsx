import './App.css'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import BreakTimer from './components/BreakTimer';
import en from './locales/en/translations.json';
import fi from './locales/fi/translations.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en,
      fi
    },
    //lng: "fi", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

function App() {

  return (
    <BreakTimer />
  )
}

export default App
