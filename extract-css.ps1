# CSS Extraction Script for Portfolio
# This script extracts inline CSS from index.html into a separate styles.css file

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Portfolio CSS Extraction Tool" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if index.html exists
if (!(Test-Path "index.html")) {
    Write-Host "❌ Error: index.html not found!" -ForegroundColor Red
    Write-Host "Please run this script from the portfolio directory." -ForegroundColor Yellow
    exit 1
}

Write-Host "📄 Reading index.html..." -ForegroundColor Yellow

# Read the HTML file
$content = Get-Content "index.html" -Raw -Encoding UTF8

# Extract CSS (between <style> and </style>)
$pattern = '(?s)<style>(.*?)</style>'
if ($content -match $pattern) {
    $css = $matches[1].Trim()
    
    Write-Host "✅ CSS extracted successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Save CSS to separate file
    $css | Out-File "styles.css" -Encoding UTF8 -NoNewline
    
    $cssSize = (Get-Item "styles.css").Length
    $cssSizeKB = [math]::Round($cssSize / 1KB, 2)
    Write-Host "📦 CSS saved to: styles.css ($cssSizeKB KB)" -ForegroundColor Green
    
    # Replace inline style with link tag
    $linkTag = '<link rel="stylesheet" href="styles.css">'
    $newContent = $content -replace $pattern, $linkTag
    
    # Save updated HTML
    $newContent | Out-File "index.html.new" -Encoding UTF8 -NoNewline
    
    $originalSize = (Get-Item "index.html").Length
    $newSize = (Get-Item "index.html.new").Length
    $originalSizeKB = [math]::Round($originalSize / 1KB, 2)
    $newSizeKB = [math]::Round($newSize / 1KB, 2)
    $reduction = [math]::Round((($originalSize - $newSize) / $originalSize) * 100, 1)
    
    Write-Host "📄 Updated HTML saved to: index.html.new ($newSizeKB KB)" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Results:" -ForegroundColor Cyan
    Write-Host "  Original HTML: $originalSizeKB KB" -ForegroundColor White
    Write-Host "  New HTML:      $newSizeKB KB" -ForegroundColor White
    Write-Host "  CSS File:      $cssSizeKB KB" -ForegroundColor White
    Write-Host "  Reduction:     $reduction%" -ForegroundColor Green
    Write-Host ""
    
    # Ask user to confirm replacement
    Write-Host "⚠️  Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Review index.html.new to ensure everything looks correct" -ForegroundColor White
    Write-Host "2. Test the website with the new files" -ForegroundColor White
    Write-Host "3. If everything works, run the following commands:" -ForegroundColor White
    Write-Host ""
    Write-Host "   Remove-Item index.html" -ForegroundColor Cyan
    Write-Host "   Rename-Item index.html.new index.html" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "✨ CSS extraction complete!" -ForegroundColor Green
    
} else {
    Write-Host "❌ Error: Could not find <style> tags in index.html" -ForegroundColor Red
    Write-Host "The file may already have external CSS or the format is different." -ForegroundColor Yellow
}

Write-Host ""
