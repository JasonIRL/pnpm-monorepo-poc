import { add, subtract } from '@monorepo/utils';
import { useState } from 'preact/hooks';
import './app.css';
import viteLogo from '/vite.svg';
import preactLogo from './assets/preact.svg';

export function App() {
  const [count, setCount] = useState(0);
  console.log(add(1, 2), subtract(2, 1));

  const test1 = () => {
    alert('test 1 clicked');
  };

  const test2 = () => {
    alert('test 2 clicked');
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noreferrer">
          <img src={preactLogo} class="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <mono-button text="test 1" onClick={() => test1()} />
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <mono-button text="test 2" type="Secondary" onClick={() => test2()} />
    </>
  );
}
