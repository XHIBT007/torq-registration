'use client'

import { QRCodeCanvas } from 'qrcode.react'

type RegistrationQRProps = {
  registrationNumber: string
  fullName: string
}

export default function RegistrationQR({
  registrationNumber,
  fullName,
}: RegistrationQRProps) {
  const downloadQR = () => {
  const canvas = document.getElementById(
    `qr-${registrationNumber}`,
  ) as HTMLCanvasElement | null

  if (!canvas) {
    alert('QR code is not ready yet.')
    return
  }

  const dataUrl = canvas.toDataURL('image/png')

  const newWindow = window.open()

  if (!newWindow) {
    alert('Please allow pop-ups to download the QR code.')
    return
  }

  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${registrationNumber} QR Code</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            font-family: Arial, sans-serif;
          }

          img {
            width: 300px;
            height: 300px;
          }

          p {
            margin-top: 20px;
            font-weight: bold;
            color: #111;
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" alt="QR Code" />
        <p>${registrationNumber}</p>
      </body>
    </html>
  `)

  newWindow.document.close()
}
