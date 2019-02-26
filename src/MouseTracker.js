import React, { Component } from 'react';
import ColorPicker,{SketchPicker  } from 'react-color';

export class MouseTracker extends Component {
  square = React.createRef();
  state = {
    mouseX: 0,
    mouseY: 0,
    isMouseDown: false,
    dots: [],
    color:'black',
    range_value:20,
    isEdit:false
  };
  addDot = (x, y,color,size) => {
    this.setState((prevState) => {
      return {
        dots: [...prevState.dots, {x,y,color,size}]
      }
    })
  }

  handleMouseDown = event => {
    this.setState({ isMouseDown: true });
    if(!this.state.isEdit){
    this.addDot(this.state.mouseX, this.state.mouseY,this.state.color,this.state.range_value)
    }
  };

  handleMouseUp = event => {
    this.setState({ isMouseDown: false });
  };

  handleMouseLeave = event => {
    this.setState({ isMouseDown: false });
  };

  handleMouseEnter = event => {
    if (event.buttons === 1) {
      this.setState({ isMouseDown: true });
    }
  };

  handleMouseMove = event => {
    this.setState({
      mouseX: event.pageX - this.square.current.offsetLeft,
      mouseY: event.pageY - this.square.current.offsetTop,
    }, () => {
      if(this.state.isMouseDown && !this.state.isEdit) {
        console.log(this.state)
        this.addDot(this.state.mouseX, this.state.mouseY,this.state.color,this.state.range_value)
      }
    });
  };
  handleColorChange = (tcolor)=>{
    this.setState({color:tcolor.hex});
  }
  handleRange = event => {
    this.setState({range_value:event.target.value})
  }
  handleEdit = ()=>{
    if(this.state.isEdit){
      this.setState({isEdit:false});
    }else{
    this.setState({isEdit:true});
    }
  }
  del=(index)=>{
    this.setState(prevState=>{
      return (
        {
          dots:[        ...prevState.dots.slice(0, index),
          ...prevState.dots.slice(index + 1)
          ]
        }
      )
    })
  }
  delmove=(event,index)=>{
    if(event.buttons === 1 && this.state.isEdit){
          this.setState(prevState=>{
      return (
        {
          dots:[        ...prevState.dots.slice(0, index),
          ...prevState.dots.slice(index + 1)
          ]
        }
      )
    })
  }
}
  render() {
    return (
      <>
      <div style={{width:250,display:'inline-block'}}>
      <h4>رنگ  قلم</h4>
       <SketchPicker color={this.state.color} onChange={ this.handleColorChange }  />
       </div>
       <div style={{textAlign:'center',marginTop:50}} >
       <h4>اندازه قلم</h4>
       <input type="range" value={this.state.range_value} onChange={this.handleRange} style={{width:400}}/>
       <p>{this.state.range_value}</p>
       </div>
       <div style={{textAlign:'center',marginTop:50}}>
       <button onClick={this.handleEdit}>{this.state.isEdit ? 'مداد شو' : 'پاک کن شو'}</button>
       </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <h2>Mouse Tracker</h2>
        <span>X: {this.state.mouseX}</span>
        <span>Y: {this.state.mouseY}</span>
        <span>isMouseDown: {String(this.state.isMouseDown)}</span>
        <div
          ref={this.square}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onMouseEnter={this.handleMouseEnter}
          style={{
            border: '5px solid black',
            width: '400px',
            height: '400px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {this.state.dots.map((dot,index) => <div onClick={()=>{this.del(index)}} onMouseMove={(e)=>{this.delmove(e,index)}} style={{width: dot.size+'px', height: dot.size+'px',borderRadius: 10,backgroundColor: dot.color, position: 'absolute', left: dot.x - 10, top: dot.y - 10}}/>)}
        </div>
      </div>
      </>
    );
  }
}

export default MouseTracker;
