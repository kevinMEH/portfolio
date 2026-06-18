#!/usr/bin/env bash
set -euo pipefail

FONTS_DIR="static/fonts"
FILES=(
	"$FONTS_DIR/Sentient-Variable.woff2"
	"$FONTS_DIR/Sentient-VariableItalic.woff2"
)

needs_download=0
for file in "${FILES[@]}"; do
	if [[ ! -f "$file" ]]; then
		needs_download=1
		break
	fi
done

if [[ "$needs_download" -eq 0 ]]; then
	echo "Sentient fonts already present; skipping download."
	exit 0
fi

URL="https://api.fontshare.com/v2/fonts/download/sentient"
ARCHIVE=".sentient-fonts.zip"
SRC_DIR="Sentient_Complete/Fonts/WEB/fonts"

echo "Downloading Sentient fonts from Fontshare..."
curl -fsSL "$URL" -o "$ARCHIVE"

echo "Extracting..."
unzip -o "$ARCHIVE" \
		"$SRC_DIR/Sentient-Variable.woff2" \
		"$SRC_DIR/Sentient-VariableItalic.woff2" \
		-d "$ARCHIVE.extracted" > /dev/null

mkdir -p "$FONTS_DIR"
mv "$ARCHIVE.extracted/$SRC_DIR/Sentient-Variable.woff2" "${FILES[0]}"
mv "$ARCHIVE.extracted/$SRC_DIR/Sentient-VariableItalic.woff2" "${FILES[1]}"

rm -rf "$ARCHIVE.extracted" "$ARCHIVE"

echo "Sentient fonts installed to $FONTS_DIR."
