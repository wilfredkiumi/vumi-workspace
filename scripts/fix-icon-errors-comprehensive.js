import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// A comprehensive list of all Lucide icons used in the project
const ALL_LUCIDE_ICONS = [
  'Activity', 'Airplay', 'AlertCircle', 'AlertOctagon', 'AlertTriangle', 'AlignCenter',
  'AlignJustify', 'AlignLeft', 'AlignRight', 'Anchor', 'Aperture', 'Archive', 'ArrowDown',
  'ArrowDownCircle', 'ArrowDownLeft', 'ArrowDownRight', 'ArrowLeft', 'ArrowLeftCircle',
  'ArrowRight', 'ArrowRightCircle', 'ArrowUp', 'ArrowUpCircle', 'ArrowUpLeft', 'ArrowUpRight',
  'AtSign', 'Award', 'BarChart', 'BarChart2', 'Battery', 'BatteryCharging', 'Bell', 'BellOff',
  'Bluetooth', 'Bold', 'Book', 'BookOpen', 'Bookmark', 'Box', 'Briefcase', 'Calendar',
  'Camera', 'CameraOff', 'Cast', 'Check', 'CheckCircle', 'CheckSquare', 'ChevronDown',
  'ChevronLeft', 'ChevronRight', 'ChevronUp', 'ChevronsDown', 'ChevronsLeft', 'ChevronsRight',
  'ChevronsUp', 'Circle', 'Clipboard', 'Clock', 'Cloud', 'CloudDrizzle', 'CloudLightning',
  'CloudOff', 'CloudRain', 'CloudSnow', 'Code', 'Codepen', 'Codesandbox', 'Coffee', 'Columns',
  'Command', 'Compass', 'Copy', 'CornerDownLeft', 'CornerDownRight', 'CornerLeftDown',
  'CornerLeftUp', 'CornerRightDown', 'CornerRightUp', 'CornerUpLeft', 'CornerUpRight',
  'Cpu', 'CreditCard', 'Crop', 'Crosshair', 'Database', 'Delete', 'Disc', 'DollarSign',
  'Download', 'DownloadCloud', 'Droplet', 'Edit', 'Edit2', 'Edit3', 'ExternalLink', 'Eye',
  'EyeOff', 'Facebook', 'FastForward', 'Feather', 'File', 'FileMinus', 'FilePlus',
  'FileText', 'Film', 'Filter', 'Flag', 'Folder', 'FolderMinus', 'FolderPlus', 'Framer',
  'Frown', 'Gift', 'GitBranch', 'GitCommit', 'GitMerge', 'GitPullRequest', 'GitHub', 'Gitlab',
  'Globe', 'Grid', 'HardDrive', 'Hash', 'Headphones', 'Heart', 'HelpCircle', 'Hexagon',
  'Home', 'Image', 'Inbox', 'Info', 'Instagram', 'Italic', 'Key', 'Layers', 'Layout',
  'LifeBuoy', 'Link', 'Link2', 'Linkedin', 'List', 'Loader', 'Lock', 'LogIn', 'LogOut',
  'Mail', 'Map', 'MapPin', 'Maximize', 'Maximize2', 'Meh', 'Menu', 'MessageCircle',
  'MessageSquare', 'Mic', 'MicOff', 'Minimize', 'Minimize2', 'Minus', 'MinusCircle',
  'MinusSquare', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Mouse', 'Move',
  'Music', 'Navigation', 'Navigation2', 'Octagon', 'Package', 'Paperclip', 'Pause',
  'PauseCircle', 'PenTool', 'Percent', 'Phone', 'PhoneCall', 'PhoneForwarded',
  'PhoneIncoming', 'PhoneMissed', 'PhoneOff', 'PhoneOutgoing', 'PieChart', 'Play',
  'PlayCircle', 'Plus', 'PlusCircle', 'PlusSquare', 'Pocket', 'Power', 'Printer',
  'Radio', 'RefreshCcw', 'RefreshCw', 'Repeat', 'Rewind', 'RotateCcw', 'RotateCw', 'Rss',
  'Save', 'Scissors', 'Search', 'Send', 'Server', 'Settings', 'Share', 'Share2',
  'Shield', 'ShieldOff', 'ShoppingBag', 'ShoppingCart', 'Shuffle', 'Sidebar', 'SkipBack',
  'SkipForward', 'Slack', 'Slash', 'Sliders', 'SlidersHorizontal', 'Smartphone', 'Smile', 'Speaker',
  'Square', 'Star', 'StopCircle', 'Sun', 'Sunrise', 'Sunset', 'Tablet', 'Tag', 'Target',
  'Terminal', 'Thermometer', 'ThumbsDown', 'ThumbsUp', 'ToggleLeft', 'ToggleRight',
  'Tool', 'Trash', 'Trash2', 'Trello', 'TrendingDown', 'TrendingUp', 'Triangle',
  'Truck', 'Tv', 'Twitch', 'Twitter', 'Type', 'Umbrella', 'Underline', 'Unlock',
  'Upload', 'UploadCloud', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'UserX', 'Users',
  'Video', 'VideoOff', 'Voicemail', 'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Watch',
  'Wifi', 'WifiOff', 'Wind', 'X', 'XCircle', 'XOctagon', 'XSquare', 'Youtube', 'Zap',
  'ZapOff', 'ZoomIn', 'ZoomOut', 'Languages', 'Youtube', 'Instagram', 'Twitch', 'ArrowUpDown',
  'Bot', 'Building', 'Building2', 'Github', 'Globe2', 'Mail', 'MessageCircle'
];

