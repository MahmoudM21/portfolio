#!/bin/bash

# Portfolio Setup Script for Unix/Mac
# Run: chmod +x setup.sh && ./setup.sh

echo "🚀 Setting up Portfolio Project..."
echo ""

# Create environment files
echo "📝 Creating environment files..."

if [ ! -f "server/.env" ]; then
    cp server/env.example server/.env
    echo "   ✓ Created server/.env"
else
    echo "   ⚠ server/.env already exists, skipping"
fi

if [ ! -f "client/.env" ]; then
    cp client/env.example client/.env
    echo "   ✓ Created client/.env"
else
    echo "   ⚠ client/.env already exists, skipping"
fi

echo ""

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..
echo "   ✓ Server dependencies installed"

echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..
echo "   ✓ Client dependencies installed"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ Setup complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your MongoDB URI"
echo "2. Start MongoDB (or use MongoDB Atlas)"
echo "3. Run 'cd server && npm run dev' to start backend"
echo "4. Run 'cd client && npm run dev' to start frontend"
echo ""
echo "Optional: Seed database with sample projects:"
echo "   cd server && node utils/seedData.js"
echo ""

