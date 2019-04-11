import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
export class Resources extends Component {

  render() {
    return (
        <div>
            <Header/>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch =>  ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
