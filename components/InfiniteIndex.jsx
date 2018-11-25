// @flow
import React from "react";

import "whatwg-fetch"; // For getting next pages
import ProgressButton from "react-progress-button";
import Waypoint from "react-waypoint";
import { getPage } from "retumble";

require("./InfiniteIndex.css");

import type { Pagination } from "../part/Pagination";

type Props = {
  index: Object,
  postComponent: Object,
  autoScroll: boolean,
};

type State = Object;

export default class InfiniteIndex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // The Index object from the blog object
    this.state = this.props.index;
    // State of the loading button
    this.state.query = ""; // '', loading, success, error or disabled
    // Text on the loading button
    this.state.buttonText = "more";

    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      this.state.query = "disabled";
      this.state.buttonText = "that's it!";
      return;
    }
  }

  // todo; what happens when the end is reached
  nextIndex() {
    if (this.state.Pagination.CurrentPage >= this.state.Pagination.TotalPages) {
      return;
    }
    this.setState({ query: "loading" });
    console.log("fetching", this.state.Pagination);
    getPage(this.state.Pagination.Next)
      .catch(e => {
        console.error("error fetchig next index");
        console.error(e);
        this.setState({ query: "error" });
      })
      .then(blog => {
        const index = blog.Content;
        index.Posts = this.state.Posts.concat(index.Posts);
        this.setState(index);
        this.setState({ query: "" });
      });
  }

  render() {
    const PostComponent = this.props.postComponent;
    return (
      <div id="content">
        {this.state.Posts.map((post, i) => (
          <PostComponent {...post} key={i} />
        ))}
        <Waypoint
          scrollableAncestor={window}
          debug={false}
          onEnter={this.nextIndex.bind(this)}
        />
        <ProgressButton
          onClick={this.nextIndex.bind(this)}
          state={this.state.query}
        >
          {this.state.buttonText}
        </ProgressButton>
      </div>
    );
  }
}