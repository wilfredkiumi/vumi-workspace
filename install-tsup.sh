#!/bin/bash

# Navigate to the workspace root
cd "$(dirname "$0")"

# Install tsup in the shared package
echo "Installing tsup package for building the shared package..."
npm install --save-dev tsup --workspace=@vumi/shared

# Go back to the workspace root
cd ../../

echo "Done! Now you can rebuild the shared package."
