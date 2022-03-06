import React, { Component } from 'react';

class Comments extends Component {

    showCommentsList(commentsList) {
        if (commentsList) {
            return commentsList.map((comment, i) => {
                if (comment.id_comment == 0) {
                    return (
                        <React.Fragment key={comment.id}>
                            <li className="media">
                                <a className="pull-left">
                                    <img className="media-object" src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + comment.image_user} alt="" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{comment.name_user}</li>
                                        <li><i className="fa fa-clock-o" />{comment.created_at.split(' ')[1]}</li>
                                        <li><i className="fa fa-calendar" />{comment.created_at.split(' ')[0]}</li>
                                    </ul>
                                    <p>{comment.comment}</p>
                                    <a onClick={() => {this.onReply(comment.id)}} className="btn btn-primary" href="#onReply"><i className="fa fa-reply" />Replay</a>
                                </div>
                            </li>
                            {
                                commentsList.map((comment2, i2) => {
                                    if (comment2.id_comment == comment.id) {
                                        return (
                                            <li key={i2} className="media second-media">
                                                <a className="pull-left">
                                                    <img className="media-object" src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + comment2.image_user} alt="" />
                                                </a>
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user" />{comment2.name_user}</li>
                                                        <li><i className="fa fa-clock-o" />{comment2.created_at.split(' ')[1]}</li>
                                                        <li><i className="fa fa-calendar" />{comment2.created_at.split(' ')[0]}</li>
                                                    </ul>
                                                    <p>{comment2.comment}</p>
                                                    <a className="btn btn-primary"><i className="fa fa-reply" />Replay</a>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </React.Fragment>
                    )
                }
            })
        }
    }

    onReply(commentId) {
        this.props.onReceiveIdReply(commentId)
    }

    render() {
        const { commentsList } = this.props
        return (
            <div className="response-area">
                <h2>{commentsList ? commentsList.length : '0'} RESPONSES</h2>
                <ul className="media-list">
                    {this.showCommentsList(commentsList)}
                </ul>
            </div>
        );
    }
}

export default Comments;