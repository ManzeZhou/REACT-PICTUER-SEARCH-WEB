import './ImageList.scss'


const ImageList = ({images, updateMainBG}) => {
    //console.log('got images from ImageList', images)

    return <div className={'carousel'}>
        {
            images && images.map((img, index) => {
                return <div key={index}
                            //通过点击事件触发背景图片更换
                            onClick={() => updateMainBG(img)}
                            style={{background: `url('${img.thumb}') no-repeat center center/cover fixed`
                            }}></div>
            })
        }
    </div>

}

export default ImageList