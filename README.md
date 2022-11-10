# TecAdvisor

<img src="frontend/src/logo/logo.jpeg" width="400" ><img> 

https://tec-advisor.herokuapp.com/

# Equipo

| Nombre                    | Matricula                                                               | Github                                                       | Rol      |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------ | --------- |
| Mauricio Juarez | A01283075 | [@zJuarez](https://github.com/zJuarez) | Front
| Daniel Riojas | A00825968 | [@danielriojas](https://github.com/danielriojas) | Back
| Estefania | A01283472 | [@estefycharles](https://github.com/estefycharles) | 
| Blanca Agostini | A00517086 | @BlancaAgostini | Front y Back
| Ana | A01251091 | [@anelisa8](https://github.com/anaelisa8) | Front

# Desarrollo

El proyecto fue creado con [Create React App](https://github.com/facebook/create-react-app).

1. Clonar

2. npm start (en frontend)

3. npm start (root) (o si se quiere usar nodemon para desarrollo puedes hacer nodemon backend/index.js)

4. Abrir localhost:3000

# Deploy

1. Actualizar master

2. git push heroku master


## Como funciona

Heroku hostea la aplicacion de express que esta en backend/index.js. Esta app tiene las rutas del backend bajo la ruta /app como /app/signup y demas. Para el front end esta aplicacion de express muestra el index.html generado al correr npm run build en nuestra aplicacion de React (que vive en la carpeta frontent). Ambas carpetas tienen un node modules y se necesita hacer npm i en ambas si fue cambiado por alguien mas.


