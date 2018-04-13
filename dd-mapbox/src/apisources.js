const apisources = [
  {
    id: 'aquadesk',
    baseUrl: 'http://digitaldelta.aquadesk.nl',
    searchTerm: 'locationCode',
    options: 'pagesize=1000000'
  },
  {
    id: 'lizard (hhnk)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hhnk.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    options: 'format=json&pagesize=1000000'
  },
  {
    id: 'fews',
    baseUrl: 'http://tl-ng033.xtr.deltares.nl/FewsWebServices/rest/digitaledelta/v1/',
    searchTerm: 'uuid'
  }]
export {
  apisources
}
