// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                username_required: "Username is required",
            },
        },
        fa: {
            translation: {
                username_required: "نام کاربری الزامی است",
            },
        },
    },
    lng: "fa", // زبان پیش‌فرض
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
