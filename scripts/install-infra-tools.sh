#!/bin/bash
set -e

echo "Installing infrastructure tools..."

# Google Cloud CLI
echo "=== Installing Google Cloud CLI ==="
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list
sudo apt-get update
sudo apt-get install -y google-cloud-cli

# tfenv (Terraform version manager)
echo "=== Installing tfenv ==="
if [ -d "$HOME/.tfenv" ]; then
    echo "tfenv already installed, updating..."
    cd "$HOME/.tfenv" && git pull
else
    git clone --depth=1 https://github.com/tfutils/tfenv.git "$HOME/.tfenv"
fi

# Add to PATH if not already present
SHELL_RC="$HOME/.bashrc"
[ -n "$ZSH_VERSION" ] && SHELL_RC="$HOME/.zshrc"

if ! grep -q 'tfenv/bin' "$SHELL_RC" 2>/dev/null; then
    echo 'export PATH="$HOME/.tfenv/bin:$PATH"' >> "$SHELL_RC"
    echo "Added tfenv to PATH in $SHELL_RC"
fi

# Make tfenv available in current session
export PATH="$HOME/.tfenv/bin:$PATH"

# Install latest stable Terraform
echo "Installing latest Terraform..."
tfenv install latest
tfenv use latest

echo ""
echo "=== Installation complete ==="
echo "- Run 'gcloud init' to configure Google Cloud CLI"
echo "- Run 'source $SHELL_RC' to use tfenv in this session"
echo "- Terraform $(terraform version -json 2>/dev/null | jq -r '.terraform_version' 2>/dev/null || echo 'installed')"
