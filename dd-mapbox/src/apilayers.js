const apilayers = [
  {
    'id': 'aquadesk',
    'type': 'circle',
    'minzoom': 5,
    'paint': {
      'circle-radius': 8
    }
  },
  {
    // id is a regexp, so this will be default style if none of the bove match
    'id': '.*',
    'type': 'circle',
    'minzoom': 5,
    'paint': {
      'circle-radius': 8
    }
  }
]

export {
  apilayers
}
