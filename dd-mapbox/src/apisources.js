const apisources = [
  {
    id: 'aquadesk',
    baseUrl: 'http://digitaldelta.aquadesk.nl',
    searchTerm: 'locationCode',
    locationsParameters: 'pagesize=10000',
    seriesParameters: 'pagesize=100',
    year: 2009
  },
  {
    id: 'flevoland (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://flevoland.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json',
    year: 2018
  },
  {
    id: 'HDSR (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hdsr.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json',
    year: 2018
  },
  {
    id: 'HHNK (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://hhnk.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json',
    year: 2018
  },
  {
    id: 'WDODelta (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://wdodelta.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json',
    year: 2018
  },
  {
    id: 'Vitens (lizard)',
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://vitens.lizard.net/dd/api/v1',
    searchTerm: 'locationCode',
    locationsParameters: 'format=json&pagesize=1000',
    seriesParameters: 'format=json',
    dataParameters: 'format=json',
    year: 2018
  }]
export {
  apisources
}
