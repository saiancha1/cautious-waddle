const AppActionTypes = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
};

export const compLoggedIn = () => ({
  type: AppActionTypes.LOGGED_IN,
});

export const compLoggedOut = () => ({
  type: AppActionTypes.LOGGED_OUT,
});

export default function reducer(state = { authenticated: false }, action) {
  switch (action.type) {
    case AppActionTypes.LOGGED_IN:
      return {
        ...state,
        authenticated: true,
      };

    case AppActionTypes.LOGGED_OUT:
      return {
        ...state,
        authenticated: false,
      };

    default:
      return state;
  }
}
