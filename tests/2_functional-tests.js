const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

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
        assert.equal(res.body.open, true);
        // personal tests
        assert.isString(_id);
        assert.equal(created_on, new Date());
        assert.equal(updated_on, new Date());
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
        console.log(res);
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
  // View issues on a project with one filter: GET request to /api/issues/{project}
  // View issues on a project with multiple filters: GET request to /api/issues/{project}
  // Update one field on an issue: PUT request to /api/issues/{project}
  // Update multiple fields on an issue: PUT request to /api/issues/{project}
  // Update an issue with missing _id: PUT request to /api/issues/{project}
  // Update an issue with no fields to update: PUT request to /api/issues/{project}
  // Update an issue with an invalid _id: PUT request to /api/issues/{project}
  // Delete an issue: DELETE request to /api/issues/{project}
  // Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
  // Delete an issue with missing _id: DELETE request to /api/issues/{project}
});
