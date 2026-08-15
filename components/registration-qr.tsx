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

    if (!canvas) return

    const link = document.createElement('a')

    link.download = `${registrationNumber}-QR.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
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
