"""
Recorta un escudo cuadrado en círculo, con las esquinas transparentes.

Los escudos que llegan como foto (JPEG con fondo opaco) se ven como un
cuadrado dentro del marco redondo de la web. Esto los deja como los que ya
venían con fondo transparente.

    python3 scripts/escudo-circular.py public/equipos/losjinetos.jpeg public/equipos/los-jinetos.png

Usa `sips` (viene con macOS) para pasar a PNG y escalar, y aquí solo se aplica
la máscara: así no hace falta instalar nada.
"""

import math
import pathlib
import struct
import subprocess
import sys
import tempfile
import zlib

LADO = 512


def leer_png(ruta: pathlib.Path):
    datos = ruta.read_bytes()
    assert datos[:8] == b"\x89PNG\r\n\x1a\n", "no es un PNG"
    i, idat, info = 8, b"", None
    while i < len(datos):
        largo, tipo = struct.unpack(">I4s", datos[i : i + 8])
        cuerpo = datos[i + 8 : i + 8 + largo]
        if tipo == b"IHDR":
            ancho, alto, bits, color, _, _, entrelazado = struct.unpack(">IIBBBBB", cuerpo)
            assert bits == 8 and entrelazado == 0 and color in (2, 6), "PNG no soportado"
            info = (ancho, alto, 3 if color == 2 else 4)
        elif tipo == b"IDAT":
            idat += cuerpo
        i += 12 + largo

    ancho, alto, canales = info
    crudo = zlib.decompress(idat)
    filas, previa, pos = [], bytearray(ancho * canales), 0
    for _ in range(alto):
        filtro = crudo[pos]
        pos += 1
        fila = bytearray(crudo[pos : pos + ancho * canales])
        pos += ancho * canales
        for x in range(len(fila)):
            a = fila[x - canales] if x >= canales else 0
            b = previa[x]
            c = previa[x - canales] if x >= canales else 0
            if filtro == 1:
                fila[x] = (fila[x] + a) & 255
            elif filtro == 2:
                fila[x] = (fila[x] + b) & 255
            elif filtro == 3:
                fila[x] = (fila[x] + (a + b) // 2) & 255
            elif filtro == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                fila[x] = (fila[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        filas.append(fila)
        previa = fila
    return ancho, alto, canales, filas


def escribir_png(ruta: pathlib.Path, ancho: int, alto: int, filas_rgba):
    crudo = b"".join(b"\x00" + bytes(fila) for fila in filas_rgba)

    def chunk(tipo: bytes, cuerpo: bytes) -> bytes:
        return (
            struct.pack(">I", len(cuerpo))
            + tipo
            + cuerpo
            + struct.pack(">I", zlib.crc32(tipo + cuerpo) & 0xFFFFFFFF)
        )

    ruta.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", ancho, alto, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(crudo, 9))
        + chunk(b"IEND", b"")
    )


def recortar(entrada: pathlib.Path, salida: pathlib.Path, lado: int = LADO) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        cuadrado = pathlib.Path(tmp) / "escudo.png"
        ancho, alto = (
            int(x)
            for x in subprocess.run(
                ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(entrada)],
                capture_output=True, text=True, check=True,
            ).stdout.split()[-3::2]
        )
        menor = min(ancho, alto)
        subprocess.run(
            ["sips", "-s", "format", "png", "-c", str(menor), str(menor), str(entrada), "--out", str(cuadrado)],
            check=True, capture_output=True,
        )
        subprocess.run(["sips", "-Z", str(lado), str(cuadrado)], check=True, capture_output=True)

        ancho, alto, canales, filas = leer_png(cuadrado)

    cx, cy, radio = (ancho - 1) / 2, (alto - 1) / 2, min(ancho, alto) / 2 - 1
    nuevas = []
    for y in range(alto):
        origen, destino = filas[y], bytearray()
        for x in range(ancho):
            p = x * canales
            # Borde suavizado: el alfa baja de 255 a 0 en el último píxel del círculo
            distancia = math.hypot(x - cx, y - cy)
            if distancia <= radio - 0.5:
                alfa = 255
            elif distancia >= radio + 0.5:
                alfa = 0
            else:
                alfa = int(round((radio + 0.5 - distancia) * 255))
            destino += bytes((origen[p], origen[p + 1], origen[p + 2], alfa))
        nuevas.append(destino)

    escribir_png(salida, ancho, alto, nuevas)
    print(f"{salida} · {ancho}x{alto} recortado en círculo")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("uso: escudo-circular.py <entrada> <salida.png>")
    recortar(pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]))
