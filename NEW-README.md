#####################################################################################

## Access ssh, access idrsa_key.pub // ssh root@80.240.127.61

################## browser access clouding.io
################## user: gotth3way.apis@gmail.com
################## pass: _JUMALUBL_$27091971$.gotth3way.#12481632#

################## console access server-gtth3w  (máquina en la nube vps)
################## > ssh root@80.240.127.61 
################## > _JUMALUBL_$27091971$.gotth3way.#12481632#


    ## update system
    > sudo apt update
    > sudo apt upgrade

#####################################################################################

# Changes in project local
adding .env in .gitignore

# New access to bitbucket project with ssh key
## step 1 
go to wsl2 terminal, para que al generar la ssh key en ese terminal y sistema de ficheros se quede vinculado a esa máquina virtual, si desactivas wsl2 o lo reconfiguras perderás el usuario y posiblemente la clave _idrsa



## algunos comandos
Veamos si ssh está instalado
> ssh -v 
> ssh-keygen

/home/johnmoon71/.ssh/id_rsa
/home/johnmoon71/.ssh/id_rsa.pub

> cd ~/.ssh
> nano config
Host bitbucket.org
 IdentityFile ~/.ssh/privatekeyfile   // IMPORTANTE tiene una sangría de un espacio en blanco 

// reiniciar git bash en este punto
// copia la clave publica en el portapapeles para pasarselo a bitbucket


> cat ~/.ssh/id_rsa.pub

// En bitbucket añade una nueva klave pública y en el formulario rellena con el 'paste', dale un nombre, en este caso:

// BECAREFULLY el sitio exacto donde añadir la klave es esta:
https://bitbucket.org/account/settings/ssh-keys/   es un sitio genérico
que es a nivel generico si lo haces en un repositorio, solo tendrás acceso de lectura, a él



SSHKEY_WSL2_BITBUCKET

// comprobemos que hay conexion con esa máquina de bitbucket y establezcamos la conexión
> ssh -T git@bitbucket.org

// ahora hay que configurar el git local para que acepte la nueva forma de comunicación p2p por ssh
### paso 1
configuracion local
> git remote -v // mostrará la información del repo remoto
origin  git@bitbucket.org:nftsupreme/nftsupreme_onlyweb.git (fetch)
origin  git@bitbucket.org:nftsupreme/nftsupreme_onlyweb.git (push)


> git config --list  // mostrará la configuración de git en nuestra máquina
> git config --local user.email "gotth3way.apis@gmail.com"
> git config --local user.name "JuanLuna" // estos son los datos para el repo en bitbucket

### BECAREFULLY !!!
He creado las klaves  ssh en windows, pero cuando te pide la carpeta en la que está montado WSL2, le he dado la 
carpeta del ssh del WSL2, ¿Cómo?

abres wsl2, te diriges a ~/.ssh/ y tecleas 

> explorer.exe .

se abrirá la carpeta de windows10 que contiene el .ssh --> RED\wsl$\ .... 

y cuando hagas ssh-keygen en windows le pasas esa ruta para que las cree en su sitio

### NO FUNCIONABA
remote.origin.url=git@bitbucket.org:nftsupreme/nftsupreme_onlyweb.git

xq la ssh key de bitbucket debe estar en el profile genérico, no en el repo


# DCOKER CONFIGURATION
## PASO 1
crear el Dockerfile
## PASO 2
crear el .dockerignore

## PASO 3 
crear la imagen

> docker build -t supremapp:v1.0.0  // crea la imagen llamada supremeapp:v1.0.0 -t --> tagname

> docker image ls   // muestra todas las que hay

## PASO 4
ejecuta la imagen

> docker run --rm --name supremeapp_cont1 -p 5000:5000 supremeapp:v1.0.0   // ahora correrá en el puerto 5000 de nuestra máquina una app que está corriendo en el puerto 5000 de docker respectivamente



## configuracion de git
> git config --local core.autocrlf true
