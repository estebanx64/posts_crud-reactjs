import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

import Navbar from './navbar';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

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
                <Link to="/">Back To Index</Link>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
                <hr className="mt-2" />
                <div className="form-group">
                  <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)} >
                    Delete Post
                  </button>
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
  };
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);