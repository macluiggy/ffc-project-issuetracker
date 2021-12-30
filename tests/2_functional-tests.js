const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

let deletedID;
suite("Functional Tests", function () {
  // Create an issue with every field: POST request to /api/issues/{project}
  test("Create an issue with every field: POST request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .post("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        issue_title: "Title",
        issue_text: "Text",
        created_by: "chai luiggy",
        assigned_to: "chai macluiggy",
        status_text: "In QA",
      })
      .end((err, res) => {
        // console.log(res);
        console.log(res.body, "aqui esta el body");
        deletedID = res.body._id;
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Title");
        assert.equal(res.body.issue_text, "Text");
        assert.equal(res.body.created_by, "chai luiggy");
        assert.equal(res.body.assigned_to, "chai macluiggy");
        assert.equal(res.body.status_text, "In QA");
        assert.equal(res.body.open, true);
      });
    done();
  });

  // Create an issue with only required fields: POST request to /api/issues/{project}
  test("Create an issue with only required fields: POST request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .post("/api/issues/test")
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
        assert.equal(open, true);
        assert.isString(_id);
        assert.equal(created_on, new Date());
        assert.equal(updated_on, new Date());
      });
    done();
  });
  // Create an issue with missing required fields: POST request to /api/issues/{project}
  test("Create an issue with missing required fields: POST request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .post("/api/issues/test")
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
  // View issues on a project: GET request to /api/issues/{project}
  test("View issues on a project: GET request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .get("/api/issues/test")
      .end((err, res) => {
        const {
          _id,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          open,
          created_on,
          updated_on,
        } = res.body[0];
        assert.equal(res.status, 200);
        assert.equal(res.body[0].issue_title, "Title");
        assert.equal(res.body[0].issue_text, "Text");
        assert.equal(res.body[0].created_by, "chai luiggy");
        assert.equal(res.body[0].assigned_to, "chai macluiggy");
        assert.equal(res.body[0].status_text, "In QA");
        // personal tests
        assert.equal(res.body[0].open, true);
        assert.isString(_id);
        // assert.equal(created_on, new Date());
        // assert.equal(updated_on, new Date());
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
        assert.equal(res.body[0].issue_title, "Title");
        assert.equal(res.body[0].issue_text, "Text");
        assert.equal(res.body[0].created_by, "chai luiggy");
        assert.equal(res.body[0].assigned_to, "chai macluiggy");
        assert.equal(res.body[0].status_text, "In QA");
        // personal tests
        assert.equal(res.body[0].open, true);
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
        assert.equal(res.body[0].issue_title, "Title");
        assert.equal(res.body[0].issue_text, "Text");
        assert.equal(res.body[0].created_by, "chai luiggy");
        assert.equal(res.body[0].assigned_to, "chai macluiggy");
        assert.equal(res.body[0].status_text, "In QA");
        // personal tests
        assert.equal(res.body[0].open, true);
      });
    done();
  });
  // Update one field on an issue: PUT request to /api/issues/{project}
  test("Update one field on an issue: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: "5f3d2d9b9c7e8b8c0e7b6f5d",
        issue_title: "Title",
      })
      .end((err, res) => {
        const {
          _id,
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          open,
          created_on,
          updated_on,
        } = res.body;
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Title");
        assert.equal(res.body.issue_text, "Text");
        assert.equal(res.body.created_by, "chai luiggy");
        assert.equal(res.body.assigned_to, "chai macluiggy");
        assert.equal(res.body.status_text, "In QA");
        // personal tests
        assert.equal(res.body.open, true);
      });
    done();
  });
  // Update multiple fields on an issue: PUT request to /api/issues/{project}
  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: "5f3d2d9b9c7e8b8c0e7b6f5d",
        issue_title: "Title",
        issue_text: "Text",
        created_by: "chai luiggy",
        assigned_to: "chai macluiggy",
        status_text: "In QA",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Title");
        assert.equal(res.body.issue_text, "Text");
        assert.equal(res.body.created_by, "chai luiggy");
        assert.equal(res.body.assigned_to, "chai macluiggy");
        assert.equal(res.body.status_text, "In QA");
        // personal tests
        assert.equal(res.body.open, true);
      });
    done();
  });
  // Update an issue with missing _id: PUT request to /api/issues/{project}
  test("Update an issue with missing _id: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/test")
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
        assert.equal(res.body.error, "missing _id");
      });
    done();
  });
  // Update an issue with no fields to update: PUT request to /api/issues/{project}
  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: "5f3d2d9b9c7e8b8c0e7b6f5d",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "no update field(s) sent");
      });
    done();
  });
  // Update an issue with an invalid _id: PUT request to /api/issues/{project}
  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .put("/api/issues/test")
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
        assert.equal(res.body.error, "could not update");
      });
    done();
  });
  // Delete an issue: DELETE request to /api/issues/{project}
  test("Delete an issue: DELETE request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .delete("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: deletedID,
      })
      .end((err, res) => {
        console.log(deletedID);
        assert.equal(res.status, 200);
        assert.equal(res.body.result, "successfully deleted");
      });
    done();
  });
  // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .delete("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: deletedID,
      })
      .end((err, res) => {
        // console.log(res);
        console.log(deletedID, "aqui esta el id");
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "could not delete");
      });
    done();
  });
  // Delete an issue with missing _id: DELETE request to /api/issues/{project}
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", (done) => {
    chai
      .request(server)
      .delete("/api/issues/test")
      .set("content-type", "application/json")
      .send({
        _id: "",
      })
      .end((err, res) => {
        // console.log(res);
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "missing _id");
      });
    done();
  });
});
