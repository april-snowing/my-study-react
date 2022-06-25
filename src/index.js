
import './index.css';
import React from "react";
import { createRoot } from "react-dom/client"
import { Inbox } from "./daily-study/inbox.js";

function App() {
  return (
    <Inbox></Inbox>
  );
}

let container = document.getElementById("root");
let root = createRoot(container);
root.render(<App />);
