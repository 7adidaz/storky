import { useContext } from "react";
import { LanguageContext } from "../i8n/LanguageContext";
import "./components.css"
export default function operations() {

    const operators = [['(', ')'], ['-', '+'], ['x', '/']];
    const languageContext = useContext(LanguageContext);
    if (!languageContext) { return null; }

    const { language, setLanguage } = languageContext;

    const changeLanguage = (lng: string) => {
        setLanguage(lng);
    };

    const onlanguagechange = () => {
        if (language === "ar") {
            changeLanguage("en");
        } else {
            changeLanguage("ar");
        }
    }

    return (
        <div className="container-div">
            {operators.map((row, i) => (
                <div key={i} className="btn-div ">
                    {row.map((operator, j) =>
                        <button key={j} className='btn'>{operator}</button>
                    )}
                </div>
            ))}

            <div className='btn-div'>
                <button className="btn" onClick={() => onlanguagechange()}>
                    {language === "en" ? "ar" : "en"}
                </button>
            </div>
        </div >
    );
};
