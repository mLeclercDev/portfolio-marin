from PIL import Image
import os

# Charger l'image source
source = Image.open('public/favicon-512x512.png')

# Créer les différentes tailles
sizes = [16, 32, 96, 180]
for size in sizes:
    img = source.resize((size, size), Image.Resampling.LANCZOS)
    img.save(f'public/favicon-{size}x{size}.png', 'PNG')
    print(f'Created favicon-{size}x{size}.png')

# Créer le fichier .ico avec plusieurs résolutions
icon_sizes = [(16, 16), (32, 32), (48, 48)]
source.save('public/favicon.ico', format='ICO', sizes=icon_sizes)
print('Created favicon.ico with multiple resolutions')
