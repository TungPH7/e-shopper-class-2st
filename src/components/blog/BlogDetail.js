import React, { Component } from 'react';
import axios from 'axios';
import Comments from './Comments';
import CommentPost from './CommentPost';
import StarRatings from 'react-star-ratings';
import MenuLeft from '../layout/MenuLeft';

class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blogDetailData: {},
            commentsData: [],
            idSubComment: '',
            rating: 0,
            ratingData: []
        }
        this.handleCommentData = this.handleCommentData.bind(this)
        this.receiveIdReply = this.receiveIdReply.bind(this)
        this.changeRating = this.changeRating.bind(this)
    }

    componentDidMount() {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        if (userAuthInfo) {
            this.setState({
                userAuthInfo: userAuthInfo
            })
        }

        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/blog/detail/' + this.props.match.params.id
        }).then(res => {
            this.setState({
                blogDetailData: res.data.data,
                commentsData: res.data.data.comment
            })
        })

        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/blog/rate/' + this.props.match.params.id
        }).then(res => {
            let ratingData = res.data.data
            let ratingPointAll = 0
            console.log('ratingData', ratingData)

            ratingData.forEach((rating, i) => {
                ratingPointAll += rating.rate
            })

            this.setState({
                ratingData: ratingData,
                rating: Math.round(ratingPointAll / ratingData.length)
            })

        })
    }

    handleCommentData(comment) {
        let { commentsData } = this.state
        commentsData.splice(0, 0, comment)

        this.setState({
            commentsData: commentsData,
            idSubComment: ''
        })
    }

    receiveIdReply(commentId) {
        this.setState({
            idSubComment: commentId
        })
    }

    changeRating(newRating, name) {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))

        if (userAuthInfo) {
            let accessToken = userAuthInfo.token
            let userId = userAuthInfo.id

            this.setState({
                rating: newRating
            })

            let formData = new FormData()
            formData.append('user_id', userId)
            formData.append('blog_id', this.props.match.params.id)
            formData.append('rate', newRating)

            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/blog/rate/' + this.props.match.params.id,
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then(res => {
                console.log(res)
            })
        } else {
            // eslint-disable-next-line no-restricted-globals
            let confirmRating = confirm('Vui lòng đặng nhập trước khi đánh giá!')
            if (confirmRating) {
                this.props.history.push('/login')
            }
        }
    }

    render() {
        let { id, title, image } = this.state.blogDetailData
        let { commentsData, idSubComment, rating, ratingData } = this.state

        return (
            <div className="col-sm-9">
                {/*/blog-post-area*/}
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        <h3>{title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
                        </div>
                        <a href>
                            <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + image} alt="" />
                        </a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> <br />
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                        <p>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="#">Pre</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/*/rating-area*/}
                <div className="rating-area">
                    <ul className="ratings">
                        <li className="rate-this">Rate this item:</li>
                        {/* <li>
                                        <i className="fa fa-star color" />
                                        <i className="fa fa-star color" />
                                        <i className="fa fa-star color" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </li> */}
                        <StarRatings
                            rating={rating}
                            starRatedColor='yellow'
                            starHoverColor='yellow'
                            numberOfStars={5}
                            name='rating'
                            changeRating={this.changeRating}
                        />
                        <li className="color">({ratingData.length} votes)</li>
                    </ul>
                    <ul className="tag">
                        <li>TAG:</li>
                        <li><a className="color" href>Pink <span>/</span></a></li>
                        <li><a className="color" href>T-Shirt <span>/</span></a></li>
                        <li><a className="color" href>Girls</a></li>
                    </ul>
                </div>

                {/*/socials-share*/}
                <div className="socials-share">
                    <a href><img src='http://localhost/laravel/laravel/public/api/blog/socials.png' alt="" /></a>
                </div>
                {/* <div class="media commnets">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src="images/blog/man-one.jpg" alt="" />
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading">Annie Davis</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <div class="blog-socials">
                                        <ul>
                                            <li><a href=""><i class="fa fa-facebook"></i></a></li>
                                            <li><a href=""><i class="fa fa-twitter"></i></a></li>
                                            <li><a href=""><i class="fa fa-dribbble"></i></a></li>
                                            <li><a href=""><i class="fa fa-google-plus"></i></a></li>
                                        </ul>
                                        <a class="btn btn-primary" href="">Other Posts</a>
                                    </div>
                                </div>
                            </div> */}
                {/*Comments*/}
                <Comments
                    commentsList={commentsData}
                    onReceiveIdReply={this.receiveIdReply}
                />
                {/*/Repaly Box*/}
                <CommentPost
                    commentData={this.handleCommentData}
                    history={this.props.history}
                    idBlog={id}
                    idSubComment={idSubComment}
                />
            </div>
        );
    }
}

export default BlogDetail;