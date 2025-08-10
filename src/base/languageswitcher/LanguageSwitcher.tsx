import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === "fa" ? "rtl" : "ltr"; // تغییر جهت متن
    };

    return (
        <ButtonGroup size="small">
            <Button onClick={() => changeLanguage("fa")}>FA</Button>
            <Button onClick={() => changeLanguage("en")}>EN</Button>
        </ButtonGroup>
    );
};

export default LanguageSwitcher;
