import { PostMeta, PostNotes, PrePost } from './_includes.jsx'
import React from 'react'


export default class TextPost extends React.Component {
  render() { return (
    <div className="r_post_text">
      <div className="text post">

        {!!this.props.Title &&
          <h2>{this.props.Title}</h2>
        }

        { this.props.body() }

        <PostMeta {... this.props}/>
      </div>

      <PostNotes PostNotes={this.props.PostNotes} />

    </div>
  )}
}