import React from 'react';
import twitter from './twitter.jpg';
class QuoteGeneratorComponent extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        quote:'',
        author: '',
        colorNum: 0,
        colors: ['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3']
      }
      this.UpdateQuoteAndAuthorAndColor = this.UpdateQuoteAndAuthorAndColor.bind(this);
      this.UpdateColors = this.UpdateColors.bind(this);
    }


async UpdateQuoteAndAuthorAndColor(){
    var quoteData = await this.getQuote();
    this.setState({quote:quoteData[0].quote, author: quoteData[0].author});
    this.UpdateColors()
}

UpdateColors(){
    var num = this.state.colorNum;
    // make sure new color num is not equal to previous num
    while(this.state.colorNum == num){
        num = Math.floor(Math.random() * this.state.colors.length);
    }
    this.setState({colorNum:num});
}
    
async componentDidMount(){
    await this.UpdateQuoteAndAuthorAndColor();
}

async getQuote(){
    var category = 'happiness';
    const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + category,{
        method: 'GET',
        headers:{
            'X-Api-Key': '/SlXVPJEDydjpA4C6vqRUg==BUraZ4sxe4LseH3S'
        },
    });
    return await response.json();
}

    render(){


      return(

        // create a div that fills the entire screen
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor:this.state.colors[this.state.colorNum] }}>
      
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '350px',
          backgroundColor: 'dimgrey',
        }}>            
            <div id = 'quotebox' style=
            {{position: 'absolute',
            width:'100%' ,
            height:'50%',
            paddingLeft:'20px',
            paddingRight:'20px',
            paddingTop: '20px',
            boxSizing:'border-box',// ensures div doesnt resize when padding applied
}}>
                <p style={{fontSize: 'em'}}>{this.state.quote}</p>

                <p style={{fontSize: 'small'}}>- {this.state.author}</p>
            </div>

            <button style={{ 
                position: 'absolute', bottom: '0', left: '0', width: '30px', height: '30px', marginLeft:'10px', marginBottom:'10px', 
                backgroundColor: this.state.colors[this.state.colorNum] }} />
            <button style={{ 
                position: 'absolute', bottom: '0', left: '0', width: '30px', height: '30px', marginLeft:'45px', marginBottom:'10px',
                backgroundImage:twitter, 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                imageResolution: 'from-image',
                backgroundColor: this.state.colors[this.state.colorNum] }} />
            
            <button
            onClick={this.UpdateQuoteAndAuthorAndColor}
            // css for adding text in button
            style={{ 
                position: 'absolute',  bottom: '0', right: '0', width: '100px', height: '30px', marginRight:'42px', marginBottom:'10px', 
                backgroundColor: this.state.colors[this.state.colorNum] }}>New Quote</button>  
  
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, 50%)', width: '600px', height: '330px'}}>
        <h3 style={{ position: 'absolute',  width: '600px',  color: 'white', textAlign: 'center' }}>by Nali</h3>
        </div>
      </div>

    

  
      );
    }
  }
  
export default QuoteGeneratorComponent;