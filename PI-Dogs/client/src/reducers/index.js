const initialState = {
  dogsLoaded: [],
  dogDetail: [],
  created: [],
  temps: [],
  filterLoaded: []
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_DOGS") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "GET_DOG_DETAIL") {
    return {
      ...state,
      dogDetail: action.payload,
    };
  }
  if (action.type === "CREATE_DOG") {
    return {
      ...state,
      created: action.payload,
    };
  }
  if (action.type === "GET_TEMP") {
    return {
      ...state,
      temps: action.payload,
    };
  }
  if (action.type === "GET_NAME") {
    return {
      ...state,
      filterLoaded: state.dogsLoaded.filter((e) =>
        e.name.includes(action.payload)
      ),
    };
  }
  if (action.type === "ORDER_BY_AZ") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "ORDER_BY_ZA") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "ORDER_LIGHT") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "ORDER_HEAVY") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "GET_ID") {
    let found = state.dogsLoaded.filter(
      (element) =>
        element.id === Number(action.payload) || element.id === action.payload
    );
    return {
      ...state,
      dogDetails: found,
    };
  }

  if (action.type === "FILTER") {
    return {
      ...state,
      filterLoaded: action.payload,
    };
  }

  if (action.type === "DB") {
    return {
      ...state,
      dogsLoaded: state.dogsLoaded.filter((b) => b.id.length > 6).sort(),
    };
  }
  if (action.type === "API") {
    return {
      ...state,
      dogsLoaded: state.dogsLoaded.filter((b) => b.id < 500).sort(),
    };
  }
  if (action.type === "ALL") {
    return {
      ...state,
      dogsLoaded: state.dogsLoaded,
    };
  }
  return state;
}

export default rootReducer;
