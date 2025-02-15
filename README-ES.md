[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/Dishel/Pesquisa/blob/main/README.md)

# Pesquisa

> Este es una herramienta para un juego SUD llamado Pesquisa, en donde los participantes deben buscar la escritura, en los libros canonicos, de acuerdo a la referencia que se muestra.

## Información

> Esta es únicamente una herramienta para jugar Pesquisas

## Configuración

Para configurar las escrituras se debe actualizar el archivo <code>referencias.json</code>.

```
├─ Pesquisa
|   ├─ referencias.json

```

Éste contiene unicamente las propiedades de **escritura** y **frase**. Dependiendo de la cantidad de escrituras que sean se deberán agregar los elementos:

```
[
  {
    "escritura": "1 Nefi 3:7",
    "frase": "“Iré y haré lo que el Señor ha mandado”."
  },
  {
    "escritura": "2 Nefi 2:25",
    "frase": "“Adán cayó para que los hombres existiesen; y existen los hombres para que tengan gozo”."
  },
  {...},
]
```

Toda la lígica del juego está en el archivo <code>pesquisa.js</code>

```
├─ Pesquisa
│   ├─ js
│   │   └─ pesquisa.js
```

## Instrucciones

Hay que definir primeramente la configuración del juego:

- Nombre de equipos o jugadores **_(mínimo 2 jugadores)_**.
- Cantidad de rondas **_(mínimo 3 rondas)_**.
- Tempo para pesquisa **_(mínimo 10 segundos)_**.

Una vez definida la configuración, iniciamos el juego y empezaremos cada ronda

### ¿Como jugar?

- **Cada jugador debe tener a la mano su libro** (Consulte la _Configuración_).
- Al comenzar la ronda, **se dará una referencia** de una escritura de dominio.
- **Todos los jugadores** deberan alejar sus manos de su propio libro.
- Al empezar el conteo regresivo, los jugadores deberán **encontrar la escritura** en su libro.
- Al encontrar la esrcitura, deberan **apuntar con su dedo**.
- **Otra persona deberá verificar** que haya encontrado la escritura correcta:
  - **Si no es la correcta**, puede seguir buscando hasta **antes de que el contador llegue a 0**.
  - **Si es la escritura correcta**, el jugador **deja su mano levantada** hasta que termine el conteo.
- **Al finalizar el contador**, se asignan los puntos a cada jugador que encontró la escritura correcta.
- Y se empieza la **siguiente ronda**.
- **Al finalizar** todas las rondas:
  - **Gana el jugador que con más puntos**.
  - Si existen jugadores con la **misma cantidad de puntos**, se define el ganador con una ronda de empate. ***(Seguira habiendo ronda de desempate hasta tener diferencia de puntos)***
- Se **termina el juego** y **se reinicia**
