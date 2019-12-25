import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
// Components
import Sidebar from "../Sidebar";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      path: "",
      success: false
    };
  }
  componentDidMount() {
    this.setState({
      path: this.props.history.location.pathname
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeFile = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  };

  createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      this.setState({
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = "/api/course/p170815s";
    const formData = { file: this.state.image, title: this.state.title };
    return axios.post(url, formData).then(() => {
      this.setState({
        success: true,
        title: "",
        image: ""
      });
      document.getElementById("image").value = "";
    });
  };

  render() {
    // if (this.state.success) {
    //   return <Redirect to="/admin/add-class" />;
    // }
    return (
      <>
        <div className="profile">
          <div className="row">
            <div className="leftbar">
              <Sidebar path={this.state.path} />
            </div>
            <div className="rightbar">
              <div className="container">
                <h3 className="mt-2 mb-4">Add New Course</h3>
                <div className="row">
                  <div className="container">
                    <div className="row">
                      <div className="card card-body bg-light col-md-10 offset-md-1 pt-5">
                        <form
                          className="form-group"
                          onSubmit={this.handleSubmit}
                        >
                          <div className="input-group col-md-12">
                            <label
                              htmlFor="title"
                              className="my-auto text-right col-md-3"
                            >
                              <b>Course Title</b>
                            </label>
                            <input
                              type="text"
                              id="title"
                              className="form-control col-md-9"
                              name="title"
                              placeholder="Enter the course title"
                              value={this.state.title}
                              onChange={this.handleChange}
                              required
                            />
                          </div>
                          <div className="input-group col-md-12 mt-2">
                            <label
                              htmlFor="image"
                              className="my-auto text-right col-md-3"
                            >
                              <b>Course Thumbnail</b>
                            </label>
                            <input
                              type="file"
                              id="image"
                              className="form-control-file pl-0 col-md-9"
                              name="image"
                              onChange={this.handleChangeFile}
                              required
                            />
                          </div>
                          <div className="text-right col">
                            <button
                              type="submit"
                              className="btn btn-success btn-sm mt-2 px-4"
                            >
                              Next
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(AddCourse);
