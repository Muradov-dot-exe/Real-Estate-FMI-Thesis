const dbconnection = require("./dbconnection");
const express = require("express");

const app = express();
app.use(express.json());

app.get(`/`, (req, res) => {
  dbconnection.query("select * from properties", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get(`/property/:id`, (req, res) => {
  let property = req.params.id;

  dbconnection.query(
    "select * from properties where id= " + property,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/property/add", (req, res) => {
  const data = req.body;
  dbconnection.query("INSERT INTO properties SET ?", data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.put("/property/edit/:id", (req, res) => {
  const data = [
    req.body.area,
    req.body.address,
    req.body.city,
    req.body.image,
    req.body.type,
    req.body.floorspace,
    req.body.beds,
    req.body.baths,
    req.body.price,
    req.body.parking,
    req.body.construction,
    req.params.id,
  ];
  dbconnection.query(
    "UPDATE properties SET area = ?,address=? ,city=? ,image=? ,type=?, floorspace=? ,beds=? ,baths=? ,price=? ,parking=?, construction=? where id = ?",
    data,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  let property = req.params.id;
  dbconnection.query(
    "DELETE from properties where id = " + property,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(4200);
