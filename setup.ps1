# Portfolio Setup Script for Windows PowerShell
# Run this script to set up the project

Write-Host "🚀 Setting up Portfolio Project..." -ForegroundColor Cyan
Write-Host ""

# Create environment files
Write-Host "📝 Creating environment files..." -ForegroundColor Yellow

if (!(Test-Path "server/.env")) {
    Copy-Item "server/env.example" "server/.env"
    Write-Host "   ✓ Created server/.env" -ForegroundColor Green
} else {
    Write-Host "   ⚠ server/.env already exists, skipping" -ForegroundColor Yellow
}

if (!(Test-Path "client/.env")) {
    Copy-Item "client/env.example" "client/.env"
    Write-Host "   ✓ Created client/.env" -ForegroundColor Green
} else {
    Write-Host "   ⚠ client/.env already exists, skipping" -ForegroundColor Yellow
}

Write-Host ""

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
Set-Location server
npm install
Set-Location ..
Write-Host "   ✓ Server dependencies installed" -ForegroundColor Green

Write-Host ""

# Install client dependencies
Write-Host "📦 Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..
Write-Host "   ✓ Client dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Edit server/.env with your MongoDB URI" -ForegroundColor Gray
Write-Host "2. Start MongoDB (or use MongoDB Atlas)" -ForegroundColor Gray
Write-Host "3. Run 'cd server && npm run dev' to start backend" -ForegroundColor Gray
Write-Host "4. Run 'cd client && npm run dev' to start frontend" -ForegroundColor Gray
Write-Host ""
Write-Host "Optional: Seed database with sample projects:" -ForegroundColor White
Write-Host "   cd server && node utils/seedData.js" -ForegroundColor Gray
Write-Host ""

