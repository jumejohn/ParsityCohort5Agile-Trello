const dummyData = 
  {
    lists: 
    [
    {_id: 'listId1', cards: ['cardId1', 'cardId2', 'cardId3']},
    {_id: 'listId2', cards: ['cardId4']},
    {_id: 'listId3', cards: ['cardId5', 'cardId6']},
    {_id: 'listId4', cards: ['cardId7', 'cardId8']}
  ]
  }

  // data = {lists: [{_id: listId, cards:[cardId] }]}


const cardListSeparator = (data) => {
  let lists = {}
  const dataLists = data.lists
  for (let i = 0; i < dataLists.length; i++) {
    for(let j = 0; j < dataLists[i].cards.length; j++){
    }
  }
  
}



module.exports = cardListSeparator


