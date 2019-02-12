import * as React from 'react';
import Swiper from "swiper";
import indexBg from './indexBg'
import style from "./Home.less"
import {Link} from "react-router-dom"
import imgHome1 from "@/assets/imgs/home1.png"
import imgHome2 from "@/assets/imgs/home2.png"
// import imgBg from "@/assets/imgs/slide2-bg.jpg"
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
                  <span style={{color:'red'}}>{"\{"}</span>
                  <span>trycatch</span>
                  <span style={{color:'red'}}>{"\}"}</span>
                </h1>
                <p>异常监控方案</p>
              </div>
        
              <ul className="menu">
                <li>
                  <Link to="/project-list">我的项目</Link>
                </li>
                <li>
                  <Link to="/login">登录</Link>
                </li>
                <li>
                  <Link to="/signup">注册</Link>
                </li>
                <li>
                  <a href="/login">githup</a>
                </li>
              </ul>
              <canvas id="canvas" className="bg" width="1459" height="503"></canvas>
            </div>
            <div className="swiper-slide slide2" >
              <div className="content">
                <div className="part1">
                  <h1>易用</h1>
                  <p className="pre-wrap">10秒部署，无任何接入成本
超轻量，自身不依赖任何模块，兼容主流浏览器
使用CDN分发，gizp+min后体积仅有~7KB
支持Vue，后期将会集成更多主流前端框架的监控方案*</p>
                </div>
                <div className="part2">
                  <img src={imgHome1} alt=""/>
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
                    <div><img src={imgHome2} alt=""/></div>
                    <h3>aaaa</h3>
                    <p>bbbbbb</p>
                  </div>
                  <div className="panel">
                    <div><img src={imgHome2} alt=""/></div>
                    <h3>aaaa</h3>
                    <p>bbbbbb</p>
                  </div>
                  <div className="panel">
                    <div><img src={imgHome2} alt=""/></div>
                    <h3>aaaa</h3>
                    <p>bbbbbb</p>
                  </div>
                </div>
        
              </div>
            </div>

            <div className="swiper-slide slide4" >
              <div className="content">
                <div className="part1">
                  <h1>易用</h1>
                  <p className="pre-wrap">10秒部署，无任何接入成本
超轻量，自身不依赖任何模块，兼容主流浏览器
使用CDN分发，gizp+min后体积仅有~7KB
支持Vue，后期将会集成更多主流前端框架的监控方案*</p>
                </div>
                <div className="part2">
                  <img src={imgHome1} alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}