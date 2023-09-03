import { Book } from "./types/types";

function bookIsValid(b: Book) {
  if (!b.title || !b.desc || !b.price) {
    return false;
  }
  return true;
}

function enableScrollbar() {
  document.body.style.overflow = "visible";
}

function disableScrollbar() {
  document.body.style.overflow = "hidden";
}

function formatPrice(price: number) {
  return parseFloat(String(price / 100)).toFixed(2);
}

export {
  enableScrollbar,
  disableScrollbar,
  formatPrice,
  bookIsValid,
}

