import { Provider } from 'react-redux'
import store from './store'
import './assets/app.css'
import Structure from './Structure'
import Menu from './Menu'

function App() {
  return (
    <Provider store={store}>
      <div id="mainContainer" className="flex">
      <Structure />
      <Menu />
      </div>
    </Provider>
  );
}

export default App;
