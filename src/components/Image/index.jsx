import React, { Suspense } from 'react';
import useImage from './useImage'
import { BeatLoader } from 'react-spinners';
import { extractUrlCentreSize } from '../../utils';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error)
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return <div style={{
        width: 105,
        height: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <img style={{width: 80, height: 80}} src="https://ossprod.jrdaimao.com/file/1710320621068163.svg" alt=""/>
        <span style={{color: '#333333', fontSize: 12}}>加载失败</span>
      </div>;
    }

    return this.props.children;
  }
}

const ImageCom = (props) => {
  const {src, imageProps = {}} = props;
  const {src: imageUrl} = useImage({
    srcList: src
  })
  return (
    <img loading='lazy' src={imageUrl} {...imageProps} alt=""/>
  );
};

const styles = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  margin: 0
}
const ImageLoading = ({h}) => {
  return <div style={{...styles, height: h}}>
    <BeatLoader size={10} color="#1261ff"/>
  </div>
}

const Image = (props) => {
  const {width, height, scale} = extractUrlCentreSize(props.src);
  const h = `${scale ? 105 / width * height : 105}px`;
  return <ErrorBoundary>
    <Suspense fallback={<ImageLoading h={h}/>}>
      <ImageCom {...props} h={h || '105px'}/>
    </Suspense>
  </ErrorBoundary>
}

export default Image;
