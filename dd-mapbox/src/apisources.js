const apisources = [
  {
    id: 'aquadesk',
    baseUrl: 'http://digitaldelta.aquadesk.nl',
    searchTerm: 'locationCode',
    locationsParameters: 'pagesize=10000',
    seriesParameters: 'pagesize=100'
  },
  {
    id: 'lizard (hhnk)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hhnk.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  },
  {
    id: 'fews',
    baseUrl: 'http://tl-ng033.xtr.deltares.nl/FewsWebServices/rest/digitaledelta/v1/',
    searchTerm: 'locationCode'
  }]
export {
  apisources
}
