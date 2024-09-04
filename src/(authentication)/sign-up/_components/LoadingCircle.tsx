import React from 'react'
import { CircularLoading } from 'respinner'

type LoadingCircle = {
    color?: string;
    size?: number;
}

const LoadingCircle = ({ color = "#FFF", size = 25 }: LoadingCircle) => {
  return (
    <CircularLoading size={size} duration={1} stroke={color} />
)
}

export default LoadingCircle