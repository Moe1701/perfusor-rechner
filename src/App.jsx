import { useState, useRef, useEffect } from 'react';
import { usePerfusor } from './hooks/usePerfusor';
import { BaseDataSection } from './components/calculator/BaseDataSection';
import { RatesSection } from './components/calculator/RatesSection';

export default function App() {
    const { baseData, rates, concentration, handleBaseDataChange, handleRateChange, resetValues } = usePerfusor();
    const [showModal, setShowModal] = useState(false);
    
    // Developer Features State & Refs
    const [showCrosshair, setShowCrosshair] = useState(false);
    const [screenSize, setScreenSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    const clickCount = useRef(0);
    const clickTimer = useRef(null);

    // Fenstergröße für die Fadenkreuz-Skala überwachen
    useEffect(() => {
        const handleResize = () => setScreenSize({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const performHardReset = async () => {
        alert("Hard Reset eingeleitet: Alle Caches und lokalen Daten werden gelöscht...");
        
        // 1. Local und Session Storage leeren
        localStorage.clear();
        sessionStorage.clear();

        // 2. PWA Caches leeren
        if ('caches' in window) {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            } catch (e) {
                console.error("Cache konnte nicht geleert werden", e);
            }
        }

        // 3. Service Worker abmelden (zwingt die PWA beim Neuladen zum Download der neuesten Version)
        if ('serviceWorker' in navigator) {
            try {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (let reg of registrations) {
                    await reg.unregister();
                }
            } catch (e) {
                console.error("Service Worker Fehler", e);
            }
        }

        // 4. Harten Reload erzwingen
        window.location.reload(true);
    };

    const handleTitleClick = () => {
        clickCount.current += 1;

        // Timer zurücksetzen, damit Klicks schnell hintereinander erfolgen müssen
        if (clickTimer.current) clearTimeout(clickTimer.current);

        clickTimer.current = setTimeout(() => {
            clickCount.current = 0; // Reset nach 600ms Pause
        }, 600);

        // 3 Klicks: Fadenkreuz umschalten
        if (clickCount.current === 3) {
            setShowCrosshair(prev => !prev);
        }

        // 5 Klicks: Hard Reset
        if (clickCount.current === 5) {
            clickCount.current = 0; 
            performHardReset();
        }
    };

    return (
        <>
            {/* Entwickler-Fadenkreuz */}
            {showCrosshair && (
                <div className="crosshair-wrapper">
                    <div className="crosshair-x"></div>
                    <div className="crosshair-y"></div>
                    <div className="crosshair-center">{screenSize.w} x {screenSize.h} px</div>
                </div>
            )}

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
                    
                    {/* Der geheime Button (App-Name) */}
                    <h1 
                        onClick={handleTitleClick} 
                        style={{ cursor: 'pointer', userSelect: 'none', touchAction: 'manipulation' }}
                    >
                        Moe's Perfusor Rechner
                    </h1>
                    
                    <button className="header-btn" onClick={resetValues}>Reset</button>
                </div>

                <BaseDataSection 
                    baseData={baseData} 
                    onChange={handleBaseDataChange} 
                />
                
                <RatesSection 
                    rates={rates} 
                    onChange={handleRateChange} 
                />
            </div>
        </>
    );
}
