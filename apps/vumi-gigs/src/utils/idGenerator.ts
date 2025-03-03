/**
 * ID Generator Utility
 * Handles generation of structured IDs for different entities in the application.
 */

// Types for different entities that need IDs
type EntityType = 'studio' | 'creator' | 'gig' | 'project';

// Prefix mapping for different entity types
const PREFIX_MAP: Record<EntityType, string> = {
  studio: 'STU',
  creator: 'CRE',
  gig: 'GIG',
  project: 'PRJ'
};

// Store the latest counter for each entity type (in a real app this would be persisted)
let counters: Record<EntityType, number> = {
  studio: 0,
  creator: 0,
  gig: 0,
  project: 0
};

/**
 * Generates a new ID for a specific entity type
 * Format: PREFIX-YYYYMMDD-SEQUENTIAL (e.g. STU-20230930-001)
 */
export function generateId(entityType: EntityType): string {
  const prefix = PREFIX_MAP[entityType];
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  
  // Increment the counter for this entity type
  counters[entityType] += 1;
  const sequentialPart = String(counters[entityType]).padStart(3, '0');
  
  return `${prefix}-${datePart}-${sequentialPart}`;
}

/**
 * Sets the counter for a specific entity type
 * Useful for initializing the system based on existing data
 */
export function setCounter(entityType: EntityType, count: number): void {
  counters[entityType] = count;
}

/**
 * Parse an ID to extract its components
 */
export function parseId(id: string): { 
  entityType: EntityType | null;
  date: Date | null;
  counter: number | null;
} {
  try {
    const [prefix, datePart, sequentialPart] = id.split('-');
    
    // Find the entity type from the prefix
    const entityType = Object.entries(PREFIX_MAP)
      .find(([_, value]) => value === prefix)?.[0] as EntityType | undefined;
    
    if (!entityType || !datePart || !sequentialPart) {
      return { entityType: null, date: null, counter: null };
    }
    
    // Parse the date
    const year = parseInt(datePart.substring(0, 4));
    const month = parseInt(datePart.substring(4, 6)) - 1; // Months are 0-indexed in JS
    const day = parseInt(datePart.substring(6, 8));
    const date = new Date(year, month, day);
    
    // Parse the counter
    const counter = parseInt(sequentialPart);
    
    return { entityType, date, counter };
  } catch (error) {
    return { entityType: null, date: null, counter: null };
  }
}

/**
 * Checks if an ID is valid according to our format
 */
export function isValidId(id: string): boolean {
  const { entityType, date, counter } = parseId(id);
  return entityType !== null && date !== null && counter !== null;
}
