import { useState } from "react";
import { TwitterPicker } from "react-color";
import reactCSS from 'reactcss'

const ColorPicker = ({onChangeColor, index }) => {
  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  });

  const handleClick = () => {
    setState({...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({...state, displayColorPicker: false });
  };

  const handleChange = (color) => {
    setState({...state, color: color.rgb });
    onChangeColor(color, index)
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
     <div>
     <div style={ styles.swatch } onClick={ handleClick }>
       <div style={ styles.color } />
     </div>
     { state.displayColorPicker ? <div style={ styles.popover }>
       <div style={ styles.cover } onClick={ handleClose }/>
       <TwitterPicker color={ state.color } onChange={
            handleChange
          } />
     </div> : null }
   </div>
  )
}

export default ColorPicker



