#!/bin/bash

# Navigate to the workspace root
cd "$(dirname "$0")"

# Check if tsup is installed
if ! npm list tsup --workspace=@vumi/shared | grep -q tsup; then
  echo "Installing tsup for building..."
  npm install --save-dev tsup --workspace=@vumi/shared
fi

# Build the shared package
echo "Building shared package..."
cd packages/shared
npm run build

# Go back to the workspace root
cd ../../

# Optional: Clear Vite cache in apps
echo "Clearing Vite cache in apps..."
rm -rf apps/vumi-gigs/node_modules/.vite
rm -rf apps/vumi-showcase/node_modules/.vite

echo "Done! Restart your dev servers to use the updated shared package."
