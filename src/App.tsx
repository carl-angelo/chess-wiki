import './App.scss'
import AppRoute from './AppRoute';
import AppProviders from './providers/AppProviders';

const App = () => {

  return (
    <AppProviders>
      <AppRoute />
    </AppProviders>
  )
}

export default App
