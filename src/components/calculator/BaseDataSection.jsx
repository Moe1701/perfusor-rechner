import { InputGroup } from '../ui/InputGroup';

export const BaseDataSection = ({ baseData, onChange }) => (
    <div className="section">
        <div className="section-title">Basisdaten</div>
        <InputGroup id="med-mg" label="Wirkstoff" value={baseData.mg} unit="mg" onChange={(val) => onChange('mg', val)} />
        <InputGroup id="vol-ml" label="Volumen" value={baseData.ml} unit="ml" onChange={(val) => onChange('ml', val)} />
        <InputGroup id="weight-kg" label="Gewicht" value={baseData.weight} unit="kg" onChange={(val) => onChange('weight', val)} />
        <div style={{ marginTop: '12px' }}>
            <InputGroup id="conc-mcgml" label="Konz." value={baseData.concentration} unit="µg/ml" onChange={(val) => onChange('concentration', val)} highlight />
        </div>
    </div>
);