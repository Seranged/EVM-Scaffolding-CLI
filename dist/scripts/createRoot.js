import fs from 'fs';
import path from 'path';
export function createProjectRoot(directory) {
    const projectPath = path.resolve(process.cwd(), directory);
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
    }
}
