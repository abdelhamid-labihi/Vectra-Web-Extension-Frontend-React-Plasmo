function parseDocumentString(documentString) {
    const lines = documentString.split('\n');
    const jsonObject = {};
    let currentKey = '';
  
    lines.forEach(line => {
      if (line.startsWith(':')) {
        const splitLine = line.split(':');
        currentKey = splitLine[1].trim();
        jsonObject[currentKey] = splitLine[2] ? splitLine[2].trim() : '';
      } else if (line.startsWith('  *')) {
        const splitLine = line.split(':');
        const subKey = splitLine[1].trim();
        const value = splitLine[2] ? splitLine[2].trim() : '';
        if (!Array.isArray(jsonObject[currentKey])) {
          jsonObject[currentKey] = [];
        }
        jsonObject[currentKey].push({ [subKey]: value });
      } else if (line.startsWith('              ')) {
        jsonObject[currentKey] += ', ' + line.trim();
      }
    });
  
    return jsonObject;
  }

module.exports = parseDocumentString;