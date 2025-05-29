# Generate-RSAKeys.ps1
# Script to generate RSA key pair and export to PEM format for PowerShell 5.1
# Compatible with older PowerShell versions

# Load required assemblies
Add-Type -AssemblyName System.Security

# Create RSA provider with 2048 bit key
$rsa = New-Object System.Security.Cryptography.RSACryptoServiceProvider(2048)

# Function to format a base64 string with line breaks
function Format-Base64WithLineBreaks {
    param (
        [string]$Base64String
    )
    
    $formatted = ""
    for ($i = 0; $i -lt $Base64String.Length; $i += 64) {
        $length = [Math]::Min(64, $Base64String.Length - $i)
        $formatted += $Base64String.Substring($i, $length) + "`r`n"
    }
    
    return $formatted
}

# Function to convert RSA parameters to PEM format
function ConvertTo-PemPrivateKey {
    param (
        [System.Security.Cryptography.RSAParameters]$RSAParams
    )
    
    # Load required assembly for ASN.1 encoding
    Add-Type -AssemblyName System.Numerics
    
    # Function to convert byte array to unsigned big integer
    function Convert-BytesToBigInt {
        param ([byte[]]$Bytes)
        $Bytes = $Bytes.Clone()
        [Array]::Reverse($Bytes)
        return [System.Numerics.BigInteger]::new([byte[]]@(0) + $Bytes)
    }
    
    # Function to encode an integer in ASN.1 format
    function Encode-ASN1Integer {
        param ([byte[]]$Bytes)
        
        # Ensure positive integer by adding a leading zero if first bit is set
        if ($Bytes.Length -gt 0 -and $Bytes[0] -ge 128) {
            $Bytes = @(0) + $Bytes
        }
        
        return @(0x02) + (Encode-ASN1Length $Bytes.Length) + $Bytes
    }
    
    # Function to encode a length in ASN.1 format
    function Encode-ASN1Length {
        param ([int]$Length)
        
        if ($Length -lt 128) {
            return [byte[]]@($Length)
        }
        
        $lengthBytes = [BitConverter]::GetBytes($Length)
        [Array]::Reverse($lengthBytes)
        $startIndex = 0
        while ($startIndex -lt $lengthBytes.Length -and $lengthBytes[$startIndex] -eq 0) {
            $startIndex++
        }
        
        $significantBytes = $lengthBytes[$startIndex..($lengthBytes.Length-1)]
        return @(128 -bor $significantBytes.Length) + $significantBytes
    }
    
    # Function to encode a sequence in ASN.1 format
    function Encode-ASN1Sequence {
        param ([byte[]]$Content)
        return @(0x30) + (Encode-ASN1Length $Content.Length) + $Content
    }
    
    # Ensure parameters are available
    if ($RSAParams.D -eq $null) {
        throw "Private key parameters are not available"
    }
    
    # Convert parameters to byte arrays
    $version = @(0x02, 0x01, 0x00)
    $modulus = Encode-ASN1Integer $RSAParams.Modulus
    $publicExponent = Encode-ASN1Integer $RSAParams.Exponent
    $privateExponent = Encode-ASN1Integer $RSAParams.D
    $prime1 = Encode-ASN1Integer $RSAParams.P
    $prime2 = Encode-ASN1Integer $RSAParams.Q
    $exponent1 = Encode-ASN1Integer $RSAParams.DP
    $exponent2 = Encode-ASN1Integer $RSAParams.DQ
    $coefficient = Encode-ASN1Integer $RSAParams.InverseQ
    
    # Combine all elements
    $sequenceContent = $version + $modulus + $publicExponent + $privateExponent + 
                       $prime1 + $prime2 + $exponent1 + $exponent2 + $coefficient
    
    # Create the final ASN.1 sequence
    $rsaPrivateKey = Encode-ASN1Sequence $sequenceContent
    
    # Base64 encode
    $base64 = [Convert]::ToBase64String($rsaPrivateKey)
    $formattedBase64 = Format-Base64WithLineBreaks $base64
    
    # Add PEM headers and footers
    return "-----BEGIN RSA PRIVATE KEY-----`r`n" + $formattedBase64 + "-----END RSA PRIVATE KEY-----`r`n"
}

