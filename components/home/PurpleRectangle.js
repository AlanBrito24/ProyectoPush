import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg'

const PurpleRectangle = props => (
  <Svg {...props}>
    <Defs>
      <LinearGradient
        x1={-0.014}
        y1={-0.041}
        x2={0.942}
        y2={0.356}
        id="prefix__a"
      >
        <Stop offset={0} stopColor="#B29EF8" />
        <Stop offset={0} stopColor="#D2C5FB" />
        <Stop offset={0.045} stopColor="#C8B9FA" />
        <Stop offset={0.238} stopColor="#BBA9F9" />
        <Stop offset={0.647} stopColor="#B29EF8" />
        <Stop offset={1} stopColor="#AA93F8" />
      </LinearGradient>
    </Defs>
    <Path d="M0 0h414v247L260 366 0 247V0z" fill="url(#prefix__a)" />
  </Svg>
)

export default PurpleRectangle
