import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

import Navbar from './navbar';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
          {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
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
                <h3>Posts</h3>
                <ul className="list-group">
                  {this.renderPosts()}
                </ul>
                <hr className="mt-1" />
                <div className="form-group">
                  <Link className="btn btn-primary" to="/posts/new">
                    Add a Post
                  </Link>
                </div>
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

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
