# 🕹️ Jumper

A simple 2D game built with JavaScript using the HTML5 `<canvas>` element.  
The player controls a character that must jump to avoid obstacles (cacti) and achieve the highest possible score.

---

## 📌 Features

- Simple and intuitive gameplay  
- Dynamic scoring system  
- Progressive difficulty (speed increases over time)  
- Keyboard controls  
- Minimalist graphics rendered via Canvas API  
- Quick restart system  

---

## 🗂️ Project Structure

```
project/
│
├── index.html                # Main landing page
│
├── background/
│   └── (background image)    # Background used in index.html
│
├── pages/
│   └── jumper-game.html      # Game page
│
├── style/
│   ├── index.css             # Styles for the landing page
│   └── jumper-game.css       # Styles for the game page
│ 
└── script/
    └── jumper.js             # Game logic
```
```

⚠️ Note: Make sure the paths (`../style/` and `../script/`) match your actual project structure.

---

## 🚀 How to Run the Game

1. Clone or download the project  
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge)  
3. Click **Start**  
4. Start playing 🎮  

---

## 🎮 Controls

| Key         | Action              |
|------------|----------------------|
| `Space`     | Jump                |
| `Arrow Up`  | Jump                |
| `Enter`     | Restart (after Game Over) |

---

## 🧠 Game Logic

### 👤 Player

The player is represented by a rectangle with:

- Simulated gravity (`gravity`)  
- Vertical velocity (`velocityY`)  
- Controlled jump (`jumpStrength`)  
- Ground state (`grounded`)  

Jumping is only allowed when the player is on the ground.

---

### 🌵 Obstacles

- Generated at random intervals  
- Variable height and width  
- Move from right to left  
- Removed when they leave the screen  

Each avoided obstacle increases the score.

---

### ⚡ Progressive Difficulty

- Every 5 points:
  - Obstacle speed increases (`speed += 0.4`)  
- Spawn interval becomes variable  

---

### 💥 Collisions

Based on **Axis-Aligned Bounding Box (AABB)**:

```js
a.x < b.x + b.width &&
a.x + a.width > b.x &&
a.y < b.y + b.height &&
a.y + a.height > b.y
```

If the player collides with an obstacle:
- The game ends  
- The final score is displayed  

---

### 🔁 Game Loop

Handled via:

```js
requestAnimationFrame(gameLoop)
```

Each frame:
1. Draw background  
2. Draw ground  
3. Draw player and obstacles  
4. Update physics (gravity)  
5. Check collisions  
6. Update score  

---

## 🎨 Rendering

All graphics are drawn using the Canvas API:

- Background (sun + clouds)  
- Player (rectangle + eye)  
- Obstacles (stylized cactus)  
- Ground with details  

---

## 🔄 Game States

| State       | Description |
|------------|------------|
| Playing     | Game is active |
| Game Over   | Player has lost |

---

## 🔘 UI Elements

- `Score`: current score  
- `Status`: game state  
- `Start Button`: starts/resets the game  
- `Canvas`: game area  

---

## 📦 Technologies Used

- HTML5  
- CSS (external)  
- JavaScript (Vanilla)  
- Canvas API  

