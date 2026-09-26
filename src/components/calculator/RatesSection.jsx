import { InputGroup } from '../ui/InputGroup';
import { Tile } from '../ui/Tile';

export const RatesSection = ({ rates, onChange }) => (
    <div className="section">
        <div className="section-title">Zielwert / Laufrate</div>
        <Tile highlight>
            <InputGroup id="rate-mlh" label="Laufrate" value={rates.mlh} unit="ml/h" onChange={(val) => onChange('mlh', val)} highlight />
            <InputGroup id="rate-mcgkgmin" label="Zielwert" value={rates.mcgKgMin} unit="µg/kg/min" onChange={(val) => onChange('mcgKgMin', val)} highlight />
        </Tile>
        
        <div className="rates-grid">
            <Tile title="Pro KG Körpergewicht">
                <InputGroup id="rate-mgkgh" value={rates.mgKgH} unit="mg/kg/h" onChange={(val) => onChange('mgKgH', val)} stacked />
                <InputGroup id="rate-mgkgmin" value={rates.mgKgMin} unit="mg/kg/min" onChange={(val) => onChange('mgKgMin', val)} stacked />
                <InputGroup id="rate-mcgkgh" value={rates.mcgKgH} unit="µg/kg/h" onChange={(val) => onChange('mcgKgH', val)} stacked />
            </Tile>
            
            <Tile title="Gesamtdosis (Absolut)">
                <InputGroup id="rate-mgh" value={rates.mgH} unit="mg/h" onChange={(val) => onChange('mgH', val)} stacked />
                <InputGroup id="rate-mg24h" value={rates.mg24h} unit="mg/24h" onChange={(val) => onChange('mg24h', val)} stacked />
                <InputGroup id="rate-mcgh" value={rates.mcgH} unit="µg/h" onChange={(val) => onChange('mcgH', val)} stacked />
            </Tile>
        </div>
    </div>
);