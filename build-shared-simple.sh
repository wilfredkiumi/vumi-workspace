#!/bin/bash

# Navigate to the workspace root
cd "$(dirname "$0")"

# Build the shared package using the simple script
echo "Building shared package without external dependencies..."
cd packages/shared

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in your PATH"
    exit 1
fi

# Run the build script
node build-simple.js

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed"
    exit 1
fi

# Go back to the workspace root
cd ../../

# Optional: Clear Vite cache in apps
echo "Clearing Vite cache in apps..."
rm -rf apps/vumi-gigs/node_modules/.vite 2>/dev/null || true
rm -rf apps/vumi-showcase/node_modules/.vite 2>/dev/null || true

echo "Done! Restart your dev servers to use the updated shared package."
