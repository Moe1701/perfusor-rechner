import { useState } from 'react';
import { usePerfusor } from './hooks/usePerfusor';
import { BaseDataSection } from './components/calculator/BaseDataSection';
import { RatesSection } from './components/calculator/RatesSection';

export default function App() {
    const { baseData, rates, concentration, handleBaseDataChange, handleRateChange, resetValues } = usePerfusor();
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Über diesen Rechner</h2>
                        <p>Geben Sie die Basisdaten ein. Anschließend können Sie <strong>jeden beliebigen Zielwert</strong> oder die Laufrate eintragen.</p>
                        <p>Alle anderen Felder werden sofort automatisch synchronisiert und umgerechnet.</p>
                        <div className="disclaimer">
                            <strong>Hinweis:</strong> Dieses Tool dient lediglich der Überprüfung. Die Verantwortung für die korrekte Dosierung am Patienten obliegt ausschließlich dem medizinischen Fachpersonal.
                        </div>
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>Schließen</button>
                    </div>
                </div>
            )}

            <div className="calculator-card">
                <div className="header">
                    <button className="header-btn" onClick={() => setShowModal(true)}>Info</button>
                    <h1>Laufratenrechner</h1>
                    <button className="header-btn" onClick={resetValues}>Reset</button>
                </div>

                <BaseDataSection 
                    baseData={baseData} 
                    onChange={handleBaseDataChange} 
                    concentration={concentration} 
                />
                
                <RatesSection 
                    rates={rates} 
                    onChange={handleRateChange} 
                />
            </div>
        </>
    );
}