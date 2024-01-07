import "./style.css";
import * as PIXI from "pixi.js";

const cards_urls = import.meta.glob(
  "./public/Pixel Classic Cards/Black Hearts/*"
);

const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: "#000000",
  view: document.getElementById("canvas"),
  antialias: true,
});

let cards_arr = [];
let cards = [];
let speeds = [];
for (let i in cards_urls) {
  let s = PIXI.Sprite.from(i);
  s.anchor.set(0.5);
  s.x = Math.random() * (app.screen.width - 500) + 250;
  s.y = Math.random() * (app.screen.height - 500) + 250;
  s.scale.set(2, 2);
  cards.push(s);
  cards_arr.push(i);
  app.stage.addChild(s);

  speeds.push([
    Math.random() * 12 - 6,
    Math.random() * 12 - 6,
    Math.random() / 4,
  ]);
}

// let label = new PIXI.Text("Hello World", { fill: "#ffffff" });

let vx = Math.random() * 6;
let vy = Math.random() * 6;
app.ticker.add((dt) => {
  for (let card in cards) {
    cards[card].x += speeds[card][0] * dt;
    cards[card].y += speeds[card][1] * dt;
    cards[card].rotation += speeds[card][2] * dt;
    cards[card].calculateBounds();
    let card_bounds = cards[card].getBounds();
    if (card_bounds.right > app.screen.width || card_bounds.left < 0) {
      let offset = card_bounds.right - app.screen.width;
      if (offset > 0) {
        cards[card].x -= offset;
      }
      if (card_bounds.left < 0) {
        cards[card].x += -card_bounds.left;
      }
      speeds[card][0] = -speeds[card][0];
    }
    if (card_bounds.bottom > app.screen.height || card_bounds.top < 0) {
      let offset = card_bounds.bottom - app.screen.height;
      if (offset > 0) {
        cards[card].y -= offset;
      }
      if (card_bounds.top < 0) {
        cards[card].y += -card_bounds.top;
      }
      speeds[card][1] = -speeds[card][1];
    }
  }
});
