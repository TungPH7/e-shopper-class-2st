import React, { Component } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

class BlogList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogData: []
        }
    }


    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/blog',
            data: null
        }).then(res => {
            console.log(res);
            this.setState({
                blogData: res.data.blog.data
            })
        }).catch(err => {
            console.log(err)
        })
    }

    showBlogList() {
        const { blogData } = this.state
        if (blogData && blogData.length > 0) {
            return blogData.map((blog, i) => {
                return (
                    <BlogItem
                        key={blog.id}
                        blog={blog}
                    />
                )
            })
        }
    }

    render() {
        return (
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {this.showBlogList()}
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a className="active">1</a></li>
                            <li><a>2</a></li>
                            <li><a>3</a></li>
                            <li><a><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogList;