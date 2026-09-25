import { InputGroup } from '../ui/InputGroup';

export const BaseDataSection = ({ baseData, onChange, concentration }) => (
    <div className="section">
        <div className="section-title">1. Basisdaten</div>
        <InputGroup 
            id="med-mg" label="Wirkstoff" value={baseData.mg} unit="mg" 
            onChange={(val) => onChange('mg', val)} 
        />
        <InputGroup 
            id="vol-ml" label="Volumen" value={baseData.ml} unit="ml" 
            onChange={(val) => onChange('ml', val)} 
        />
        <InputGroup 
            id="weight-kg" label="Gewicht" value={baseData.weight} unit="kg" 
            onChange={(val) => onChange('weight', val)} 
        />
        <div className="info-box">
            Konzentration: {concentration > 0 ? `${concentration.toFixed(1)} µg/ml` : '-- µg/ml'}
        </div>
    </div>
);