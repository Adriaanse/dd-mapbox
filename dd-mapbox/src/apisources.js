const apisources = [
  {
    id: 'aquadesk',
    baseUrl: 'http://digitaldelta.aquadesk.nl',
    locationsParameters: 'pagesize=10000',
    seriesParameters: 'pagesize=100'
  },
  {
    id: 'flevoland (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://flevoland.lizard.net/dd/api/v1',
    locationsParameters: 'format=json&pagesize=20000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  },
  {
    id: 'HDSR (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hdsr.lizard.net/dd/api/v1',
    locationsParameters: 'format=json&pagesize=20000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  },
  {
    id: 'HHNK (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hhnk.lizard.net/dd/api/v1',
    locationsParameters: 'format=json&pagesize=20000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  },
  {
    id: 'WDODelta (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://wdodelta.lizard.net/dd/api/v1',
    locationsParameters: 'format=json&pagesize=20000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  },
  {
    id: 'Vitens (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://vitens.lizard.net/dd/api/v1',
    locationsParameters: 'format=json&pagesize=20000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json'
  }]
export {
  apisources
}
