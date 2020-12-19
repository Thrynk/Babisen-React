export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        socket:action.payload.socket,
      };
    case "NOT CONNECTED":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        socket:null,
      };
    case "REFRESH":
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
