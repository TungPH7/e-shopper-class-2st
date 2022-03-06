import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BlogItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const { id, title, image, content, description } = this.props.blog

        return (
            <div className="single-blog-post">
                <h3>{title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                    </span>
                </div>
                <Link to={'/bloglist/' + id}>
                    <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + image}  alt="" />
                </Link>
                <p>{content}</p>
                <Link to={'/bloglist/' + id} className="btn btn-primary">Read More</Link>
            </div>
        );
    }
}

export default BlogItem;