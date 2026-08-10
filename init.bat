@echo off
:: Set UTF-8 encoding
chcp 65001 >nul

:: ==============================================================================
:: WINDOWS INITIALIZATION SCRIPT (BATCH FILE)
:: Purpose: Build core directory skeleton for Windows environments.
:: Safety: Checks directory existence (`if not exist`) prior to creation.
:: ==============================================================================

echo ⏳ Setting up workspace directory structure (Windows)...

:: Create directories safely
if not exist "src" mkdir "src"
if not exist "tests" mkdir "tests"
if not exist "docs\draft" mkdir "docs\draft"
if not exist "docs\original\business" mkdir "docs\original\business"
if not exist "docs\original\architecture" mkdir "docs\original\architecture"
if not exist "docs\original\budget" mkdir "docs\original\budget"
if not exist "docs\original\testing" mkdir "docs\original\testing"
if not exist "docs\original\release" mkdir "docs\original\release"
if not exist "docs\original\user-guide" mkdir "docs\original\user-guide"
if not exist "docs\trans\vi" mkdir "docs\trans\vi"
if not exist "docs\trans\en" mkdir "docs\trans\en"
if not exist "docs\trans\ja" mkdir "docs\trans\ja"

echo ✅ Success! Enterprise directory structure is ready.
echo Press any key to exit...
pause >nul
