import { InputGroup } from '../ui/InputGroup';
import { Tile } from '../ui/Tile';

export const RatesSection = ({ rates, onChange }) => (
    <div className="section">
        <div className="section-title">2. Zielwert / Laufrate</div>
        <Tile highlight>
            <InputGroup id="rate-mlh" label="Laufrate" value={rates.mlh} unit="ml/h" onChange={(val) => onChange('mlh', val)} highlight />
        </Tile>
        
        {/* Neues Grid-Layout für Side-by-Side Kacheln */}
        <div className="rates-grid">
            <Tile title="Pro KG Körpergewicht">
                <InputGroup id="rate-mgkgh" value={rates.mgKgH} unit="mg/kg/h" onChange={(val) => onChange('mgKgH', val)} />
                <InputGroup id="rate-mgkgmin" value={rates.mgKgMin} unit="mg/kg/min" onChange={(val) => onChange('mgKgMin', val)} />
                <InputGroup id="rate-mcgkgmin" value={rates.mcgKgMin} unit="µg/kg/min" onChange={(val) => onChange('mcgKgMin', val)} />
            </Tile>
            
            <Tile title="Gesamtdosis (Absolut)">
                <InputGroup id="rate-mgh" value={rates.mgH} unit="mg/h" onChange={(val) => onChange('mgH', val)} />
                <InputGroup id="rate-mcgh" value={rates.mcgH} unit="µg/h" onChange={(val) => onChange('mcgH', val)} />
                <InputGroup id="rate-mcgmin" value={rates.mcgMin} unit="µg/min" onChange={(val) => onChange('mcgMin', val)} />
            </Tile>
        </div>
    </div>
);
