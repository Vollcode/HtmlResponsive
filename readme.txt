12/04
ficheros nuevos :
emailer.js -> message.to = correo destinatario del mensaje
            los attachments estan comentados por problemas con las rutas de la imagen que quería
            enviar, si consigues que las encuentre te pago un café

mailconf.js -> user: correo desde el cual se envía
                pass: password real del correo
                from: nombre que leerá el destinatario como origen del correo, si ahi ponemos por ejemplo
                no-reply@geekshubsTravels.com, el usuario leería ese correo como el emisor del mismo

email-templates --> email.hbs -> no está en uso, pero se le puede pasar como render en /send en emailer.js

app.js -> require ruta de emailer.js
            use /emailer para cargarlo, luego en /emailer/send es cuando el correo se envía

index.js -> comentado error 404 para que no de problemas al /emailer/send no estar en index.js
            quedaría controlar el 404 handler desde app.js
