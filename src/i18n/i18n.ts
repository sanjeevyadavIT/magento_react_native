import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import enTranslation from './locales/en/translation.json'
import esTranslation from './locales/es/translation.json'

i18n
    .use(RNLanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        fallbackNS: 'common',
        supportedLngs: ['en', 'es'],
        resources: {
            en: {
                translation: enTranslation,
            },
            es: {
                translation: esTranslation,
            },
        },
    })