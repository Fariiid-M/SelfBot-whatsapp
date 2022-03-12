<p align="center">
	<img src="https://telegra.ph/file/55e631dbf7a5891e09606.jpg" height="1020"/>
</p>
<h1 align="center">SELF BOT WANGSAF</h1>

Simple WhatsApp Bot

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Fariiid-M/SelfBot-whatsapp)

[![Grup WhatsApp](https://img.shields.io/badge/WhatsApp%20Group-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/BzDqJgRFzEECe2IbE4WtOf)


# Info :
* Edit nomer owner [`di sini`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/config.js#L5)
* Auto public? ubah [`di sini`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/handler.js#L59) dan [`di sini`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/handler.js#L63) menjadi false
* Edit teks rejected [`di sini`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/handler.js#L347)
* Edit watermark sticker [`di sini (packname)`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/config.js#L33) dan [`di sini (author)`](https://github.com/Fariiid-M/SelfBot-whatsapp/blob/main/config.js#L38)
----

# Cara Penginstalan :


## UNTUK PENGGUNA WINDOWS/VPS/RDP :

* Unduh & Instal Git [`Klik Disini`](https://git-scm.com/downloads)
* Unduh & Instal NodeJS [`Klik Disini`](https://nodejs.org/en/download)
* Unduh & Instal FFmpeg [`Klik Disini`](https://ffmpeg.org/download.html) (**Jangan Lupa Tambahkan FFmpeg ke variabel lingkungan PATH**)
* Unduh & Instal ImageMagick [`Klik Disini`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/Fariiid-M/SelfBot-whatsapp
cd SelfBot-whatsapp
npm i
npm update 
node .
```

  #### Menginstall FFmpeg Di Windows/RDP :
* Unduh salah satu versi FFMMPEG [`Di Sini`](https://ffmpeg.org/download.html).
* Ekstrak file ke `C:\` path.
* Ubah nama folder menjadi `ffmpeg`.
* Jalankan Command Prompt sebagai Administrator.
* Jalankan perintah berikut:
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Jika berhasil, maka akan muncul pesan seperti: 
`SUCCESS: specified value was saved`.

* Sekarang setelah Anda menginstal FFmpeg, verifikasi bahwa itu berfungsi dengan menjalankan perintah ini untuk melihat versinya:
```cmd
> ffmpeg -version
```
---------

## UNTUK PENGGUNA HEROKU :

### Add Buildpack
```
- heroku/nodejs
- https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
- https://github.com/DuckyTeam/heroku-buildpack-imagemagick.git
```
* Klik deploy to heroku di atas
* pergi ke settings lalu pilih `Add Buildpack`.
* isi dengan buildpack yang atas
* Pergi ke deploy lalu deploy branch
* ambil session [`di sini`](https://replit.com/@FariidOke/just-to-get-session?lite=1&outputonly=1#.replit)
---------

## Arguments `node . [--options] [<session name>]`

### `--prefix <prefixes>`

* `prefixes` dipisahkan oleh masing-masing karakter
Setel awalan

### `--server`

Digunakan untuk [heroku](https://heroku.com/) atau pindai melalui situs web

### `--db <json-server-url>`

Gunakan db eksternal alih-alih db lokal, 
Contoh Server `https://json-server.nurutomo.repl.co/`
Code: `https://repl.it/@Nurutomo/json-server`

`node . --db 'https://json-server.nurutomo.repl.co/'`

Server harus memiliki spesifikasi seperti ini

### `--big-qr`

Jika qr unicode kecil tidak mendukung

### `--img`

Aktifkan pemeriksa gambar melalui terminal

### `--autoread`

Jika diaktifkan, semua pesan masuk akan ditandai sebagai telah dibaca

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```

---------

### Thanks :

 [![adiwajshing](https://github.com/adiwajshing.png?size=100)](https://github.com/adiwajshing) | [![Nurutomo](https://github.com/Nurutomo.png?size=100)](https://github.com/Nurutomo) | [![Dika Ardnt](https://github.com/DikaArdnt.png?size=100)](https://github.com/DikaArdnt) | [![dngda](https://github.com/dngda.png?size=100)](https://github.com/dngda)
----|----|----|----
[Adiwajshing](https://github.com/adiwajshing) | [Nurutomo](https://github.com/Nurutomo) | [DikaArdnt](https://github.com/DikaArdnt) | [DanangDwiyoga](https://github.com/dngda)

---------
