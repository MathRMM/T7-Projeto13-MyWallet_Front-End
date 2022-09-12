import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './components/App'

import './components/reset.css'

const container = document.querySelector('.root')
const root = createRoot(container)

root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
)