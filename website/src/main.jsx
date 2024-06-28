import { defineCustomElements } from '@monorepo/components/loader';
import { render } from 'preact';
import { App } from './app.jsx';
import './index.css';

defineCustomElements();

render(<App />, document.getElementById('app'));
