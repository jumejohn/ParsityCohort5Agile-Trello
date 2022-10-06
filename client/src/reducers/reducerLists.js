
import _ from "lodash"

const initialState = {
  order: [],
  normalized: {}
}
const reducerLists = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOARD":
      console.log("current Board:", action.payload)
      const order = action.payload.lists.map(list => list._id)

      const normalized = {}
      for(let i = 0; i < action.payload.lists.length; i++ ){
        normalized[action.payload.lists[i]._id] = []
        for(let j = 0; j < action.payload.lists[i].cards?.length; j++){
          normalized[action.payload.lists[i]._id].push(action.payload.lists[i].cards[j]._id) 
        }
        
      }
      return {
        order,
        normalized
      };
    case "CREATE_CARD":
      const listId = action.payload._id
      const newNormalized = {...state.normalized}
      newNormalized[listId] = [...newNormalized[listId], listId]
      return {...state, normalized: newNormalized}
    case "DELETE_LIST":
      const updateDeletedOrder = _.without(state.order, action.payload)
      const updateDeletedNormalized = _.omit(state.normalized, action.payload)
      return {
        order: updateDeletedOrder,
        normalized: updateDeletedNormalized
      }
    // dispatched by editListTitle, deleteCard, quickEditCard action creators
    case "UPDATE_LIST":
      const updatedListId = action.payload._id
      const updatedNormalized = {...state.normalized}
      const updatedCardIds = action.payload.cards.map(card => card._id)
      updatedNormalized[updatedListId] = updatedCardIds
      return {...state, normalized: updatedNormalized}
    case "CREATE_LIST":
      const newListOrder = [...state.order, action.payload._id]
      const newNormalizedData = {...state.normalized, [action.payload._id]: []}
      return {
        order: newListOrder,
        normalized: newNormalizedData
      }
    case "RESET_LIST":
      return {
        ...state,
        normalized: action.payload
      }
    case "MOVE_CARD":
      return {
        ...state,
        normalized: action.payload
      }
    case "MOVE_LIST":
      return {
        ...state,
        order: action.payload.newOrder
      }
    default:
      return state;
  }
}

export default reducerLists;