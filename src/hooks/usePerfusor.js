import { useState, useEffect } from 'react';
import { calculateConcentration, calculateRatesFromMlh, formatNumber } from '../utils/mathUtils';

export const usePerfusor = () => {
    // 1. Basisdaten
    const [baseData, setBaseData] = useState({
        mg: '',
        ml: '50',
        weight: '75'
    });

    // 2. Raten-Daten
    const [rates, setRates] = useState({
        mlh: '',
        mgKgH: '',
        mgKgMin: '',
        mcgKgMin: '',
        mgH: '',
        mcgH: '',
        mcgMin: ''
    });

    // Berechnete Konzentration (abgeleiteter State)
    const concentration = calculateConcentration(baseData.mg, baseData.ml);

    // Funktion zum Aktualisieren der Basisdaten
    const handleBaseDataChange = (field, value) => {
        setBaseData(prev => ({ ...prev, [field]: value }));
    };

    // Die Kern-Synchronisations-Logik
    const handleRateChange = (sourceField, value) => {
        const val = parseFloat(value);
        const weight = parseFloat(baseData.weight) || 0;

        // Wenn Feld geleert wird oder ungültig ist
        if (value === '' || isNaN(val) || concentration <= 0) {
            setRates({
                mlh: sourceField === 'mlh' ? value : '',
                mgKgH: sourceField === 'mgKgH' ? value : '',
                mgKgMin: sourceField === 'mgKgMin' ? value : '',
                mcgKgMin: sourceField === 'mcgKgMin' ? value : '',
                mgH: sourceField === 'mgH' ? value : '',
                mcgH: sourceField === 'mcgH' ? value : '',
                mcgMin: sourceField === 'mcgMin' ? value : ''
            });
            return;
        }

        // 1. Rechne den eingegebenen Wert immer erst in ml/h um
        let mlh = 0;
        switch (sourceField) {
            case 'mlh': mlh = val; break;
            case 'mgKgH': mlh = (val * weight * 1000) / concentration; break;
            case 'mgKgMin': mlh = (val * weight * 60 * 1000) / concentration; break;
            case 'mcgKgMin': mlh = (val * weight * 60) / concentration; break;
            case 'mgH': mlh = (val * 1000) / concentration; break;
            case 'mcgH': mlh = val / concentration; break;
            case 'mcgMin': mlh = (val * 60) / concentration; break;
            default: break;
        }

        // 2. Berechne alle anderen Werte basierend auf dem neuen ml/h Wert
        const calculated = calculateRatesFromMlh(mlh, concentration, weight);

        // 3. Setze den neuen State (das Quellfeld behält den genauen Input-String, um Tippfehler bei Kommas zu vermeiden)
        setRates({
            mlh: sourceField === 'mlh' ? value : formatNumber(mlh),
            mgKgH: sourceField === 'mgKgH' ? value : formatNumber(calculated.mgKgH),
            mgKgMin: sourceField === 'mgKgMin' ? value : formatNumber(calculated.mgKgMin),
            mcgKgMin: sourceField === 'mcgKgMin' ? value : formatNumber(calculated.mcgKgMin),
            mgH: sourceField === 'mgH' ? value : formatNumber(calculated.mgH),
            mcgH: sourceField === 'mcgH' ? value : formatNumber(calculated.mcgH),
            mcgMin: sourceField === 'mcgMin' ? value : formatNumber(calculated.mcgMin)
        });
    };

    // Reagiert auf Änderungen der Basisdaten (Wenn Basisdaten sich ändern, rechne die Raten neu)
    useEffect(() => {
        if (concentration > 0 && rates.mlh !== '') {
            // Simuliere eine Änderung am ml/h Feld, um alles neu zu berechnen
            handleRateChange('mlh', rates.mlh);
        } else if (concentration === 0) {
            // Leere alle Felder, wenn Konzentration 0 wird
            handleRateChange('mlh', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseData.mg, baseData.ml, baseData.weight]);

    const resetValues = () => {
        setBaseData({ mg: '', ml: '50', weight: '75' });
        setRates({ mlh: '', mgKgH: '', mgKgMin: '', mcgKgMin: '', mgH: '', mcgH: '', mcgMin: '' });
    };

    return {
        baseData,
        rates,
        concentration,
        handleBaseDataChange,
        handleRateChange,
        resetValues
    };
};