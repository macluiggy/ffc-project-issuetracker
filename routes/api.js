"use strict";
// const ObjectId = require("mongoose").ObjectId;
const ObjectId = require("mongodb").ObjectID;
const IssueModel = require("../models").Issue;
const ProjectModel = require("../models").Project;

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      let projectName = req.params.project;
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open,
      } = req.query;

      ProjectModel.aggregate([
        { $match: { name: projectName } },
        { $unwind: "$issues" },
        _id != undefined
          ? { $match: { "issues._id": ObjectId(_id) } }
          : { $match: {} },
        open != undefined
          ? { $match: { "issues.open": open } }
          : { $match: {} },
        issue_title != undefined
          ? { $match: { "issues.issue_title": issue_title } }
          : { $match: {} },
        issue_text != undefined
          ? { $match: { "issues.issue_text": issue_text } }
          : { $match: {} },
        created_by != undefined
          ? { $match: { "issues.created_by": created_by } }
          : { $match: {} },
        assigned_to != undefined
          ? { $match: { "issues.assigned_to": assigned_to } }
          : { $match: {} },
        status_text != undefined
          ? { $match: { "issues.status_text": status_text } }
          : { $match: {} },
      ]).exec((err, data) => {
        // thing to do with filtered data
        if (!data) return res.json([]); // if no data, return empty array
        let mappedData = data.map(({ issues }) => issues); // map the data to the issues array
        return res.json(mappedData); // return the data
      });
    })

    .post(function (req, res) {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;
      if (!issue_title || !issue_text || !created_by)
        return res.json({ error: "required field(s) missing" });
      const newIssue = new IssueModel({
        issue_title: issue_title || "",
        issue_text: issue_text || "",
        created_on: new Date(),
        updated_on: new Date(),
        created_by: created_by || "",
        assigned_to: assigned_to || "",
        open: true,
        status_text: status_text || "",
      });
      ProjectModel.findOne({ name: project }, (err, projectdata) => {
        // find project
        if (!projectdata) {
          // if project not found
          const newProject = new ProjectModel({ name: project }); // create new project
          newProject.issues.push(newIssue); // add new issue to project
          newProject.save((err, data) => {
            // save project
            if (err || !data)
              // if error or no data
              return res.send("There was and error saving in post"); // send error
            return res.json(newIssue); // otherwise send new issue
          });
        } else {
          projectdata.issues.push(newIssue); // add new issue to project
          projectdata.save((err, data) => {
            if (err || !data)
              // if error or no data
              return res.send("There was and error saving in post"); // send error
            return res.json(newIssue); // otherwise send new issue
          });
        }
      });
    })
    .put(function (req, res) {
      let project = req.params.project;
      const {
        _id,
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        open,
      } = req.body;
      try {
        if (!_id) {
          return res.json({ error: "missing _id" });
        } else if (
          !issue_title &&
          !issue_text &&
          !created_by &&
          !assigned_to &&
          !status_text &&
          !open
        ) {
          return res.json({ error: "no update field(s) sent", _id: _id });
        } else {
          // res.json({ error: "could not update 1", _id: _id });
          ProjectModel.findOne({ name: project }, (err, projectdata) => {
            if (err || !projectdata) {
              console.log("line 122");
              return res.json({ error: "could not update", _id: _id });
            } else {
              const issueData = projectdata.issues.id(_id);
              if (!issueData) {
                console.log("line 127");
                return res.json({ error: "could not update", _id: _id });
              }
              issueData.issue_title = issue_title || issueData.issue_title;
              issueData.issue_text = issue_text || issueData.issue_text;
              issueData.created_by = created_by || issueData.created_by;
              issueData.assigned_to = assigned_to || issueData.assigned_to;
              issueData.status_text = status_text || issueData.status_text;
              issueData.updated_on = new Date();
              issueData.open = open || issueData.open;
              projectdata.save((err, data) => {
                if (err || !data) {
                  console.log("line 139");
                  return res.json({ error: "could not update", _id: _id });
                } else {
                  return res.json({ result: "successfully updated", _id: _id });
                }
              });
            }
          });
        }
      } catch (error) {
        console.log(error);
        return res.json({ error: "could not update", _id: _id });
      }
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
