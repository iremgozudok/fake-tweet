import * as React from 'react';
import './style.scss';
import {
  ReplyIcon,
  ReetweetIcon,
  LikeIcon,
  BookmarkIcon,
  ShareIcon,
} from './icons';

export default function App() {
  return (
    <div>
      <div className="tweet">
        <div className="tweet-author">
          <img
            src="https://pbs.twimg.com/profile_images/1636401651920650245/_55grXGW_400x400.jpg"
            alt=""
          ></img>
          <div className="name">İrem</div>
          <div className="username">@iremmng</div>
        </div>
        <div className="tweet-content">
          <p>bu tweet zarttırı zort için atılmıştır</p>
        </div>
        <div className="tweet-stats">
          <span>
            <b>23</b> Retweet
          </span>
          <span>
            <b>23</b> Alıntı Tweetler
          </span>
          <span>
            <b>23</b> Beğeni
          </span>
        </div>
        <div className="tweet-actions">
          <span>
            <ReplyIcon />
          </span>
          <span>
            <ReetweetIcon />
          </span>
          <span>
            <LikeIcon />
          </span>
          <span>
            <BookmarkIcon />
          </span>
          <span>
            <ShareIcon />
          </span>
        </div>
      </div>
    </div>
  );
}
