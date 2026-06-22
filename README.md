# Paralaje: experiencia sonora en realidad aumentada

## Archivos de audio

Coloca `semblanza.mp3` y `musica.mp3` dentro de `assets/`. El control de la
pagina inicia ambos archivos al mismo tiempo y detiene la musica cuando termina
la narracion.

## Prueba local

Desde la carpeta que contiene `paralaje`, inicia un servidor:

```bash
python3 -m http.server 80
```

En la misma computadora, abre `http://localhost/paralaje/index.html`.

## Prueba desde un celular

`localhost` siempre significa "este mismo dispositivo". Por eso, un celular
que escanee el QR no encontrara la pagina alojada en la computadora. Para una
prueba en red se debe usar la IP de la computadora, por ejemplo:

```text
http://192.168.101.4/paralaje/index.html
```

Sin embargo, los navegadores moviles normalmente exigen HTTPS para permitir la
camara. Para la exposicion, publica la carpeta en un servidor HTTPS y genera un
nuevo QR con la URL publica definitiva.
