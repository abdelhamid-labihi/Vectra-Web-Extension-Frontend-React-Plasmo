export function extractDate(dateString: string): string {
    if (!dateString) {
      return "";
    }
  
    // Define regex patterns for different date formats
    const patterns = [
        // YYYY-MM-DD
        /^\d{4}-\d{2}-\d{2}$/, 
        // YYYY-MM
        /^\d{4}-\d{2}$/,
        // YYYY
        /^\d{4}$/,
        // Month YYYY (e.g., August 2023)
        /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Août)\s+\d{4}$/,
      ];
  
    for (const pattern of patterns) {
      if (pattern.test(dateString)) {
        const match = dateString.match(pattern);
        if (match) {
          // Parse the date based on the matching pattern
          if (match[0].length === 10) { // YYYY-MM-DD
            return dateString; 
          } else if (match[0].length === 7) { // YYYY-MM
            return `${match[0]}-01`; // Add default day
          } else if (match[0].length === 4) { // YYYY
            return `${match[0]}-01-01`; // Add default month and day
          } else { // Month YYYY
            const parts = match[0].split(" ");
            const month = parts[0].toLowerCase();
            const year = parts[1];
            const date = new Date(year, getMonthIndex(month), 1);
            return date.toISOString().slice(0, 10); // Convert to YYYY-MM-DD
          }
        }
      }
    }
  
    return ""; // If no match, return empty string
  }
  
  function getMonthIndex(month: string): number {
    const monthMap: { [key: string]: number } = {
      "jan": 0,
      "feb": 1,
      "mar": 2,
      "apr": 3,
      "may": 4,
      "jun": 5,
      "jul": 6,
      "aug": 7,
      "sep": 8,
      "oct": 9,
      "nov": 10,
      "dec": 11,
    };
    return monthMap[month] || 0; // Return 0 if month not found
  }