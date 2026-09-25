import { useState, useEffect } from 'react';
import { calculateRatesFromMlh, formatNumber } from '../utils/mathUtils';

export const usePerfusor = () => {
    // 1. Basisdaten (Jetzt mit Konzentration als echtem State)
    const [baseData, setBaseData] = useState({
        mg: '',
        ml: '50',
        weight: '75',
        concentration: '' 
    });

    // 2. Raten-Daten
    const [rates, setRates] = useState({
        mlh: '', mgKgH: '', mgKgMin: '', mcgKgMin: '', mgH: '', mcgH: '', mcgMin: ''
    });

    const activeConcentration = parseFloat(baseData.concentration) || 0;

    const handleBaseDataChange = (field, value) => {
        const newBase = { ...baseData, [field]: value };
        
        // Magie: Bidirektionale Aktualisierung von Wirkstoff und Konzentration!
        if (field === 'mg' || field === 'ml') {
            const mg = parseFloat(newBase.mg);
            const ml = parseFloat(newBase.ml);
            if (!isNaN(mg) && !isNaN(ml) && ml > 0) {
                newBase.concentration = ((mg * 1000) / ml).toString();
            } else {
                newBase.concentration = '';
            }
        } else if (field === 'concentration') {
            const conc = parseFloat(newBase.concentration);
            const ml = parseFloat(newBase.ml);
            if (!isNaN(conc) && !isNaN(ml) && ml > 0) {
                newBase.mg = ((conc * ml) / 1000).toString();
            } else {
                newBase.mg = '';
            }
        }
        
        setBaseData(newBase);
    };

    const handleRateChange = (sourceField, value) => {
        const val = parseFloat(value);
        const weight = parseFloat(baseData.weight) || 0;

        if (value === '' || isNaN(val) || activeConcentration <= 0) {
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

        let mlh = 0;
        switch (sourceField) {
            case 'mlh': mlh = val; break;
            case 'mgKgH': mlh = (val * weight * 1000) / activeConcentration; break;
            case 'mgKgMin': mlh = (val * weight * 60 * 1000) / activeConcentration; break;
            case 'mcgKgMin': mlh = (val * weight * 60) / activeConcentration; break;
            case 'mgH': mlh = (val * 1000) / activeConcentration; break;
            case 'mcgH': mlh = val / activeConcentration; break;
            case 'mcgMin': mlh = (val * 60) / activeConcentration; break;
            default: break;
        }

        const calculated = calculateRatesFromMlh(mlh, activeConcentration, weight);

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

    // Reagiert auf Änderungen der Konzentration oder des Gewichts
    useEffect(() => {
        if (activeConcentration > 0 && rates.mlh !== '') {
            handleRateChange('mlh', rates.mlh);
        } else if (activeConcentration === 0) {
            handleRateChange('mlh', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseData.concentration, baseData.weight]);

    const resetValues = () => {
        setBaseData({ mg: '', ml: '50', weight: '75', concentration: '' });
        setRates({ mlh: '', mgKgH: '', mgKgMin: '', mcgKgMin: '', mgH: '', mcgH: '', mcgMin: '' });
    };

    return {
        baseData, rates, handleBaseDataChange, handleRateChange, resetValues
    };
};
