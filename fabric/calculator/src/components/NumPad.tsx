import { useContext } from "react";
import "./components.css";
import * as n from "./source";
import { LanguageContext } from "../i8n/LanguageContext";
export default function NumPad() {

    const languageContext = useContext(LanguageContext);
    if (!languageContext) { return null; }

    const { language, setLanguage } = languageContext;

    const changeLanguage = (lng: string) => {
        setLanguage(lng);
    };

    const numbers = language === "en" ? n.englishNumbers : n.arabicNumbers;

    return (
        <div className='container-div'>
            {numbers.map((row, i) => (
                <div key={i} className='btn-div'>
                    {row.map((number, j) =>
                        <button key={j} className='btn' >{number}</button>
                    )}
                </div>
            ))}
        </div>
    )
}
