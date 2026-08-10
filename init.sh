#!/bin/bash

# ==============================================================================
# PROJECT DIRECTORY INITIALIZATION SCRIPT
# Purpose: Build core directory skeleton (src, tests, docs/original, etc.).
# Safety: Uses `mkdir -p` to ensure existing directories and data are preserved.
# ==============================================================================

echo "⏳ Setting up workspace directory structure..."

# Create directory structure and verify output
if mkdir -p src tests docs/draft docs/original/business docs/original/architecture docs/original/budget docs/original/testing docs/original/release docs/original/user-guide docs/trans/vi docs/trans/en docs/trans/ja; then
    echo "✅ Success! Enterprise directory structure is ready."
else
    ERROR_FILE="INIT_ERROR_GUIDE.md"
    
    echo "❌ Execution failed! Generating troubleshooting guide at $ERROR_FILE..."
    
    cat << 'EOF' > "$ERROR_FILE"
# ⚠️ DIRECTORY CREATION TROUBLESHOOTING GUIDE

The initialization script (`init.sh`) encountered an error. Your source code remains safe. Below are common causes and solutions:

### Cause 1: Path Conflict
- **Symptom:** A file named `src` or `docs` already exists in the target location.
- **Fix:** Rename or remove conflicting files before re-running the script.

### Cause 2: Permission Denied
- **Symptom:** Current user lacks write permissions in this directory.
- **Fix:** Re-run with elevated privileges: `sudo sh init.sh` or update directory permissions: `sudo chmod -R 775 .`

*Please delete this troubleshooting file once the issue is resolved.*
EOF

    echo "⚠️ Action required: Open $ERROR_FILE for details."
    exit 1
fi
