import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

import Navbar from './navbar';

class PostsNew extends Component{
  renderField(field) {
    const { meta : { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger': ''}`

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <Navbar />
        <div className="content-wrapper">
          <div className="container-fluid">
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <a href="">Videos</a>
            </li>
            <li className="breadcrumb-item active">Youtube_API with react</li>
            </ol>
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field
                  label="Title For Post"
                  name="title"
                  component={this.renderField}
                  />
                  <Field
                  label="Categories"
                  name="categories"
                  component={this.renderField}
                  />
                  <Field
                  label="Post Conten"
                  name="content"
                  component={this.renderField}
                  />
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <Link to="/" className="btn btn-danger">Cancel</Link>
                </form>
              </div>
            </div>
          </div>
          <footer className="sticky-footer">
              <div className="container">
              <div className="text-center">
                  <small></small>
              </div>
              </div>
          </footer>
          <a className="scroll-to-top rounded" href="#page-top">
              <i className="fa fa-angle-up"></i>
          </a>
      </div>
    </div>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdad', categories: 'afdssg', content: 'afsdfsdgd' }
  const errors = {};

  // validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Enter a title!';
  } else if (values.title.length < 3){
    errors.title = 'Title must be at least 3 characters';
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate
})(
  connect(null, { createPost })(PostsNew)
);