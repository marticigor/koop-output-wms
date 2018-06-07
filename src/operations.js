const render = require('./render')
const { isPng } = require('./wms-utils')

function getMap(queryParams, geojson, res) {
  render(queryParams, geojson, function (err, tile) {
    if (err || !tile || !isPng(tile)) {
      res.status(err.code || 500).json(err || new Error("Rendering didn't produce a proper tile"))
    } else {
      res.status(200)
        .set('Content-Length', tile.length)
        .set('Content-Type', 'image/png')
        .send(tile)
    }
  })
}


function getCapabilities() {}

module.exports = { getMap }