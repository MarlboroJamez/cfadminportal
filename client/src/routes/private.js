import {Redirect, Route} from 'react-router-dom';
import Cookies from 'universal-cookie';

const ClientRoute = ({component: Component, ...rest}) => {
    const cookies = new Cookies();

  return (
    <Route
      {...rest}
      render={(props) =>
        cookies.get("auth_state") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}
export default ClientRoute;

