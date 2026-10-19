Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$docXmlPath = "scripts/document.xml"
if (-not (Test-Path $docXmlPath)) {
    throw "scripts/document.xml not found! Run generate-social-docs.mjs first."
}
$docXml = [System.IO.File]::ReadAllText($docXmlPath, [System.Text.Encoding]::UTF8)

$destinations = @(
    "docs/Mew-Maple-Sosyal-Medya-Promptlar-Ve-Metinler.docx",
    "C:\Users\merta\OneDrive\Mew-Maple-Sosyal-Medya-Promptlar-Ve-Metinler.docx",
    "C:\Users\merta\OneDrive\Desktop\Mew-Maple-Sosyal-Medya-Promptlar-Ve-Metinler.docx"
)

function Create-Docx($outputPath, $xmlContent) {
    if (Test-Path $outputPath) { Remove-Item $outputPath -Force }
    $dir = Split-Path $outputPath -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    $zip = [System.IO.Compression.ZipFile]::Open($outputPath, [System.IO.Compression.ZipArchiveMode]::Create)

    function Add-Entry($zipArchive, $entryPath, $text) {
        $entry = $zipArchive.CreateEntry($entryPath, [System.IO.Compression.CompressionLevel]::Optimal)
        $stream = $entry.Open()
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
        $stream.Write($bytes, 0, $bytes.Length)
        $stream.Flush()
        $stream.Close()
    }

    $contentTypes = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + "`n" +
'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + "`n" +
'  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' + "`n" +
'  <Default Extension="xml" ContentType="application/xml"/>' + "`n" +
'  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' + "`n" +
'</Types>'

    $rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + "`n" +
'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' + "`n" +
'  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' + "`n" +
'</Relationships>'

    Add-Entry $zip "[Content_Types].xml" $contentTypes
    Add-Entry $zip "_rels/.rels" $rels
    Add-Entry $zip "word/document.xml" $xmlContent

    $zip.Dispose()
    Write-Output "Created: $outputPath ($((Get-Item $outputPath).Length) bytes)"
}

foreach ($dest in $destinations) {
    Create-Docx $dest $docXml
}
