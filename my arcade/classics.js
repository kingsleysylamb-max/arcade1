'use strict';
const menu = document.querySelector('#menu');
const player = document.querySelector('#player');
const mount = document.querySelector('#game-mount');
const title = document.querySelector('#playing-title');
const tiles = [...document.querySelectorAll('[data-game]')];
let lastTile = null;

function showMenu() {
  // Unmounting stops the previous game's animation and input handlers.
  mount.replaceChildren();
  player.hidden = true;
  menu.hidden = false;
  document.title = 'The Classics';
  if (lastTile) lastTile.focus();
}

function openGame(tile) {
  lastTile = tile;
  const frame = document.createElement('iframe');
  frame.title = tile.dataset.title;
  frame.src = tile.dataset.game;
  frame.addEventListener('load', () => {
    try {
      const doc = frame.contentDocument;
      const header = doc.querySelector('header');
      if (header) header.hidden = true;
      const main = doc.querySelector('main');
      if (main) main.style.paddingTop = '20px';
    } catch (_) { /* Local file browsers may restrict access to frame content. */ }
  });
  mount.replaceChildren(frame);
  title.textContent = tile.dataset.title;
  document.title = `${tile.dataset.title} | The Classics`;
  menu.hidden = true;
  player.hidden = false;
  window.scrollTo(0, 0);
  frame.focus();
}

function route() {
  const selected = tiles.find(tile => `#${tile.dataset.game}` === location.hash);
  if (selected) openGame(selected);
  else showMenu();
}

tiles.forEach(tile => tile.addEventListener('click', () => {
  location.hash = tile.dataset.game;
}));
document.querySelector('#back').addEventListener('click', () => {
  location.hash = '';
});
window.addEventListener('hashchange', route);
route();
