import React, { useState, createRef, useEffect } from 'react';
import './style.scss';
import { AvatarLoader } from './loader';
import { useScreenshot } from 'use-react-screenshot';
import {
  ReplyIcon,
  ReetweetIcon,
  LikeIcon,
  BookmarkIcon,
  ShareIcon,
  VerifiedIcon,
} from './icons';

const tweetFormat = (tweet) => {
  tweet = tweet
    .replace(/@([\w]+)/g, '<span>@$1</span>')
    .replace(/#([\wşçöüğıİ]+)/gi, '<span>#$1</span>')
    .replace(/(https?:\/\/[\w\.\/]+)/, '<span>$1</span>');
  return tweet;
};

const formatNumber = (number) => {
  if (!number) {
    number = 0;
  }
  if (number < 1000) {
    return number;
  }
  number /= 1000;
  number = String(number).split(',');
  return (
    number[0] + (number[1] > 100 ? ',' + number[1].slice(0, 1) + ' B' : ' B')
  );
};

export default function App() {
  const tweetRef = createRef(null);
  const downloadRef = createRef();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [verified, setVerified] = useState(false);
  const [tweet, setTweet] = useState();
  const [avatar, setAvatar] = useState();
  const [retweets, setRetweets] = useState(0);
  const [quoteTweets, setQuoteTweets] = useState(0);
  const [likes, setLikes] = useState(0);
  const [image, takeScreenshot] = useScreenshot();
  const getImage = () => takeScreenshot(tweetRef.current);

  useEffect(() => {
    if (image) {
      downloadRef.current.click();
    }
  }, [image]);

  const AvatarHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      setAvatar(this.result);
    });
    reader.readAsDataURL(file);
  };

  return (
    <div className="root">
      <div className="tweet-settings">
        <h3>Tweet Ayarları</h3>
        <ul>
          <li>
            <label>Ad Soyad</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Tweet</label>
            <textarea
              className="textarea"
              maxLength="290"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </li>
          <li>
            <label>Avatar</label>
            <input className="input" type="file" onChange={AvatarHandle} />
          </li>
          <li>
            <label>Retweet</label>
            <input
              type="number"
              className="input"
              value={retweets}
              onChange={(e) => setRetweets(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Alıntı Tweetler</label>
            <input
              type="number"
              className="input"
              value={quoteTweets}
              onChange={(e) => setQuoteTweets(e.target.value)}
            ></input>
          </li>
          <li>
            <label>Beğeni</label>
            <input
              type="number"
              className="input"
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            ></input>
          </li>
          <li>
            <button onClick={getImage}>Oluştur</button>
            <div className="download-url">
              {image && (
                <a ref={downloadRef} href={image} download="tweet.png">
                  Tweeti indir
                </a>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="tweet-container">
        <div className="tweet" ref={tweetRef}>
          <div className="tweet-author">
            {(avatar && <img src={avatar} />) || <AvatarLoader />}
            <div>
              <div className="name">
                {name || 'Ad Soyad'}
                {verified && <VerifiedIcon width="19" height="19" />}
              </div>
              <div className="username">@{username || 'kullaniciadi'}</div>
            </div>
          </div>
          <div className="tweet-content">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  (tweet && tweetFormat(tweet)) ||
                  'bu alana örnek tweet gelecek',
              }}
            />
          </div>
          <div className="tweet-stats">
            <span>
              <b>{formatNumber(retweets)}</b> Retweet
            </span>
            <span>
              <b>{formatNumber(quoteTweets)}</b> Alıntı Tweetler
            </span>
            <span>
              <b>{formatNumber(likes)}</b> Beğeni
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
    </div>
  );
}
