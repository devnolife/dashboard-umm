import Head from 'next/head'
import { Router } from 'next/router'
import { Toaster } from 'react-hot-toast'
import NProgress from 'nprogress'
import { CacheProvider } from '@emotion/react'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  return (
    <CacheProvider value={emotionCache}>
      <Toaster />
      <Head>
        <title>{`${themeConfig.templateName} - Universitas Muhammadiyah Makassar`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Universitas Muhammadiyah Makassar`}
        />
        <meta name='keywords' content='Universitas Muhammadiyah Makassar' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
