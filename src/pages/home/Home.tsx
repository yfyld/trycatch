import * as React from 'react';
import Swiper from "swiper";
import indexBg from './indexBg'
import style from "./Home.less"
interface Props {
    id: string | undefined
}

export default class Home extends React.Component<Props> {
    componentDidMount() {
      // @ts-ignore
      const mySwiper = new Swiper('.swiper-container', {
        direction: "vertical",
        autoplay: false,
        mousewheel:true
      })
      indexBg()
    }
    render() {
        return (
        <div className={style.wrapper+' swiper-container'}>
          <div className="swiper-wrapper">
            <div className="swiper-slide slide1">
              <div className="logo">
                <h1>
                  <span>trycatch.js </span>
                </h1>
                <p></p>
              </div>
        
              <ul className="menu">
                <li>
                  <a href="/login">aaaa</a>
                </li>
                <li>
                  <a href="/login">aaaa</a>
                </li>
                <li>
                  <a href="/login">aaaa</a>
                </li>
              </ul>
              <canvas id="canvas" className="bg" width="1459" height="503"></canvas>
            </div>
            <div className="swiper-slide slide2" >
              <div className="content">
                <div className="part1">
                  <h1>aaaa</h1>
                  <p>bbbbb</p>
                </div>
                <div className="part2">
                  <img src="" alt=""/>>
                </div>
              </div>
            </div>
            <div className="swiper-slide slide3">
              <div className="content">
                <div className="part1">
                  <h1>aaaaa</h1>
                </div>
                <div className="part2">
                  <div className="panel">
                    <div><img src="" alt=""/>></div>
                    <h3>aaaa</h3>
                    <p>bbbbbb</p>
                  </div>
                </div>
        
              </div>
            </div>
          </div>
        </div>
        )
    }
}