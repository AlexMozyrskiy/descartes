import { Route, Switch } from 'react-router';

import VSPRetreatRegister from './frames/VSPRetreatRegister';

const Content = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' render={() => <VSPRetreatRegister />} />
      </Switch>
    </div>
  );
};

export default Content;
