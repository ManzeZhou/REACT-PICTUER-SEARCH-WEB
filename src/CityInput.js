import {useEffect, useState} from "react";
import {AccessKey, BasicUrl, DefaultCity} from "./consts";
import axios from "axios";
import './CityInput.scss'



const CityInput = ({cbUpdateImages}) => {

    const [city, setCity] = useState(DefaultCity)
    //const [images, setImages] = useState([])
    //cb for onKeyDown
    const cbInput = evt => {
        //如果用户只回车不输入/忘记输入/更换内容
        let newCity = evt.target.value.trim().toLowerCase()

        evt.key === 'Enter' &&
        newCity !== city &&
        (() => {
            //把新输入的city保存
            setCity(newCity) // async 异步问题 先往后运行 然后才拿到newcity
            console.log('new city', city, newCity)
            //解决异步问题 给fetchCity直接传newCity不等setCity更新
            fetchCity(newCity)

        })()

    }
//让页面一开始默认城市时就显示默认的图片的list
    useEffect(() => {fetchCity(DefaultCity)}, [])

    const fetchCity = (newCity) => {
        //借助axios 发http请求
        axios.get(BasicUrl, {
            params: {
                query: newCity,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${AccessKey}`
            }
        }).then(res => {
            console.log('raw data', res)
            //2015新特性 解构
            let {data: {results}} = res
            console.log('results--->', results)

            //array map() 拿到想要的三个内容 描述 图片的两个清晰度
            let imageList = results.map(item => ({
                des: item.alt_description,
                regular: item.urls.regular,
                thumb: item.urls.thumb
            }))
            //console.log('tidied', imageList)
            //数据驱动渲染 数据改变 页面改变
            //setImages(imageList)
            cbUpdateImages(imageList)



        }).catch(err => console.log('fetch city http error!', err))
    }

//return 最外层只能有一个元素包裹 不能在内部重复使用
    return<>

        <h2 className='cityName'>New Word: {city}</h2>
        <input type="text"
               placeholder="Search City here..."
               className='inputCity'
               onKeyDown={cbInput}
        />
    </>







}
//JSON.stringify() {JSON.stringify(images)}把数组里的Data全部变成string
export default CityInput