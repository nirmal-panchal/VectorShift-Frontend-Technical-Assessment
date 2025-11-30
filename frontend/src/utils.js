export const extractVariables = (text) => {
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]); // match[1] is the variable name
    }

    // Return unique variables only
    return [...new Set(matches)];
};

export const calculateDimensions = (text) => {
    const minWidth = 200;
    const minHeight = 80;
    const maxWidth = 500;

    // Calculate based on text length
    const charWidth = 8; // approximate pixels per character
    const lineHeight = 20;

    const lines = text.split('\n');
    const longestLine = Math.max(...lines.map(line => line.length));

    const width = Math.min(Math.max(longestLine * charWidth, minWidth), maxWidth);
    const height = Math.max(lines.length * lineHeight + 40, minHeight);

    return { width, height };
};

export const calculateHandlePosition = (index, total) => {
    // Evenly distribute handles vertically
    // Leave margin at top and bottom
    const margin = 15; // percentage
    const usableSpace = 100 - (2 * margin);

    if (total === 1) return 50; // center if only one handle

    return margin + (index * usableSpace) / (total - 1);
};