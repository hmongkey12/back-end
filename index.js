const express = require("express");
const server = express();

const PORT = 3000 || process.env.PORT;

if (PORT) {
  server.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
  });

  server.use(express.json());
  server.use(cors());

  server.get("/destinations", (req, res) => {
    res.send(200, destinations);
  });

  const destinations = [];

  const students = {
    dao: {
      name: "Dao",
      interests: ["tacos"],
      city: "Sac Town",
    },
    nikko: {
      name: "Nikko",
      interests: ["bananas"],
      city: "Detroit",
    },
    will: {
      name: "will",
      interests: ["camarro", "frontier", "wrangler"],
      city: "Detroit",
    },
    mannie: {
      name: "Mannie",
      interests: ["soccer"],
      city: "Georgia",
    },
  };

  server.get("/students", (req, res) => {
    const { name, interest, city } = req.query;
    if (name) {
      const student = students[name.toLowerCase()];
      if (student) {
        return res.send(student);
      }
      return res
        .status(404)
        .send({ error: `student by the name of ${name} not found` });
    }
    let filteredStudents = Object.values(students);
    if (interest) {
      filteredStudents = filteredStudents.filter((student) =>
        student.interests.includes(interest.toLowerCase())
      );
    }
    if (city) {
      filteredStudents = filteredStudents.filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
      );
    }
    return res.send(filteredStudents);
  });

  server.get("/students/name/:name", (req, res) => {
    const { name } = req.params;
    if (name) {
      const student = students[name.toLowerCase()];
      if (student) {
        return res.send(student);
      }
      return res.status(404).send(filteredStudents);
    }
  });

  server.get("/students", (req, res) => {
    const { name } = req.params;
    if (name) {
      const student = students[name.toLowerCase()];
      if (student) {
        return res.send(student);
      }
      return res.status(404).send(filteredStudents);
    }
  });

  server.get("/students/name/:name/city/:city", (req, res) => {
    const { name, city } = req.params;
    if (name && city) {
      const student = students[name.toLowerCase()];
      if (student && student.city.toLowerCase() === city.toLowerCase()) {
        return res.send(student);
      }
      return res.status(404).send({ error: "Name with City was not found!" });
    }
  });

  server.get("/students/city/:city", (req, res) => {
    const { city } = req.params;
    if (city) {
      const filteredStudents = filteredStudents.filter(
        (student) => student.city.toLowerCase() === city.toLowerCase()
      );
      return res.send(filteredStudents);
    }
  });

  server.get("/students/interests/:interest", (req, res) => {
    let filteredStudents = Object.values(students);
    const { interest } = req.params;
    if (interest) {
      filteredStudents = filteredStudents.filter((student) =>
        student.interests.includes(interest.toLowerCase())
      );
      return res.send(filteredStudents);
    }
  });

  server.post("/destinations", (req, res) => {
    const { destination, location, photo, description } = req.body;
    if (
      !destination ||
      !location ||
      destination.length === 0 ||
      location.length === 0
    ) {
      res
        .status(400)
        .send({ error: "Destination AND location are BOTH required" });
    }

    const newDest = {
      destination,
      location,
      photo: photo && photo.length !== 0 ? photo : "dafadfasd",
      description: description && description.length !== 0 ? description : "",
    };

    destinations.push(newDest);
    res.redirect(303, "/destinations");
  });
}
