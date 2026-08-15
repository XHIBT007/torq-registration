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

    const newWindow = window.open('', '_blank')

    if (!newWindow) {
      alert('Please allow pop-ups to download the QR code.')
      return
    }

    newWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${registrationNumber} QR Code</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          >
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

  return (
    <div className="rounded-2xl border border-white/10 bg-black p-6 text-center">
      <p className="text-sm font-semibold text-white">
        {fullName}
      </p>

      <p className="mt-1 text-xs text-white/50">
        {registrationNumber}
      </p>

      <div className="mt-5 flex justify-center rounded-xl bg-white p-4">
        <QRCodeCanvas
          id={`qr-${registrationNumber}`}
          value={registrationNumber}
          size={240}
          level="H"
          includeMargin
        />
      </div>

      <button
        type="button"
        onClick={downloadQR}
        className="mt-5 w-full rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
      >
        DOWNLOAD QR
      </button>
    </div>
  )
}
