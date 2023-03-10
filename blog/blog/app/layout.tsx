import "../styles/globals.css";


export default function RootLayout({//layout
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <div className="bg-white">{/**max auto para centrarlo, maximo ancho, cambiamos los padding al cambiar el tamano de pantlla */}
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
