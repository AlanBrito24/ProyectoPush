import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'

const BlackRectangle = props => (
  <Svg width={414} height={366} {...props}>
    <Defs>
      <LinearGradient x1={-0.202} y1={0.351} x2={1} y2={1} id="prefix__a">
        <Stop offset={0} stopColor="#AA93F8" />
        <Stop offset={0.605} stopColor="#2C3942" />
      </LinearGradient>
    </Defs>
    <Path d="M0 0h414v247L260 366 0 247V0z" fill="url(#prefix__a)" />
  </Svg>
)

export default BlackRectangle

