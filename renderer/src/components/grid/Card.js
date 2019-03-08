import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  padding: 4px;
  min-width: 100%;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background: white;
`

const Wrapper = styled.div`
  box-sizing: border-box;
  min-height: 100%;
  height: 100%;
  width: 100%;
  min-width: 100%;
  padding: 8px;
`

const bull = (
  <span
    style={{
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    }}
  >
    •
  </span>
)

const CardComponent = props => (
  <Wrapper>
    <StyledPaper elevation={2}>
      <Typography color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="h2">
        be
        {bull}
        nev
        {bull}o{bull}
        lent
      </Typography>
      <Typography color="textSecondary">adjective</Typography>
      <Typography component="p">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
      <Button style={{ marginTop: 16 }} size="small">
        Learn More
      </Button>
    </StyledPaper>
  </Wrapper>
)

export default CardComponent
