import { InputGroup } from '../ui/InputGroup';
import { Tile } from '../ui/Tile';

export const RatesSection = ({ rates, onChange }) => (
    <div className="section">
        <div className="section-title">2. Zielwert / Laufrate</div>
        <Tile highlight>
            <InputGroup 
                id="rate-mlh" label="Laufrate" value={rates.mlh} unit="ml/h" 
                onChange={(val) => onChange('mlh', val)} highlight 
            />
        </Tile>
        <Tile title="Pro KG Körpergewicht">
            <InputGroup 
                id="rate-mgkgh" label="Dosis" value={rates.mgKgH} unit="mg/kg/h" 
                onChange={(val) => onChange('mgKgH', val)} 
            />
            <InputGroup 
                id="rate-mgkgmin" label="Dosis" value={rates.mgKgMin} unit="mg/kg/min" 
                onChange={(val) => onChange('mgKgMin', val)} 
            />
            <InputGroup 
                id="rate-mcgkgmin" label="Dosis" value={rates.mcgKgMin} unit="µg/kg/min" 
                onChange={(val) => onChange('mcgKgMin', val)} 
            />
        </Tile>
        <Tile title="Gesamtdosis (Absolut)">
            <InputGroup 
                id="rate-mgh" label="Dosis" value={rates.mgH} unit="mg/h" 
                onChange={(val) => onChange('mgH', val)} 
            />
            <InputGroup 
                id="rate-mcgh" label="Dosis" value={rates.mcgH} unit="µg/h" 
                onChange={(val) => onChange('mcgH', val)} 
            />
            <InputGroup 
                id="rate-mcgmin" label="Dosis" value={rates.mcgMin} unit="µg/min" 
                onChange={(val) => onChange('mcgMin', val)} 
            />
        </Tile>
    </div>
);
