#!/bin/bash

# Simple script to run the TikTok icon fix without requiring a package.json entry
# Use this if you need to run the fix directly without npm

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Navigate to the project root
cd "$SCRIPT_DIR/.."

# Run the Node.js script
node scripts/fix-tiktok-icon.js

# Check if the script was successful
if [ $? -eq 0 ]; then
  echo "✅ TikTok icon fix completed successfully!"
else
  echo "❌ TikTok icon fix failed. Please check the error messages."
  exit 1
fi
