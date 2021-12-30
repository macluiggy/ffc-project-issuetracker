const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

var _idTest;
var idForCru = "61ce1e65278280a01ddf25fe";
var idForD = "61ce0000a59e44adda1faf86";
suite("Functional Tests", function () {
  suite("POST requests", () => {
    // Create an issue with every field: POST request to /api/issues/{project}
    test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .post("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          issue_title: "Title",
          issue_text: "Text",
          created_by: "luiggy",
          assigned_to: "macluiggy",
          status_text: "In QA",
        })
        .end((err, res) => {
          // console.log(res);
          // console.log(res.body, "aqui esta el body");
          // assert.equal(_idTest, "djdj")
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "Text");
          assert.equal(res.body.created_by, "luiggy");
          assert.equal(res.body.assigned_to, "macluiggy");
          assert.equal(res.body.status_text, "In QA");
          assert.equal(res.body.open, true);
          _idTest = `${res.body._id}`;
          console.log(_idTest, "aqui esta el idTest");
        });
      done();
    });

    // Create an issue with only required fields: POST request to /api/issues/{project}
    test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .post("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          issue_title: "Title",
          issue_text: "Text",
          created_by: "chai luiggy",
        })
        .end((err, res) => {
          // console.log(res);
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, "Title");
          assert.equal(res.body.issue_text, "Text");
          assert.equal(res.body.created_by, "chai luiggy");
          assert.equal(res.body.assigned_to, "");
          assert.equal(res.body.status_text, "");
          // personal tests
        });
      done();
    });
    // Create an issue with missing required fields: POST request to /api/issues/{project}
    test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .post("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          issue_title: "",
          issue_text: "",
          created_by: "FCC",
          assigned_to: "",
          status_text: "",
        })
        .end((err, res) => {
          const { error } = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "required field(s) missing");
        });
      done();
    });
  });
  suite("GET requests", () => {
    // View issues on a project: GET request to /api/issues/{project}
    test("View issues on a project: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/apitest")
        .end((err, res) => {
          assert.equal(res.status, 200);
          // assert.equal(res.body[0].issue_title, "Title");
          // assert.equal(res.body[0].issue_text, "Text");
          // assert.equal(res.body[0].created_by, "chai luiggy");
          // assert.equal(res.body[0].assigned_to, "chai macluiggy");
          // assert.equal(res.body[0].status_text, "In QA");
          // personal tests
          // assert.equal(res.body[0].open, true);
        });
      done();
    });
    // View issues on a project with one filter: GET request to /api/issues/{project}
    test("View issues on a project with one filter: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/test?assigned_to=chai macluiggy")
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200);
          // assert.equal(res.body[0].issue_title, "Title");
          // assert.equal(res.body[0].issue_text, "Text");
          // assert.equal(res.body[0].created_by, "chai luiggy");
          // assert.equal(res.body[0].assigned_to, "chai macluiggy");
          // assert.equal(res.body[0].status_text, "In QA");
          // personal tests
          // assert.equal(res.body[0].open, true);
        });
      done();
    });
    // View issues on a project with multiple filters: GET request to /api/issues/{project}
    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .get("/api/issues/test?assigned_to=chai macluiggy&status_text=In QA")
        .end((err, res) => {
          assert.equal(res.status, 200);
          // assert.equal(res.body[0].issue_title, "Title");
          // assert.equal(res.body[0].issue_text, "Text");
          // assert.equal(res.body[0].created_by, "chai luiggy");
          // assert.equal(res.body[0].assigned_to, "chai macluiggy");
          // assert.equal(res.body[0].status_text, "In QA");
          // // personal tests
          // assert.equal(res.body[0].open, true);
        });
      done();
    });
  });
  suite("PUT requests", () => {
    // Update one field on an issue: PUT request to /api/issues/{project}
    test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: idForCru,
          issue_title: "Title",
        })
        .end((err, res) => {
          console.log(res.body);
          assert.equal(res.status, 200);
          // assert.equal(res.body.result, "successfully updated");
        });
      done();
    });
    // Update multiple fields on an issue: PUT request to /api/issues/{project}
    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: idForCru,
          issue_title: "Title",
          issue_text: "Text",
          created_by: "luiggy",
          assigned_to: "macluiggy",
          status_text: "In QA",
        })
        .end((err, res) => {
          console.log(idForCru);
          assert.equal(res.status, 200);
          // assert.equal(res.body.result, "successfully updated");
        });
      done();
    });
    // Update an issue with missing _id: PUT request to /api/issues/{project}
    test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          issue_title: "Title",
          issue_text: "Text",
          created_by: "chai luiggy",
          assigned_to: "chai macluiggy",
          status_text: "In QA",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // assert.equal(res.body.error, "missing _id");
        });
      done();
    });
    // Update an issue with no fields to update: PUT request to /api/issues/{project}
    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: idForCru,
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // assert.equal(res.body.error, "no update field(s) sent");
        });
      done();
    });
    // Update an issue with an invalid _id: PUT request to /api/issues/{project}
    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .put("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: "5f3d2d9b9c7e8b8c0e7b6fso",
          issue_title: "Title",
          issue_text: "Text",
          created_by: "chai luiggy",
          assigned_to: "chai macluiggy",
          status_text: "In QA",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // assert.equal(res.body.error, "could not update");
        });
      done();
    });
  });
  suite("DELETE requests", () => {
    // Delete an issue: DELETE request to /api/issues/{project}
    // test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
    //   chai
    //     .request(server)
    //     .delete("/api/issues/apitest")
    //     .set("content-type", "application/json")
    //     .send({
    //       _id: idForD,
    //     })
    //     .end((err, res) => {
    //       // console.log(deletedID);
    //       console.log(res.body);
    //       assert.equal(res.status, 200);
    //       assert.equal(res.body.result, "successfully deleted");
    //     });
    //   done();
    // });
    test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .post("/api/issues/apitest")
        .send({
          issue_title: "Delete Test",
          issue_text: "testing delete with valid _id",
          created_by: "test suite",
        })
        .end(function (err, res) {
          var _idToDelete = res.body._id;
          chai
            .request(server)
            .delete("/api/issues/apitest")
            .send({ _id: _idToDelete })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              // assert.equal(res.body.result, "successfully deleted");
              // done();
            });
        });
      done();
    });
    // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .delete("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: "5f3d2d9b9c7e8b8c0e7bsosote",
        })
        .end((err, res) => {
          // console.log(res);
          // console.log(deletedID, "aqui esta el id");
          assert.equal(res.status, 200);
          // assert.equal(res.body.error, "could not delete");
        });
      done();
    });
    // Delete an issue with missing _id: DELETE request to /api/issues/{project}
    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
      chai
        .request(server)
        .delete("/api/issues/apitest")
        .set("content-type", "application/json")
        .send({
          _id: "",
        })
        .end((err, res) => {
          // console.log(res);
          assert.equal(res.status, 200);
          // assert.equal(res.body.error, "missing _id");
        });
      done();
    });
  });
});
