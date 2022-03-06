import axios from 'axios';
import React, { Component } from 'react';
import { MyContext } from '../MyProvider';

class CommentPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentContent: ''
        }

        this.handleComment = this.handleComment.bind(this)
    }

    handleComment(e) {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    handlePostComment(context) {
        if (context.isLogin) {
            let userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
            let { commentContent } = this.state
            let accessToken = userAuthInfo.token
            let { idBlog, idSubComment } = this.props
            
            if (commentContent) {
                const formData = new FormData();
                formData.append('id_blog',idBlog)
                formData.append('id_user', userAuthInfo.id)
                formData.append('id_comment', idSubComment ? idSubComment : 0)
                formData.append('comment', commentContent)
                formData.append('image_user', userAuthInfo.avatar)
                formData.append('name_user', userAuthInfo.name)
                
                axios({
                    method: 'POST',
                    url: 'http://localhost/laravel/laravel/public/api/blog/comment/' + idBlog,
                    data: formData,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }).then(res => {
                    console.log(res)
                    let commentData = res.data.data
                    this.props.commentData(commentData)
                    this.setState({
                        commentContent: ''
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            // Cần có dòng comment phía dưới để chạy hàm confirm
            // eslint-disable-next-line no-restricted-globals
            let confirmPost = confirm('Vui lòng đăng nhập trước khi comment!')
            if (confirmPost) {
                // Truyền props history từ component cha vào
                this.props.history.push('/login')
            }
        }
    }

    render() {
        let { commentContent } = this.state
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className="replay-box">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>Leave a replay</h2>
                                <div className="text-area">
                                    <div className="blank-arrow">
                                        <label>Your Name</label>
                                    </div>
                                    <span>*</span>
                                    <textarea id='onReply' name="commentContent" value={commentContent} onChange={this.handleComment} rows={6} />
                                    <a className="btn btn-primary" onClick={() => { this.handlePostComment(context)}}>Post comment</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}

export default CommentPost;