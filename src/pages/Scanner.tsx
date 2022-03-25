import React, { Component, useState } from 'react'
const QrReader = require('react-qr-scanner')

const Scanner = () => {
  const [delay, setDelay] = useState(100)
  const [result, setResult] = useState('No Result')

  const previewStyle = {
    height: 240,
    width: 320
  }

  return (
    <div>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={(err: any) => console.log(err)}
        onScan={(data: any) => {
          if (data != null) {
            console.log(data)
            setResult(data.text)
            localStorage.setItem('qr', data.text)
          }
        }}
      />
      <p>{result}</p>
    </div>
  )
}

export default Scanner
