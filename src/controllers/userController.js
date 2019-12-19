const controller = {};


controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM user', (err, rows) => {
      if (err) {
        next(err);
      }
      console.log(rows);
      res.render('user', {
        data: rows
      });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;

  req.getConnection((err, conn) =>
    conn.query('INSERT INTO user set ?', [data], (err, rows) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    }));
};

controller.delete = (req, res) => {
  const idUser = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('DELETE FROM user WHERE id = ?', [idUser], (err, rows) => {
      res.redirect('/');
    });
  });
};

controller.edit = (req, res) => {
  const idUser = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM user WHERE id = ?', [idUser], (err, user) => {
      if (err) {
        console.log(err);
      }
      res.render('user_edit', {
        data: user[0]
      });
    });
  });
};

controller.editSQL = (req, res) => {
  const data = req.body;
  const idUser = req.params.id;
  req.getConnection((err, conn) => {
    conn.query('UPDATE user set ? WHERE id = ?', [data, idUser], (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
      res.redirect('/');
    });
  });
};

module.exports = controller;