// Map of components to their required Lucide icons (add as needed)
const COMPONENT_REQUIRED_ICONS = {
  'GigCard.tsx': ['Clock', 'DollarSign', 'MapPin', 'Tag', 'Users'],
  'CreatorCard.tsx': ['Star', 'MapPin', 'CheckCircle', 'Users', 'Award'],
  'GigsListingPage.tsx': ['Search', 'Filter', 'X', 'CheckSquare', 'Square', 'SlidersHorizontal', 'ChevronDown', 'Briefcase'],
  'CreatorListingPage.tsx': ['Search', 'Filter', 'X', 'CheckSquare', 'Square', 'Users'],
  'GigDetailPage.tsx': ['Clock', 'MapPin', 'Calendar', 'Tag', 'Users', 'FileText', 'ChevronLeft', 'Share2', 'Bookmark', 'Flag', 'ExternalLink', 'CheckCircle', 'Star', 'DollarSign']
};

function fixIconImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Extract used icons in JSX
  const usedIcons = [];
  
  // Check for each possible icon usage
  ALL_LUCIDE_ICONS.forEach(icon => {
    // Look for <IconName /> or <IconName className= or other usage patterns
    const pattern = new RegExp(`<${icon}[\\s/>]|<${icon}$`, 'g');
    if (pattern.test(content)) {
      usedIcons.push(icon);
    }
  });
  
  // Get currently imported icons
  let importedIcons = [];
  const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
  if (importMatch) {
    importedIcons = importMatch[1].split(',').map(i => i.trim());
  }
  
  // Find missing icons
  const missingIcons = usedIcons.filter(icon => !importedIcons.includes(icon));
  
  if (missingIcons.length > 0) {
    let updatedContent = content;
    
    if (importMatch) {
      // Update existing import
      const allIcons = [...importedIcons, ...missingIcons].sort().join(', ');
      updatedContent = updatedContent.replace(
        importMatch[0],
        `import { ${allIcons} } from 'lucide-react'`
      );
    } else {
      // Add new import
      const importStatement = `import { ${missingIcons.sort().join(', ')} } from 'lucide-react';\n`;
      
      // Find a good position to insert the import
      const lastImport = content.match(/import.*?;/g);
      if (lastImport) {
        const lastImportIndex = content.lastIndexOf(lastImport[lastImport.length - 1]) + lastImport[lastImport.length - 1].length;
        updatedContent = content.slice(0, lastImportIndex) + '\n' + importStatement + content.slice(lastImportIndex);
      } else {
        updatedContent = importStatement + content;
      }
    }
    
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Added missing icons to ${path.basename(filePath)}: ${missingIcons.join(', ')}`);
    modified = true;
  }
  
  return modified;
}

// Apply direct fixes to known components that need icons
function fixKnownComponents() {
  let fixedCount = 0;
  
  // Search for components in both app and packages
  Object.entries(COMPONENT_REQUIRED_ICONS).forEach(([componentName, requiredIcons]) => {
    const possiblePaths = [
      path.join(rootDir, 'apps', 'vumi-gigs', 'src', componentName),
      path.join(rootDir, 'apps', 'vumi-gigs', 'src', 'components', componentName),
      path.join(rootDir, 'packages', 'ui', componentName),
      path.join(rootDir, 'packages', 'ui', 'components', componentName)
    ];
    
    // Find the first path that exists
    const filePath = possiblePaths.find(p => fs.existsSync(p));
    
    if (filePath) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Get existing imported icons
      let importedIcons = [];
      const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);
      if (importMatch) {
        importedIcons = importMatch[1].split(',').map(i => i.trim());
      }
      
      // Find missing icons from required list
      const missingIcons = requiredIcons.filter(icon => !importedIcons.includes(icon));
      
      if (missingIcons.length > 0) {
        let updatedContent = content;
        
        if (importMatch) {
          // Update existing import
          const allIcons = [...importedIcons, ...missingIcons].sort().join(', ');
          updatedContent = updatedContent.replace(
            importMatch[0],
            `import { ${allIcons} } from 'lucide-react'`
          );
        } else {
          // Add new import
          const importStatement = `import { ${missingIcons.sort().join(', ')} } from 'lucide-react';\n`;
          
          // Find a good position to insert the import
          const lastImport = content.match(/import.*?;/g);
          if (lastImport) {
            const lastImportIndex = content.lastIndexOf(lastImport[lastImport.length - 1]) + lastImport[lastImport.length - 1].length;
            updatedContent = content.slice(0, lastImportIndex) + '\n' + importStatement + content.slice(lastImportIndex);
          } else {
            updatedContent = importStatement + content;
          }
        }
        
        fs.writeFileSync(filePath, updatedContent);
        console.log(`✅ Added missing icons to ${path.basename(filePath)}: ${missingIcons.join(', ')}`);
        fixedCount++;
      }
    } else {
      console.log(`⚠️ Could not find component: ${componentName}`);
    }
  });
  
  return fixedCount;
}

// Find all components and check for missing icon imports
function scanAllComponents() {
  let fixedCount = 0;
  
  // Look in both app and ui package
  const componentFiles = [
    ...globSync('apps/vumi-gigs/src/**/*.{tsx,jsx}', { cwd: rootDir }),
    ...globSync('packages/ui/**/*.{tsx,jsx}', { cwd: rootDir })
  ];
  
  componentFiles.forEach(relativePath => {
    const fullPath = path.join(rootDir, relativePath);
    const wasFixed = fixIconImportsInFile(fullPath);
    if (wasFixed) fixedCount++;
  });
  
  return fixedCount;
}

console.log('🔍 Fixing icon import issues...');

// First fix known components
const knownFixed = fixKnownComponents();
console.log(`Fixed ${knownFixed} known components.`);

// Then scan all components for any we might have missed
const additionalFixed = scanAllComponents();
console.log(`Fixed ${additionalFixed} additional components.`);

console.log('✨ All icon import issues have been addressed.');
