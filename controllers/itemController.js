var procedureService = require('../services/procedureService');

function listItems(req, res, next) {
  var keyword = req.query.keyword || '';

  procedureService.callProcedure('P_SAVE', {
    EMP_NM: keyword
  })
    .then(function (rows) {
      res.json({
        ok: true,
        data: rows
      });
    })
    .catch(next);
}

function createItem(req, res, next) {
  var name = req.body.name;
  var description = req.body.description || '';

  if (!name || typeof name !== 'string') {
    return res.status(400).json({
      ok: false,
      message: 'name value is required.'
    });
  }

  procedureService.callProcedure('P_SAVE_IUD', {
    EMP_NM: name.trim(),
    REMK: description.trim()
  })
    .then(function (rows) {
      res.status(201).json({
        ok: true,
        data: rows
      });
    })
    .catch(next);
}

module.exports = {
  listItems: listItems,
  createItem: createItem
};
