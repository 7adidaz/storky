import { useContext } from 'react';
import './components.css'
import * as f from './source';
import { LanguageContext } from '../i8n/LanguageContext';
export default function Advanced() {
    const languageContext = useContext(LanguageContext);
    if (!languageContext) { return null; }

    const { language, setLanguage } = languageContext;
    const functions = language === "en" ? f.englishFunctions : f.arabicFunctions;


    return (
        <div className='container-div'>
            {functions.map((row, i) => (
                <div key={i} className='btn-div'>
                    {row.map((func, j) =>
                        <button key={j} className='btn'>{func}</button>
                    )}
                </div>
            ))}
        </div>
    )
}
