# Inquest

> This is a tool for a Church of Jesuschrist of Latter Days Saints game called Inquest, where participants must search for the scripture, in the canonical books, according to the reference shown.

## Information

> This is **only a tool** to play Inquest

## Settings

To configure the scripts, the <code>referencias.json</code> file must be updated.

```
├─ Pesquisa
|   ├─ referencias.json

```

This contains only the **escritura (scripture)** and **frase (phrase)** properties. Depending on the number of writings, the following elements must be added:

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

All the logic of the game is in the file <code>pesquisa.js</code>

```
├─ Pesquisa
│   ├─ js
│   │   └─ pesquisa.js
```

## Instructions

You must first define the game configuration:

- Name of teams or players **_(2 players minimum)_**.
- Number of rounds **_(3 rounds minimum)_**.
- Inquest time **_(10 seconds minimum)_**.

Once the configuration is defined, we start the game and we will start each round

### How to play?

- **Each player must have their book on hand** (See _Settings_).
- At the beginning of the round, **a reference** of a mastery passages will be given.
- **All players** should keep their hands away from their own book.
- When the countdown begins, players must **find the writing** in their book.
- Al encontrar la esrcitura, deberan **apuntar con su dedo**.
- When they find the scripture, they you should **point with their finger** the scripture.
- **Another person (_judge_) must verify** that they have found the correct scripture:
  - **If it is not the correct scripture**, they can continue searching until **before the counter reaches 0**.
  - **If it is the correct scripture**, the player **leaves his hand raised** until the count is finished.
- **At the end of the counter**, points are assigned to each player who found the correct scripture.
- And the **next round** begins.
- **At the end** of all rounds:
  - **The player with the most points wins**.
  - If there are players with the **same amount of points**, the winner is defined with a tiebreaker round. ***(There will continue to be a tiebreaker round until there is a point difference)***
- **Game ends** and **restarts**
