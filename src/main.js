import "../style.css";
import * as PIXI from "pixi.js";

import img from "../Pixel Classic Cards/Black Hearts/H10.png";

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: "#000000",
  view: document.getElementById("canvas"),
  antialias: true,
  resolution: window.devicePixelRatio,
});

let card = PIXI.Sprite.from(img);

let label = new PIXI.Text("Center", { fill: "#ff0000" });
label.anchor.set(0.5);
label.x = app.screen.width / 2;
label.y = app.screen.height / 2;
app.stage.addChild(label);
card.x = 250;
card.y = 250;
card.scale.set(2, 2);
app.stage.addChild(card);

let vx = Math.random() * 12 - 6;
let vy = Math.random() * 12 - 6;

app.ticker.add((dt) => {
  card.x += vx * dt;
  card.y += vy * dt;
  card.calculateBounds();
  let card_bounds = card.getBounds();
  if (card_bounds.right > app.screen.width || card_bounds.left < 0) {
    let offset = card_bounds.right - app.screen.width;
    if (offset > 0) {
      card.x -= offset;
    }
    if (card_bounds.left < 0) {
      card.x += -card_bounds.left;
    }
    vx = -vx;
  }
  if (card_bounds.bottom > app.screen.height || card_bounds.top < 0) {
    let offset = card_bounds.bottom - app.screen.height;
    if (offset > 0) {
      card.y -= offset;
    }
    if (card_bounds.top < 0) {
      card.y += -card_bounds.top;
    }
    vy = -vy;
  }
});