function ConvertTo-PemPublicKey {
    param (
        [System.Security.Cryptography.RSAParameters]$RSAParams
    )
    
    # Function to encode an integer in ASN.1 format
    function Encode-ASN1Integer {
        param ([byte[]]$Bytes)
        
        # Ensure positive integer by adding a leading zero if first bit is set
        if ($Bytes.Length -gt 0 -and $Bytes[0] -ge 128) {
            $Bytes = @(0) + $Bytes
        }
        
        return @(0x02) + (Encode-ASN1Length $Bytes.Length) + $Bytes
    }
    
    # Function to encode a length in ASN.1 format
    function Encode-ASN1Length {
        param ([int]$Length)
        
        if ($Length -lt 128) {
            return [byte[]]@($Length)
        }
        
        $lengthBytes = [BitConverter]::GetBytes($Length)
        [Array]::Reverse($lengthBytes)
        $startIndex = 0
        while ($startIndex -lt $lengthBytes.Length -and $lengthBytes[$startIndex] -eq 0) {
            $startIndex++
        }
        
        $significantBytes = $lengthBytes[$startIndex..($lengthBytes.Length-1)]
        return @(128 -bor $significantBytes.Length) + $significantBytes
    }
    
    # Function to encode a sequence in ASN.1 format
    function Encode-ASN1Sequence {
        param ([byte[]]$Content)
        return @(0x30) + (Encode-ASN1Length $Content.Length) + $Content
    }
    
    # Function to encode a bit string in ASN.1 format
    function Encode-ASN1BitString {
        param ([byte[]]$Content)
        return @(0x03) + (Encode-ASN1Length ($Content.Length + 1)) + @(0x00) + $Content
    }
    
    # RSA OID
    $rsaOID = @(0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01)
    $null = @(0x05, 0x00)
    
    # Create RSA public key sequence
    $modulus = Encode-ASN1Integer $RSAParams.Modulus
    $publicExponent = Encode-ASN1Integer $RSAParams.Exponent
    $rsaPublicKey = Encode-ASN1Sequence ($modulus + $publicExponent)
    
    # Create AlgorithmIdentifier sequence
    $algorithmID = Encode-ASN1Sequence ($rsaOID + $null)
    
    # Create SubjectPublicKeyInfo sequence
    $publicKeyInfo = Encode-ASN1Sequence ($algorithmID + (Encode-ASN1BitString $rsaPublicKey))
    
    # Base64 encode
    $base64 = [Convert]::ToBase64String($publicKeyInfo)
    $formattedBase64 = Format-Base64WithLineBreaks $base64
    
    # Add PEM headers and footers
    return "-----BEGIN PUBLIC KEY-----`r`n" + $formattedBase64 + "-----END PUBLIC KEY-----`r`n"
}

# Simpler alternative for public key generation
function Export-PublicKey {
    param (
        [System.Security.Cryptography.RSACryptoServiceProvider]$RSA
    )
    
    # Get the public key XML
    $publicKeyXML = $RSA.ToXmlString($false)
    
    # Create an empty RSA provider to import just the public key
    $publicOnly = New-Object System.Security.Cryptography.RSACryptoServiceProvider
    $publicOnly.FromXmlString($publicKeyXML)
    
    # Get the parameters which only include public parts
    $publicParams = $publicOnly.ExportParameters($false)
    
    # Return the PEM formatted public key
    return ConvertTo-PemPublicKey -RSAParams $publicParams
}

try {
    # Get the RSA parameters (including private key)
    $rsaParams = $rsa.ExportParameters($true)
    
    # Generate the private key in PEM format
    $privatePem = ConvertTo-PemPrivateKey -RSAParams $rsaParams
    
    # Write private key to file
    $privatePem | Out-File -FilePath "private_key.pem" -Encoding ASCII
    
    Write-Host "Private key exported to private_key.pem"
    
    # Generate the public key in PEM format
    $publicPem = ConvertTo-PemPublicKey -RSAParams $rsaParams
    
    # Write public key to file
    $publicPem | Out-File -FilePath "public_key.pem" -Encoding ASCII
    
    Write-Host "Public key exported to public_key.pem"
    
    Write-Host "RSA key pair generation complete!"
    Write-Host "Private key: $((Get-Item -Path "private_key.pem").FullName)"
    Write-Host "Public key: $((Get-Item -Path "public_key.pem").FullName)"
} catch {
    Write-Error "Error generating RSA keys: $_"
    exit 1
} finally {
    # Clean up resources
    if ($rsa -ne $null) {
        $rsa.Dispose()
    }
}
