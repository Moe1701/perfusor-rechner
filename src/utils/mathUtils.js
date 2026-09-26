/**
 * Berechnet die Konzentration in µg/ml
 */
export const calculateConcentration = (mg, ml) => {
    const mgVal = parseFloat(mg) || 0;
    const mlVal = parseFloat(ml) || 0;
    if (mlVal <= 0) return 0;
    return (mgVal * 1000) / mlVal;
};

/**
 * Berechnet alle anderen Raten ausgehend von der Basis ml/h
 */
export const calculateRatesFromMlh = (mlh, conc, weight) => {
    const w = parseFloat(weight) || 0;
    
    if (conc <= 0 || !mlh || isNaN(mlh)) {
        return { mcgH: '', mgH: '', mcgMin: '', mcgKgMin: '', mgKgH: '', mgKgMin: '' };
    }

    const mcgH = mlh * conc;
    const mgH = mcgH / 1000;
    const mcgMin = mcgH / 60;
    const mcgKgMin = w > 0 ? mcgMin / w : 0;
    const mcgKgH = w > 0 ? mcgH / w : 0;
    const mgKgH = w > 0 ? mgH / w : 0;
    const mgKgMin = w > 0 ? (mgH / 60) / w : 0;
    const mg24h = mgH * 24;

    return { mcgH, mgH, mcgMin, mcgKgMin, mcgKgH, mgKgH, mgKgMin, mg24h };
};

/**
 * Formatiert die Zahlen für die Ausgabe (schneidet unnötige Nullen ab)
 */
export const formatNumber = (num) => {
    if (num === '' || num === undefined || isNaN(num)) return '';
    if (Number.isInteger(num)) return num;
    if (num === 0) return 0;
    return parseFloat(num.toFixed(5));
};