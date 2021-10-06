import { Route, Switch } from 'react-router';

import Test from './frames/Test';
import VSPRetreatRegister from './frames/VSPRetreatRegister';

const Content = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' render={() => <VSPRetreatRegister />} />
        <Route exact path='/test' render={() => <Test />} />
      </Switch>
    </div>
  );
};

export default Content;
