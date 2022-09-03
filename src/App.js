import './App.scss';
import CityInput from "./CityInput";
import ImageList from "./ImageList";
import {useEffect, useState} from "react";

function App() {
    const [images, setImages] = useState([])
    //保存每次的背景图片
    const [bgImage, setBgImage] = useState('')
//每次背景图片改变 标题变成图片的描述
    useEffect(() => {
        //如果描述里没有值 把描述第一个字母大写
        document.title = !!bgImage && bgImage?.des && bgImage.des ? bgImage.des.charAt(0).toUpperCase() + bgImage.des.slice(1) : 'Loading...'
    }, [bgImage])
//默认显示第一张背景
    useEffect(() => {
        images.length > 0 && setBgImage(images[0])
    }, [images])


    const updateImages = (newImages) => {
        console.log('get updated images from CityInput...', newImages)
        setImages(newImages)
    }
    //给子组件ImageList传一个函数接收更换背景图片的数据
    const updateMainBG = img => {
        console.log('new background image set by ImageList', img)
        setBgImage(img)
    }
  return (
    <div className="App" style={{background: bgImage && bgImage.regular && `url('${bgImage.regular}') no-repeat center center/cover fixed`}}>
        <div className='searchBar'>
            <CityInput cbUpdateImages={updateImages}/>
        </div>

        <ImageList images={images} updateMainBG={updateMainBG}/>
    </div>
  );
}

export default App;
