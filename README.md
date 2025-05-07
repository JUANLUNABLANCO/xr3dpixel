# Xr3dpixel

proyecto en produccion en Netlify:

[Proyecto funcionando](https://xr3dpixel.netlify.app/#/inicio) v2.0.0

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Subida a netlify
### con el cli de netlify
```bash
npx run ng:build-prod # construyes la app y copias el _redirects en la carpeta dis/
echo "/*    /index.html   200" > "./dist/_redirects"  # creas esto para que netlify lo entienda dentro de dist
netlify deploy --dir=dist --prod  ## ejecutas la subida 
```

### con CI/CD con git

configurar el archivo netlify.toml
```toml	
[build]
  command = "npm run ng:build-prod && cp _redirects dist/"
  publish = "dist"

[build.environment]
  NODE_VERSION = "16.17.0"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

ejecutar la subida a github

```bash
git add .
git commit -m "subida a netlify"
git push
```

y listo





