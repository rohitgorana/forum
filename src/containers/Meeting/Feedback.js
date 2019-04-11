import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Rate} from 'antd'
import styled from 'styled-components'
import {postFeedback} from '../../actions/meeting'

const Td = styled.td`
    padding: 10px;
`

export class Feedback extends Component {

    constructor(props){
        super(props);

    }

    rateStructure = rating => {
        this.props.postFeedback({structure : rating})
    }
    rateAnalysis = rating => {
        this.props.postFeedback({analysis : rating})
    }
    rateCommunication = rating => {
        this.props.postFeedback({communication : rating})
    }
    rateAppearance = rating => {
        this.props.postFeedback({appearance : rating})
    }

    


  render() {

    const {feedback} = this.props

    return (
      <div>
          <table>
              <tbody>
                <tr>
                    <Td>Structure</Td>
                    <Td><Rate onChange={this.rateStructure} value={parseInt(feedback.structure)}/></Td>
                </tr>
                <tr>
                    <Td>Analysis</Td>
                    <Td><Rate onChange={this.rateAnalysis} value={parseInt(feedback.analysis)}/></Td>
                </tr>
                <tr>
                    <Td>Communication</Td>
                    <Td><Rate onChange={this.rateCommunication} value={parseInt(feedback.communication)}/></Td>
                </tr>
                <tr>
                    <Td>Appearance</Td>
                    <Td><Rate onChange={this.rateAppearance} value={parseInt(feedback.appearance)}/></Td>
                </tr>
              </tbody>
          </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  feedback : state.meeting.interview.feedback
})

const mapDispatchToProps = dispatch => ({
  postFeedback : feedback => dispatch(postFeedback(feedback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
