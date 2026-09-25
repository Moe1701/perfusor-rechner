export const Tile = ({ title, highlight, children }) => (
    <div className={`tile ${highlight ? 'tile-highlight' : ''}`}>
        {title && <div className="tile-title">{title}</div>}
        {children}
    </div>
);