const dbconnection = require("./dbconnection");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Properties CRUD Operations

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

//END of properties CRUD

//Airplanes CRUD
app.get("/aircraft", (req, res) => {
  dbconnection.query("SELECT * FROM aircraft", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get("/aircraft/:id", (req, res) => {
  const aircraftId = req.params.id;

  dbconnection.query(
    "SELECT * FROM aircraft WHERE id = " + aircraftId,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/aircraft/add", (req, res) => {
  const data = req.body;
  dbconnection.query("INSERT INTO aircraft SET ?", data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.put("/aircraft/edit/:id", (req, res) => {
  const data = [
    req.body.aircraft_type,
    req.body.manufacturer,
    req.body.model,
    req.body.registration_number,
    req.body.year,
    req.body.serial_number,
    req.body.seats,
    req.body.price,
    req.body.image,
    req.params.id,
  ];
  dbconnection.query(
    "UPDATE aircraft SET aircraft_type=?, manufacturer=?, model=?, registration_number=?, year=?, serial_number=?, seats=?, price=?, Image=? WHERE id=?",
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

app.delete("/aircraft/delete/:id", (req, res) => {
  const aircraftId = req.params.id;
  dbconnection.query(
    "DELETE FROM aircraft WHERE id = " + aircraftId,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

//END OF AIRCRAFT REQUESTS

//VEHICLE REQUESTS

app.get(`/vehicles`, (req, res) => {
  dbconnection.query("select * from vehicles", (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.get(`/vehicle/:id`, (req, res) => {
  let vehicle = req.params.id;

  dbconnection.query(
    "select * from vehicles where id= " + vehicle,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/vehicle/add", (req, res) => {
  const data = req.body;
  dbconnection.query("INSERT INTO vehicles SET ?", data, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.send(result);
    }
  });
});

app.put("/vehicle/edit/:id", (req, res) => {
  const data = [
    req.body.vehicle_type,
    req.body.manufacturer,
    req.body.model,
    req.body.image,
    req.body.VIN,
    req.body.year,
    req.body.seats,
    req.body.price,
    req.params.id,
  ];
  dbconnection.query(
    "UPDATE vehicles SET vehicle_type=?, manufacturer=?, model=?, image=?, VIN=?, year=?, seats=?, price=? WHERE id = ?",
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
  let vehicle = req.params.id;
  dbconnection.query(
    "DELETE from vehicles where id = " + vehicle,
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
