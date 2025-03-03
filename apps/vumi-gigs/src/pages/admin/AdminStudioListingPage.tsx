import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Button, Card } from 'ui';
import { sampleStudios } from '../../data/studioData';
import { parseId } from '../../utils/idGenerator';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Calendar, 
  Download, 
  Copy
} from 'lucide-react';

function AdminStudioListingPage() {
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudios, setFilteredStudios] = useState(sampleStudios);
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'date'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Filter and sort studios
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query) {
      setFilteredStudios(sortStudios(sampleStudios, sortBy, sortDirection));
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = sampleStudios.filter(studio => 
      studio.id.toLowerCase().includes(lowerQuery) ||
      studio.name.toLowerCase().includes(lowerQuery) ||
      studio.location.city.toLowerCase().includes(lowerQuery) ||
      studio.location.country.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredStudios(sortStudios(filtered, sortBy, sortDirection));
  };
  
  // Sort studios by specified field and direction
  const sortStudios = (studios: typeof sampleStudios, field: 'id' | 'name' | 'date', direction: 'asc' | 'desc') => {
    return [...studios].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'id':
          // Extract the counter part from the ID for numerical sorting
          const aIdParts = parseId(a.id);
          const bIdParts = parseId(b.id);
          
          if (aIdParts.counter && bIdParts.counter) {
            comparison = aIdParts.counter - bIdParts.counter;
          } else {
            comparison = a.id.localeCompare(b.id);
          }
          break;
          
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
          
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
          
        default:
          comparison = 0;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
  };
  
  // Handle sorting changes
  const handleSort = (field: 'id' | 'name' | 'date') => {
    const newDirection = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortDirection(newDirection);
    setFilteredStudios(sort