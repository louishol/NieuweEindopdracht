var express = require('express');
var router = express.Router();

module.exports = function(mongoose){

  var Waypoint =  mongoose.model('Waypoint');

  router.route('/')
    .get(function(req, res) {

      Waypoint.find(function(err, waypoint) {
        if (err)
        {
          res.send(err);
        }
        else
        {
          res.json(waypoint);
        }
      });
    })
    .post(function(req, res) {
      var waypoint = new Waypoint(req.body);
      waypoint.save(function(err) {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.json(waypoint);
        }
      });
    });
  router.route('/:id')
    .delete(function(req, res) {
      Waypoint.findByIdAndRemove(req.params.id, function(err) {
        if (err)
        {
          res.send(err);
        }
        else
        {
          res.json({ message: 'Waypoint removed!' });
        }
      });
    })
    .get(function(req, res)
    {
       Waypoint.findById(req.params.id, function(err, waypoint) {
        if (err)
        {
          res.send(err);
        }
        else
        {
          res.json(waypoint);
        }
      });
    })
    .put(function(req, res)
    { 
        Waypoint.findById(req.params.id, function(err, waypoint) {
        if (err)
        {
          res.send(err);
        }
        else
        {
            waypoint.name = req.body.name;
            waypoint.save(function(err) {
            if (err)
            {
              res.send(err);
            }
            else
            {
              res.json(waypoint);
            }
          });
        }
      });
    });
  return router;
};
