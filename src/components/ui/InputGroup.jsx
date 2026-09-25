export const InputGroup = ({ id, label, value, unit, onChange, highlight = false }) => (
    <div className={`input-group ${!label ? 'no-label' : ''}`}>
        {label && (
            <label htmlFor={id} style={highlight ? { color: 'var(--primary-red)' } : {}}>
                {label}
            </label>
        )}
        <div className="input-wrapper">
            <input
                type="number"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="0"
                step="any"
                inputMode="decimal"
                style={highlight ? { color: 'var(--primary-red)', fontWeight: 600 } : {}}
            />
            <span className="unit" style={highlight ? { color: 'var(--primary-red)' } : {}}>
                {unit}
            </span>
        </div>
    </div>
);
