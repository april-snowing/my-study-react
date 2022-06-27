
import './index.css';
import React from "react";
import { createRoot } from "react-dom/client"
import { Inbox } from "./daily-study/inbox.js";
import { ExceriseInbox } from "./daily-excerise/inbox"
function App() {
  return (
    //<Inbox></Inbox>
    <ExceriseInbox></ExceriseInbox>
  );
}

let container = document.getElementById("root");
let root = createRoot(container);
root.render(<App />);
