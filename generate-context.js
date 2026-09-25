import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 1. Einstellungen für den Dateibaum
const IGNORE_DIRS = ['node_modules', '.git', 'dist', '.vercel'];
const OUTPUT_TREE_FILE = 'structure.txt';

// 2. Funktion zum Generieren des Dateibaums
function generateTree(dir, prefix = '') {
    let result = '';
    const files = fs.readdirSync(dir);
    const filteredFiles = files.filter(f => !IGNORE_DIRS.includes(f));

    filteredFiles.forEach((file, index) => {
        const isLast = index === filteredFiles.length - 1;
        const pointer = isLast ? '└── ' : '├── ';
        result += `${prefix}${pointer}${file}\n`;

        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            result += generateTree(fullPath, nextPrefix);
        }
    });
    return result;
}

try {
    console.log('🌳 Erstelle Projektstruktur...');
    const tree = 'Projektstruktur:\n' + generateTree(process.cwd());
    fs.writeFileSync(OUTPUT_TREE_FILE, tree);
    console.log(`✅ Struktur erfolgreich in ${OUTPUT_TREE_FILE} gespeichert.`);

    console.log('\n📦 Führe Repomix aus...');
    // Hier ist unser exakter Repomix-Befehl von vorhin
    const repomixCmd = 'npx repomix --include "src/**/*.js,src/**/*.jsx,src/**/*.css" --ignore "src/assets/**,*.svg" --output code-context.txt';
    
    // Führt den Befehl im Terminal aus
    execSync(repomixCmd, { stdio: 'inherit' });
    console.log('✅ Repomix erfolgreich beendet!');

} catch (error) {
    console.error('❌ Ein Fehler ist aufgetreten:', error.message);
}